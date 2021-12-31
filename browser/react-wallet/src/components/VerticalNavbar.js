import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NavbarItemIcon = ({children, className, ...props}) => {
  let classAarray = [
    "vertical-navbar-item-icon"
  ];

  let baseClass = classAarray.join(' ');

  return (
    <div className={baseClass} {...props}>
      {children}
    </div>
  );
}

export const NavbarLink = ({children, className, href, ...props}) => {
  let classArray = [
    "vertical-navbar-link",
    "w-full",
    "cursor-pointer",
    "hover:text-primary-500",
    className
  ];

  let baseClass = classArray.join(' ');

  return (
    <a href={href} className={baseClass} {...props}>
      {children}
    </a>
  )
}

export const NavbarText = ({children, className, href, ...props}) => {
  let classArray = [
    "vertical-navbar-text",
    "w-full",
    className
  ];

  let baseClass = classArray.join(' ');

  return (
    <div className={baseClass} {...props}>
      {children}
    </div>
  )
}

export const NavbarList = ({children, className, ...props}) => {
  let classAarray = [
    "vertical-navbar-list",
    "flex",
    "flex-col",
    "items-center",
    "h-full",
    className
  ];

  let baseClass = classAarray.join(' ');

  return (
    <ul className={baseClass} {...props}>
      {children}
    </ul>
  );
}

export const NavbarItem = ({ children, className, navigateTo, ...props}) => {
  let classArray = [
    "vertical-navbar-item",
    "w-full",
    "hover:text-primary-500",
    "p-2",
    "flex",
    "items-center",
    className
  ];

  let baseClass = classArray.join(' ');
  let n = useNavigate();

  const navigate = () => {
    if (navigateTo) {
      n(navigateTo)
    }
  }

  return (
    <li onClick={() => navigate()} {...props} className={baseClass}>
      {children}
    </li>
  );
}

export class VerticalNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    }

    this.classArray = [
      "vertical-navbar",
      "fixed",
      "border",
      "rounded",
      "h-screen"
    ];
  }
  static Link = NavbarLink;
  static Item = NavbarItem;
  static List = NavbarList;
  static Icon = NavbarItemIcon;
  static Text = NavbarText;

  render() {
    return (
      <nav {...this.props} className={[...this.classArray, this.props.className].join(' ')}>
        {this.props.children}
      </nav>
    );
  }
}

export default VerticalNavbar;
