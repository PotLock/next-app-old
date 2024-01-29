'use client'
import { Button, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const BannerPots = () => {
  const route = useRouter()
  return (
    <div className="w-full  flex items-center justify-center my-24 ">
      
      <div className="flex gap-6 items-center justify-center  flex-col text-center">
        <div className="text-sm font-medium text-[#292929]">
        Explore Pots
        </div>
        <div className="sm:text-6xl  text-4xl  ">
        Donate to Matching Rounds <br />
        to Get Your Contributions Amplified.
        </div>

        <div className=" w-full flex  gap-6  mt-4 justify-center items-center">
          <Button 
          onClick={() => route.push('/deploy-pot')}
          color="danger">
            
          Deploy Pot
          </Button>
          <Tooltip content='Coming soon'>
          <Button 
         
         variant="bordered">Learn More</Button>
          </Tooltip>
          
        </div>
      
      </div>
    </div>
  )
}

export default BannerPots