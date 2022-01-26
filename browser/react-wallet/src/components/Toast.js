import React from 'react';
import { XIcon } from './Icons';

export const Toast = ({color, show, onClose, children, className, ...props}) => {

  if (show) {
    return (
      <div className={`fixed top-8 right-8 w-64 px-2 border border-${color}-500 bg-${color}-100 rounded-xl ${className}`}>
        <div className="flex items-center">
          <div className="w-full grow">
            {children}
          </div>
          <div>
            <XIcon className="w-5 ml-4 cursor-pointer" onClick={onClose} />
          </div>
        </div>
      </div>
    );
  }

  else return <div className="hidden"></div>
}

Toast.defaultProps = {
  color: "primary",
  show: false,
  onClose: (e) => { }
}

export default Toast;