import React from 'react'
import PostCard from './PostCard'
import dummyPosts from '../dummydata'
import Button from './Button'
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom'
const Hotposts = () => {
    
  return (
    <div className='w-h-[50vh] pt-4 headfont-regular flex gap-3 items-center flex-col' id='hot'>
        {dummyPosts.map((post, index) => (
            <PostCard key={index} desc={post.desc} username={post.username} social_username={post.social_username}
            upvotes={post.upvotes} commentCount={post.commentCount} createdAt={post.created_at} twitter={post.twitter} github={post.github}
            instagram={post.instagram}/>
        ))}
        <p className='text-center'>Looks Like you scrolled too much! Go back and work on your Startup 😡</p>
            <Link to='/add-an-idea' className='lg:w-1/2 w-full'>
            <Button className="flex items-center gap-2 w-full group">
            <FaPlus/>Add a Startup Idea
              <span className="lg:group-hover:scale-[1.5] text-xl transition-all duration-200">
                💡
              </span>
            </Button>
            </Link>
    </div>
  )
}

export default Hotposts