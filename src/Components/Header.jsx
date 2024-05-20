import React from "react";
import Button from "./Button";
import { FaPlus } from "react-icons/fa6";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
const Header = () => {
  const location = useLocation();
  return (
    <header className="lg:w-1/2 sm:w-full w-full mb-4 mx-auto shadow-lg bg-white lg:p-2 p-1 rounded-xl">
      <nav className="flex justify-between items-center w-full">
        <Logo />
        {location.pathname === "/" ? (
          <Button className="gap-2 group">
            <Link to="/add-an-idea" className="flex items-center gap-2">
              <FaPlus />
              <span className="lg:group-hover:scale-[1.7] lg:group-hover:rotate-[24deg] text-xl transition-all duration-200">
                💡
              </span>
            </Link>
          </Button>
        ) : (
          <Link to="/">
            <Button className="flex items-center gap-2 group">
              <IoArrowBackSharp />
              <span className="lg:group-hover:scale-[1.5] text-xl transition-all duration-200">
                🏠
              </span>
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
