'use client'
import React from "react";
import ProjectCard from "../../../components/ProjectCard";
import Search from "./components/Search";
import TabAllProject from "./components/Tab";
import { useDisclosure } from "@nextui-org/react";
import { PROJECTS } from "@/constant";
import DonateProjectModel from "@/views/HomePage/Donate/DonateProjectModal";

const AllProject = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    
    <div className="flex flex-col w-full h-full mb-[120px] ">
      <DonateProjectModel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      <div className="flex flex-col  sm:flex-row sm:items-center sm:justify-between mb-[40px] mx-4 sm:mx-0 gap-1">
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
      <div className="w-full flex flex-col gap-[20px]  mb-[40px] ">
        <Search />

        <TabAllProject />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-y-8 mx-8 sm:mx-0 ">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
};

export default AllProject;
