
import React from 'react';

export const ArrowCircleLeftIcon = ({ className, ...props }) => {
  let classArray = [
    "w-6",
    "h-6",
    className
  ];

  let baseClass = classArray.join(' ');

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={baseClass} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
    </svg>
  );
}

export default ArrowCircleLeftIcon;


