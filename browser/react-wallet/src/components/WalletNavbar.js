import React from 'react';
import VerticalNavbar from './VerticalNavbar';
import { 
  CreditCardIcon, 
  BadgeCheck, 
  UploadIcon, 
  PencilIcon, 
  ChevronDoubleRightIcon 
} from './Icons';

export const WalletNavbar = ({walletName, ...props}) => {

  return (
    <VerticalNavbar id="vertical-navbar" className="bg-white w-12 hover:w-64 transition-width duration-700 ease-in-out" {...props}>
      <VerticalNavbar.List className="flex-nowrap whitespace-nowrap">
        <VerticalNavbar.Item className="justify-end">
          <ChevronDoubleRightIcon className="vertical-navbar-menu-icon"/>
        </VerticalNavbar.Item>
        <div className="vertical-navbar-spacer h-8" />
        <VerticalNavbar.Text className="h-8 font-bold text-xl text-center w-full fade-in-text"><h2>{walletName}</h2></VerticalNavbar.Text>
        <VerticalNavbar.Item navigateTo="/issue">
          <PencilIcon className="w-8"/>
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
        <VerticalNavbar.Item navigateTo="/items"> 
          <CreditCardIcon className="w-8"/>
          <VerticalNavbar.Link className="pl-2 fade-in-text">My Items</VerticalNavbar.Link>
        </VerticalNavbar.Item>
      </VerticalNavbar.List>
    </VerticalNavbar>
  );
}

export default WalletNavbar;