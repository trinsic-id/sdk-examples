import React from 'react';
import Spinner from './Spinner';

export const Button = ({ className, color, variant, children, isBusy, disabled, ...props }) => {
  let classArray = [
    "font-bold",
    "py-2",
    "px-4",
    disabled || isBusy ? "cursor-default" : "cursor-pointer",
    className
  ]

  const intensity = isBusy || disabled ? 200 : 500;
  const hoverIntensity = isBusy || disabled ? 200 : 600;
  const defaultClass = `bg-${color}-${intensity} hover:bg-${color}-${hoverIntensity} text-white rounded-full`;
  const outlineClass = `bg-transparent hover:bg-${color}-500 text-${color}-500 font-semibold hover:text-white border border-${color}-500 hover:border-transparent rounded-full`

  switch (variant) {
    case "outline":
      classArray.unshift(outlineClass);
      break;
    default:
      classArray.unshift(defaultClass);
      break;
  }
  let baseClass = classArray.join(' ');

  return (
    <button className={baseClass} {...props} disabled={isBusy || disabled}>
      <>
        {children}
        {isBusy && <Spinner className="inline-flex ml-2 w-4 h-4"/>}
      </>
    </button>
  );
}

Button.defaultProps = {
  variant: "default", // can be default, outline
  color: "primary" // any base color defined in tailwind config
}

export default Button;