import React from 'react';

export const ChevronDoubleLeftIcon = ({ className, ...props }) => {
  let classArray = [
    "h-6",
    "w-6",
    className
  ];

  let baseClass = classArray.join(' ');

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={baseClass} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
  );
}

export default ChevronDoubleLeftIcon;
