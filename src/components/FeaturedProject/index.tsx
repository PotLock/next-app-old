import React from 'react'
import ProjectCard from '../ProjectCard'
import IconLeft from '@/assets/icons/IconLeft'
import IconRight from '@/assets/icons/IconRight'
import { PROJECTS } from '@/constant'

const FeaturedProject = () => {
  return (
    <div className='flex flex-col w-full h-full mb-[120px]'>

<div className='flex  justify-between mx-4 sm:mx-0'>
<div className='font-semibold text-[22px] mb-[40px]'>Featured projects</div>
<div className='flex gap-2' >
    <button className='flex items-center justify-center w-[44px] h-[44px] p-[10px] rounded-full border'>
        <IconLeft/>
    </button>
    <button className='flex items-center justify-center w-[44px] h-[44px] p-[10px] rounded-full border'>
        <IconRight/>
    </button>
</div>
</div>
{/* <div className='grid grid-cols-3 gap-3'>
    {
        PROJECTS.map((project) =><ProjectCard/> )
    }

</div> */}
<div className='grid grid-cols-1 sm:flex sm:items-center sm:justify-between mx-4 sm:mx-0'>
{
        PROJECTS.map((project, index) =>
         <>
         {
            index > 2 && <ProjectCard/>
         }
         </>
         )
    }
    

</div>
    </div>
  )
}

export default FeaturedProject