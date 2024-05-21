import React from "react";
import PostCard from "./PostCard";
import dummyPosts from "../dummydata";
import Button from "./Button";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSupaContext } from "../contexts/SupaContext";
import Loader from "./Loader";

const Newposts = () => {
  const { data, isLoading, onSuccess } = useSupaContext();
  console.log(data);
  return (
    <div
      className="w-h-[50vh] pt-4 headfont-regular flex gap-3 justify-center items-center flex-col"
      id="hot"
    >
      {isLoading ? (
        <Loader type="spin" color="#09a129" height={50} width={50} />
      ) : (
        data?.map((post, index) => (
          <PostCard
            key={index}
            desc={post.description}
            username={post.username}
            social_username={post.social_username}
            upvotes={post.upvotes}
            commentCount={post.commentCount}
            createdAt={post.created_at}
            twitter={post.twitter}
            github={post.github}
            instagram={post.instagram}
          />
        ))
      )}
    </div>
  );
};

export default Newposts;
