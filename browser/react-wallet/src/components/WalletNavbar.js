import React from 'react';
import VerticalNavbar from './VerticalNavbar';
import { 
  CreditCardIcon, 
  BadgeCheck, 
  UploadIcon, 
  PencilIcon, 
  ChevronDoubleRightIcon, 
  ProfileIcon,
  CloudIcon
} from './Icons';

export const WalletNavbar = ({walletName, ...props}) => {

  return (
    <VerticalNavbar id="vertical-navbar" className="z-20 w-12 duration-700 ease-in-out bg-white hover:w-64 transition-width" {...props}>
      <VerticalNavbar.List className="flex-nowrap whitespace-nowrap">
        <VerticalNavbar.Item className="justify-end">
          <ChevronDoubleRightIcon className="vertical-navbar-menu-icon"/>
        </VerticalNavbar.Item>
        <div className="h-8 vertical-navbar-spacer" />
        <VerticalNavbar.Text className="w-full h-8 text-xl font-bold text-center fade-in-text"><h2>{walletName}</h2></VerticalNavbar.Text>
        <VerticalNavbar.Item navigateTo="/"> 
          <CreditCardIcon className="w-8"/>
          <VerticalNavbar.Link className="pl-2 fade-in-text">My Items</VerticalNavbar.Link>
        </VerticalNavbar.Item>
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
        <VerticalNavbar.Item navigateTo="/templates">
          <ProfileIcon className="w-8"/>
          <VerticalNavbar.Link className="pl-2 fade-in-text">Credential Templates</VerticalNavbar.Link>
        </VerticalNavbar.Item>
        <VerticalNavbar.Item navigateTo="/templates/generator">
          <CloudIcon className="w-8"/>
          <VerticalNavbar.Link className="pl-2 fade-in-text">Template Generator</VerticalNavbar.Link>
        </VerticalNavbar.Item>
      </VerticalNavbar.List>
    </VerticalNavbar>
  );
}

export default WalletNavbar;