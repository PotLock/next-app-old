"use client";
import Search from "@/components/Search";
import { Divider } from "@nextui-org/react";
import FillterPots from "./components/FillterPots";
import { getPotsGeneral, searchPotsName } from "@/services";
import PotCard from "@/components/PotCard";
import TagAllPots from "./components/TabAllPots";
import { useSearchParams } from "next/navigation";
import SearchPots from "./components/SearchPots";
import { useEffect, useState } from "react";

const AllPots = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [pots, setPots] = useState<any[]>([]);
  const [data, setData] = useState<any>();
  const [searchFilter, setSearchFilter] = useState({ page: 1, limit: 1000 });
  const search = useSearchParams();
  const sort = search.get("sort");
  const title = search.get("title");
  const handleTag = (label: string) => {
    const isChecked = tags.some((item) => item === label);
    if (isChecked) {
      const tagFilted = tags.filter((item) => item !== label);
      setTags(tagFilted);
    } else {
      setTags([...tags, label]);
    }
  };
  const getApiAllPots = async () => {
    try {
      const res = await searchPotsName({
        ...searchFilter,
        sort,
        title,
        tags,
      });
      if (!!res) setPots(res.data);
    } catch (error) {}
  };

  const getApiPotsGeneral = async () => {
    try {
      const res = await getPotsGeneral();
      setData(res?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getApiPotsGeneral();
  }, []);

  useEffect(() => {
    getApiAllPots();
  }, [sort, title, searchFilter, tags]);
  return (
    <div className="flex flex-col w-ful h-full gap-6">
      <div className="flex flex-col  sm:flex-row sm:items-center sm:justify-between  mx-4 sm:mx-0 gap-1">
        <div className="flex gap-2 text-sm sm:text-[22px]">
          <div className="font-semibold ">ALL POTS </div>
          <div className="text-[#DD3345]">{pots.length || "0"}</div>
        </div>

        <div className="flex h-5 items-center text-small">
          <div className="flex gap-2  py-1 pr-4 text-[11px] sm:text-sm">
            <div className="font-semibold">{data?.totalAmountMatched}</div>
            <div>Donated</div>
          </div>
          <Divider orientation="vertical" />
          <div className="flex gap-2  py-1 px-4 text-[11px] sm:text-sm">
            <div className="font-semibold">{data?.totalDonor}</div>
            <div>Unique Donors</div>
          </div>
          <Divider orientation="vertical" />
          <div className="flex gap-2  py-1 pl-4 text-[11px] sm:text-sm">
            <div className="font-semibold">{data?.totalDonation}</div>
            <div>Donations</div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-[20px]  ">
        <SearchPots onSearch={setSearchFilter} totalPots={pots.length} />

        <TagAllPots tags={tags} handleTag={handleTag} />
      </div>

      <div className="sm:w-full grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-y-8  sm:mx-0  gap-x-8 pl-[15px] pr-[15px] sm:p-0 mb-20 ">
        {pots.map((pot, index) => (
          <PotCard key={index} data={pot} />
        ))}
      </div>
    </div>
  );
};

export default AllPots;
