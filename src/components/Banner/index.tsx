import React from 'react'
import Button from '../Button'


const Banner = () => {
  return (
    <div  className='w-full  flex items-center justify-center my-[160px] '>
        
    
    <div className='flex gap-6 items-center justify-center  flex-col text-center' >
          <div className='text-sm font-medium text-[#292929]'>
          Transforming Funding for Public Goods. 
          </div>
            <div className='sm:text-[56px]  '>
            Discover Impact Projects, <br/>
Donate Directly, Or Get Automatic <br/> Referral Fees For Raising Donations.
            </div>

            <div className='flex  gap-6 mt-4 w-full sm:w-[300px]'>
                <Button color='primary'> Donate Randomly</Button>
                <Button color='peach'> Create Project</Button>


    </div>
  
    </div>
    
   
</div>
   
  )
}

export default Banner