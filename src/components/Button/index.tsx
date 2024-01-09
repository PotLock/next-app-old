import React, { ReactNode, ButtonHTMLAttributes } from 'react'

//TODO: Edit button background color

export default function Button({
  children,
  type = 'button',
  color = 'primary',
  ...props
}: {
  children: ReactNode
  color?: string 
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const renderColor = (color: string) => {
    switch (color) {
      case 'primary':
        return 'bg-[#DD3345]'
      case 'peach':  
        return 'bg-[#FEF6EE]'
      default:
        return 'bg-[#FFFFFF]'
        
        
    }
  }

  return (
    <button
      className={`w-full py-3 text-sm ${renderColor(color)} rounded-md shadow-[0px_2px_2px] border border-black ${color === 'disable' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
