import React, { useState, useEffect } from "react";

export default function NavMenu() {
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
    <div className="absolute bottom-10 left-12 md:hidden">
      <div
        className={
          "fixed transition ease-in-out bottom-0 left-0 h-screen w-full shadow-sm bg-sky-100 grid grid-cols-1 grid-rows-6 items-center justify-items-center" +
          menuClass
        }
      >
        <h1 className="text-3xl font-bold text-blue-600/75">Smart Classroom</h1>
        <div>sdsd</div>
        <div>sdsd</div>
        <div>sdsd</div>
        <div>sdsd</div>
      </div>
      <div
        onClick={handleMenuClick}
        className="fixed bottom-10 bg-blue-400 p-6 rounded-full shadow-md "
      >
        <svg
          width="49"
          height="34"
          viewBox="0 0 49 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 17H45"
            stroke="white"
            stroke-width="7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 4H45"
            stroke="white"
            stroke-width="7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 30H45"
            stroke="white"
            stroke-width="7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
