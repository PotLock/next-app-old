"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "../../../components/ProjectCard";

import TabAllProject from "./components/Tab";
import { useDisclosure } from "@nextui-org/react";
import { PROJECTS } from "@/constant";
import DonateProjectModel from "@/views/HomePage/Donate/DonateProjectModal";
import Search from "@/components/Search";
import { getProject, searchProjectName } from "@/services";
import InfiniteScroll from "react-infinite-scroll-component";

const AllProject = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [projects, setProjects] = useState<any[]>([]);
  const [projectsSearch, setProjectsSearch] = useState<any[]>([]);

  const [hasMore, setHasMore] = useState(true);

  const getApiProject = async () => {
    const res = await getProject();
    if (!!res) setProjects(res.data);
  };

  const handleSearch = async (name: any) => {
      const res= await searchProjectName(name);
      setProjects(res.data)
  };

  useEffect(() => {
    getApiProject();
  }, []);
  return (
    <div className="flex flex-col w-full h-full mb-[120px] gap-5 ">
      <DonateProjectModel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      <div className="flex flex-col  sm:flex-row sm:items-center sm:justify-between  mx-4 sm:mx-0 gap-1">
        <div className="font-semibold text-sm sm:text-[22px]">ALL PROJECTS</div>
        <div className="flex ">
          <div className="flex gap-2  py-1 px-4 border border-[#F4B37D] bg-[#FEF6EE] text-[11px] sm:text-sm">
            <div>$2027.23</div>
            <div>Donated</div>
          </div>
          <div className="flex gap-2 px-4 border border-[#F4B37D] bg-[#FEF6EE] py-1 text-[11px] sm:text-sm">
            <div>$2027.23</div>
            <div>Donated</div>
          </div>
          <div className="flex gap-2 px-4 border border-[#F4B37D]  bg-[#FEF6EE] py-1 text-[11px] sm:text-sm">
            <div>$2027.23</div>
            <div>Donated</div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[20px]  ">
      <Search onSearch={handleSearch} onProject={getApiProject} />
        <TabAllProject />
      </div>
      <div className="flex items-center justify-center">
        <InfiniteScroll
          dataLength={projects.length}
          next={getApiProject}
          hasMore={true} // Replace with a condition based on your data source
          loader={<p>Loading...</p>}
          endMessage={<p>No more data to load.</p>}
          className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-y-8  sm:mx-0  gap-x-8"
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
