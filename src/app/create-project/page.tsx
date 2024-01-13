
import BannerCreateProject from '@/views/CreateProjectPage/Banner/BannerCreateProject'
import BannerMember from '@/views/CreateProjectPage/Banner/BannerMember'
import TabsCreateProject from '@/views/CreateProjectPage/Tab'

import React from 'react'

const CreateProject = () => {
  return (
    <div className='w-full h-full'>
      <BannerCreateProject/>
      <BannerMember/>
      <TabsCreateProject/>
    </div>
  )
}

export default CreateProject