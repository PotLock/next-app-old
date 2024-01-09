
import React from 'react'
import ProjectCard from '../ProjectCard'
import Search from '../Search'
import TabAllProject from './components/Tab'
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import { PROJECTS } from '@/constant';

const AllProject = () => {
  return (
    <div className='flex flex-col w-full h-full mb-[120px]'>
       
      <div className='flex flex-col  sm:flex-row sm:items-center sm:justify-between mb-[40px] mx-4 sm:mx-0 gap-1' >
      <div className='font-semibold text-sm sm:text-[22px]'>ALL PROJECTS</div>
      <div className='flex '>

      <div className='flex gap-2  py-1 px-4 border border-[#F4B37D] bg-[#FEF6EE] text-[11px] sm:text-sm'>
  <div>$2027.23</div>
  <div>Donated</div>
</div>
<div className='flex gap-2 px-4 border border-[#F4B37D] bg-[#FEF6EE] py-1 text-[11px] sm:text-sm'>
  <div>$2027.23</div>
  <div>Donated</div>
</div>
<div className='flex gap-2 px-4 border border-[#F4B37D]  bg-[#FEF6EE] py-1 text-[11px] sm:text-sm'>
  <div>$2027.23</div>
  <div>Donated</div>
</div>
      </div>


      </div>
      <div className='w-full flex flex-col gap-[20px]  mb-[80px] '>
      <Search/>

      <TabAllProject/>
      
      </div>

<div className='grid grid-cols-1 sm:grid-cols-3 gap-x-32 gap-y-8 mx-4 sm:mx-0'>
    {
        PROJECTS.map((project, index) =><div key={index}><ProjectCard/> </div>)
    }

</div>
    
    </div>
  )
}

export default AllProject