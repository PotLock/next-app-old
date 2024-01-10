'use client'
import DonationRandomlyModel from '@/views/HomePage/DonationRandomly/DonationRandomlyModal';
import DonationRandomlyModelFinal from '@/views/HomePage/DonationRandomly/DonationRandomlyModalFinal';
import { Button, useDisclosure } from '@nextui-org/react'
import React from 'react'



const Banner = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div  className='w-full  flex items-center justify-center my-[160px] '>
        
    <DonationRandomlyModelFinal isOpen={isOpen} onOpenChange={onOpenChange}/>
    <div className='flex gap-6 items-center justify-center  flex-col text-center' >
          <div className='text-sm font-medium text-[#292929]'>
          Transforming Funding for Public Goods. 
          </div>
            <div className='sm:text-6xl  text-4xl  '>
            Discover Impact Projects, <br/>
Donate Directly, Or Get Automatic <br/> Referral Fees For Raising Donations.
            </div>

            <div className='flex  gap-6 mt-4   w-[300px]'>
     
        <Button
        onPress={onOpen}
        className='w-full py-3 font-medium text-sm bg-[#DD3345]  border border-black rounded-md shadow-[0px_2px_2px]' >
        <p className='text-white'>Donate Randomly</p>
        </Button>
        <Button className='w-full py-3 font-medium text-sm bg-[#FEF6EE] border border-black rounded-md shadow-[0px_2px_2px]' >
          <p>Create Project</p>
        
        </Button>



    </div>
  
    </div>
    
   
</div>
   
  )
}

export default Banner