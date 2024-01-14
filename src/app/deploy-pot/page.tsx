import BannerDeployPot from '@/views/DeployPotPage/Banner/BannerDeployPot'
import DeployPotForm from '@/views/DeployPotPage/DeployPotForm'
import React from 'react'

const DeployPotPage = () => {
  return (
    <div className='w-full h-full flex flex-col'>
        <BannerDeployPot/>
        <DeployPotForm/>

    </div>
  )
}

export default DeployPotPage