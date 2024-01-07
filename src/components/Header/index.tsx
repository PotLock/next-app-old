'use client'

import IconLogo from '@/assets/icons/IconLogo';
import IconMenu from '@/assets/icons/IconMenu';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import React from 'react'
const menuItems = [
    "POTS",
    "PROJECTS",
    "FEED", 
  ];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
   
      <Navbar 
      maxWidth='full'
      className='px-4  sm:px-[77px] pt-[20px] pb-[10px] flex items-center   '
      isBordered
      onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent justify='start'>
          <NavbarBrand >
            <IconLogo />
            <p className="font-bold text-inherit">POTLOCK</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
        className='w-full'
        justify='end' >

          {
            menuItems.map((item, index) =>
            <NavbarItem key={index} className="hidden sm:flex gap-4">
            <Link color="foreground" href="#">
            {item}
            </Link>
          </NavbarItem>
            )
          }
          
          <NavbarItem className="flex font-medium text-sm py-[8px] border-none bg-[#292929] text-white px-[12px] rounded-md  items-center justify-center gap-3">
            <Link href="#">CART</Link>
            <NavbarItem className='rounded-full w-4 h-4 bg-[#F86B3F] text-white flex items-center justify-center text-[11px]'>4</NavbarItem>
          </NavbarItem>
        </NavbarContent>
      

        <NavbarMenuToggle
        
        icon={IconMenu}
          
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarMenu
         className='w-full h-full bg-[white] flex items-center justify-center gap-10'
        >
          {menuItems.map((item, index) => (
            <NavbarMenuItem 
           
            key={index}>
              <Link
                
                className="w-full font-semibold text-4xl"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>


   
  )
}

export default Header