import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex-col flex justify-center">
      <h1
        className={`headfont-bold lg:text-5xl text-3xl mb-3 text-center leading-[2rem] lg:leading-[3.4rem]`}
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
        ideas chosen by{" "}
        <span className="text-light-button group">
          You
          <span className="inline-block group-hover:scale-125 transform transition-transform duration-200">
            🫵
          </span>
        </span>{" "}
        &{" "}
        <span className="text-light-button group">
          Internet
          <span className="inline-block group-hover:scale-125 transform transition-transform duration-200">
            🌎
          </span>
        </span>
        .
      </h1>
      <p
        className={`text-center text-[1rem] lg:text-[1.4rem] headfont-regular leading-5 lg:leading-8`}
      >
        <span className="group font-bold">
          Unicorn
          <span className="inline-block group-hover:scale-150 transform transition-transform duration-200">
            🦄
          </span>
        </span>
        ,{" "}
        <span className="group font-bold">
          Coffin
          <span className="inline-block group-hover:scale-150 transform transition-transform duration-200">
            ⚰️
          </span>
        </span>{" "}
        &{" "}
        <span className="group font-bold">
          Comment
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
        . Or{" "}
        <span className="group underline text-light-button font-bold ">
          Write
          <span className="inline-block group-hover:scale-150 transform transition-transform duration-200">
            ✍️
          </span>
        </span>{" "}
        Your Own!<br/>
        <span className="font-semibold">No Account Needed!</span>
      </p>
    </div>
  );
};

export default Hero;
