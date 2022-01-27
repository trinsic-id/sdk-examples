import React from 'react';

export const Spinner = ({ className, color, ...props }) => {
  let classArray = [
    "animate-spin",
    className
  ];

  let baseClass = classArray.join(' ');

  return (
    <svg className={baseClass} viewBox="0 0 24 24" {...props}>
      <circle className="opacity-0" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}

Spinner.defaultProps = {
  color: "primary" // any base color defined in tailwind config
}

export default Spinner;