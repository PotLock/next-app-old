'use client'
import Pagination from '@/components/Panigation'
import PotCard from '@/components/PotCard'
import { PROJECTS } from '@/constant'
import React, { useState } from 'react'

const FeaturedPots = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust the number of items per page as needed

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const slicedData = PROJECTS.slice(startIndex, endIndex);

    return slicedData.map((item, index) => (
      
        <PotCard/>
      
    ));
  };
  // Function to handle page change
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  return (
    <div className='w-full h-full flex flex-col gap-6'>
  <div className="flex  justify-between mx-4 sm:mx-0">
        <div className="font-semibold text-[22px] ">Featured Pots</div>
        <Pagination
          data={PROJECTS}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="flex items-center justify-center ">
      <div className="grid grid-cols-1 sm:flex sm:items-center sm:justify-between sm:mx-0 gap-y-3 gap-x-8">
        {getCurrentPageItems()}
      </div>
      </div>
    </div>
  )
}

export default FeaturedPots