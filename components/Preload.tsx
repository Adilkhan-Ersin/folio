"use client";
import { useState, useEffect } from 'react';

interface PreloadProps {
  onLoadComplete?: () => void;
}

const Preload: React.FC<PreloadProps> = ({ onLoadComplete }) => {
  const [loading, setLoading] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoading(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          
          // After reaching 90%, wait a moment before completing
          setTimeout(() => {
            setLoading(100);
            setIsComplete(true);
            if (onLoadComplete) onLoadComplete();
          }, 500);
          return 90;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-transform duration-1000 ${isComplete ? 'translate-y-full' : ''}`}>
      <div className="relative w-4/5 h-24">
        {/* First div - top part */}
        <div 
          className="absolute top-0 left-0 right-0 bg-white transition-all duration-700 ease-out"
          style={{ height: `${50 - (loading * 0.45)}%` }}
        ></div>
        
        {/* Loading text */}
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
          {loading}%
        </div>
        
        {/* Second div - bottom part */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-white transition-all duration-700 ease-out"
          style={{ height: `${50 - (loading * 0.45)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Preload;