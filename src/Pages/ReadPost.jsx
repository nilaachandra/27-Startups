import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSupaContext } from "../contexts/SupaContext";
import Loader from "../Components/Loader";
import ReadPostSingle from "../Components/ReadPostSingle";
import { FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";
import { FaAt, FaLink } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Toaster, toast } from "sonner";
import { RiErrorWarningFill } from "react-icons/ri";
import Button from "../Components/Button";
import ReplyCard from "../Components/ReplyCard";
const ReadPost = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { newPosts, isLoading, postReply, refetch } = useSupaContext();
  const [currentPost, setCurrentPost] = useState({});

  const [reply, setReply] = useState("");
  const [username, setUsername] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [socialType, setSocialType] = useState("Twitter");
  const [showSocials, setShowSocials] = useState(false); // New state variable
  const [isPosting, setIsPosting] = useState(false);

  const handleReplies = async (e) => {
    e.preventDefault();

    let twitter = false;
    let instagram = false;
    let github = false;

    if (showSocials) {
      switch (socialType) {
        case "Twitter":
          twitter = true;
          break;
        case "Instagram":
          instagram = true;
          break;
        case "Github":
          github = true;
          break;
        default:
          break;
      }
    }

    // Show loading state in button
    setIsPosting(true);
    // Simulate loading with setTimeout for 2 seconds
    setTimeout(async () => {
      const ideaReply = {
        idea_id: currentPost.id,
        reply,
        username,
        social_username: showSocials ? socialHandle : null,
        twitter,
        instagram,
        github,
      };

      await postReply(ideaReply)
      // Clear form fields after posting
      setReply("");
      setUsername("");
      setSocialHandle("");
      setSocialType("Twitter");
      setShowSocials(false);
      // Reset loading state
      setIsPosting(false);
      // Show success toast
      toast.success("Reply posted successfully!💬");
      refetch();
      window.scrollTo(0, 0)
    }, 1500);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const shareIdea = async () => { 
    if(navigator.share) {
      try {
        await navigator.share({
          url: window.location.href
        })
      } catch (error) {
        toast.error('Could Not Share Post!')
      }
    }
  }
  
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
      <Toaster richColors position="top-center" duration={2500} />

      <div className="flex items-center hover:underline gap-1 w-full cursor-pointer" onClick={() => navigate('/')}>
        <IoIosArrowBack size={24}/>
        <h1 className="text-left" >Back</h1>
      </div>


      <ReadPostSingle
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

      <div className="socials flex lg:flex-row flex-col gap-1.5 mt-3 items-center">
        <h1 className="font-semibold lg:mr-0 mr-4">Share Your Idea</h1>
        <div className="flex gap-3">
        <div onClick={shareIdea} className="share cursor-pointer bg-slate-400 w-10 h-10 flex items-center justify-center rounded-full p-2">
          <FaLink size={24}/>
        </div>
        <FacebookShareButton url={window.location.href}>
          <FacebookIcon className="rounded-full w-10 h-10 cursor-pointer"/>
        </FacebookShareButton>
        <TwitterShareButton url={window.location.href}>
          <XIcon className="rounded-full w-10 h-10 cursor-pointer"/>
        </TwitterShareButton>
        <WhatsappShareButton url={window.location.href}>
          <WhatsappIcon className="rounded-full w-10 h-10 cursor-pointer"/>
        </WhatsappShareButton>
        <FacebookMessengerShareButton url={window.location.href}>
          <FacebookMessengerIcon className="rounded-full w-10 h-10 cursor-pointer"/>
        </FacebookMessengerShareButton>
        </div>
      </div>
      <div className="flex w-full items-start flex-col">
      <h1>Replies To this Idea</h1>


      </div>
{currentPost.comments.length > 0 ? <div className="replies w-full gap-2 flex items-start flex-col">
      {currentPost.comments.map((rep,i) => 
        <div key={i}>
          <ReplyCard
        reply={rep.reply}
        socialUsername = {rep.social_username}
        username={rep.username}
        createdAt={rep.created_at}
        github={rep.github}
        twitter={rep.twitter}
        instagram={rep.instagram}
        />
        </div>
      )}
      </div> : 
      <div className="w-full flex"><p>There are no replies to this Idea. Add one!</p></div>}
  


      <div className="w-full mb-4 lg:p-2 p-1 headfont-regular flex flex-col gap-4">
      <h1 className="text-base lg:text-3xl headfont-bold">
        Add Your Replies Here💬
      </h1>
      <form onSubmit={handleReplies} className="flex flex-col gap-4">
        <label htmlFor="description" className="flex flex-col gap-2">
          <span className="lg:text-lg text-sm text-light-text">
            Your Reply 💬
          </span>
          <textarea
            id="description"
            rows={6}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="rounded-md border p-2 border-light-text"
            placeholder="Well Go on, reply him or be the founder yourself!"
            required
          ></textarea>
        </label>
        <label htmlFor="username" className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="lg:text-lg text-sm text-light-text">
              Your Username👨🏻‍💼
            </span>
            <span className="lg:text-lg text-sm text-light-text flex items-center gap-1">
              <RiErrorWarningFill />
              No Account Needed!
            </span>
          </div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))
            }
            className="rounded-md p-3 border border-light-text"
            required
          />
        </label>

        <label className="flex items-center  gap-2">
          
          <span className="lg:text-lg text-sm text-light-text">
            Show off Your Socials🤳🏽?
          </span>
          <input
            type="checkbox"
            checked={showSocials}
            onChange={(e) => setShowSocials(e.target.checked)}
            className="w-6 h-6"
          />
        </label>

        {showSocials && (
          <label htmlFor="social" className="flex flex-col w-full gap-2">
            <span className="lg:text-lg text-sm text-light-text">
              Social Media Handle
            </span>
            <div className="flex items-center w-full flex-col lg:gap-0 gap-3 lg:flex-row">
              <div className="flex items-center w-full">
                <span className="text-light-text rounded-l-md bg-zinc-400 p-3">
                  <FaAt size={25} />
                </span>
                <input
                  type="text"
                  id="social"
                  value={socialHandle}
                  onChange={(e) => setSocialHandle(e.target.value.toLowerCase().replace(/\s/g, ""))}
                  className="rounded-r-md p-3 w-full border border-zinc-400"
                  placeholder="Your social media handle..."
                />
              </div>
              <select
                id="socialType"
                value={socialType}
                onChange={(e) => setSocialType(e.target.value)}
                className="p-3 rounded-md lg:ml-2 ml-0 border border-zinc-400 w-full lg:w-1/2"
              >
                <option value="Twitter">Twitter</option>
                <option value="Instagram">Instagram</option>
                <option value="Github">Github</option>
              </select>
            </div>
          </label>
        )}

        <Button
          type="submit"
          className="group py-3 w-full flex gap-3 items-center justify-center text-lg"
          disabled={isPosting}
        >
          {isPosting ? (
            <span className="flex items-center gap-3">
              <Loader type="spin" color="#ffffff" height={25} width={25} />
              Replying
            </span>
          ) : (
            <span>Reply</span>
          )}
          <span className="inline-block group-hover:scale-150 transition-all duration-200">
            ➤
          </span>
        </Button>
      </form>
      {/* {error && <p className="text-red-500">{error}</p>} */}
    </div>

    </div>
  );
};

export default ReadPost;
