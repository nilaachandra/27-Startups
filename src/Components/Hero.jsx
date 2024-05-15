import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex-col flex justify-center">
      <h1 className={`headfont-bold lg:text-5xl text-3xl text-center leading-[2rem] lg:leading-[3.2rem]`}>
        Top 27 <span className="text-light-button">Startup🚀</span> or{" "}
        <span className="text-light-button">App📱</span>ideas chosen by <span className="text-light-button">You🫵</span> & <span className="text-light-button">Internet🌐</span>.
      </h1>
      <p>
        Unicorn or Coffin your Favorites. Or Write Your Own! No Account Needed
      </p>
    </div>
  );
};

export default Hero;
