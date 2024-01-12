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
import { useRouter } from "next/navigation";
import React from "react";

const ModelCart = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const route = useRouter();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div>Donation cart</div>
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
                onClick={() => route.push("/donation-cart")}
                color="danger"
              >
                Proceed to donate
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModelCart;
