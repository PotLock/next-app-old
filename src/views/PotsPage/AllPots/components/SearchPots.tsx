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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const items = [
  {
    key: "-totalDonation",
    label: "Most to Least Donations",

  },
  {
    key: "totalDonation",
    label: "Least to Most Donations",

  },
  {
    key: "totalMatchingPool",
    label: "Least to Least Matching Pool",

  },
  {
    key: "-totalMatchingPool",
    label: "Most to Least Matching Pool",

  },
  {
    key: "public_donations_count",
    label: "Least to Most # Donors",
    
  },
  {
    key: "-public_donations_count",
    label: "Most to Least # Donors",
   
  },
];
const SearchPots = ({ onSearch, totalPots }: any) => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();
  const sort = searchParam.get("sort");
  const title = searchParam.get("title");

  useEffect(() => {
    setSearch(title ?? "");
    const sortFilter = items.find((item) => item.key === sort);
    setFilter(sortFilter?.label ?? "Sort");
  }, [sort, title]);

  const handleFilter = (label: any) => {
    setFilter(label);
    onSearch({ page: 1, limit: 9 });
    const sort = items.find((item) => item.label === label);
    router.push(pathname + `?sort=${sort?.key}&title=${search}`, {
      scroll: false,
    });
  };

  const handleSearch = (name: any) => {
    setSearch(name);
    onSearch({ page: 1, limit: 9 });
    const sort = items.find((item) => item.label === filter);
    router.push(pathname + `?sort=${sort?.key}&title=${name}`, {
      scroll: false,
    });
  };

  return (
    <div className="relative mx-4 sm:mx-0 bg-[#F0F0F0]">
      <div className="absolute inset-y-0 start-0 flex items-center px-6 pointer-events-none">
        <IconSearch />
      </div>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        type="search"
        value={search}
        className="block w-[90%] p-4 ps-12 text-sm text-gray-900 rounded-sm bg-[#F0F0F0]  focus:outline-none "
        placeholder={`Search (${totalPots || '0'}) pots...`}
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
                
              </div>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default SearchPots;