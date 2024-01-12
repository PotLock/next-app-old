'use client'

import Banner from "../../../assets/images/banner.png";
import Profile from "../../../assets/images/profile.png";

import Image from "next/image";
import React from "react";
import { Avatar, AvatarGroup, Button, useDisclosure } from "@nextui-org/react";
import AddTeamMemberModal from "../Tab/components/Modal/AddTeamMemberModal";

const BannerMember = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="px-[76px] py-12 w-full gap-2 flex flex-col">
      <AddTeamMemberModal isOpen={isOpen} onOpenChange={onOpenChange}/>
      <div className="relative w-full  h-[280px]">
        <Image src={Banner} alt="" className="" />
        <Image
          src={Profile}
          width={88}
          height={88}
          alt=""
          className="absolute -bottom-10 left-24"
        />
      </div>
      <div className="flex  items-center justify-around">
        <Button 
        onPress={onOpen}
        variant="light">
          <div className="text-[#DD3345] font-medium"> Add team members</div>
        </Button>
        <AvatarGroup>
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </AvatarGroup>
      </div>
    </div>
  );
};

export default BannerMember;
