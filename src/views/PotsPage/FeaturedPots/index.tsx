"use client";
import Pagination from "@/components/Panigation";
import PotCard from "@/components/PotCard";
import { PROJECTS } from "@/constant";
import { getPotsFeatured } from "@/services";
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";

const FeaturedPots = () => {
  const slickRef = useRef<any>(null);
  const mobileWiew = useMediaQuery({ query: "(max-width: 500px)" });
  const itemsPerPage = 3; // Adjust the number of items per page as needed
  const [pots, setPots] = useState<any[]>([]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: mobileWiew ? 1 : 3,
    slidesToScroll: mobileWiew ? 1 : 3,
  };


  const getApiPots = async () => {
    try {
      const res = await getPotsFeatured();
      setPots(res?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentPageItems = () => {
    return pots.map((item, index) => <PotCard key={index} data={item} />);
  };

  // };
  // Function to handle page change
  const handlePageChange = (page: any) => {
    if (page == "next") {
      slickRef.current.slickNext();
    } else {
      slickRef.current.slickPrev();
    }
  };

  useEffect(() => {
    getApiPots();
  }, []);
  return (
    <div className="flex flex-col w-full h-full  gap-5 ">
      <div className="flex  justify-between mx-4 sm:mx-0">
        <div className="font-semibold text-[22px] ">Featured Pots</div>
        <Pagination
          data={pots}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="flex items-center justify-center pl-[15px] pr-[15px] sm:p-0">
        <Slider ref={slickRef} {...settings}>
          {getCurrentPageItems()}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedPots;
