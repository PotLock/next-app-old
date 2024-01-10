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
  Divider,
  Button,
  Image,
} from "@nextui-org/react";
import IconDelete from "@/assets/icons/IconDelete";
import IconCoinT from "@/assets/icons/IconsCoinT";
import IconCoinX from "@/assets/icons/IconCoinX";
import IconArrowDown from "@/assets/icons/IconArrowDown";
import IconLogoCart from "../../assets/images/Logo.png";
import IconArrowUp from "@/assets/icons/IconArrowUp";

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

  const [SelectedCity, SetSelectedCity] = useState(
    new Set([options[0]["value"]]),
  );
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleSelectionChange = (e: any) => {
    SetSelectedCity(new Set([e.target.value]));
  };

  return (
    <div className="w-[100%] flex flex-wrap">
      {/* <div className="w-[40%] pl-[89px] mt-[32px]">
        <div className="w-[100%]">
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
              <Divider />
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
      </div> */}
      <div className="w-[60%]">
        <Card radius="sm" className="flex border-2 mb-6">
          <div className="flex justify-between bg-[#F0F0F0] py-[8px] px-[16px] mb-[21px]">
            <div className="flex gap-[24px]">
              <div className="flex">
                <Checkbox />
                Deselect all
              </div>
              <div className="flex items-center">
                <IconDelete />
                Delete
              </div>
            </div>
            <div className="flex gap-[24px]">
              <div>2/2</div>
              <div>Selected</div>
            </div>
          </div>
          <div className="w-[100%] flex">
            <div className="flex justify-center items-start pt-2 w-[10%]">
              <Checkbox defaultSelected></Checkbox>
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
                <Chip color="secondary" radius="sm" className="mb-2">
                  Direct donation
                </Chip>
              </div>
              <CardHeader className="pl-0">
                <div className="pl-2">
                  <h1 className="text-md font-semibold">DecntralMedia</h1>
                  <div className="text-[#7B7B7B] font-normal text-[14px]">
                    Grants for open-source projects primarily focused on
                    developing on top -of, or advancing the broader Ethereum
                    and/or Web3 industry. Applications submitted by November 8th
                    are guaranteed to be reviewed before the start of the round.
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-sm font-medium pb-2">Amount</div>
                <div className="flex w-[100%] rounded-lg">
                  <Select
                    className="w-[25%]"
                    radius="none"
                    size="sm"
                    items={options}
                    selectedKeys={SelectedCity}
                    onChange={handleSelectionChange}
                    renderValue={(items) => {
                      return items?.map((item) => {
                        return item.rendered;
                      });
                    }}
                    defaultSelectedKeys={SelectedCity}
                  >
                    {(options) => (
                      <SelectItem key={options.value} value={options.value}>
                        {options.label}
                      </SelectItem>
                    )}
                  </Select>
                  <Input
                    className="border-l-2"
                    size="sm"
                    radius="none"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          {[...SelectedCity][0]}
                        </span>
                      </div>
                    }
                  />
                </div>
              </CardBody>
              <CardFooter
                className="flex  gap-1 justify-end pb-6"
                onClick={() => setShowBreakdown(!showBreakdown)}
              >
                {!showBreakdown ? (
                  <button className="flex gap-2">
                    <p className="font-medium">Show breakdown</p>
                    <IconArrowDown />
                  </button>
                ) : (
                  <>
                    <button className="flex gap-2">
                      <p className="font-medium">Hide breakdown</p>
                      <IconArrowUp />
                    </button>
                    {/* <div>
                        <div>Project allocation (92.5%)</div>
                        <div>46.25</div>
                      </div>
                      <div>
                        <div>Protocol fees (5%)</div>
                        <div>2.5</div>
                      </div>
                      <div>
                        <div>Referral fees (2.5%)</div>
                        <div>1.25</div>
                      </div>
                      <div>
                        <div>Chef fees (5%)</div>
                        <div>2.5</div>
                      </div> */}
                  </>
                )}
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
