import React from 'react';
import VerticalNavbar from './VerticalNavbar';
import { 
  CreditCardIcon, 
  BadgeCheck, 
  UploadIcon, 
  PencilIcon, 
  ChevronDoubleRightIcon 
} from './Icons';

export const WalletNavbar = (props) => {

  return (
    <VerticalNavbar id="vertical-navbar" className="bg-white lg:hover:w-64 transition-all duration-500 ease-in-out" {...props}>
      <VerticalNavbar.List>
        <VerticalNavbar.Item className="justify-end">
          <ChevronDoubleRightIcon className="vertical-navbar-menu-icon"/>
        </VerticalNavbar.Item>
        <VerticalNavbar.Item navigateTo="/issue">
          <CreditCardIcon className="w-8"/>
          <VerticalNavbar.Link className="pl-2">Issue Credential</VerticalNavbar.Link>
        </VerticalNavbar.Item>
        <VerticalNavbar.Item navigateTo="/verify">
          <BadgeCheck className="w-8"/>
          <VerticalNavbar.Link className="pl-2">Verify Credential</VerticalNavbar.Link>
        </VerticalNavbar.Item>
        <VerticalNavbar.Item navigateTo="/store">
          <UploadIcon className="w-8"/>
          <VerticalNavbar.Link className="pl-2">Store Credential</VerticalNavbar.Link>
        </VerticalNavbar.Item>
        <VerticalNavbar.Item navigateTo="/proof"> 
          <PencilIcon className="w-8"/>
          <VerticalNavbar.Link className="pl-2">Generate Proof</VerticalNavbar.Link>
        </VerticalNavbar.Item>
      </VerticalNavbar.List>
    </VerticalNavbar>
  );
}

export default WalletNavbar;