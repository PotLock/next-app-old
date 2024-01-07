import Image from 'next/image'
import ProjectImg from '../../assets/images/ProjectImage.png'
import ProjectLogo from '../../assets/images/ProjectLogo.png'
import React from 'react'
import Button from '../Button'

const ProjectCard = () => {
  return (
    <div className="w-[408px] flex-col flex border border-[#292929] rounded-sm ">
      <div className="w-full h-[150px] relative rounded-sm">
      <Image  width={408} height={150} src={ProjectImg} alt='' />
      <Image className="ml-6 absolute -bottom-5 w-10 h-10 rounded-full border-2 border-white" src={ProjectLogo} alt='' />
      </div>
    <div className='p-6 flex gap-[6px] flex-col'>
      <div className='font-semibold text-[17px]'>
      RevitFi
      </div>
      <div className='text-[17px]'>
      Redefining DeFi on NEAR with a cross-chain interoperable layer1 infrastructure.
      </div>
      <div className='flex gap-2'>
        <div className='p-2 border rounded'>Defi</div>
        <div className='p-2 border rounded'>Open source</div>
        <div className='p-2 border rounded'>Non profit</div>
      </div>
    </div>
    <div className='flex justify-between py-4 px-6 border-t border-[#292929] items-center'>
      <div className='flex gap-2'>
        <div className='font-semibold text-[17px]'>$24.00</div>
        <div>Raised</div>
      </div>
      <div className='w-[100px]'>
      <Button color='normal'>Add to cart</Button>

      </div>
    </div>
    </div>
  )
}

export default ProjectCard