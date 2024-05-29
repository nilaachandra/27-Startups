import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { useSupaContext } from "../contexts/SupaContext";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const OpenAnalytics = () => {
  const { newPosts, isLoading, voteLength, refetch } = useSupaContext();
  const [totalVote, setTotalVote] = useState(0)
  const navigate = useNavigate();
  const hotPostsSort = (posts) => {
    return posts.sort((a, b) => b.engagements - a.engagements);
  };
  const hotPosts = newPosts ? hotPostsSort([...newPosts]) : [];
  const topPost = hotPosts[0];
  useEffect(() => {
    const fetchVotes = async () => {
      const votes = await voteLength();
      setTotalVote(votes.length)
    };

    fetchVotes();
  }, [voteLength]);
  return (
    <div className="w-h-[50vh] pt-4 headfont-regular flex gap-3 justify-center items-center flex-col">
      <div className="total w-full grid grid-cols-2 gap-2">
        <div className="p-4 posts shadow-lg rounded-md bg-white">
          <h1 className="font-bold flex justify-between items-center lg:text-lg text-sm">
            Total Posts : <span>{newPosts?.length || 0}💡</span>
          </h1>
        </div>
        <div className="p-4 upvotes shadow-lg rounded-md bg-white w-full">
          <h1 className="font-bold flex justify-between items-center lg:text-lg text-sm">
            Total Upvotes : <span>{totalVote}🦄</span>
          </h1>
        </div>
      </div>
      <div>
        <h1 className="font-bold my-3">Top Post: </h1>
        {isLoading ? (
          <Loader type="spin" color="#09a129" height={50} width={50} />
        ) : (
          topPost && (
            <PostCard
              onClick={(id) => {
                navigate(
                  `/${topPost.id}/${topPost.username}/${topPost.created_at}`
                );
              }}
              key={topPost.id}
              desc={topPost.description}
              username={topPost.username}
              social_username={topPost.social_username}
              upvotes_count={topPost.upvotes_count}
              engagements={topPost.engagements} // Updated to reflect the new property
              commentCount={topPost.comments.length}
              createdAt={topPost.created_at}
              twitter={topPost.twitter}
              github={topPost.github}
              instagram={topPost.instagram}
              id={topPost.id}
              votes_count={topPost.upvotes_count} // Updated to reflect the new property
              hasUpvoted={topPost.hasUpvoted}
            />
          )
        )}
      </div>
    </div>
  );
};

export default OpenAnalytics;
