import React from 'react';

type ButtonProps = {
  title?: string;
  icon?: React.ReactNode;
  containerClass: string;
  onClickThug: () => void;
}
const Button = ({ title, icon, containerClass, onClickThug }: ButtonProps) => {
  return (
    <button onClick={onClickThug} className={containerClass}>
      <span className='absolute flex transition-all duration-500 ease-in-out-cubic group-hover:-translate-y-20'>
        {icon}
      </span>
      <span className='absolute flex translate-y-20 transition-all duration-500 ease-in-out-cubic group-hover:translate-y-0'>
        {icon}
      </span>
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>
    </button>
  );
}

export default Button;
