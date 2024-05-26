import React from "react";
import { Link } from "react-router-dom";



const Hero = () => {
  return (
    <div className="w-full flex-col flex justify-center">
      <h1
        className={`headfont-bold lg:text-5xl text-4xl mb-4 font-bold text-center leading-[2.4rem] lg:leading-[3.6rem]`}
      >
        Top 27{" "}
        <span className="text-light-button group">
          Startup
          <span className="inline-block group-hover:scale-125 transform transition-transform duration-200">
            🚀
          </span>
        </span>{" "}
        or{" "}
        <span className="text-light-button group">
          App
          <span className="inline-block group-hover:scale-125 transform transition-transform duration-200">
            📱
          </span>
        </span>
        <span className="text-light-button group">
          Ideas
          <span className="inline-block group-hover:scale-125 transform transition-transform duration-200 rotate-[30deg]">
            💡
          </span>
        </span>chosen by{" "}
        <span className="text-light-button group">
          You
          <span className="inline-block group-hover:scale-125 transform transition-transform duration-200">
            🫵
          </span>
        </span>
        &{" "}
        <span className="text-light-button group">
          Internet
          <span className="inline-block group-hover:scale-125 transform transition-transform duration-200">
            🌎
          </span>
        </span>
      </h1>
      <p
        className={`text-center text-[1rem] lg:text-[1.4rem] headfont-regular leading-5 lg:leading-8`}
      >
        <span className="group font-bold">
          Unicorn
          <span className="inline-block group-hover:scale-150 transform transition-transform duration-200">
            🦄
          </span>
        </span>{" "}
        &{" "}
        <span className="group font-bold">
          Reply
          <span className="inline-block  group-hover:scale-150 transform transition-transform duration-200">
            💬
          </span>
        </span>{" "}
        your{" "}
        <span className="group font-bold">
          Favorites
          <span className="inline-block group-hover:scale-150 transform transition-transform duration-200">
            ✨
          </span>
        </span>
        <br/>Or{" "}
        <Link to='/add-an-idea' className="group underline text-light-button font-bold">
          Write
          <span className="inline-block group-hover:scale-150 transform transition-transform duration-200">
            ✍️
          </span>
        </Link>{" "}
        Your Own! <span className="font-semibold">No Account Needed!</span>
      </p>
    </div>
  );
};

export default Hero;
