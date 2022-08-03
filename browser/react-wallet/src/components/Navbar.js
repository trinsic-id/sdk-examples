import React from 'react';
import { HamburgerIcon, XIcon } from './Icons';

export const NavbarLogo = ({ children, className, ...props }) => {
  let classArray = [
    "flex",
    "items-center",
    "flex-shrink-0",
    "mr-6",
    className
  ];

  let baseClass = classArray.join(' ');

  return (
    <a className={baseClass} {...props}>
      {children}
    </a>
  );
}

export const NavbarList = ({children, className, ...props}) => {
  let classArray = [
    "flex-grow",
    "block",
    "w-full",
    "lg:flex",
    "lg:items-center",
    "lg:w-auto"
  ];

  let innerClass = [
    "text-lg",
    "inline-flex",
    "flex-col",
    "items-center",
    "lg:flex-grow",
    "lg:flex-row",
    className
  ].join(' ');

  let baseClass = classArray.join(' ');
  return (
    <div className={baseClass}>
      <div className={innerClass} {...props}>
        {children}
      </div>
    </div>
  );
}

export const NavbarLink = ({children, className, href, ...props}) => {
  let classArray = [
    "block",
    "mt-4",
    "mr-4",
    "lg:inline-block",
    "lg:mt-0",
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

export const NavbarItem = ({children, className, ...props}) => {
  let classArray = [
    "block",
    "mt-4",
    "mr-4",
    "lg:inline-block",
    "lg:mt-0",
    "cursor-pointer",
    "hover:text-primary-500",
    className
  ];

  let baseClass = classArray.join(' ');

  return (
    <div className={baseClass} {...props}>
      {children}
    </div>
  )
}

export const MenuButton = ({children, className, onClick, ...props}) => {
  let classArray = [
    "flex",
    "flex-none",
    "items-center",
    "px-2",
    "py-1",
    "h-8",
    "w-8",
    "border",
    "border-primary-400",
    "rounded",
    "hover:border-white",
    "float-right",
    className
  ];

  let baseClass = classArray.join(' ');

  return (
    <button onClick={(e) => onClick(e)} className={baseClass} {...props}>
      {children}
    </button>
  )
}

export class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    }

    this.classArray = [
      "flex",
      "flex-wrap",
      "items-center",
      "justify-between",
      "p-6",
    ];
  }
  static Logo = NavbarLogo;
  static List = NavbarList;
  static Link = NavbarLink;
  static Item = NavbarItem;
  // static MobileMenu = NavbarMobileMenu;

  render() {
    let brandLogo = this.props.children.filter(x => x.type === NavbarLogo)
    let itemList = this.props.children.filter(x => x.type !== NavbarLogo)

    return (
      <nav className={[...this.classArray, this.props.className].join(' ')}>
        <div className="hidden w-full lg:flex">
          {this.props.children}
        </div>
        <div className="flex items-center justify-between w-full lg:hidden">
          {brandLogo}
          <div className={"block w-full"}>
            <MenuButton onClick={() => this.setState({ showMenu: !this.state.showMenu })}>
              {this.state.showMenu && <XIcon />}
              {this.state.showMenu === false && <HamburgerIcon className="pl-px ml-px" />}
            </MenuButton>
          </div>
        </div>
        <div className="flex items-center w-full lg:hidden">
          {this.state.showMenu && <div className="flex-1">
            {itemList}
          </div>}
        </div>
      </nav>
    );
  }
}

Navbar.Navbar = undefined;

Navbar.Navbar = undefined;

Navbar.Navbar = undefined;

export default Navbar;
