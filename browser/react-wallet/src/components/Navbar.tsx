import React, { useState } from "react";
import { HamburgerIcon, XIcon } from "./Icons";

export const NavbarLogo = ({
  className,
  children,
  ...otherProps
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  let classArray = ["flex", "items-center", "flex-shrink-0", "mr-6", className];

  let baseClass = classArray.join(" ");

  return (
    <a className={baseClass} {...otherProps}>
      {children}
    </a>
  );
};

export const NavbarList = ({
  children,
  className,
  ...otherProps
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => {
  let classArray = [
    "flex-grow",
    "block",
    "w-full",
    "lg:flex",
    "lg:items-center",
    "lg:w-auto",
  ];

  let innerClass = [
    "text-lg",
    "inline-flex",
    "flex-col",
    "items-center",
    "lg:flex-grow",
    "lg:flex-row",
    className,
  ].join(" ");

  let baseClass = classArray.join(" ");
  return (
    <div className={baseClass}>
      <div className={innerClass} {...otherProps}>
        {children}
      </div>
    </div>
  );
};

export const NavbarLink = ({
  children,
  className,
  href,
  ...otherProperties
}: { href: string } & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  let classArray = [
    "block",
    "mt-4",
    "mr-4",
    "lg:inline-block",
    "lg:mt-0",
    "cursor-pointer",
    "hover:text-primary-500",
    className,
  ];

  let baseClass = classArray.join(" ");

  return (
    <a href={href} className={baseClass} {...otherProperties}>
      {children}
    </a>
  );
};

export const NavbarItem = ({
  children,
  className,
  ...otherProperties
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => {
  let classArray = [
    "block",
    "mt-4",
    "mr-4",
    "lg:inline-block",
    "lg:mt-0",
    "cursor-pointer",
    "hover:text-primary-500",
    className,
  ];

  let baseClass = classArray.join(" ");

  return (
    <div className={baseClass} {...otherProperties}>
      {children}
    </div>
  );
};


export const MenuButton = ({
  children,
  className,
  onClick,
  ...otherProperties
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
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
    className,
  ];

  let baseClass = classArray.join(" ");

  return (
    <button
      onClick={(e) => onClick(e)}
      className={baseClass}
      {...otherProperties}
    >
      {children}
    </button>
  );
};

export const Navbar = ({className, children}: React.PropsWithChildren<{className?: string}>) => {
  const [showMenu, toggleMenu] = useState(false);

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
    className,
  ];


  let brandLogo = React.Children.toArray(children).filter((child) => React.isValidElement(child) && (child.type as unknown as () => void).name === 'NavbarLogo');
  let itemList = React.Children.toArray(children).filter((child) => React.isValidElement(child) && (child.type as unknown as () => void).name !== 'NavbarLogo');

  return (
    <nav className={classArray.join(" ")}>
      <div className="hidden w-full lg:flex">{children}</div>
      <div className="flex items-center justify-between w-full lg:hidden">
        {brandLogo}
        <div className={"block w-full"}>
          <MenuButton
            onClick={() => toggleMenu(!showMenu)}
          >
            {showMenu && <XIcon className={""}/>}
            {!showMenu && (
              <HamburgerIcon className="pl-px ml-px" />
            )}
          </MenuButton>
        </div>
      </div>
      <div className="flex items-center w-full lg:hidden">
        {showMenu && <div className="flex-1">{itemList}</div>}
      </div>
    </nav>
  );
}

export default Navbar;
