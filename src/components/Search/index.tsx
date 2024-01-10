"use client";
import IconCheck from "@/assets/icons/IconCheck";
import IconFilter from "@/assets/icons/IconFilter";
import IconSearch from "@/assets/icons/IconSearch";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";
const items = [
  {
    key: "all",
    label: "All projects",
    subLabel: "",
  },
  {
    key: "new",
    label: "New to Old",
    subLabel: "Time",
  },
  {
    key: "old",
    label: "Old to New",
    subLabel: "Time",
  },
  {
    key: "most",
    label: "Most to Least",
    subLabel: "Donations ",
  },
  {
    key: "Least",
    label: "Least to Most",
    subLabel: "Donations ",
  },
];
const Search = () => {
  const [filter, setFilter] = useState("All projects");

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
        placeholder="Search (9) projects..."
      />
      <Dropdown>
        <DropdownTrigger className="absolute inset-y-0 end-0  flex items-center justify-center gap-3  cursor-pointer px-6">
          <Button variant="bordered">
            <div>{filter}</div>
            <IconFilter />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="border mr-20 bg-white"
          aria-label="Dynamic Actions"
          items={items}
        >
          {(item) => (
            <DropdownItem
              key={item.key}
              onClick={() => handleFilter(item.label)}
              className="hover:bg-[#F0F0F0]"
              aria-label="Action event example"
            >
              <div className="flex  items-center justify-between text-sm ">
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
