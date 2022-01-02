import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/root-action";
import { useSelector } from "react-redux";

export default function Dashbar() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [menuClass, setMenuClass] = useState(" -translate-x-full");
  const [menuStyle, setMenuStyle] = useState({
    home: "text-azure bg-titanium border-r-azure border-r-4",
    myClassroom: "text-gray-600",
    createClassroom: "text-gray-600",
    setting: "text-gray-600",
  });

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { setCurrentMenu } = bindActionCreators(actionCreators, dispatch);

  const navigate = useNavigate();

  const handleMobileNav = () => {
    if (!isMenuVisible) {
      setMenuClass(" translate-x-0");
    } else {
      setMenuClass(" -translate-x-full");
    }
    setMenuVisible(!isMenuVisible);
  };

  const handleMenuClick = (menu) => {
    if (menu === state.app.currentMenu) {
      return;
    }
    setCurrentMenu(menu);
    //Routing
    let path;
    if (menu === "home") {
      path = `/home`;
    } else {
      path = `/home/${menu}`;
    }
    navigate(path);
  };

  const handleMenuChange = async (menu) => {
    let template = {
      home: "text-azure bg-titanium border-r-azure border-r-4",
      myClassroom: "text-gray-600",
      createClassroom: "text-gray-600",
      setting: "text-gray-600",
    };
    for (let i in template) {
      if (i === menu) {
        template[i] = "text-azure bg-titanium border-r-azure border-r-4";
      } else {
        template[i] = "text-gray-600";
      }
    }
    setMenuStyle(template);
  };

  const handleLogOut = () => {
    window.sessionStorage.accessToken = undefined;
    navigate("/");
  };

  useEffect(() => {
    console.log(state);
  }, []);

  useEffect(() => {
    async function onStateChange() {
      await handleMenuChange(state.app.currentMenu);
    }
    onStateChange();
  }, [state.app.currentMenu]);

  return (
    <>
      {/* Large screen navigation */}
      <div className="flex h-screen relative">
        <div>
          <div className="flex flex-col transition ease-in-out h-full w-72 bg-silver -translate-x-full fixed laptop:translate-x-0  laptop:bottom-0 laptop:left-0 ">
            <span className="font-bold text-3xl  text-royal px-10 py-8 font-kanit">
              Smart <span className="text-golden">Classroom</span>
            </span>
            <button
              onClick={() => handleMenuClick("home")}
              className={`transition-all	text-xl  px-10 py-6 text-left font-kanit ${menuStyle.home} `}
            >
              Home
            </button>
            <button
              onClick={() => handleMenuClick("myClassroom")}
              className={`transition-all	text-xl  px-10 py-6 text-left font-kanit ${menuStyle.myClassroom}`}
            >
              My Classroom
            </button>
            <button
              onClick={() => handleMenuClick("createClassroom")}
              className={`transition-all	text-xl  px-10 py-6 text-left font-kanit ${menuStyle.createClassroom}`}
            >
              Create a Classroom
            </button>
            <button
              onClick={() => handleMenuClick("setting")}
              className={`transition-all	text-xl  px-10 py-6 text-left font-kanit ${menuStyle.setting}`}
            >
              Setting
            </button>
            <button
              onClick={handleLogOut}
              className="text-xl  px-10 py-8 text-left font-kanit text-gray-600"
            >
              Sign out
            </button>
          </div>
          <div className="absolute w-72 laptop:static"></div>
        </div>
        <Outlet />
      </div>
      {/* Mobile Navigation */}
      <div className="absolute bottom-10 left-12 laptop:hidden">
        <div
          className={
            "fixed transition ease-in-out bottom-0 left-0 h-screen w-full backdrop-blur-xl bg-silver grid grid-cols-1 grid-rows-6 items-center justify-items-center" +
            menuClass
          }
        >
          <span className="font-bold text-3xl px-10 py-8 text-royal ">
            Smart <span className="text-golden">Classroom</span>
          </span>
          <button
            onClick={(e) => handleMenuClick("home")}
            className={`transition-all	text-xl  px-10 py-6 text-left font-kanit ${menuStyle.home} w-full text-center`}
          >
            Home
          </button>
          <button
            onClick={(e) => handleMenuClick("myClassroom")}
            className={`transition-all	text-xl  px-10 py-6 text-left font-kanit ${menuStyle.myClassroom} w-full text-center`}
          >
            My Classroom
          </button>
          <button
            onClick={(e) => handleMenuClick("createClassroom")}
            className={`transition-all	text-xl  px-10 py-6 text-left font-kanit ${menuStyle.createClassroom} w-full text-center`}
          >
            Create a Classroom
          </button>
          <button
            onClick={(e) => handleMenuClick("setting")}
            className={`transition-all	text-xl  px-10 py-6 text-left font-kanit ${menuStyle.setting} w-full text-center`}
          >
            Setting
          </button>
          <button
            onClick={handleLogOut}
            className="transition-all	text-xl font-semibold text-gray-600 px-10 py-8  w-full text-center"
          >
            Sign out
          </button>
        </div>
        <div
          onClick={handleMobileNav}
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
