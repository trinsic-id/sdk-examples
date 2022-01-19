import React from 'react';

export const Input = ({className, ...props}) => {
  let classArray = [
    "block",
    "w-full",
    "border",
    "border-black",
    "rounded",
    "px-2",
    "py-1",
    className
  ]
  let baseClass = classArray.join(' ');

  if (props.type && props.type === "select") {
    return <select className={baseClass} {...props} />
  }
  return (
    <input className={baseClass} {...props} />
  );
}
