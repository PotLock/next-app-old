"use client";
import { BannerCreateContext } from '@/contexts';
import BannerCreateProject from '@/views/CreateProjectPage/Banner/BannerCreateProject'
import BannerMember from '@/views/CreateProjectPage/Banner/BannerMember'
import TabsCreateProject from '@/views/CreateProjectPage/Tab'

import React, { useState } from 'react'

const CreateProject = () => {
   const [bannerImage, setBannerImage] = useState<File>();
   console.log("👋  bannerImage:", bannerImage)
   const [avatarImage, setAvatarImage] = useState<File>();
   console.log("👋  avatarImage:", avatarImage)

  return (
    <div className='w-full h-full'>
      <BannerCreateContext.Provider value={{setBannerImage, bannerImage, setAvatarImage, avatarImage}}>
      <BannerCreateProject/>
      <BannerMember/>
      <TabsCreateProject/>
      </BannerCreateContext.Provider>
    </div>
  )
}

export default CreateProject