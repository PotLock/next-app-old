import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@nextui-org/react";
import NearIcon from "../../../assets/icons/NearIcon.svg";
import IconNear from "../../../assets/images/IconNear.png";
import IconArrowDown from "@/assets/icons/IconArrowDown";
import IconEdit from "@/assets/icons/IconEdit";
import Image from "next/image";
import IconLogoCart from "../../../assets/images/Logo.png";
import IconArrowDownFull from "@/assets/icons/IconArrowDownFull";
import DonationRandomlyModelFinal from "../DonationRandomly/DonationRandomlyModalFinal";
import { Wallet } from "@/configs/nearWallet";
import { utils } from "near-api-js";

const DonateProjectModel = ({
  isOpen,
  onOpenChange,
  onClose,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}) => {
  const {
    isOpen: isOpenFinal,
    onOpen: onOpenFinal,
    onOpenChange: OnOpenChangeFinal,
  } = useDisclosure();

  const [count, setCount] = useState("0.1");
  const [openNote, setOpenNote] = useState<boolean>(false);
  const [openBreakDown, setOpenBreakDown] = useState<boolean>(false);

  const handleOpenBreakDown = () => {
    setOpenBreakDown(!openBreakDown);
  };
  const handleOpenNote = () => {
    setOpenNote(!openNote);
  };

  const donate = async () => {
    if (+count > 0) {
      const receipientId = localStorage.getItem("receipientId");
      const wallet = new Wallet({
        createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
        network: "mainnet",
      });
      await wallet.startUp();
      if (receipientId) {
        await wallet.callMethod({
          contractId: process.env.NEXT_PUBLIC_DONATION_ID as string,
          method: "donate",
          args: {
            recipient_id: receipientId,
          },
          deposit: utils.format.parseNearAmount(count.toString())?.toString(),
        });
      }
    }
  };

  return (
    <>
      <DonationRandomlyModelFinal
        title="Donate project"
        isOpen={isOpenFinal}
        onOpenChange={OnOpenChangeFinal}
      />
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-white rounded-md border border-[#FAFAFA] text-sm"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-[17px]">
                Donate to project
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full items-center  gap-3 border-b py-3 ">
                  <Image alt="" src={IconLogoCart} />
                  <div className="">
                    <div className="text-sm font-semibold">DecntralMedia</div>
                    <div className="text-sm">
                      Seamless infrastructure for hosting hybrid crypto events
                      good registry and figure out who you supported after
                    </div>
                  </div>
                </div>

                <p className=" font-medium">Amount</p>
                <div className="border rounded-md flex items-center justify-between ">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        className="p-4  rounded-md  flex gap-6 items-center"
                        variant="light"
                        radius="none"
                      >
                        <div className="flex gap-2 items-center">
                          <Image src={IconNear} alt="" />
                          <p> NEAR</p>
                        </div>

                        <IconArrowDownFull />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem className="" key="new">
                        NEAR
                      </DropdownItem>
                      <DropdownItem key="copy">USDC</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Input
                    label=""
                    onChange={(e) => setCount(e.target.value)}
                    value={count}
                    className="w-full text-right "
                    type="number"
                  />
                </div>

                <div className="text-[#7B7B7B] text-[11px] flex items-center justify-between">
                  <p>1 NEAR = $4.16 USD</p>
                  <div className="flex gap-2">
                    <p>Account balance:</p>
                    <div className="flex  items-center">
                      <Image width={14} height={14} src={IconNear} alt="" />
                      <p>--Max</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <button onClick={handleOpenBreakDown} className="flex gap-2">
                    <p className="font-medium">Show breakdown</p>
                    <IconArrowDown />
                  </button>
                </div>
                {!!openBreakDown && (
                  <div className="text-[#7B7B7B] bg-[#DBDBDB]  border p-4 rounded-md flex gap-3 flex-col">
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
                <div className="border-t py-4 ">
                  {!openNote ? (
                    <button
                      onClick={handleOpenNote}
                      className="flex items-center gap-2 font-medium"
                    >
                      <IconEdit />
                      <p>Add Note</p>
                    </button>
                  ) : (
                    <div className="flex gap-2 items-start flex-col font-medium">
                      <button onClick={handleOpenNote}>Note</button>
                      <textarea
                        placeholder="Add a note for the project"
                        rows={6}
                        className="w-full border rounded-md p-4 resize-none"
                      />
                      <div className="flex justify-end w-full">
                        <p className="text-[#7B7B7B] ">0/320</p>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => {
                    // onClose();
                    // onOpenFinal();
                    donate();
                  }}
                  color="danger"
                  disabled={+count < 0}
                >
                  Donate
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DonateProjectModel;
