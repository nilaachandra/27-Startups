import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to='/' className={`font-bold headfont-bold text-light-button lg:text-3xl text-xl my-4 p-2 relative group`}>
        <span className='absolute group-hover:scale-125 transition-all duration-200 lg:-top-[40%] lg:-left-[1%] -top-[26%] -left-[1%] -rotate-[24deg] lg:text-3xl text-xl'>🦄</span>
        <span>27Startups</span>
        <span className='absolute group-hover:scale-125 transition-all duration-200 lg:-bottom-[40%] lg:right-[1%] -bottom-[26%] right-[1%] rotate-[180deg] lg:text-3xl text-xl'>⚰️</span>
    </Link>
  )
}

export default Logo