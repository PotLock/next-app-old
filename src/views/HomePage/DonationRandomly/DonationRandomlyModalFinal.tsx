"use client";
import IconSuccessful from "@/assets/icons/IconSuccessful";
import IconNear from "../../../assets/images/IconNear.png";
import IconWeb3 from "../../../assets/images/IconWeb3.png";
import Avatar from "../../../assets/images/Avatar.png";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import Image from "next/image";
import IconArrowDown from "@/assets/icons/IconArrowDown";
import IconShare from "@/assets/icons/IconShare";
import IconCopy from "@/assets/icons/IconCopy";

const DonationRandomlyModelFinal = ({
  title,
  isOpen,
  onOpenChange,
}: {
  title: string,
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  // const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [openBreakDown, setOpenBreakDown] = useState<boolean>(false);

  const handleOpenBreakDown = () => {
    setOpenBreakDown(!openBreakDown);
  };
  return (
    <>
      <Modal
        className="bg-white rounded-md border border-[#FAFAFA] text-sm"
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col  text-center text-[17px]">
                {title}
              </ModalHeader>
              <ModalBody className="flex items-center justify-center gap-6">
                <br />
                <br />

                <IconSuccessful />
                <div className="flex gap-2 items-center">
                  <p className=" text-4xl"> 100</p>

                  <Image src={IconNear} alt="" />
                </div>
                <div className="text-[#7B7B7B]">350.55 USDC</div>
                <div className="flex items-center font-semibold gap-2">
                  <div>Has been donated to</div>
                  <div className="py-1 px-2 bg-[#F0F0F0] rounded-full flex gap-1 items-center">
                    <Image src={IconWeb3} alt="" />
                    Web3 Open Source Software
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <button onClick={handleOpenBreakDown} className="flex gap-2">
                    <p className="font-medium">Show breakdown</p>
                    <IconArrowDown />
                  </button>
                </div>
                {!!openBreakDown && (
                  <div className="w-full text-[#7B7B7B] bg-[#DBDBDB]  border p-4 rounded-md flex gap-3 flex-col">
                    <div className="flex w-full items-center justify-between">
                      <p>Project allocation (92.5%) </p>
                      <div className="flex items-center gap-2">
                        <p>46.25</p>
                        <Image width={20} height={20} src={IconNear} alt="" />
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <p>Project allocation (92.5%) </p>
                      <div className="flex items-center gap-2">
                        <p>46.25</p>
                        <Image width={20} height={20} src={IconNear} alt="" />
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <p>Project allocation (92.5%) </p>
                      <div className="flex items-center gap-2">
                        <p>46.25</p>
                        <Image width={20} height={20} src={IconNear} alt="" />
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <p>Project allocation (92.5%) </p>
                      <div className="flex items-center gap-2">
                        <p>46.25</p>
                        <Image width={20} height={20} src={IconNear} alt="" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="bg-[#FAFAFA] py-3 px-9">
                  <div className="flex gap-2 items-center font-semibold ">
                    <div>From</div>
                    <div className="py-1 px-2 bg-[#F0F0F0] rounded-full flex gap-1 items-center">
                      <Image width={17} height={17} src={Avatar} alt="" />
                      <p> lorem.ipsum.near</p>
                    </div>
                  </div>
                  <div className="text-[#7B7B7B]">
                    Txn Hash : ipfs://9jjdfhghhjjhjhj
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[#DD3345]">
                    <button className="py-3 px-4 flex items-center gap-2">
                      <IconShare />
                      <p>Share</p>
                    </button>
                    <button className="py-3 px-4 flex items-center gap-2">
                      <IconCopy />
                      <p>Copy Hash</p>
                    </button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex items-center justify-center gap-4 ">
                <Button variant="bordered">Do it again</Button>
                <Button variant="bordered">Explore projects</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DonationRandomlyModelFinal;
