"use client";
import {
  IconArrowDown,
  IconArrowUp,
  IconCoinT,
  IconCoinX,
  IconDelete,
} from "@/assets/icons";
import { OPTIONS } from "@/constant/cart";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Chip,
  Image,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";

export interface ICartPageProps {}

export default function CartPage(props: ICartPageProps) {
  const projectsCart: any =
    typeof window !== "undefined"
      ? JSON?.parse(localStorage?.getItem("projects_in_cart") ?? "")
      : [];
  // const projectsCart = typeof window !== "undefined"
  // ? (() => {
  //     const storedData = localStorage?.getItem("projects_in_cart") || "";

  //     try {
  //       // Attempt to parse the JSON data
  //       return JSON.parse(storedData) || [];
  //     } catch (error) {
  //       // Handle JSON parsing error
  //       console.error("Error parsing JSON:", error);
  //       return [];
  //     }
  //   })()
  // : [];

  const [itemCart, setItemsCart] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState(
    new Set([OPTIONS[0]["value"]]),
  );
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleSelectionChange = (e: any) => {
    setSelectedCity(new Set([e.target.value]));
  };

  const handleHideShowBreakdown = (id: number, index: number) => {
    const newItems: any[] = [...itemCart];
    newItems[index] = {
      ...newItems[index],
      showBreakDown: !newItems[index].showBreakDown,
    };
    setItemsCart(newItems);
  };

  const COIN = [183, 138];

  const sum = COIN?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  const calculatePercentage = (number: number, percentage: number) => {
    const total = (number * percentage) / 100;
    return Math.round(total);
  };

  return (
    <div className="flex w-full max-lg:flex-wrap-reverse p-[42px] max-lg:p-[24px]">
      <div className="w-[45%] mr-[140px] max-lg:mr-0 max-lg:w-full max-lg:mt-[24px]">
        <div className="">
          <div className="text-[44px] font-normal pb-[21px]">
            Donation Cart <strong>2</strong>
          </div>
          <h1 className="text-md font-semibold mb-6">Breakdown Summary</h1>
          <div className="w-[100%] ">
            <div>
              <div className="flex justify-between bg-[#F0F0F0] p-2 rounded-md text-xs text-gray-500 mb-2">
                <div>Currency</div>
                <div>USD</div>
              </div>
              <div className="flex justify-between text-sm p-2">
                <div className="flex items-center gap-2">
                  <IconCoinT />
                  46.25
                </div>
                <div>${COIN[0]}</div>
              </div>
              <div className="flex justify-between text-sm p-2 mb-2">
                <div className="flex items-center gap-2">
                  <IconCoinX />
                  1.25
                </div>
                <div>${COIN[1]}</div>
              </div>
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
                <div>60% (${calculatePercentage(sum, 60)})</div>
              </div>
              <div className="flex justify-between text-sm p-2">
                <div className="flex items-center gap-2">Direct Donations</div>
                <div>20% (${calculatePercentage(sum, 20)})</div>
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
                <div>20% (${calculatePercentage(sum, 20)})</div>
              </div>
              <div className="flex justify-between text-sm p-2 border-t-2 mt-6">
                <div className="flex items-center gap-2 font-semibold">
                  Total
                </div>
                <div className="font-medium text-black ">${sum}</div>
              </div>
            </div>
          </div>
          <Button className="mt-6 px-[16px] py-[12px] font-medium text-sm bg-[#DD3345]  border border-black rounded-md shadow-[0px_2px_2px]">
            <p className="text-white">Donate $110.52</p>
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
                  onChange={(e) => {
                    const newItems = [...itemCart];
                    newItems[index] = {
                      ...newItems[index],
                      checked: e.target.checked,
                    };
                    setItemsCart(newItems);
                  }}
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
                      {item.description}
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="text-sm font-medium pb-2">Amount</div>
                  <div className="flex w-[100%] rounded-lg">
                    <Select
                      className="w-[25%] max-lg:w-[45%]"
                      radius="none"
                      size="sm"
                      items={OPTIONS}
                      selectedKeys={selectedCity}
                      onChange={handleSelectionChange}
                      renderValue={(items) => {
                        return items?.map((item) => {
                          return item.rendered;
                        });
                      }}
                      defaultSelectedKeys={selectedCity}
                    >
                      {(options) => (
                        <SelectItem key={options.value} value={options.value}>
                          {options.label}
                        </SelectItem>
                      )}
                    </Select>
                    <Input
                      isDisabled={true}
                      className="border-l-2"
                      size="sm"
                      radius="none"
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            {[...selectedCity][0]}
                          </span>
                        </div>
                      }
                    />
                  </div>
                </CardBody>
                <CardFooter
                  className="flex w-[100%] pb-6 justify-end"
                  onClick={() => setShowBreakdown(!showBreakdown)}
                >
                  {!item.showBreakDown ? (
                    <button
                      className="flex gap-2 justify-end"
                      onClick={() => {
                        handleHideShowBreakdown(item.id, index);
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
                          handleHideShowBreakdown(item.id, index);
                        }}
                      >
                        <p className="font-medium">Hide breakdown</p>
                        <IconArrowUp />
                      </button>

                      <div className="w-[100%] p-[16px] bg-[#F0F0F0] rounded-lg mt-1">
                        {item.breakdown?.map((list: any) => (
                          <div
                            className="flex justify-between py-1"
                            key={list.id}
                          >
                            <div className="text-[#7B7B7B]">{list.title}</div>
                            <div>{list.value}</div>
                          </div>
                        ))}
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
