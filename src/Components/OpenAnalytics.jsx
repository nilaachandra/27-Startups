import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useSupaContext } from "../contexts/SupaContext";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const OpenAnalytics = () => {
  const { newPosts, isLoading, voteLength,commentLength ,refetch } = useSupaContext();
  const [totalVote, setTotalVote] = useState(0)
  const [totalComment, setTotalComment] = useState(0)
  const navigate = useNavigate();
  const hotPostsSort = (posts) => {
    return posts.sort((a, b) => b.engagements - a.engagements);
  };
  const hotPosts = newPosts ? hotPostsSort([...newPosts]) : [];
  const topPost = hotPosts.slice(0,3);

  useEffect(() => {
    const fetchVotes = async () => {
      const votes = await voteLength();
      setTotalVote(votes.length)
    };
    fetchVotes();
    const fetchComments = async () => {
      const comments = await commentLength();
      setTotalComment(comments.length)
    }
    fetchComments()
  }, [voteLength, commentLength]);
  return (
    <div className="w-h-[50vh] pt-4 headfont-regular flex gap-3 justify-center items-center flex-col">
      <div className="total w-full grid grid-cols-2 gap-2">
        <div className="p-4 posts shadow-lg rounded-md bg-white">
          <h1 className="font-bold flex justify-between items-center lg:text-lg text-sm">
            Total Ideas💡 : <span>{newPosts?.length || 0}💡</span>
          </h1>
        </div>
        <div className="p-4 upvotes shadow-lg rounded-md bg-white w-full">
          <h1 className="font-bold flex justify-between items-center lg:text-lg text-sm">
            Total Upvotes🦄 : <span>{totalVote}🦄</span>
          </h1>
        </div>
      </div>
      <div className="p-4 upvotes shadow-lg rounded-md bg-white w-full">
          <h1 className="font-bold flex justify-between items-center lg:text-lg text-sm">
            Total Replies : <span>{totalComment}💬</span>
          </h1>
        </div>
      <div className="flex w-full mt-1 flex-col gap-2">
        <h1 className="font-bold my-2 ">Top 3 Ideas💡: </h1>
        {isLoading ? (
          <Loader type="spin" color="#09a129" height={50} width={50} />
        ) : 
          topPost?.map((post, index) => 
            <PostCard
              onClick={(id) => {
                navigate(
                  `/${post.id}/${post.username}/${post.created_at}`
                );
              }}
              key={post.id}
              desc={post.description}
              username={post.username}
              social_username={post.social_username}
              upvotes_count={post.upvotes_count}
              engagements={post.engagements} // Updated to reflect the new property
              commentCount={post.comments.length}
              createdAt={post.created_at}
              twitter={post.twitter}
              github={post.github}
              instagram={post.instagram}
              id={post.id}
              votes_count={post.upvotes_count} // Updated to reflect the new property
              hasUpvoted={post.hasUpvoted}
            />
          )}
      </div>
    </div>
  );
};

export default OpenAnalytics;
