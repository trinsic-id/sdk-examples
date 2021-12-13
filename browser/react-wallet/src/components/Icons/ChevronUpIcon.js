import React from 'react';

export const ChevronUpIcon = ({ className, ...props }) => {
  let classArray = [
    "inline-block",
    className
  ];

  let baseClass = classArray.join(' ');

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={baseClass} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );
}

export default ChevronUpIcon;;
