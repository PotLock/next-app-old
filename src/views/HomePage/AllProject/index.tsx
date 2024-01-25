"use client";
import { useEffect, useState } from "react";
import ProjectCard from "../../../components/ProjectCard";

import Search from "@/components/Search";
import { getProjectGeneral, searchProjectName } from "@/services";
import DonateProjectModel from "@/views/HomePage/Donate/DonateProjectModal";
import { Divider, useDisclosure } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import TabAllProject from "./components/Tab";

const AllProject = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [projects, setProjects] = useState<any[]>([]);
  const [data, setData] = useState<any>();
  const [searchFilter, setSearchFilter] = useState({ page: 1, limit: 1000 });
  const search = useSearchParams();
  const sort = search.get("sort");
  const title = search.get("title");
  const [tags, setTags] = useState<string[]>([]);

  const getApiProject = async () => {
    try {
      const res = await searchProjectName({
        ...searchFilter,
        sort,
        title,
        tags,
      });
      if (!!res) setProjects(res.data);
    } catch (error) {}
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
  }, [sort, title, searchFilter, tags]);

  const handleTag = (label: string) => {
    const isChecked = tags.some((item) => item === label);
    if (isChecked) {
      const tagFilted = tags.filter((item) => item !== label);
      setTags(tagFilted);
    } else {
      setTags([...tags, label]);
    }
  };

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
          <div className="flex gap-2 text-[11px]">
            <div className="font-bold	">{data?.totalContributed ?? "$0"}</div>
            <div>Donated</div>
          </div>
          <Divider orientation="vertical" />
          <div className="flex gap-2 text-[11px]">
            <div className="font-bold	">{data?.uniqueDonors ?? "0"}</div>
            <div>Unique Donors</div>
          </div>
          <Divider orientation="vertical" />
          <div className="flex gap-2 text-[11px]">
            <div className="font-bold	">{data?.donationQuantity ?? "0"}</div>
            <div>Donations</div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[20px]  ">
        <Search onSearch={setSearchFilter} totalProject={projects.length} />
        <TabAllProject tags={tags} handleTag={handleTag} />
      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-y-8  sm:mx-0  gap-x-8 min-h-[400px]">
          {projects.map((project, index) => (
            <ProjectCard key={index} onOpen={onOpen} data={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProject;
