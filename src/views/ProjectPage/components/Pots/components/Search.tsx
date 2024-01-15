"use client";
import { IconSearch, IconFilter, IconCheck } from "@/assets/icons";
import { DATA_ITEMS_SEARCH } from "@/constant/project";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";

const Search = () => {
  const [filter, setFilter] = useState("All posts");

  const handleFilter = (label: any) => {
    setFilter(label);
  };

  return (
    <div className="relative mx-4 sm:mx-0">
      <div className="absolute inset-y-0 start-0 flex items-center px-6 pointer-events-none">
        <IconSearch />
      </div>
      <input
        type="search"
        className="block w-full p-4 ps-12 text-sm text-gray-900 rounded-sm bg-[#F0F0F0]  focus:outline-none "
        placeholder="Search (3) posts"
      />
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
          items={DATA_ITEMS_SEARCH}
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
