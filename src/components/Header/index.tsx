"use client";
import IconLogo from "@/assets/icons/IconLogo";
import IconMenu from "@/assets/icons/IconMenu";
import { MENUITEMS } from "@/constant";
import {
  Badge,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ModelCart from "./components/ModelCart";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet } from "@/configs/nearWallet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentPath = usePathname();
  const [account, setAccount] = useState<any | null>(null);

  const handleSignIn = async () => {
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: "mainnet",
    });
    await wallet.startUp().then(() => {
      wallet.signIn();
    });
  };

  const handleSignOut = async () => {
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: "mainnet",
    });
    await wallet.startUp().then(() => {
      wallet.signOut();
    });
  };

  useEffect(() => {
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: "mainnet",
    });

    const startUpWallet = async () => {
      await wallet.startUp();
      const accountId = wallet.accountId;
      if (accountId) {
        setAccount(wallet.accountId);
      }
    };
    startUpWallet();
  }, []);

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
            <Link href={item.href}>
              <p className={`${currentPath === item.href && "font-semibold"}`}>
                {item.title}
              </p>
            </Link>
          </NavbarItem>
        ))}

        <NavbarItem>
          <Badge content="0" color="warning" variant="solid">
            <Button onClick={onOpen}>CART</Button>
          </Badge>
          {account ? (
            <Button className="ml-5" color="primary" onClick={handleSignOut}>
              {account}
            </Button>
          ) : (
            <Button className="ml-5" color="primary" onClick={handleSignIn}>
              Log in
            </Button>
          )}
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
            <Link
              className={`${
                currentPath === item.href && "font-semibold"
              } w-full  text-4xl`}
              href={item.href}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
