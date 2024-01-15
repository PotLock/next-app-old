import AllPots from '@/views/PotsPage/AllPots'
import BannerPots from '@/views/PotsPage/Banner'
import FeaturedPots from '@/views/PotsPage/FeaturedPots'
import React from 'react'

const PotsPage = () => {
  return (
    <div className='w-full h-full flex flex-col sm:px-[77px] gap-24'>
      <BannerPots/>
      <FeaturedPots/>
      <AllPots/>
    </div>
  )
}

export default PotsPage