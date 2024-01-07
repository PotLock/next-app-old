import React from 'react'

const Search = () => {
  return (
    <div className='py-3 px-6 flex items-center justify-between border rounded-sm bg-[#F0F0F0]'>

        <div className='flex gap-4'>
            <div>Search</div>
        <input placeholder='Search (9) projects'/>

        </div>
        <div>
            <div>All Projects</div>
        </div>
    </div>
  )
}

export default Search