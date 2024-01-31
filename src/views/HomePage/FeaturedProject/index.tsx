"use client";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "../../../components/ProjectCard";

import Pagination from "@/components/Panigation";
import { getProjectFeatured } from "@/services";
import DonateProjectModel from "@/components/Modal/DonateProjectModal";
import { useDisclosure } from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";

const FeaturedProject = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const slickRef = useRef<any>(null);
  const mobileWiew = useMediaQuery({ query: "(max-width: 500px)" });
  const itemsPerPage = 3; // Adjust the number of items per page as needed

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: mobileWiew ? 1 : 3,
    slidesToScroll: mobileWiew ? 1 : 3,
  };

  const [projects, setProjects] = useState<any[]>([]);

  const getApiProject = async () => {
    try {
      const res = await getProjectFeatured();
      setProjects(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentPageItems = () => {
    return projects.map((item, index) => (
      <ProjectCard key={index} onOpen={onOpen} data={item} />
    ));
  };
  // Function to handle page change
  const handlePageChange = (page: any) => {
    if (page == "next") {
      slickRef.current.slickNext();
    } else {
      slickRef.current.slickPrev();
    }
  };

  useEffect(() => {
    getApiProject();
  }, []);

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
          data={projects}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="flex items-center justify-center pl-[15px] pr-[15px]">
        {/* <div className="grid grid-cols-1 sm:flex sm:items-center sm:justify-between sm:mx-0 gap-y-3 gap-x-8">
          <Slider {...settings}>{getCurrentPageItems()}</Slider>
        </div> */}
        <Slider ref={slickRef} {...settings}>
          {getCurrentPageItems()}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedProject;
