"use client";
import {
  IconArrowDown,
  IconArrowDownFull,
  IconArrowUp,
  IconCoinT,
  IconCoinX,
  IconDelete,
  IconEdit,
} from "@/assets/icons";
import IconNear from "@/assets/images/IconNear.png";
import IconUSDC from "@/assets/images/IconUSDC.png";
import { Wallet } from "@/configs/nearWallet";
import useNearToUsdt from "@/hooks/useNearToUsdt";
import useWallet from "@/hooks/useWallet";
import { getConfigCart } from "@/services";
import { TCurrency } from "@/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@nextui-org/react";
import ImageNext from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export interface ICartPageProps {}

export type TConfigCart = {
  owner: string;
  protocol_fee_basis_points: number;
  referral_fee_basis_points: number;
  protocol_fee_recipient_account: string;
};

export default function CartPage(props: ICartPageProps) {
  const projectsCart: any =
    typeof window !== "undefined" && localStorage?.getItem("projects_in_cart")
      ? JSON?.parse(localStorage?.getItem("projects_in_cart") ?? "")
      : [];

  const [itemCart, setItemsCart] = useState<any[]>(projectsCart);
  const [config, setConfig] = useState<TConfigCart>({
    owner: "",
    protocol_fee_basis_points: 0,
    referral_fee_basis_points: 0,
    protocol_fee_recipient_account: "",
  });

  const { get } = useSearchParams();

  const { account, handleSignIn } = useWallet();

  const { priceUsdt } = useNearToUsdt();

  const getConfig = async () => {
    try {
      let { data } = await getConfigCart();
      const newConfig = {
        ...data,
        protocol_fee_basis_points: data.protocol_fee_basis_points / 100,
        referral_fee_basis_points: data.referral_fee_basis_points / 100,
      };
      setConfig(newConfig as TConfigCart);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const listProject = projectsCart.map((item: any) => ({
      ...item,
      note: "",
      isOpenNote: false,
      currency: "near",
      amount: 1,
      showBreakdown: false,
    }));
    setItemsCart(listProject);
    getConfig();
  }, []);

  const calculatePercentage = (number: number, percentage: number) => {
    const total = (number * percentage) / 100;
    return total.toFixed(3);
  };

  const renderCurrency = (currency: TCurrency) => {
    if (currency === "near")
      return (
        <ImageNext src={IconNear} alt="near-logo" width={16} height={16} />
      );
    return <ImageNext src={IconUSDC} alt="usdc-logo" width={16} height={16} />;
  };

  const onChangeProjectCart = (index: number, key: string, value: any) => {
    const newItems: any[] = [...itemCart];
    newItems[index] = {
      ...newItems[index],
      [key]: value,
    };
    setItemsCart(newItems);
  };

  const total = useMemo(() => {
    const initialValue = 0;
    const sumWithInitial = itemCart.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      initialValue,
    );
    return sumWithInitial;
  }, [itemCart]);

  const percent = (
    amount: number,
    percentProtocal: number,
    percentReferral: number,
  ) => {
    const allocatePercent = 100 - (percentProtocal + percentReferral);

    const protocalAmount = ((amount / 100) * percentProtocal).toFixed(2);
    const referralAmount = ((amount / 100) * percentReferral).toFixed(2);
    const allocateAmount = (
      amount -
      (+protocalAmount + +referralAmount)
    ).toFixed(2);

    return { allocatePercent, protocalAmount, referralAmount, allocateAmount };
  };

  const onDonate = async () => {
    if (!account) {
      handleSignIn();
      return;
    }
    const data = itemCart.map((item) => ({
      receiverId: process.env.NEXT_PUBLIC_DONATION_ID as string,
      functionCalls: [
        {
          methodName: "donate",
          args: {
            recipient_id: item.project_id,
            referrer_id: !!get("referral_id") ? get("referral_id") : null,
            message: item.note,
          },
          amount: item.amount.toString(),
        },
      ],
    }));
    try {
      const wallet = new Wallet({
        createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_ID,
        network: "mainnet",
      });
      await wallet.startUp();
      await wallet.callMultiMethod([...data]);
    } catch (error) {}
  };

  return (
    <div className="flex w-full max-lg:flex-wrap-reverse p-[42px] max-lg:p-[24px]">
      <div className="w-[45%] mr-[140px] max-lg:mr-0 max-lg:w-full max-lg:mt-[24px]">
        <div className="">
          <div className="text-[44px] font-normal pb-[21px]">
            Donation Cart <strong>{itemCart.length ?? 0}</strong>
          </div>
          <h1 className="text-md font-semibold mb-6">Breakdown Summary</h1>
          <div className="w-[100%] ">
            <div>
              <div className="flex justify-between bg-[#F0F0F0] p-2 rounded-md text-xs text-gray-500 mb-2">
                <div>Currency</div>
                <div>USD</div>
              </div>
              {itemCart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm p-2">
                  <div className="flex items-center gap-2">
                    {renderCurrency(item.currency)}
                    {item.amount}
                  </div>
                  <div>
                    $
                    {item.currency === "near"
                      ? item.amount * priceUsdt
                      : item.amount}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between bg-[#F0F0F0] p-2 rounded-md text-xs text-gray-500 mt-6">
                <div>Allocation</div>
                <div>%($Value)</div>
              </div>
              <div className="flex justify-between text-sm p-2">
                <div className="flex items-center gap-2">
                  NDC Grassroots
                  <Chip
                    radius="sm"
                    size="sm"
                    className="bg-[#DBDBDB] rounded-lg"
                  >
                    Pot
                  </Chip>
                </div>
                <div>10% (${calculatePercentage(total * priceUsdt, 10)})</div>
              </div>
              <div className="flex justify-between text-sm p-2">
                <div className="flex items-center gap-2">Direct Donations</div>
                <div>80% (${calculatePercentage(total * priceUsdt, 80)})</div>
              </div>
              <div className="flex justify-between text-sm p-2">
                <div className="flex items-center gap-2">
                  RegenDevs
                  <Chip
                    radius="sm"
                    size="sm"
                    className="bg-[#DBDBDB] rounded-lg"
                  >
                    Pot
                  </Chip>
                </div>
                <div>10% (${calculatePercentage(total * priceUsdt, 10)})</div>
              </div>
              <div className="flex justify-between text-sm p-2 border-t-2 mt-6">
                <div className="flex items-center gap-2 font-semibold">
                  Total
                </div>
                <div className="font-medium text-black ">
                  ${total * priceUsdt}
                </div>
              </div>
            </div>
          </div>
          <Button
            className="mt-6 px-[16px] py-[12px] font-medium text-sm bg-[#DD3345]  border rounded-md "
            onClick={onDonate}
          >
            <p className="text-white">Donate ${total * priceUsdt}</p>
          </Button>
        </div>
      </div>
      <div className="w-[55%] max-lg:w-full">
        <Card radius="sm" className="flex flex-col">
          <div className="flex justify-between items-center bg-[#F0F0F0] py-2 px-4">
            <div className="flex gap-[24px]">
              <div className="flex items-center">
                <Checkbox
                  onChange={(e) => {
                    const newItems = [
                      ...itemCart.map((cartItem: any) => ({
                        ...cartItem,
                        checked: e.target.checked,
                      })),
                    ];
                    setItemsCart(newItems);
                  }}
                  isSelected={
                    itemCart.every((item) => item.checked) && !!itemCart.length
                  }
                >
                  {itemCart.every((item) => item.checked) && !!itemCart.length
                    ? "Selected All"
                    : "Select All"}
                </Checkbox>
              </div>
              <Button
                isDisabled={itemCart.every((item) => !item.checked)}
                startContent={<IconDelete />}
                onClick={() => {
                  const newItems = [
                    ...itemCart.filter((item) => !item.checked),
                  ];
                  setItemsCart(newItems);
                }}
              >
                Delete
              </Button>
            </div>
            <div className="flex gap-[24px]">
              <div>{`${itemCart.filter((item) => item.checked).length}/${
                itemCart.length
              }`}</div>
              <div>Selected</div>
            </div>
          </div>
          {itemCart?.map((item, index) => (
            <div key={item.id} className="w-[100%] flex border-b-2 mt-[21px]">
              <div className="flex justify-center items-start pt-2 w-[10%]">
                <Checkbox
                  isSelected={item.checked}
                  onChange={(e) =>
                    onChangeProjectCart(index, "checked", e.target.checked)
                  }
                ></Checkbox>
              </div>
              <div className="w-[90%]">
                <div className="flex justify-between items-center">
                  <Image
                    alt="nextui logo"
                    height={24}
                    radius="sm"
                    src={`https://nftstorage.link/ipfs/${item.profileImageUrl}`}
                    width={24}
                  />
                  <Chip color="secondary" radius="sm" className="mr-4">
                    {item.status}
                  </Chip>
                </div>
                <CardHeader className="pl-0">
                  <div className="pl-2">
                    <h1 className="text-md font-semibold">{item.title}</h1>
                    <div className="text-[#7B7B7B] font-normal text-[14px] overflow-ellipsis line-clamp-2">
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {item?.description}
                      </Markdown>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="text-sm font-medium pb-2">Amount</div>
                  <div className="border rounded-md flex items-center justify-between ">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          className="flex gap-6 items-center border-r"
                          variant="light"
                          radius="none"
                        >
                          <div className="flex gap-2 items-center">
                            {renderCurrency(item.currency ?? "near")}
                            <p className="uppercase">
                              {item.currency ?? "near"}
                            </p>
                          </div>
                          <IconArrowDownFull />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                          className="uppercase"
                          key="near"
                          onClick={() =>
                            onChangeProjectCart(index, "currency", "near")
                          }
                        >
                          near
                        </DropdownItem>
                        <DropdownItem
                          className="uppercase"
                          key="usdc"
                          onClick={() =>
                            onChangeProjectCart(index, "currency", "usdc")
                          }
                        >
                          usdc
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <input
                      onChange={(e) =>
                        onChangeProjectCart(index, "amount", e.target.value)
                      }
                      value={item.amount ?? 1}
                      className="w-full h-full p-2 focus:border-none focus:outline-none rounded-none text-right"
                      type="number"
                      min={1}
                    />
                  </div>
                  <div className="border-t py-4 ">
                    {!item.isOpenNote ? (
                      <button
                        onClick={() =>
                          onChangeProjectCart(index, "isOpenNote", true)
                        }
                        className="flex items-center gap-2 font-medium"
                      >
                        <IconEdit />
                        <p>Add Note</p>
                      </button>
                    ) : (
                      <div className="flex gap-2 items-start flex-col font-medium">
                        <button
                          onClick={() =>
                            onChangeProjectCart(index, "isOpenNote", false)
                          }
                        >
                          Note
                        </button>
                        <textarea
                          placeholder="Add a note for the project"
                          rows={6}
                          onChange={(e) =>
                            onChangeProjectCart(index, "note", e.target.value)
                          }
                          value={item.note}
                          className={`w-full border rounded-md p-4 resize-none ${item.note?.length && item.note?.length > 320 ? "border-red-500" : ""}`}
                        />
                        <div className="flex justify-end w-full">
                          <p
                            className={`text-[#7B7B7B] ${item.note?.length && item.note?.length > 320 ? "text-red-500" : ""}`}
                          >
                            {item.note?.length ?? 0}/320
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardBody>
                <CardFooter className="flex w-[100%] pb-6 justify-end">
                  {!item.showBreakDown ? (
                    <button
                      className="flex gap-2 justify-end"
                      onClick={() => {
                        onChangeProjectCart(index, "showBreakDown", true);
                      }}
                    >
                      <p className="font-medium">Show breakdown</p>
                      <IconArrowDown />
                    </button>
                  ) : (
                    <div className="flex flex-col w-[100%]">
                      <button
                        className="flex gap-2 justify-end"
                        onClick={() => {
                          onChangeProjectCart(index, "showBreakDown", false);
                        }}
                      >
                        <p className="font-medium">Hide breakdown</p>
                        <IconArrowUp />
                      </button>
                      <div className="w-[100%] p-[16px] bg-[#F0F0F0] rounded-lg mt-1">
                        <div className="flex justify-between py-1">
                          <div className="text-[#7B7B7B]">{`Project allocation (${percent(item.amount, config?.protocol_fee_basis_points, config?.referral_fee_basis_points).allocatePercent}%) `}</div>
                          <div className="flex gap-1 items-center">
                            {
                              percent(
                                item.amount,
                                config?.protocol_fee_basis_points,
                                config?.referral_fee_basis_points,
                              ).allocateAmount
                            }
                            <div>{renderCurrency(item.currency ?? "near")}</div>
                          </div>
                        </div>
                        <div className="flex justify-between py-1">
                          <div className="text-[#7B7B7B]">{`Protocol fees (${config?.protocol_fee_basis_points}%) `}</div>
                          <div className="flex gap-1 items-center">
                            {
                              percent(
                                item.amount,
                                config?.protocol_fee_basis_points,
                                config?.referral_fee_basis_points,
                              ).protocalAmount
                            }
                            <div>{renderCurrency(item.currency ?? "near")}</div>
                          </div>
                        </div>
                        <div className="flex justify-between py-1">
                          <div className="text-[#7B7B7B]">{`Referral fees (${config?.referral_fee_basis_points}%) `}</div>
                          <div className="flex gap-1 items-center">
                            {
                              percent(
                                item.amount,
                                config?.protocol_fee_basis_points,
                                config?.referral_fee_basis_points,
                              ).referralAmount
                            }
                            <div>{renderCurrency(item.currency ?? "near")}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardFooter>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
