import React from 'react';

export const CloudIcon = ({ className, ...props }) => {
  let classArray = [
    "inline-block",
    className
  ];

  let baseClass = classArray.join(' ');

  return (
    <svg viewBox="0 0 20 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" className={baseClass} {...props}>
      <path d="M4.6 15.2C3.52543 15.1986 2.49227 14.7854 1.71313 14.0453C0.933977 13.3053 0.468107 12.2948 0.411379 11.2217C0.354651 10.1487 0.711379 9.09466 1.40816 8.27661C2.10494 7.45856 3.08877 6.9387 4.1572 6.824C3.8426 5.59027 4.03098 4.28209 4.68091 3.18725C5.33084 2.09241 6.38907 1.3006 7.6228 0.985999C8.85653 0.671399 10.1647 0.859783 11.2595 1.50971C12.3544 2.15964 13.1462 3.21787 13.4608 4.4516C14.1945 4.34943 14.9414 4.39934 15.6551 4.5982C16.3687 4.79706 17.0338 5.14063 17.6089 5.60754C18.1841 6.07444 18.657 6.6547 18.9983 7.31222C19.3396 7.96973 19.542 8.69043 19.5928 9.4295C19.6436 10.1686 19.5418 10.9102 19.2938 11.6082C19.0457 12.3063 18.6566 12.9458 18.1508 13.4871C17.645 14.0283 17.0332 14.4597 16.3535 14.7544C15.6739 15.0491 14.9408 15.2008 14.2 15.2H4.6Z" fill="white"/>
    </svg>
  );
}

export default CloudIcon;

