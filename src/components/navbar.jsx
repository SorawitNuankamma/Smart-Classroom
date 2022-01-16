import Button from "./button";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";

export default function Navbar() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [menuClass, setMenuClass] = useState(" -translate-x-full");

  const handleMenuClick = () => {
    if (!isMenuVisible) {
      setMenuClass(" translate-x-0");
    } else {
      setMenuClass(" -translate-x-full");
    }
    setMenuVisible(!isMenuVisible);
  };

  return (
    <>
      {/* Large screen navigation */}
      <div className="relative px-8 flex justify-between py-5 lg:px-48">
        <span className="font-bold text-2xl  text-zinc-700">
          Smart Classroom
        </span>
        <div className="flex invisible absolute md:visible md:static  ">
          <Button text="Main" type="link" path="/" />
          <Button text="About" type="link" path="/" />
          <Button text="Feature" type="link" path="/" />
          <Button text="Login" type="small" path="/login" />
        </div>
      </div>
      <Outlet />
      {/* Mobile Navigation */}
      <div className="absolute bottom-10 left-12 md:hidden">
        <div
          className={
            "fixed transition ease-in-out bottom-0 left-0 h-screen w-full backdrop-blur-xl bg-white/30 grid grid-cols-1 grid-rows-6 items-center justify-items-center" +
            menuClass
          }
        >
          <h1 className="text-3xl font-bold text-blue-600/75">
            Smart Classroom
          </h1>
          <div>Main</div>
          <div>About</div>
          <div>Feature</div>
          <div>Login</div>
        </div>
        <div
          onClick={handleMenuClick}
          className="fixed bottom-10 bg-blue-400 p-6 rounded-full shadow-md "
        >
          <svg
            width="30"
            height="34"
            viewBox="0 0 49 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 17H45"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 4H45"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 30H45"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
