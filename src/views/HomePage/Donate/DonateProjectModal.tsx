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
} from "@nextui-org/react";
import IconNear from "../../../assets/images/IconNear.png";
import IconArrowDown from "@/assets/icons/IconArrowDown";
import IconEdit from "@/assets/icons/IconEdit";
import Image from "next/image";
import IconArrowDownFull from "@/assets/icons/IconArrowDownFull";

const DonateProjectModel = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const [openNote, setOpenNote] = useState<boolean>(false);
  const [openBreakDown, setOpenBreakDown] = useState<boolean>(false);

  const handleOpenBreakDown = () => {
    setOpenBreakDown(!openBreakDown);
  };
  const handleOpenNote = () => {
    setOpenNote(!openNote);
  };

  return (
    <>
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
                Donate Randomly
              </ModalHeader>
              <ModalBody>
                <p>
                  Randomly donate to an approved project on our public good
                  registry and figure out who you supported after
                </p>
                <p className=" font-medium">Amount</p>
                <div className="border rounded-md flex items-center justify-between ">
                  
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        className="p-4 border flex gap-6 items-center"
                        variant="bordered"
                      >
                        <div className="flex gap-2 items-center">
                          <Image src={IconNear} alt="" />
                          <p> NEAR</p>
                        </div>

                        <IconArrowDownFull />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      className="bg-white border "
                      aria-label="Static Actions"
                    >
                      <DropdownItem className="" key="new">
                        NEAR
                      </DropdownItem>
                      <DropdownItem key="copy">USDC</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <div className="mx-4 text-[#7B7B7B]">0</div>
                </div>

               
                <div className="text-[#7B7B7B] text-[11px] flex items-center justify-between">
                  <p>1 NEAR = $4.16 USD</p>
                  <div className="flex gap-2">
                    <p>Account balance:</p>
                    <p>Max</p>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <button onClick={handleOpenBreakDown} className="flex gap-2">
                    <p className="font-medium">Show breakdown</p>
                    <IconArrowDown />
                  </button>
                </div>
                {!!openBreakDown && (
                  <div className="text-[#7B7B7B] bg-[#DBDBDB]  border p-4 rounded-lg flex gap-3 flex-col">
                    <div className="flex w-full items-center justify-between">
                      <p>Project allocation (92.5%) </p>
                      <p>46.25</p>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <p>Project allocation (92.5%) </p>
                      <p>46.25</p>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <p>Project allocation (92.5%) </p>
                      <p>46.25</p>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <p>Project allocation (92.5%) </p>
                      <p>46.25</p>
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
                        className="w-full border rounded-md p-4"
                      />
                      <div className="flex justify-end w-full">
                        <p className="text-[#7B7B7B] ">0/320</p>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className="border-none bg-[#dd3344] py-3 px-4 rounded-md shadow-[0px_2px_2px]">
                  <p className="text-white font-medium text-sm">Donate </p>
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
