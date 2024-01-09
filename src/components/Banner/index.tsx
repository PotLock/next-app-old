import { Button } from '@nextui-org/react'
import React from 'react'



const Banner = () => {
  return (
    <div  className='w-full  flex items-center justify-center my-[160px] '>
        
    
    <div className='flex gap-6 items-center justify-center  flex-col text-center' >
          <div className='text-sm font-medium text-[#292929]'>
          Transforming Funding for Public Goods. 
          </div>
            <div className='sm:text-6xl  text-4xl  '>
            Discover Impact Projects, <br/>
Donate Directly, Or Get Automatic <br/> Referral Fees For Raising Donations.
            </div>

            <div className='flex  gap-6 mt-4   w-[300px]'>
         
        <Button className='w-full py-3 font-medium text-[#FFFFFF] text-sm bg-[#DD3345] border border-black rounded-md shadow-[0px_2px_2px]' >
        Donate Randomly
        </Button>
        <Button className='w-full py-3 font-medium text-sm bg-[#FEF6EE] border border-black rounded-md shadow-[0px_2px_2px]' >
        Create Project
        </Button>


    </div>
  
    </div>
    
   
</div>
   
  )
}

export default Banner