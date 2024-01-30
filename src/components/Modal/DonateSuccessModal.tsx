import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import IconNear from "@/assets/images/IconNear.png";
import IconUSDC from "@/assets/images/IconUSDC.png";
import IconArrowDown from "@/assets/icons/IconArrowDown";
import IconLogoCart from "@/assets/images/Logo.png";
import { useCallback, useEffect, useState } from "react";
import IconDollar from "@/assets/icons/IconDollars";
import IconProfile from "@/assets/icons/IconProfile";
import { IconTelegram, IconTwitter } from "@/assets/icons";
import IconLinkedIn from "@/assets/icons/IconLinkedIn";
import { useSearchParams } from "next/navigation";
import { Wallet } from "@/configs/nearWallet";
import axios from "axios";
import { utils } from "near-api-js";
import useNearToUsdt from "@/hooks/useNearToUsdt";

export default function DonateSuccessModal({
  isOpen,
  onClose,
  onOpenChange,
}: {
  isOpen: boolean;
  onClose?: () => void;
  onOpenChange?: () => void;
}) {
  const searchParams = useSearchParams();
  const [openBreakDown, setOpenBreakDown] = useState<boolean>(true);
  const [donateData, setDonateData] = useState<any>(null);
  const [protocolFee, setProtocolFee] = useState<number>(0);
  const [referrerFee, setReferrerFee] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const { priceUsdt } = useNearToUsdt();

  useEffect(() => {
    let data = JSON.stringify({
      jsonrpc: "2.0",
      id: "",
      method: "tx",
      params: [
        searchParams.get("transactionHashes"),
        localStorage.getItem("accountId"),
      ],
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://rpc.mainnet.near.org",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response: any) => {
        const jsonString =
          response.data.result.receipts_outcome[0].outcome.logs[3];
        const cleanedString = jsonString.replace("EVENT_JSON:", "");
        const jsonObject = JSON.parse(cleanedString);
        setDonateData(jsonObject.data[0].donation);
        setProtocolFee(
          Number(
            utils.format.formatNearAmount(
              jsonObject.data[0].donation.protocol_fee,
            ),
          ),
        );
        setTotalAmount(
          Number(
            utils.format.formatNearAmount(
              jsonObject.data[0].donation.total_amount,
            ),
          ),
        );
        if (jsonObject.data[0].donation.referrer_fee) {
          setReferrerFee(
            Number(
              utils.format.formatNearAmount(
                jsonObject.data[0].donation.referrer_fee,
              ),
            ),
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams]);

  const toggleBreakdown = useCallback(() => {
    setOpenBreakDown((prev) => !prev);
  }, []);

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
            <ModalBody className="flex flex-col gap-6 px-20 py-9">
              <div className="w-16 mx-auto h-16 p-2 rounded-full bg-[#C02031]">
                <IconDollar />
              </div>

              <div className="flex flex-col gap-3">
                {/*  */}
                <div className="mx-auto">
                  <div className="flex gap-2 items-center">
                    <p className=" text-[32px]">{totalAmount}</p>
                    <Image width={28} height={28} src={IconNear} alt="near" />
                  </div>
                  <div className="text-sm text-[#7B7B7B]">
                    {(totalAmount * priceUsdt).toFixed(2)} USDC
                  </div>
                </div>

                {/*  */}
                <div className="mx-auto flex gap-2 items-center">
                  <p className="text-sm font-semibold">Has been donated to</p>
                  <div className="rounded-full items-center flex gap-1 bg-[#F0F0F0] py-[2px] px-[6px]">
                    <div className="rounded-full w-4 h-4 flex items-center justify-center">
                      <IconProfile />
                    </div>
                    <p className="text-sm font-semibold">
                      {donateData?.recipient_id}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-col">
                <Button
                  variant="light"
                  className="mx-auto"
                  onClick={toggleBreakdown}
                >
                  {openBreakDown ? "Hide breakdown" : "Show breakdown"}
                </Button>
                {openBreakDown && (
                  <div className="text-[#7B7B7B] border-[#DBDBDB]  border p-4 rounded-md flex gap-3 flex-col">
                    <div className="flex w-full items-center justify-between">
                      <p>
                        Project allocation (
                        {donateData?.referrer_id ? "92.5%" : "95%"})
                      </p>
                      <div className="flex items-center gap-2">
                        <p>{totalAmount - referrerFee - protocolFee}</p>
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
                        Referral fees ({donateData?.referrer_id ? "2.5%" : "0%"}
                        )
                      </p>
                      <div className="flex items-center gap-2">
                        <p>{referrerFee}</p>
                        <Image width={20} height={20} src={IconNear} alt="" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-6">
                <Button variant="solid" className="w-full px-4 py-3">
                  Do it again
                </Button>
                <Button
                  variant="solid"
                  className="w-full bg-[#C02031] text-white px-4 py-3"
                >
                  Explore projects
                </Button>
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col gap-2 px-9 py-7">
              {/*  */}
              <div className="mx-auto flex gap-2 items-center">
                <p className="text-sm font-semibold">From</p>
                <div className="rounded-full items-center flex gap-1 bg-[#F0F0F0] py-[2px] px-[6px]">
                  <div className="rounded-full w-4 h-4 flex items-center justify-center">
                    <IconProfile />
                  </div>
                  <p className="text-sm font-semibold">
                    {donateData?.donor_id}
                  </p>
                </div>
              </div>

              {/*  */}
              <div className="flex py-2 mx-auto gap-2 items-center">
                <p className="text-sm font-semibold text-[#7B7B7B]">Share to</p>
                <IconTwitter />
                <IconTelegram />
                <IconLinkedIn />
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
