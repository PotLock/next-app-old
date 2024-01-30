import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import IconNear from "@/assets/images/IconNear.png";
import IconUSDC from "@/assets/images/IconUSDC.png";
import IconArrowDown from "@/assets/icons/IconArrowDown";
import IconEdit from "@/assets/icons/IconEdit";
import Image from "next/image";
import IconLogoCart from "@/assets/images/Logo.png";
import IconArrowDownFull from "@/assets/icons/IconArrowDownFull";
import { Wallet } from "@/configs/nearWallet";
import { utils } from "near-api-js";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { TCurrency } from "@/types";
import useNearToUsdt from "@/hooks/useNearToUsdt";
import { getApiProjectRandom } from "@/services";
import axios from "axios";

export default function DonateProjectModal({
  isOpen,
  onOpenChange,
  onClose,
  isRandom,
}: {
  isOpen: boolean;
  onOpenChange?: () => void;
  onClose?: () => void;
  isRandom?: true;
}) {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const [donateAmount, setDonateAmount] = useState<number>(0);
  const [openNote, setOpenNote] = useState<boolean>(false);
  const [openBreakDown, setOpenBreakDown] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<TCurrency>("near");
  const [note, setNote] = useState<string>("");

  const [projectAllocation, setProjectAllocation] = useState<number>(0);
  const [protocolFee, setProtocolFee] = useState<number>(0);
  const [referralFee, setReferralFee] = useState<number>(0);
  const { priceUsdt } = useNearToUsdt();

  const selectCurrency = (currency: TCurrency) => {
    setSelectedCurrency(currency);
  };

  const toggleBreakdown = useCallback(() => {
    setOpenBreakDown(!openBreakDown);
  }, [openBreakDown]);

  const handleOpenNote = useCallback(() => {
    setOpenNote(!openNote);
  }, [openNote]);

  // Handle note input
  const onNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const onDonateAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const protocolFeeAmount = (Number(event.target.value) / 100) * 5;
    let referralFeeAmount = 0;
    if (searchParams && searchParams?.get("referralId")) {
      referralFeeAmount = (Number(event.target.value) / 200) * 5;
    }
    setDonateAmount(Number(event.target.value));
    setProtocolFee(protocolFeeAmount);
    setReferralFee(referralFeeAmount);
    setProjectAllocation(
      Number(event.target.value) - protocolFeeAmount - referralFeeAmount,
    );
  };

  const getProjectRandom = useCallback(async () => {
    if (!!isRandom) {
      const res = await getApiProjectRandom();
      return res?.data?.project_id;
    }
  }, [isRandom]);

  const donate = useCallback(async () => {
    const projectIdRandom = await getProjectRandom();
    const setDepositOnCurrency = (currency: TCurrency, amount: number) => {
      switch (currency) {
        case "near":
          return amount;
        case "usdc":
          return amount / priceUsdt;
      }
    };

    if (donateAmount > 0) {
      const wallet = new Wallet({
        createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
        network: "mainnet",
      });
      const recipientId = !!isRandom
        ? projectIdRandom
        : id ?? localStorage.getItem("recipientId");
      await wallet.startUp();
      if (recipientId) {
        await wallet.callMethod({
          contractId: process.env.NEXT_PUBLIC_DONATION_ID as string,
          method: "donate",
          args: {
            recipient_id: recipientId,
            message: note,
            referrer_id: searchParams?.get("referralId") ?? null,
          },
          deposit: utils.format
            .parseNearAmount(
              setDepositOnCurrency(selectedCurrency, donateAmount).toString(),
            )
            ?.toString(),
        });
      }
    }
  }, [
    donateAmount,
    priceUsdt,
    note,
    id,
    searchParams,
    selectedCurrency,
    getProjectRandom,
    isRandom,
  ]);

  const renderCurrency = (currency: TCurrency) => {
    switch (currency) {
      case "near":
        return <Image src={IconNear} alt="near-logo" width={16} height={16} />;
      case "usdc":
        return <Image src={IconUSDC} alt="usdc-logo" width={16} height={16} />;
      default:
        break;
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      className="bg-white rounded-md border border-[#FAFAFA] text-sm"
      size="2xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center text-[17px]">
              {isRandom ? "Donate Randomly" : "Donate to project"}
            </ModalHeader>
            <ModalBody>
              <div className="flex w-full items-center  gap-3 border-b py-3 ">
                {isRandom ? (
                  <div className="text-sm">
                    Randomly donate to an approved project on our public good
                    registry and figure out who you supported after
                  </div>
                ) : (
                  <>
                    <Image alt="cart logo" src={IconLogoCart} />
                    <div>
                      <div className="text-sm font-semibold">DecntralMedia</div>
                      <div className="text-sm">
                        Seamless infrastructure for hosting hybrid crypto events
                        good registry and figure out who you supported after
                      </div>
                    </div>
                  </>
                )}
              </div>

              <p className="font-medium">Amount</p>
              <div className="border rounded-md flex items-center justify-between ">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      className="flex gap-6 items-center border-r"
                      variant="light"
                      radius="none"
                    >
                      <div className="flex gap-2 items-center">
                        {renderCurrency(selectedCurrency)}
                        <p className="uppercase">{selectedCurrency}</p>
                      </div>
                      <IconArrowDownFull />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                      className="uppercase"
                      key="near"
                      onClick={() => selectCurrency("near")}
                    >
                      near
                    </DropdownItem>
                    <DropdownItem
                      className="uppercase"
                      key="usdc"
                      onClick={() => selectCurrency("usdc")}
                    >
                      usdc
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <input
                  onChange={onDonateAmountChange}
                  value={donateAmount}
                  className="w-full h-full p-2 focus:border-none focus:outline-none rounded-none"
                  type="number"
                />
              </div>

              <div className="text-[#7B7B7B] text-[11px] flex items-center justify-between">
                <p>1 NEAR = ${priceUsdt} USD</p>
                <div className="flex gap-2">
                  <p>Account balance:</p>
                  <div className="flex  items-center">
                    {renderCurrency(selectedCurrency)}
                    <p>--Max</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-end">
                <button onClick={toggleBreakdown} className="flex gap-2">
                  <p className="font-medium">
                    {openBreakDown ? "Hide" : "Show"} breakdown
                  </p>
                  <IconArrowDown />
                </button>
              </div>
              {!!openBreakDown && (
                <div className="text-[#7B7B7B] bg-[#DBDBDB]  border p-4 rounded-md flex gap-3 flex-col">
                  <div className="flex w-full items-center justify-between">
                    <p>
                      Project allocation (
                      {searchParams && searchParams?.get("referralId")
                        ? "92.5%"
                        : "95%"}
                      )
                    </p>
                    <div className="flex items-center gap-2">
                      <p>{projectAllocation}</p>
                      <Image width={20} height={20} src={IconNear} alt="" />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p>Protocol fees (5%) </p>
                    <div className="flex items-center gap-2">
                      <p>{protocolFee}</p>
                      <Image width={20} height={20} src={IconNear} alt="" />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p>
                      Referral fees (
                      {searchParams && searchParams?.get("referralId")
                        ? "2.5%"
                        : "0%"}
                      )
                    </p>
                    <div className="flex items-center gap-2">
                      <p>{referralFee}</p>
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
                      onChange={onNoteChange}
                      className={`w-full border rounded-md p-4 resize-none ${note.length > 320 ? "border-red-500" : ""}`}
                    />
                    <div className="flex justify-end w-full">
                      <p
                        className={`text-[#7B7B7B] ${note.length > 320 ? "text-red-500" : ""}`}
                      >
                        {note.length}/320
                      </p>
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
                disabled={donateAmount < 0}
              >
                Donate
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
