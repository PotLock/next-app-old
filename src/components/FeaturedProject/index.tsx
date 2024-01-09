'use client'
import React, { useState } from 'react'
import ProjectCard from '../ProjectCard'
import IconLeft from '@/assets/icons/IconLeft'
import IconRight from '@/assets/icons/IconRight'
import { PROJECTS } from '@/constant'
import Pagination from './components/Panigation'

const FeaturedProject = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Adjust the number of items per page as needed

    const getCurrentPageItems = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
     
      const slicedData = PROJECTS.slice(startIndex, endIndex);
  
      return slicedData.map((item, index) => (
        <div key={index}><ProjectCard title={item.title} content={item.content}/></div>
      ));
    };
    // Function to handle page change
    const handlePageChange = (page: any) => {
      setCurrentPage(page);
    };
  return (
    <div className='flex flex-col w-full h-full mb-[120px] gap-5'>

<div className='flex  justify-between mx-4 sm:mx-0'>
<div className='font-semibold text-[22px] '>Featured projects</div>
<Pagination data={PROJECTS} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
</div>

<div className='grid grid-cols-1 sm:flex sm:items-center sm:justify-between mx-4 sm:mx-0 gap-y-3'>
      {getCurrentPageItems()}
</div>
    </div>
  )
}

export default FeaturedProject