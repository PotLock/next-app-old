import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import Image from "next/image";
import IconNear from "@/assets/images/IconNear.png";
import { Key, useCallback, useEffect, useState } from "react";
import IconDollar from "@/assets/icons/IconDollars";
import IconProfile from "@/assets/icons/IconProfile";
import { IconTelegram, IconTwitter } from "@/assets/icons";
import IconLinkedIn from "@/assets/icons/IconLinkedIn";
import { usePathname, useSearchParams } from "next/navigation";
import { Wallet } from "@/configs/nearWallet";
import useNearToUsdt from "@/hooks/useNearToUsdt";
import Link from "next/link";
import DonatedProjectCard from "./DonatedProjectCard";
import { getImageUrlFromSocialImage } from "@/utils";
import { NetworkId } from "@near-wallet-selector/core";
import axios from "axios";
import { utils } from "near-api-js";

export default function MultiDonateSuccessModal({
  isOpen,
  onClose,
  onOpenChange,
}: {
  isOpen: boolean;
  onClose: (path: string) => void;
  onOpenChange?: () => void;
}) {
  // State
  const [transactionHashesList, setTransactionHashesList] = useState<string[]>(
    [],
  );
  const [donorData, setDonorData] = useState<any>(null);
  const [donorId, setDonorId] = useState<string>("");
  const [totalAmountAllProject, setTotalAmountAllProject] = useState<number>(0);
  const [txReceiptsList, setTxReceiptsList] = useState<any[]>([]);

  // function
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { priceUsdt } = useNearToUsdt();

  useEffect(() => {
    if (transactionHashesList.length > 0) {
      try {
        const requests = transactionHashesList.map((transactionHash: string) =>
          axios.post(process.env.NEXT_PUBLIC_NEAR_RPC_URL as string, {
            jsonrpc: "2.0",
            id: "dontcare",
            method: "tx",
            params: [transactionHash, localStorage.getItem("accountId")],
          }),
        );

        axios.all(requests).then((responses: any) => {
          const txReceiptsData: any[] = [];
          responses.forEach((response: any) => {
            const jsonString =
              response.data.result.receipts_outcome[0].outcome.logs[3];
            const cleanedString = jsonString.replace("EVENT_JSON:", "");
            const jsonObject = JSON.parse(cleanedString);
            txReceiptsData.push({
              ...jsonObject.data[0].donation,
              transactionHash: response.data.result.transaction.hash,
            });
            setTxReceiptsList(txReceiptsData);
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [transactionHashesList]);

  useEffect(() => {
    let total: number = 0;
    if (txReceiptsList) {
      txReceiptsList.forEach((txReceipt: any) => {
        total += Number(utils.format.formatNearAmount(txReceipt.total_amount));
      });
    }
    setTotalAmountAllProject(total);
  }, [txReceiptsList]);

  useEffect(() => {
    const list = searchParams.get("transactionHashes")?.split(",");
    if (list) setTransactionHashesList(list);
  }, [searchParams]);

  const onExploreClick = useCallback(() => {
    onClose("/project");
  }, [onClose]);

  useEffect(() => {
    const wallet = new Wallet({
      createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
      network: process.env.NEXT_PUBLIC_NETWORK as NetworkId,
    });

    const getDonorData = async (account: string) => {
      await wallet.startUp();
      const state = await wallet.viewMethod({
        contractId: process.env.NEXT_PUBLIC_SOCIAL_ID,
        method: "get",
        args: { keys: [`${account}/profile/**`] },
      });
      if (Object.keys(state).length !== 0) {
        setDonorData(state[account].profile);
        setDonorId(account);
      }
    };

    const accountId = localStorage.getItem("accountId");
    getDonorData(accountId as string);
  }, []);

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={() => onClose(pathname)}
      onOpenChange={onOpenChange}
      className="bg-white rounded-md border border-[#FAFAFA] text-sm"
      size="2xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="flex flex-col gap-6 px-20 py-9">
              {/*  */}
              <div className="w-16 mx-auto h-16 p-2 rounded-full bg-[#C02031]">
                <IconDollar />
              </div>

              {/*  */}
              <div className="flex flex-col gap-3">
                <div className="mx-auto">
                  <div className="flex gap-2 items-center">
                    <p className="text-[32px]">
                      {totalAmountAllProject.toFixed(2)}
                    </p>
                    <Image width={28} height={28} src={IconNear} alt="near" />
                  </div>
                  <div className="text-sm text-center text-[#7B7B7B]">
                    {(totalAmountAllProject * priceUsdt).toFixed(2)} USDC
                  </div>
                </div>
                <p className="text-center">
                  Has been donated to {transactionHashesList.length} projects
                </p>
              </div>

              <div className="bg-[#FAFAFA] py-3 px-4 flex flex-col rounded-3xl gap-4 overflow-y-scroll max-h-96">
                {txReceiptsList?.map((txReceipt: string, key: Key) => (
                  <DonatedProjectCard key={key} data={txReceipt} />
                ))}
              </div>

              {/*  */}
              <Button
                variant="solid"
                className="w-max mx-auto bg-[#C02031] text-white px-4 py-3"
                onClick={onExploreClick}
              >
                Explore projects
              </Button>
            </ModalBody>
            <ModalFooter className="flex flex-col gap-2 px-9 py-7">
              {/*  */}
              <div className="mx-auto flex gap-2 items-center">
                <p className="text-sm font-semibold">From</p>
                <div className="rounded-full items-center flex gap-1 bg-[#F0F0F0] py-[2px] px-[6px]">
                  <div className="rounded-full overflow-hidden w-4 h-4 flex items-center justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SOCIAL_IMAGE_URL}/${donorId}`}
                      alt="profile image"
                      width={16}
                      height={16}
                    />
                  </div>
                  <Link
                    className="text-sm font-semibold w-max max-w-52 truncate"
                    href={`https://near.social/mob.near/widget/ProfilePage?accountId=${donorId}`}
                    target="_blank"
                  >
                    {donorData && donorData?.name ? donorData.name : donorId}
                  </Link>
                </div>
              </div>

              {/*  */}
              {donorData?.linktree && (
                <div className="flex py-2 mx-auto gap-2 items-center">
                  <p className="text-sm font-semibold text-[#7B7B7B]">
                    Share to
                  </p>
                  {donorData.linktree.twitter && (
                    <Link
                      href={`https://twitter.com/${donorData.linktree.twitter}`}
                      target="_blank"
                    >
                      <IconTwitter />
                    </Link>
                  )}
                  {donorData.linktree.telegram && (
                    <Link
                      href={`https://web.telegram.org/${donorData.linktree.telegram}`}
                      target="_blank"
                    >
                      <IconTelegram />
                    </Link>
                  )}
                </div>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
