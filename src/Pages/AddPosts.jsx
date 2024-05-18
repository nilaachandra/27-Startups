import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaAt } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

const AddPosts = () => {
  return (
    <div className="w-full mb-4 lg:p-2 p-1 headfont-regular flex flex-col gap-4">
      <h1 className="text-base lg:text-3xl mb-4 headfont-bold">
        Add Your potential Unicorn Product/Startup Idea!
      </h1>
      <label htmlFor="" className="flex flex-col gap-2">
        <span className="text-lg text-light-text">Your Idea💡</span>
        <textarea
          name=""
          id=""
          rows={6}
          className="rounded-md border p-2 border-light-text"
          placeholder="What was that Idea that popped up in your mind while you were Pooping?"
        ></textarea>
      </label>
      <label htmlFor="" className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-lg text-light-text">Your Username👨🏻‍💼</span>
          <span className="text-lg text-light-text flex items-center gap-1">
            <RiErrorWarningFill />
            No Account Needed!
          </span>
        </div>
        <input
          type="text"
          name=""
          id=""
          className="rounded-md p-3 border border-light-text"
        />
      </label>

      <label htmlFor="" className="flex flex-col w-full gap-2">
        <span className="text-lg text-light-text">
          {" "}
          Show off Your Socials🤳🏽
        </span>
        <div className="flex items-center w-full flex-col lg:gap-0 gap-3 lg:flex-row">
          <div className="flex items-center w-full">
            <span className="text-light-text rounded-l-md bg-zinc-400 p-3">
              <FaAt size={25} />
            </span>
            <input
              type="text"
              name=""
              id=""
              className="rounded-r-md p-3 w-full border border-zinc-400"
            />
          </div>
          <select className="p-3 rounded-md lg:ml-2 ml-0 border border-zinc-400 w-full lg:w-1/2">
            <option value="Twitter">
              <FaSquareXTwitter />
              Twitter
            </option>
            <option value="Twitter">
              <FaInstagramSquare />
              Instagram
            </option>
            <option value="Twitter">
              <FaSquareGithub />
              Github
            </option>
          </select>
        </div>
      </label>
    </div>
  );
};

export default AddPosts;
