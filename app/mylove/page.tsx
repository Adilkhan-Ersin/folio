"use client"; // Required for components using hooks like useEffect, useRef, useState

import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import React, { useRef, useEffect, useCallback } from 'react';

// Define the structure for a particle in the animation
interface Particle {
    vx: number;
    vy: number;
    R: number; // Radius (seems unused in drawing logic, but kept from original)
    speed: number;
    q: number; // Index of the target point in the heart shape
    D: number; // Direction multiplier (-1 or 1)
    force: number; // Force multiplier for velocity decay
    f: string; // Fill style (color) for the particle trail
    trace: { x: number; y: number }[]; // Array to store particle trail positions
}

// Define the props for the component (none needed for this example)
// interface HeartAnimationProps {}

const HeartAnimation = () => {
    // Ref to hold the canvas DOM element
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Ref to store animation state variables that don't trigger re-renders
    const animationRef = useRef<{
        ctx: CanvasRenderingContext2D | null;
        width: number;
        height: number;
        koef: number;
        pointsOrigin: [number, number][];
        targetPoints: [number, number][];
        particles: Particle[];
        heartPointsCount: number;
        traceCount: number;
        time: number;
        animationFrameId: number | null;
        isMobile: boolean;
        config: { traceK: number; timeDelta: number };
    }>({
        ctx: null,
        width: 0,
        height: 0,
        koef: 1,
        pointsOrigin: [],
        targetPoints: [],
        particles: [],
        heartPointsCount: 0,
        traceCount: 50,
        time: 0,
        animationFrameId: null,
        isMobile: false,
        config: { traceK: 0.4, timeDelta: 0.01 },
    });

    // Function to calculate heart shape points
    const heartPosition = (rad: number): [number, number] => {
        // Parametric equation for a heart shape
        return [
            Math.pow(Math.sin(rad), 3),
            -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad)),
        ];
    };

    // Function to scale and translate points
    const scaleAndTranslate = (pos: [number, number], sx: number, sy: number, dx: number, dy: number): [number, number] => {
        return [dx + pos[0] * sx, dy + pos[1] * sy];
    };

    // Function to update target points based on time (creates the pulsing effect)
    const pulse = useCallback(() => {
        const anim = animationRef.current;
        const n = -Math.cos(anim.time); // Oscillating value based on time
        const kx = (1 + n) * 0.5; // Scale factor x
        const ky = (1 + n) * 0.5; // Scale factor y

        // Update each target point's position based on the scale factors and origin points
        for (let i = 0; i < anim.pointsOrigin.length; i++) {
            if (!anim.targetPoints[i]) anim.targetPoints[i] = [0, 0]; // Initialize if needed
            anim.targetPoints[i][0] = kx * anim.pointsOrigin[i][0] + anim.width / 2;
            anim.targetPoints[i][1] = ky * anim.pointsOrigin[i][1] + anim.height / 2;
        }
    }, []); // No dependencies, safe to memoize

    // The main animation loop
    const loop = useCallback(() => {
        const anim = animationRef.current;
        const rand = Math.random;

        if (!anim.ctx) return; // Exit if context is not available

        // Update time and pulse the heart shape
        const n = -Math.cos(anim.time);
        anim.time += (Math.sin(anim.time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * anim.config.timeDelta;
        pulse();

        // Clear canvas with a semi-transparent black rectangle to create fading trails
        anim.ctx.fillStyle = 'rgba(0,0,0,.1)';
        anim.ctx.fillRect(0, 0, anim.width, anim.height);

        // Update and draw each particle
        for (let i = anim.particles.length; i--;) {
            const u = anim.particles[i];
            const q = anim.targetPoints[u.q]; // Target point for this particle

            if (!q) continue; // Skip if target point doesn't exist yet

            // Calculate vector from particle's head to its target point
            const dx = u.trace[0].x - q[0];
            const dy = u.trace[0].y - q[1];
            const length = Math.sqrt(dx * dx + dy * dy);

            // If particle is close to the target point, potentially change target
            if (10 > length) {
                if (0.95 < rand()) {
                    // Randomly jump to a new target point
                    u.q = ~~(rand() * anim.heartPointsCount);
                } else {
                    // Or move to the next/previous point along the heart shape
                    if (0.99 < rand()) {
                        u.D *= -1; // Occasionally reverse direction
                    }
                    u.q += u.D;
                    u.q %= anim.heartPointsCount;
                    if (0 > u.q) {
                        u.q += anim.heartPointsCount; // Wrap around if index goes below 0
                    }
                }
            }

            // Apply velocity towards the target point
            // Avoid division by zero if length is very small
            if (length > 0.1) {
                 u.vx += (-dx / length) * u.speed;
                 u.vy += (-dy / length) * u.speed;
            }


            // Move the head of the particle's trace
            u.trace[0].x += u.vx;
            u.trace[0].y += u.vy;

            // Apply force/friction to slow down the particle
            u.vx *= u.force;
            u.vy *= u.force;

            // Update the rest of the trace points to follow the head
            for (let k = 0; k < u.trace.length - 1;) {
                const T = u.trace[k]; // Current trace point
                const N = u.trace[++k]; // Next trace point
                // Make the next point move towards the current point (creates the trail effect)
                N.x -= anim.config.traceK * (N.x - T.x);
                N.y -= anim.config.traceK * (N.y - T.y);
            }

            // Draw the particle's trail
            anim.ctx.fillStyle = u.f;
            for (let k = 0; k < u.trace.length; k++) {
                anim.ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1); // Draw 1x1 pixel for each trace point
            }
        }

        // Request the next frame of the animation
        anim.animationFrameId = window.requestAnimationFrame(loop);
    }, [pulse]); // loop depends on pulse

    // Initialization and resize handling effect
    useEffect(() => {
        const canvas = canvasRef.current;
        const anim = animationRef.current;

        if (!canvas) return; // Exit if canvas element is not yet available

        // Detect if it's potentially a mobile device (affects particle count and canvas scaling)
        anim.isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
        anim.koef = anim.isMobile ? 0.5 : 1; // Scale factor for canvas size
        anim.traceCount = anim.isMobile ? 20 : 50; // Number of points in particle trail

        // Get the 2D rendering context
        anim.ctx = canvas.getContext('2d');
        if (!anim.ctx) {
             console.error("Failed to get 2D context");
             return;
        }


        // Function to set up canvas size and initial state
        const setup = () => {
            if (!canvas || !anim.ctx) return;

            // Set canvas dimensions based on window size and scale factor
            anim.width = canvas.width = anim.koef * window.innerWidth;
            anim.height = canvas.height = anim.koef * window.innerHeight;

            // Clear canvas initially
            anim.ctx.fillStyle = 'rgba(0,0,0,1)';
            anim.ctx.fillRect(0, 0, anim.width, anim.height);

            // Calculate the origin points for the heart shape at different scales
            anim.pointsOrigin = [];
            const dr = anim.isMobile ? 0.3 : 0.1; // Step for angle increment
            for (let i = 0; i < Math.PI * 2; i += dr) anim.pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
            for (let i = 0; i < Math.PI * 2; i += dr) anim.pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
            for (let i = 0; i < Math.PI * 2; i += dr) anim.pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
            anim.heartPointsCount = anim.pointsOrigin.length;

             // Initialize target points array
            anim.targetPoints = new Array(anim.heartPointsCount);


            // Initialize particles
            anim.particles = [];
            const rand = Math.random;
            for (let i = 0; i < anim.heartPointsCount; i++) {
                const x = rand() * anim.width;
                const y = rand() * anim.height;
                const particle: Particle = {
                    vx: 0,
                    vy: 0,
                    R: 2,
                    speed: rand() + 5,
                    q: ~~(rand() * anim.heartPointsCount), // Initial target point index
                    D: 2 * (i % 2) - 1, // Initial direction
                    force: 0.2 * rand() + 0.7, // Force multiplier
                    f: `hsla(0,${~~(40 * rand() + 60)}%,${~~(60 * rand() + 20)}%,.3)`, // Color
                    trace: [],
                };
                // Initialize trace points to the starting position
                for (let k = 0; k < anim.traceCount; k++) particle.trace[k] = { x, y };
                anim.particles.push(particle);
            }
             // Reset time for pulsing effect
             anim.time = 0;

        };

        // Handle window resize events
        const handleResize = () => {
            setup(); // Re-setup the canvas and elements on resize
        };

        // Initial setup
        setup();
        window.addEventListener('resize', handleResize);

        // Start the animation loop if it's not already running
        if (anim.animationFrameId === null) {
            loop();
        }

        // Cleanup function when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
            if (anim.animationFrameId !== null) {
                window.cancelAnimationFrame(anim.animationFrameId);
                anim.animationFrameId = null; // Reset the ID
            }
             // Optional: Clear context reference
             anim.ctx = null;
        };
    }, [loop]); // Rerun effect if `loop` function reference changes (due to its dependencies)

    // Render the canvas element
    return (
      <>
        <CustomCursor />
        <Navbar />
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.2)]" // Use Tailwind for basic positioning
        />
      </>
    );
};

export default HeartAnimation;
