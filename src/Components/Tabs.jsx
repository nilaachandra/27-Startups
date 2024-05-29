import React, { useState, useEffect } from "react";
import { BsFire, BsStars } from "react-icons/bs";
import { GiAchievement } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import Hotposts from "./Hotposts";
import Newposts from "./Newposts";
import { SiGoogleanalytics } from "react-icons/si";
import OpenAnalytics from "./OpenAnalytics";

const Tabs = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("new");

  useEffect(() => {
    const hash = location.hash.substring(1); // Remove the '#' from the hash
    if (["hot", "new", "analytics"].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  return (
    <div className="w-full mt-8 min-h-[50vh]">
      <div className="tab w-full sticky top-0  bg-light-bg mt-2 flex justify-around items-center border-b-4 border-zinc-300 py-3">
        <Link
          to="#hot"
          onClick={() => {
            setActiveTab("hot");
            window.scrollTo(0,0);
          }}
          className={`flex items-center gap-1 font-bold headfont-bold lg:text-xl text-base py-2 px-4 ${
            activeTab === "hot" ? "bg-slate-300 rounded-md" : "opacity-50"
          }`}
        >
          <BsFire />
          Hot
        </Link>
        <Link
          to="#new"
          onClick={() => {
            setActiveTab("new");
            window.scrollTo(0,0);
          }}
          className={`flex items-center gap-1 font-bold headfont-bold lg:text-xl text-base py-2 px-4 ${
            activeTab === "new" ? "bg-slate-300 rounded-md" : "opacity-50"
          }`}
        >
          <BsStars />
          New
        </Link>
        <Link
          to="#analytics"
          onClick={() => {
            setActiveTab("analytics");
            window.scrollTo(0,0);
          }}
          className={`flex items-center gap-1 font-bold headfont-bold lg:text-xl text-base py-2 px-4 ${
            activeTab === "analytics" ? "bg-slate-300 rounded-md" : "opacity-50"
          }`}
        >
          <SiGoogleanalytics />
          Analytics
        </Link>
      </div>
      {activeTab === "hot" && <Hotposts />}
      {activeTab === "new" && <Newposts />}
      {activeTab === "analytics" && <OpenAnalytics />}
      
    </div>
  );
};

export default Tabs;
