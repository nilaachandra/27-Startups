import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Button from './Button'

const Construction = () => {
  return (
    <div className='w-full justify-center items-center flex flex-col'>
        <h1 className='lg:text-3xl text-xl font-bold'>This Page is under Construction </h1>
        <span className='text-9xl'>🚧</span>
        <p className='text-center'>While we build the page, why don't you <Link to='/add-an-idea' className='underline text-light-button'>add</Link> some Startup 🚀 Ideas?</p>
  
    </div>
  )
}

export default Construction