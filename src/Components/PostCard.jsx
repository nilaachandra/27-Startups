import React from "react";
import { Link } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { FaRegShareSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FiGithub, FiUser } from "react-icons/fi";
import { formatDistanceToNow, parseISO } from 'date-fns';


const PostCard = ({
  index,
  desc,
  username,
  twitter,
  github,
  instagram,
  social_username,
  commentCount,
  createdAt,
  upvotes,
}) => {
  // Function to handle social link clicks
  const handleSocialLinkClick = (e) => {
    e.stopPropagation();
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  
  return (
    <Link
      to="/:post"
      key={index}
      className="w-full py-2 px-3 shadow-xl headfont-regular rounded-xl bg-white flex justify-between"
    >
      <div className="left lg:text-lg text-base flex flex-col justify-between">
        <p className="hover:opacity-80 transition-all leading-none line duration-200">
          <span>{index || "1. "}</span>
          {desc || "The quick brown fox jumps over the lazy dog."}
        </p>
        <div className="info lg:text-sm text-xs text-zinc-700">
          <div className="func flex gap-1 lg:gap-1.5 items-center">
            {twitter && (
              <a
                href={`http://x.com/${social_username}`}
                onClick={handleSocialLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-dark-button border-r flex items-center gap-1"
              >
                <FiTwitter />
                {social_username}
              </a>
            )}
            {github && (
              <a
                href={`http://github.com/${social_username}`}
                onClick={handleSocialLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-dark-button border-r flex items-center gap-1"
              >
                <FiGithub />
                {social_username}
              </a>
            )}
            {instagram && (
              <a
                href={`http://instagram.com/${social_username}`}
                onClick={handleSocialLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-dark-button border-r flex items-center gap-1"
              >
                <FaInstagram />
                {social_username}
              </a>
            )}
            {!twitter && !github && !instagram && (
              <a
                href="#"
                onClick={handleSocialLinkClick}
                className="hover:underline hover:text-dark-button border-r flex items-center gap-1"
              >
                <FiUser />
                {username}
              </a>
            )}
            <span className="flex gap-1 items-center hover:underline hover:text-dark-button">
              <FaRegCommentDots />
              <span>{commentCount || 0}</span> Comments
            </span>
            |
            <span className="flex gap-1 items-center hover:underline hover:text-dark-button">
              <FaRegShareSquare />
              Share
            </span>
          </div>
          <p>Posted at {formatDate(createdAt) || "2024-09-09"} </p>
        </div>
      </div>
      <div className="right flex leading-0 items-center text-lg flex-col lg:mr-4 mr-0">
        <button className="text-2xl px-2.5 py-.5 hover:bg-slate-300 rounded-md transition-all duration-200">
          🦄
        </button>
        <span className="font-bold lg:text-lg text-base">{upvotes || 0}</span>
        <button className="text-2xl px-2.5 py-.5 hover:bg-slate-300 rounded-md transition-all duration-200">
          ⚰️
        </button>
      </div>
    </Link>
  );
};

export default PostCard;
