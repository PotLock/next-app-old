"use client";

import IconLogo from "@/assets/icons/IconLogo";
import IconMenu from "@/assets/icons/IconMenu";
import { MENUITEMS } from "@/constant";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  useDisclosure,
  Badge,
} from "@nextui-org/react";
import React from "react";
import ModelCart from "./components/ModelCart";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Navbar
      maxWidth="full"
      className="bg-cover bg-no-repeat px-4  sm:px-[77px] pt-[20px] pb-[10px] flex items-center"
      isBordered
      onMenuOpenChange={setIsMenuOpen}
    >
      <ModelCart isOpen={isOpen} onOpenChange={onOpenChange} />

      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="flex gap-2">
            <div className="mb-1">
              <IconLogo />
            </div>
            <p className="font-bold text-inherit">POTLOCK</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="w-full" justify="end">
        {MENUITEMS.map((item, index) => (
          <NavbarItem key={index} className="hidden sm:flex gap-4">
            <Link
              color="foreground"
              href={item === "PROJECTS" ? "/project/home" : " /demo"}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}

        <NavbarItem>
          <Badge content="5" color="warning" variant="solid">
            <Button onClick={onOpen}>CART</Button>
          </Badge>
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
            <Link className="w-full font-semibold text-4xl" href="#">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
