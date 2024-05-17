import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { Link } from 'react-router-dom';
// grid lg:grid-cols-3 grid-cols-2
const Footer = () => {
  return (
    <footer className='lg:w-1/2 w-full mt-6 headfont-regular border-t-2 border-zinc-300 pt-4 '>
      <div className=" mb-4 gap-4 flex flex-wrap justify-between items-center">
      <div className="links w-[48%] lg:w-[30%] flex flex-col">
          <h1 className='font-bold lg:text-xl text-lg mb-2'>🕵Discover</h1>
          <ul className='flex flex-col gap-1'>
            <li><Link to='/#hot'>🔥Hot Startup Ideas</Link></li>
            <li><Link to='/#new'>🆕New Startup Ideas</Link></li>
            <li><Link to='/#top'>🔝Top 27 Startups</Link></li>
          </ul>
      </div>
      <div className="links w-[46%] lg:w-[30%] lg:text-center ">
      <h1 className='font-bold lg:text-xl text-lg mb-2'>👋Engage</h1>
          <ul className='flex flex-col gap-1'>
            <li><Link to='/add-an-idea'>✏️Add an Idea?</Link></li>
            <li>📝Send Feedback</li>
            <li>🤝Contribute</li>
          </ul>
      </div>
      <div className="links w-[48%] lg:w-[30%] text-right">
      <h1 className='font-bold lg:text-xl text-lg mb-2 lg:text-right text-left'>📨Contact Us</h1>
          <ul className='flex flex-col gap-1'>
            <li className='flex  gap-2 items-center justify-items-start lg:justify-end'>Facebook<FaFacebookSquare/> </li>
            <li className='flex gap-2 items-center justify-items-start lg:justify-end'>Twitter<FaSquareXTwitter/></li>
            <li className='flex gap-2 items-center justify-items-start lg:justify-end'>Github<FaSquareGithub/></li>
          </ul>
      </div>
      </div>
      <div className="cop group">
      <p className='text-center'>Copyright ©️ 2024 || 27StartUps</p>
      <p className='text-center'>Developed With <span className='group-hover:scale-150 inline-block transition-all duration-300'>❤️</span> Nilaa Laishram</p>
      </div>
    </footer>
  )
}

export default Footer