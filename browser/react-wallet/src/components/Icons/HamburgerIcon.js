import React from 'react';

export const HamburgerIcon = ({className, title="Menu", ...props}) => {
  let classArray = [
    "fill-current",
    className
  ];

  let baseClass = classArray.join(' ');
  
  return (
    <svg viewBox="0 0 24 24" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" className={baseClass} {...props}>
      <title>title</title>
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
    </svg>
  );
}

export default HamburgerIcon;

