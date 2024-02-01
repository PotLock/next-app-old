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
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import ModelCart from "./components/ModelCart";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet } from "@/configs/nearWallet";
import { CartContext } from "@/layout/LayoutProvides";
import IconProfile from "@/assets/icons/IconProfile";
import { IconArrowDown } from "@/assets/icons";
import axios from "axios";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentPath = usePathname();
  const [account, setAccount] = useState<any>(null);
  const { cart } = useContext(CartContext);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/project/social-profile/${account}`,
        )
        .then((res) => setProfile(res.data));
    };

    if (account) {
      fetchProfile();
    }
  }, [account]);

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

    const getAccount = async () => {
      await wallet.startUp();
      const accountId = wallet.accountId;
      if (accountId) {
        setAccount(wallet.accountId);
        localStorage.setItem("accountId", accountId);
      }
    };
    getAccount();
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
            {item.href === "/pots" && !account ? (
              <Tooltip content="You are not logged in">
                <p
                  className={`${currentPath === item.href && "font-semibold"} cursor-pointer`}
                >
                  {item.title}
                </p>
              </Tooltip>
            ) : (
              <Link href={item.href}>
                <p
                  className={`${currentPath === item.href && "font-semibold"}`}
                >
                  {item.title}
                </p>
              </Link>
            )}
          </NavbarItem>
        ))}

        <NavbarItem className="flex gap-8">
          <Badge content={cart.length} color="warning" variant="solid">
            <Button onClick={onOpen}>CART</Button>
          </Badge>
          {account ? (
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Button className="bg-transparent flex items-center justify-center w-max p-[10px]">
                  <IconProfile />
                  <IconArrowDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2 flex flex-col items-start gap-2 w-[230px] rounded-md border border-[#292929] shadow-lg">
                <div className="flex gap-3 items-center justify-center cursor-pointer">
                  <div className="bg-[#F0F0F0] p-[10px] rounded-full">
                    {profile && profile?.image && profile?.image?.ipfs_cid ? (
                      <Image
                        src={`https://near.social/ipfs/${profile.image.ipfs_cid}`}
                        alt="avatar"
                        width={24}
                        height={24}
                      />
                    ) : (
                      <div className="w-6 h-6">
                        <IconProfile />
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-medium w-[215px] truncate">
                    {account}
                  </div>
                </div>
                <div className="text-sm p-2 cursor-pointer">My Profile</div>
                <div className="text-sm p-2 cursor-pointer">Add Money</div>
                <div
                  className="text-sm text-[#DD3345] p-2 cursor-pointer"
                  onClick={handleSignOut}
                >
                  Logout
                </div>
              </PopoverContent>
            </Popover>
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
