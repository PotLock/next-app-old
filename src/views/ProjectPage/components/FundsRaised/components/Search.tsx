"use client";
import { IconSearch, IconFilter, IconCheck } from "@/assets/icons";
import { DATA_ITEMS_SEARCH_RAISED } from "@/constant/project";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";

const Search = () => {
  const [filter, setFilter] = useState("All Donations");

  const handleFilter = (label: any) => {
    setFilter(label);
  };

  return (
    <div className="relative mx-4 sm:mx-0">
      <div className="flex gap-[48px]"> 
        <div><strong>$2500</strong>       Donated</div>
        <div><strong>500</strong>       Unique Donors</div>
        <div><strong>$2500</strong>     Total Matched</div>
        </div>
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="absolute inset-y-1.5 end-0  flex items-center justify-center gap-3  cursor-pointer px-6"
            variant="light"
          >
            <div>{filter}</div>
            <IconFilter />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className=""
          aria-label="Dynamic Actions"
          items={DATA_ITEMS_SEARCH_RAISED}
        >
          {(item) => (
            <DropdownItem
              key={item.key}
              onClick={() => handleFilter(item.label)}
              className="hover:bg-[#F0F0F0]"
              aria-label="Action event example"
            >
              <div className="flex  items-center justify-between text-sm  gap-x-14">
                <div className="flex gap-3 items-center font-medium">
                  {item.label === filter ? (
                    <IconCheck />
                  ) : (
                    <div className="w-[12px]"></div>
                  )}
                  {item.label}
                </div>
                <div className="text-[#7B7B7B]">{item.subLabel}</div>
              </div>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Search;
