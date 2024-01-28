import React from 'react'

const EmptyState = ({title1, title2, subtitle, children }: {title1: string, title2: string, subtitle: string, children: React.ReactNode}) => {
  return (
    <div className='flex w-full h-full items-center justify-center '>
    <div className='text-[44px]'>
        <div className='text-[#DD3345]'>
        {title1}
        </div>
        <div>
        {title2}
        </div>
        <div className='text-[17px]'>
       {subtitle}
        </div>
    </div>
    <div>
        {children}
    </div>
      
    </div>
  
  )
}

export default EmptyState