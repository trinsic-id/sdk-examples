import React from 'react';

export const DownloadIcon = ({ className, ...props }) => {
  let classArray = [
    "fill-current",
    className
  ];

  let baseClass = classArray.join(' ');

  return (
    <svg className={baseClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
    </svg>
  );
}

export default DownloadIcon;


