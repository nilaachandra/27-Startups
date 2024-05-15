import React from 'react'

const Logo = () => {
  return (
    <div className={`font-bold headfont-bold text-light-button lg:text-3xl text-xl my-4 p-2 relative group`}>
        <span className='absolute group-hover:scale-125 transition-all duration-200 -top-[40%] -left-[1%] -rotate-[24deg] lg:text-3xl text-xl'>🦄</span>
        <span>27Startups</span>
        <span className='absolute group-hover:scale-125 transition-all duration-200 -bottom-[40%] right-[1%] rotate-[180deg] lg:text-3xl text-xl'>⚰️</span>
    </div>
  )
}

export default Logo