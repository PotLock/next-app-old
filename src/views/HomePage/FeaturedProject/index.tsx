"use client";
import React, { useState } from "react";
import ProjectCard from "../../../components/ProjectCard";

import { PROJECTS } from "@/constant";
import Pagination from "./components/Panigation";
import { useDisclosure } from "@nextui-org/react";
import DonateProjectModel from "@/views/HomePage/Donate/DonateProjectModal";

const FeaturedProject = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust the number of items per page as needed

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const slicedData = PROJECTS.slice(startIndex, endIndex);

    return slicedData.map((item, index) => (
      <div key={index}>
        <ProjectCard
          onOpen={onOpen}
          title={item.title}
          content={item.content}
        />
      </div>
    ));
  };
  // Function to handle page change
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex flex-col w-full h-full mb-[120px] gap-5">
      <DonateProjectModel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      <div className="flex  justify-between mx-4 sm:mx-0">
        <div className="font-semibold text-[22px] ">Featured projects</div>
        <Pagination
          data={PROJECTS}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:flex sm:items-center sm:justify-between mx-8 sm:mx-0 gap-y-3">
        {getCurrentPageItems()}
      </div>
    </div>
  );
};

export default FeaturedProject;
