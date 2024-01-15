'use client'
import Search from "@/components/Search";
import { Card, CardBody, Divider, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import FillterPots from "./components/FillterPots";

const AllPots = () => {
  return (
    <div className="flex flex-col w-ful h-full gap-6">
      <div className="flex flex-col  sm:flex-row sm:items-center sm:justify-between  mx-4 sm:mx-0 gap-1">
        <div className="flex gap-2 text-sm sm:text-[22px]">
          <div className="font-semibold ">ALL pots </div>
          <div className="text-[#DD3345]">9</div>
        </div>

        <div className="flex h-5 items-center text-small">
          <div className="flex gap-2  py-1 pr-4 text-[11px] sm:text-sm">
            <div className="font-semibold">$2027.23</div>
            <div>Donated</div>
          </div>
          <Divider orientation="vertical" />
          <div className="flex gap-2  py-1 px-4 text-[11px] sm:text-sm">
            <div className="font-semibold">$2027.23</div>
            <div>Unique Donors</div>
          </div>
          <Divider orientation="vertical" />
          <div className="flex gap-2  py-1 pl-4 text-[11px] sm:text-sm">
            <div className="font-semibold">$2027.23</div>
            <div>Donations</div>
          </div>
        </div>
      </div>
      <Search />
      <FillterPots/>
    </div>
  );
};

export default AllPots;
