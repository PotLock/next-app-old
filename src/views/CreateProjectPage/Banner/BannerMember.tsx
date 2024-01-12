"use client";

import Banner from "../../../assets/images/banner.png";
import Profile from "../../../assets/images/profile.png";
import AddPhoto from "../../../assets/images/AddPhoto.png";
import AddPhotoBanner from "../../../assets/images/Scrim.png";

import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarGroup, Button, useDisclosure } from "@nextui-org/react";
import AddTeamMemberModal from "../Tab/components/Modal/AddTeamMemberModal";

const BannerMember = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isHoveredBanner, setIsHoveredBanner] = useState(false);
  const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [bannerImage, setBannerImage] = useState<File>();
  const [avatarImage, setAvatarImage] = useState<File>();

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleChangeBanner = async (e: any) => {
    let file = e.target.files[0];
    setBannerImage(file);
  };
  const handleChangeAvatar = async (e: any) => {
    let file = e.target.files[0];
    setAvatarImage(file);
  };

  return (
    <div className="px-4 sm:px-[76px] py-12 w-full gap-10 sm:gap-2 flex flex-col">
      <AddTeamMemberModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="relative w-full  sm:h-[280px] h-[200px]">

        {/* change banner */}
        {!!bannerImage ? (
          <img
            onMouseEnter={() => setIsHoveredBanner(true)}
            onMouseLeave={() => setIsHoveredBanner(false)}
            src={URL.createObjectURL(bannerImage)}
            alt=""
            className="cursor-pointer w-full sm:h-full object-cover h-[200px] "
          />
        ) : (
          <Image
            onMouseEnter={() => setIsHoveredBanner(true)}
            onMouseLeave={() => setIsHoveredBanner(false)}
            src={Banner}
            alt=""
            className="cursor-pointer w-full sm:h-full object-cover h-[200px]"
          />
        )}

        <label>
          <Image
            onMouseEnter={() => setIsHoveredBanner(true)}
            onMouseLeave={() => setIsHoveredBanner(false)}
            src={AddPhotoBanner}
            alt=""
            className={`${
              !isHoveredBanner && "hidden"
            } absolute top-0 cursor-pointer w-full sm:h-full h-[200px] object-cover`}
          />
          <input
            type="file"
            className="hidden"
            onChange={handleChangeBanner}
            accept="image/*" // You can specify the accepted file types
          />
        </label>

        {/* change avatar */}
        {!!avatarImage ? (
          <img
            src={URL.createObjectURL(avatarImage)}
           
            alt=""
            className="absolute -bottom-10 left-3 sm:left-24  rounded-full cursor-pointer w-16 h-16 sm:w-[88px] sm:h-[88px]"
            onMouseEnter={() => setIsHoveredAvatar(true)}
            onMouseLeave={() => setIsHoveredAvatar(false)}
          />
        ) : (
          <Image
            src={Profile}
            
            alt=""
            className="absolute -bottom-10 left-3 sm:left-24 rounded-full cursor-pointer w-16 h-16 sm:w-[88px] sm:h-[88px]"
            onMouseEnter={() => setIsHoveredAvatar(true)}
            onMouseLeave={() => setIsHoveredAvatar(false)}
          />
        )}

        <label>
          <Image
            src={AddPhoto}
            width={88}
            height={88}
            alt=""
            onMouseEnter={() => setIsHoveredAvatar(true)}
            onMouseLeave={() => setIsHoveredAvatar(false)}
            className={`${
              !isHoveredAvatar && "hidden"
            } absolute  -bottom-10 left-3 sm:left-24  rounded-full cursor-pointer w-16 h-16 sm:w-[88px] sm:h-[88px]`}
          />
          <input
            type="file"
            className="hidden"
            onChange={handleChangeAvatar}
            accept="image/*" // You can specify the accepted file types
          />
        </label>
      </div>

      {/* add member */}
      <div className="flex  items-center justify-around">
        <Button onPress={onOpen} variant="light">
          <div className="text-[#DD3345] font-medium"> Add team members</div>
        </Button>
        <AvatarGroup className="cursor-pointer">
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
