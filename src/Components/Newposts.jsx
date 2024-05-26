import { Link } from "react-router-dom";
import { useSupaContext } from "../contexts/SupaContext";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";
import Loader from './Loader';
import PostCard from './PostCard';

const Newposts = () => {
  const { newPosts, isLoading } = useSupaContext();

  return (
    <div
      className="w-h-[50vh] pt-4 headfont-regular flex gap-3 justify-center items-center flex-col"
      id="hot"
    >
      {isLoading ? (
        <Loader type="spin" color="#09a129" height={50} width={50} />
      ) : (
        newPosts?.map((post) => (
          <PostCard
            key={post.id}
            desc={post.description}
            username={post.username}
            social_username={post.social_username}
            upvotes_count={post.upvotes_count} // Updated to reflect the new property
            commentCount={post.commentCount}
            createdAt={post.created_at}
            twitter={post.twitter}
            github={post.github}
            instagram={post.instagram}
            id={post.id}
            votes_count={post.upvotes_count} // Updated to reflect the new property
            hasUpvoted={post.hasUpvoted}
          />
        ))
      )}
    </div>
  );
};

export default Newposts;
