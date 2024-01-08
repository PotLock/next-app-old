'use client'
import React, { useState } from 'react'
import IconCheckYellow from '@/assets/icons/IconCheckYellow';
import { TABS } from '@/constant';


const TabAllProject = () => {
    const [tab, setTab] = useState('DeFi')
    const handleTag = (label: any) => {
        setTab(label)
       

    }
  return (
<div className="flex w-full flex-row gap-3 items-center justify-start mx-4 sm:mx-0">
    <div>Tags:</div>
    <div className='flex gap-3'>
       
        {
            TABS.map((t) => 
            <div 
            key={t.id}
            onClick={() => handleTag(t.label)}
            className={`${tab === t.label && 'gap-2 bg-[#FEF6EE]' } p-2 rounded border text-sm flex items-center  cursor-pointer`}>
                {tab === t.label && <IconCheckYellow/> }
            {t.label}</div>
            )
        }
        
       
     

    </div>
    </div>  
  )
}

export default TabAllProject