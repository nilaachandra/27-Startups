import React from "react";

const HeroTwo = () => {
  return (
    <div className="w-full flex-col mt-4 flex justify-center headfont-regular">
      <h1 className={`headfont-bold text-lg lg:text-2xl mt-4 mb-3 font-bold`}>
        Tell me about <span className="text-light-button">27StartUps </span>, please🥺!
      </h1>
      <p className="text-base lg:text-xl">
        Oh, sure, You know the internet is the best place to find the top
        startup🚀 ideas. So I'm making 27StartUps, where anyone can throw in their
        two cents without even needing an account. Just <span className="text-light-button underline">post</span>✍️ your revolutionary
        startup idea that you probably dreamt of while you were taking a poop💩 in the bathroom
        🚽 and let the online hive mind upvote the best ones that could be the
        next Unicorn 🦄. Because crowdsourcing always leads to the best results,
        right? 🤔
      </p>
      <p className="text-base lg:text-xl mt-4">If you have any feedback, or want to contribute please reach out to me on <span className="cursor-pointer text-light-button underline">Twitter.</span></p>
    </div>
  );
};

export default HeroTwo;
