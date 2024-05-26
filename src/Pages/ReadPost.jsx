import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSupaContext } from "../contexts/SupaContext";
import PostCard from "../Components/PostCard";
import Loader from "../Components/Loader";

const ReadPost = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { newPosts, isLoading } = useSupaContext();
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    // Parse id to integer
    const postId = parseInt(id);

    // Check if postId is valid and newPosts array is not empty
    if (!isNaN(postId) && newPosts && newPosts.length > 0) {
      // Find post in newPosts array based on id
      const post = newPosts.find((post) => post.id === postId);
      setCurrentPost(post);
    }
  }, [id, newPosts]);

  // Check if currentPost is valid and has the required properties
  if (isLoading || !currentPost || Object.keys(currentPost).length === 0) {
    return (
      <div className="w-h-[50vh] pt-4 headfont-regular flex gap-3 justify-center items-center flex-col">
        <Loader type="spin" color="#09a129" height={50} width={50} />
      </div>
    );
  }

  return (
    <div className="w-h-[50vh] pt-4 headfont-regular flex gap-3 justify-center items-center flex-col">
      <PostCard
        onClick={() =>
          navigate(
            `/${currentPost.id}/${currentPost.username}/${currentPost.created_at}`
          )
        }
        key={currentPost.id}
        desc={currentPost.description}
        username={currentPost.username}
        social_username={currentPost.social_username}
        upvotes_count={currentPost.upvotes_count || 0} // Ensure fallback value for properties
        commentCount={currentPost.commentCount || 0} // Ensure fallback value for properties
        createdAt={currentPost.created_at || ""} // Ensure fallback value for properties
        twitter={currentPost.twitter}
        github={currentPost.github}
        instagram={currentPost.instagram}
        id={currentPost.id}
        votes_count={currentPost.upvotes_count || 0} // Ensure fallback value for properties
        hasUpvoted={currentPost.hasUpvoted}
      />
    </div>
  );
};

export default ReadPost;
