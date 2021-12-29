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
    <VerticalNavbar id="vertical-navbar" className="bg-white w-12 lg:hover:w-64 transition-width duration-700 ease-in-out" {...props}>
      <VerticalNavbar.List className="flex-nowrap whitespace-nowrap">
        <VerticalNavbar.Item className="justify-end">
          <ChevronDoubleRightIcon className="vertical-navbar-menu-icon"/>
        </VerticalNavbar.Item>
        <VerticalNavbar.Item navigateTo="/issue">
          <CreditCardIcon className="w-8"/>
          <VerticalNavbar.Link className="pl-2 fade-in-text">Issue Credential</VerticalNavbar.Link>
        </VerticalNavbar.Item>
        <VerticalNavbar.Item navigateTo="/verify">
          <BadgeCheck className="w-8"/>
          <VerticalNavbar.Link className="pl-2 fade-in-text">Verify Credential</VerticalNavbar.Link>
        </VerticalNavbar.Item>
        <VerticalNavbar.Item navigateTo="/store">
          <UploadIcon className="w-8"/>
          <VerticalNavbar.Link className="pl-2 fade-in-text">Store Credential</VerticalNavbar.Link>
        </VerticalNavbar.Item>
        <VerticalNavbar.Item navigateTo="/proof"> 
          <PencilIcon className="w-8"/>
          <VerticalNavbar.Link className="pl-2 fade-in-text">Generate Proof</VerticalNavbar.Link>
        </VerticalNavbar.Item>
      </VerticalNavbar.List>
    </VerticalNavbar>
  );
}

export default WalletNavbar;