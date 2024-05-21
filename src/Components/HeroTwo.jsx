import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";

const HeroTwo = () => {
  return (
    <div className="w-full flex-col mt-12 flex items-center justify-center headfont-regular">
      <p className="text-center mb-4">
        Looks like you've scrolled too much! Go back and work on your Startup 😡
      </p>
      <Link to="/add-an-idea" className="lg:w-1/2 w-full flex items-center justify-center mb-8">
        <Button className="flex items-center gap-2 w-full group">
          <FaPlus />
          Add a Startup Idea
          <span className="lg:group-hover:scale-[1.5] text-xl transition-all duration-200">
            💡
          </span>
        </Button>
      </Link>
      <div className="w-full flex items-start justify-start">
      <h1 className={`headfont-bold text-left text-lg lg:text-2xl mt-4 mb-3 font-bold`}>
        Tell me about <span className="text-light-button">27StartUps </span>, please🥺!
      </h1>
      </div>
      <p className="text-base lg:text-xl">
        Oh, sure, You know the internet is the best place to find the top
        startup🚀 ideas. So I'm making 27StartUps, where anyone can throw in their
        two cents without even needing an account. Just <Link to='/add-an-idea' className="text-light-button underline">post</Link>✍️ your revolutionary
        startup idea that you probably dreamt of while you were taking a poop💩 in the bathroom
        🚽 and let the online hive mind upvote the best ones that could be the
        next Unicorn 🦄. Because crowdsourcing always leads to the best results,
        right? 🤔
      </p>
      <p className="text-base lg:text-xl mt-4">If you have any feedback, or want to contribute please reach out to me on <a href="https://x.com/nilaacodes" target="_blank" className="cursor-pointer text-light-button underline">Twitter.</a></p>
    </div>
  );
};

export default HeroTwo;
