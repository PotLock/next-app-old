"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  SelectItem,
  Checkbox,
  Chip,
  Input,
  Button,
  Image,
} from "@nextui-org/react";
import IconDelete from "@/assets/icons/IconDelete";
import IconArrowDown from "@/assets/icons/IconArrowDown";
import IconArrowUp from "@/assets/icons/IconArrowUp";
import IconCoinT from "@/assets/icons/IconsCoinT";
import IconCoinX from "@/assets/icons/IconCoinX";

export interface ICartPageProps {}

export default function CartPage(props: ICartPageProps) {
  let options = [
    {
      label: (
        <div className="flex gap-2">
          <IconCoinT /> NEAR
        </div>
      ),
      value: "1",
    },
    { label: "City 2", value: "2" },
    { label: "City 3", value: "3" },
  ];
  const [itemCart, setItemsCart] = useState([
    {
      id: 1,
      checked: false,
      status: "Direct donation",
      title: "DecntalMedia",
      showBreakDown: false,
      des: "Grants for open-source projects primarily focused on developing on top -of, or advancing the broader Ethereum and/or Web3 industry. Applications submitted by November 8th are guaranteed to be reviewed before the start of the round.",
      breakdown: [
        {
          id: 1,
          title: "Project allocation (92.5%)",
          value: 46.25,
        },
        {
          id: 2,
          title: "Protocol fees (5%)",
          value: 1.25,
        },
        {
          id: 3,
          title: "Referral fees (2.5%)",
          value: 20.25,
        },
        {
          id: 4,
          title: "Chef fees (5%)",
          value: 5.25,
        },
      ],
    },
    {
      id: 2,
      status: "Matching round 2 NDC Grassroots",
      title: "Title 2",
      checked: false,
      showBreakDown: false,
      des: "Grants for open-source projects primarily focused on developing on top -of, or advancing the broader Ethereum and/or Web3 industry. Applications submitted by November 8th are guaranteed to be reviewed before the start of the round.",
      breakdown: [
        {
          id: 1,
          title: "Project allocation (92.5%)",
          value: 46.25,
        },
        {
          id: 2,
          title: "Protocol fees (5%)",
          value: 1.25,
        },
        {
          id: 3,
          title: "Referral fees (2.5%)",
          value: 20.25,
        },
        {
          id: 4,
          title: "Chef fees (5%)",
          value: 5.25,
        },
      ],
    },
  ]);

  const [selectedCity, setSelectedCity] = useState(
    new Set([options[0]["value"]]),
  );
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleSelectionChange = (e: any) => {
    setSelectedCity(new Set([e.target.value]));
  };

  const handleHideShowBreakdown = (id: number) => {
    const newItems = [...itemCart];
    const currentIndex = newItems.findIndex((newItem) => newItem.id === id);
    newItems[currentIndex] = {
      ...newItems[currentIndex],
      showBreakDown: !newItems[currentIndex].showBreakDown,
    };
    setItemsCart(newItems);
  };

  return (
    <div className="flex w-full max-lg:flex-wrap-reverse">
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
                <div>$55.26</div>
              </div>
              <div className="flex justify-between text-sm p-2 mb-2">
                <div className="flex items-center gap-2">
                  <IconCoinX />
                  1.25
                </div>
                <div>$55.26</div>
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
                <div>60% ($66)</div>
              </div>
              <div className="flex justify-between text-sm p-2">
                <div className="flex items-center gap-2">Direct Donations</div>
                <div>20% ($22)</div>
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
                <div>20% ($22)</div>
              </div>
              <div className="flex justify-between text-sm p-2 border-t-2 mt-6">
                <div className="flex items-center gap-2 font-semibold">
                  Total
                </div>
                <div className="font-medium text-black ">$110.52</div>
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
                      ...itemCart.map((item) => ({
                        ...item,
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
          {itemCart?.map((item) => (
            <div key={item.id} className="w-[100%] flex border-b-2 mt-[21px]">
              <div className="flex justify-center items-start pt-2 w-[10%]">
                <Checkbox
                  isSelected={item.checked}
                  onChange={(e) => {
                    const newItems = [...itemCart];
                    const currentIndex = newItems.findIndex(
                      (newItem) => newItem.id === item.id,
                    );
                    newItems[currentIndex] = {
                      ...newItems[currentIndex],
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
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
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
                      {item.des}
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
                      items={options}
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
                        handleHideShowBreakdown(item.id);
                      }}
                    >
                      {/* <p className="font-medium">Show breakdown</p> */}
                      <IconArrowDown />
                    </button>
                  ) : (
                    <div className="flex flex-col w-[100%]">
                      <button
                        className="flex gap-2 justify-end"
                        onClick={() => {
                          handleHideShowBreakdown(item.id);
                        }}
                      >
                        <p className="font-medium">Hide breakdown</p>
                        <IconArrowUp />
                      </button>

                      <div className="w-[100%] p-[16px] bg-[#F0F0F0] rounded-lg mt-1">
                        {item.breakdown?.map((list) => (
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
