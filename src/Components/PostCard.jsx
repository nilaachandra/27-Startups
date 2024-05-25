import React from "react";
import { FiTwitter, FiGithub, FiUser } from "react-icons/fi";
import { FaRegShareSquare, FaInstagram, FaRegCommentDots } from "react-icons/fa";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { BiBarChartSquare } from "react-icons/bi";
import { useSupaContext } from "../contexts/SupaContext";

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
  id,
  upvotes_count,
  hasUpvoted,
  hasDownvoted,
  votes_count
}) => {
  const { upvoteIdea, downvoteIdea, refetch } = useSupaContext();

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleUpvote = async () => {
    await upvoteIdea(id);
    refetch();
  };

  const handleDownvote = async () => {
    await downvoteIdea(id);
    refetch();
  };

  return (
    <div
      key={index}
      className="w-full py-2 px-3 shadow-xl headfont-regular rounded-xl bg-white flex justify-between"
    >
      <div className="left lg:text-lg text-base flex flex-col justify-between">
        <p className="hover:opacity-80 transition-all leading-none line duration-200 mb-3">
          <span>{index + 1 || "1. "}</span>
          {desc || "The quick brown fox jumps over the lazy dog."}
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
              <span>{commentCount || 0}</span> Comments
            </span>
            |
            <span className="flex gap-1 items-center hover:underline hover:text-dark-button">
              <FaRegShareSquare />
              Share
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <p>Posted {formatDate(createdAt) || "2024-09-09"} </p>
            | <BiBarChartSquare className="mt-0.5" />
            <span className="mt-0.5">{upvotes_count || 0}</span>
          </div>
        </div>
      </div>
      <div className="right flex leading-0 items-center text-lg flex-col lg:mr-4 mr-0">
        <button 
          onClick={handleUpvote} 
          className={`text-2xl px-2.5 py-0.5 rounded-md transition-all duration-200 ${hasUpvoted ? 'bg-slate-300' : 'hover:bg-slate-300'}`}
        >
          🦄
        </button>
        <span className="font-bold lg:text-lg text-base">{votes_count || 0}</span>
        <button 
          onClick={handleDownvote} 
          className={`text-2xl px-2.5 py-0.5 rounded-md transition-all duration-200 ${hasDownvoted ? 'bg-slate-300' : 'hover:bg-slate-300'}`}
        >
          👎
        </button>
      </div>
    </div>
  );
};

export default PostCard;
