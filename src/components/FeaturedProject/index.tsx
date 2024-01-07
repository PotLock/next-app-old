import React from 'react'
import ProjectCard from '../ProjectCard'
import IconLeft from '@/assets/icons/IconLeft'
import IconRight from '@/assets/icons/IconRight'

const FeaturedProject = () => {
  return (
    <div className='flex flex-col w-full h-full mb-[120px]'>

<div className='flex justify-around sm:justify-between'>
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
<div className='flex items-center justify-center gap-8'>
    <ProjectCard/>
    

</div>
    </div>
  )
}

export default FeaturedProject