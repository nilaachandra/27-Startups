import React, { useState } from "react";
import { FiTwitter, FiGithub, FiUser } from "react-icons/fi";
import { FaRegShareSquare, FaInstagram, FaRegCommentDots } from "react-icons/fa";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { BiBarChartSquare } from "react-icons/bi";
import { useSupaContext } from "../contexts/SupaContext";
const ReadPostSingle = ({
  onClick,
  index,
  desc,
  username,
  twitter,
  github,
  instagram,
  social_username,
  commentCount,
  createdAt,
  id,
  upvotes_count,
  hasUpvoted,
}) => {
  const { upvoteIdea } = useSupaContext();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const shareIdea = () => {}

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleUpvote = async () => {
    upvoteIdea(id);
  };

  return (
    <div
    onClick={onClick}
      key={index}
      className="w-full cursor-pointer py-2 px-3 shadow-xl headfont-regular rounded-xl bg-white flex justify-between transition-all duration-300"
    >
      <div className="left lg:text-lg text-base flex flex-col transition-all duration-300 justify-between">
        <p className="hover:opacity-80 transition-all leading-none line duration-200 mb-3">
         {desc}
        </p>
        <div className="info lg:text-sm text-xs text-zinc-700">
          <div className="func flex gap-1 lg:gap-1.5 items-center">
            {twitter && (
              <a
                href={`http://x.com/${social_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-dark-button flex items-center gap-1"
              >
                <FiTwitter />
                {social_username}
              </a>
            )}
            {github && (
              <a
                href={`http://github.com/${social_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-dark-button flex items-center gap-1"
              >
                <FiGithub />
                {social_username}
              </a>
            )}
            {instagram && (
              <a
                href={`http://instagram.com/${social_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-dark-button flex items-center gap-1"
              >
                <FaInstagram />
                {social_username}
              </a>
            )}
            {!twitter && !github && !instagram && (
              <a
                href="#"
                className="hover:underline hover:text-dark-button flex items-center gap-1"
              >
                <FiUser />
                {username}
              </a>
            )}
            <span className="flex gap-1 items-center hover:underline hover:text-dark-button">
              | <FaRegCommentDots />
              <span>{commentCount || 0}</span> Replies
            </span>
            
            
          </div>
          <div className="flex gap-1 items-center">
            <p>Posted {formatDate(createdAt) || "2024-09-09"} </p>
            | <BiBarChartSquare className="mt-0.5" />
            <span className="mt-0.5">{upvotes_count || 0}</span>
          </div>
        </div>
      </div>
      <div className="right flex justify-center leading-0 items-center text-lg flex-col lg:mr-4 mr-0">
        <button 
          onClick={handleUpvote} 
          className={`text-2xl px-2.5 py-0.5 rounded-md transition-all duration-300 lg:hover:bg-slate-300 ${hasUpvoted ? 'bg-slate-300' : ''}`}
        >
          🦄
        </button>
        <span className="font-bold lg:text-lg text-base">{upvotes_count || 0}</span>
      </div>
    </div>
  );
};

export default ReadPostSingle;