"use client";

import IconLogo from "@/assets/icons/IconLogo";
import IconMenu from "@/assets/icons/IconMenu";
import { MENUITEMS } from "@/constant";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import ModelCart from "./components/ModelCart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Navbar
      maxWidth="full"
      className="bg-[url('/background.png')] bg-cover bg-no-repeat px-4  sm:px-[77px] pt-[20px] pb-[10px] flex items-center"
      isBordered
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <IconLogo />
          <p className="font-bold text-inherit">POTLOCK</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="w-full" justify="end">
        {MENUITEMS.map((item, index) => (
          <NavbarItem key={index} className="hidden sm:flex gap-4">
            <Link color="foreground" href="/demo">
              {item}
            </Link>
          </NavbarItem>
        ))}

        <NavbarItem>
          <Button
            className="flex font-medium text-sm py-[8px] border-none bg-[#292929] text-white px-[12px] rounded-md  items-center justify-center gap-3"
            onPress={onOpen}
          >
            <div>CART</div>
            <div className="rounded-full w-4 h-4 bg-[#F86B3F] text-white flex items-center justify-center text-[11px]">
              4
            </div>
          </Button>

          <ModelCart isOpen={isOpen} onOpenChange={onOpenChange} />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenuToggle
        icon={IconMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarMenu className="w-full h-full bg-[white] flex items-center justify-center gap-10">
        {MENUITEMS.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link className="w-full font-semibold text-4xl" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
