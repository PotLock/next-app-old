import IconNear from "../../../assets/images/IconNear.png";
import IconLogoCart from "../../../assets/images/Logo.png";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ModelCart = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const router = useRouter();
  const handleRouter = () => {
    router.push("/cart");
  };

  return (
    <Modal
      className="absolute right-10 top-10"
      backdrop="opaque"
      isOpen={isOpen}
      hideCloseButton
      onOpenChange={onOpenChange}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className=" bg-white rounded-t-xl">
              <div className="w-full  flex  flex-col ">
                <div className="text-[17px]">Donation cart</div>
              </div>
            </ModalHeader>
            <ModalBody className="bg-white   ">
              <div className="text-[#7b7b7b] text-sm font-normal p-3  border-b">
                2 projects
              </div>

              <div className="flex w-full items-center justify-center gap-3 border-b p-3 ">
                <Image alt="" src={IconLogoCart} />
                <div className="w-3/4 ">
                  <div className="text-sm font-semibold">DecntralMedia</div>
                  <div className="text-sm truncate ">
                    Seamless infrastructure for hosting hybrid crypto events
                    good
                  </div>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  <div className="font-semibold">100</div>

                  <Image alt="" src={IconNear} />
                </div>
              </div>

              <div className="flex w-full items-center justify-center gap-3 border-b p-3 ">
                <Image alt="" src={IconLogoCart} />
                <div className="w-3/4 ">
                  <div className="text-sm font-semibold">DecntralMedia</div>
                  <div className="text-sm truncate ">
                    Seamless infrastructure for hosting hybrid crypto events
                    good
                  </div>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  <div className="font-semibold">100</div>

                  <Image alt="" src={IconNear} />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="bg-white rounded-b-xl ">
              <Button
                className="border-none bg-[#dd3344] py-3 px-4 rounded-md shadow-[0px_2px_2px]"
                onClick={handleRouter}
                onPress={onClose}
              >
                <p className="text-[#FFFFFF]">Proceed to donate</p>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModelCart;
