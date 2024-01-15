"use client";
import IconCheck from "@/assets/icons/IconCheck";
import IconFilter from "@/assets/icons/IconFilter";
import IconSearch from "@/assets/icons/IconSearch";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
const items = [
  {
    key: "dateCreated",
    label: "All projects",
    subLabel: "",
  },
  {
    key: "dateCreated",
    label: "New to Old",
    subLabel: "Time",
  },
  {
    key: "-dateCreated",
    label: "Old to New",
    subLabel: "Time",
  },
  {
    key: "dateCreated",
    label: "Most to Least",
    subLabel: "Donations ",
  },
  {
    key: "dateCreated",
    label: "Least to Most",
    subLabel: "Donations ",
  },
];
const Search = ({ onSearch }: any) => {
  const [filter, setFilter] = useState("All projects");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (label: any) => {
    setFilter(label);
    const sort = items.find((item) => item.label === label);
    router.push(pathname + `?sort=${sort?.key}&title=${search}`, {
      scroll: false,
    });
  };

  const handleSearch = (name: any) => {
    setSearch(name);
    const sort = items.find((item) => item.label === filter);
    router.push(pathname + `?sort=${sort}&title=${name}`, { scroll: false });
  };

  return (
    <div className="relative mx-4 sm:mx-0">
      <div className="absolute inset-y-0 start-0 flex items-center px-6 pointer-events-none">
        <IconSearch />
      </div>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        type="search"
        className="block w-full p-4 ps-12 text-sm text-gray-900 rounded-sm bg-[#F0F0F0]  focus:outline-none "
        placeholder="Search (9) projects..."
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
        <DropdownMenu className="" aria-label="Dynamic Actions" items={items}>
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
