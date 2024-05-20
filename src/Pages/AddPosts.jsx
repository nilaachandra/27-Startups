import React, { useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaAt } from "react-icons/fa";
import Button from "../Components/Button";
import { useSupaContext } from "../contexts/SupaContext";
import { Toaster, toast } from "sonner";
import Loader from "../Components/Loader";

const AddPosts = () => {
  const { postIdea, loading, error } = useSupaContext();
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [socialType, setSocialType] = useState("Twitter");
  const [isPosting, setIsPosting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let twitter = false;
    let instagram = false;
    let github = false;

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

    // Show loading state in button
    setIsPosting(true);
    // Simulate loading with setTimeout for 2 seconds
    setTimeout(async () => {
      const ideaData = {
        description,
        username,
        social_username: socialHandle,
        twitter,
        instagram,
        github,
      };

      await postIdea(ideaData);
      // Clear form fields after posting
      setDescription("");
      setUsername("");
      setSocialHandle("");
      setSocialType("Twitter");
      // Reset loading state
      setIsPosting(false);
      // Show success toast
      toast.success("Startup Idea posted successfully!🚀");
    }, 1500);
  };
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <div className="w-full mb-4 lg:p-2 p-1 headfont-regular flex flex-col gap-4">
      <h1 className="text-base lg:text-3xl mb-4 headfont-bold">
        Add Your potential Unicorn Product/Startup Idea!
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="description" className="flex flex-col gap-2">
          <span className="lg:text-lg text-sm text-light-text">
            Your Idea💡
          </span>
          <textarea
            id="description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-md border p-2 border-light-text"
            placeholder="What was that Idea that popped up in your mind while you were Pooping?"
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

        <label htmlFor="social" className="flex flex-col w-full gap-2">
          <span className="lg:text-lg text-sm text-light-text">
            Show off Your Socials🤳🏽
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

        <Button
          type="submit"
          className="group py-3 w-full flex gap-3 items-center justify-center text-lg"
          disabled={isPosting}
        >
          {isPosting ? (
            <span className="flex items-center gap-3">
              <Loader type="spin" color="#ffffff" height={25} width={25} />
              Posting
            </span>
          ) : (
            <span>Post</span>
          )}
          <span className="inline-block group-hover:scale-150 transition-all duration-200">
            ➤
          </span>
        </Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <Toaster richColors position="top-center" duration={2500} />
    </div>
  );
};

export default AddPosts;
