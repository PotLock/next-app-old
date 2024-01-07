import React from 'react'
import ProjectCard from '../ProjectCard'
import Search from '../Search'

const AllProject = () => {
  return (
    <div className='flex flex-col w-full h-full mb-[120px]'>
       
      <div className='flex flex-col  sm:flex-row sm:items-center sm:justify-between mb-[40px]'>
      <div className='font-semibold text-[22px]'>ALL PROJECTS</div>
      <div className='flex items-center justify-center'>

      <div className='flex gap-2 px-4 border-r'>
  <div>$2027.23</div>
  <div>Donated</div>
</div>
<div className='flex gap-2 px-4 border-r'>
  <div>$2027.23</div>
  <div>Donated</div>
</div>
<div className='flex gap-2 px-4'>
  <div>$2027.23</div>
  <div>Donated</div>
</div>
      </div>


      </div>
      <Search/>
      <div className='flex items-center justify-center gap-8'>
    <ProjectCard/>
    

</div>
    
    </div>
  )
}

export default AllProject