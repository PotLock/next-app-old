"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "../../../components/ProjectCard";

import TabAllProject from "./components/Tab";
import { Divider, useDisclosure } from "@nextui-org/react";
import { PROJECTS } from "@/constant";
import DonateProjectModel from "@/views/HomePage/Donate/DonateProjectModal";
import Search from "@/components/Search";
import { getProject, getProjectGeneral, searchProjectName } from "@/services";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "next/navigation";

const AllProject = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [projects, setProjects] = useState<any[]>([]);
  const [data, setData] = useState<any>();
  const [searchFilter, setSearchFilter] = useState({ page: 1, limit: 9 });
  const search = useSearchParams();
  const sort = search.get("sort");
  const title = search.get("title");

  const getApiProject = async () => {
    try {
      const res = await searchProjectName({ ...searchFilter, sort, title });
      if (!!res)
        if (sort || title) {
          setProjects(res.data);
        } else {
          setProjects([...projects, ...res.data]);
        }
    } catch (error) {}
  };

  const handleSearch = async (name: any) => {
    const res = await searchProjectName(name.length ? name : undefined);
    setProjects(res.data);
  };

  const getDataDetail = async () => {
    try {
      const { data } = await getProjectGeneral();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataDetail();
  }, []);

  useEffect(() => {
    getApiProject();
  }, [sort, title, searchFilter]);

  return (
    <div className="flex flex-col w-full h-full mb-[120px] gap-5 ">
      <DonateProjectModel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      <div className="flex flex-col  sm:flex-row sm:items-center sm:justify-between  mx-4 sm:mx-0 gap-1">
        <div className="font-semibold text-sm sm:text-[22px]">ALL PROJECTS</div>
        <div className="flex h-5 items-center space-x-4 text-small">
          <div className="flex gap-2">
            <div className="font-bold	">{data?.totalContributed ?? "$0"}</div>
            <div>Donated</div>
          </div>
          <Divider orientation="vertical" />
          <div className="flex gap-2">
            <div className="font-bold	">{data?.uniqueDonors ?? "0"}</div>
            <div>Unique Donors</div>
          </div>
          <Divider orientation="vertical" />
          <div className="flex gap-2">
            <div className="font-bold	">{data?.donationQuantity ?? "0"}</div>
            <div>Donations</div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[20px]  ">
        <Search onSearch={setSearchFilter} />
        <TabAllProject />
      </div>
      <div className="flex items-center justify-center">
        <InfiniteScroll
          dataLength={projects.length}
          next={() => {
            if (projects.length) {
              setSearchFilter({
                ...searchFilter,
                page: searchFilter.page + 1,
              });
            }
          }}
          hasMore={true} // Replace with a condition based on your data source
          loader={<p>No more data to load.</p>}
          endMessage={<p>No more data to load.</p>}
          className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-y-8  sm:mx-0  gap-x-8 min-h-[400px]"
          // inverse={true}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} onOpen={onOpen} data={project} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default AllProject;
