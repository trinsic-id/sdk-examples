import React from 'react';

export const ProfileIcon = ({ className, ...props }) => {
  let classArray = [
    "h-5",
    "w-5",
    "fill-current",
    className
  ];

  let baseClass = classArray.join(' ');
  return (
    <svg viewBox="0 0 24 24"
         width="24"
         height="24"
         stroke="currentColor"
         strokeWidth="2"
         fill="none"
         strokeLinecap="round"
         strokeLinejoin="round"
         className={baseClass}
     >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

export default ProfileIcon;
