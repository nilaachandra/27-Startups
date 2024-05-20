import React from 'react'
import Hero from '../Components/Hero'
import HeroTwo from '../Components/HeroTwo'
import Tabs from '../Components/Tabs'

const Homepage = () => {
  
  return (
    <div className='w-full'>
      <Hero/>
      <Tabs/>
      <HeroTwo/>
    </div>
  )
}

export default Homepage