import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/root-action";
import { useSelector } from "react-redux";

import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const routeOf = {
  home: "",
  myClassroom: "my-classroom",
  createClassroom: "create-classroom",
  userSetting: "user-setting",
  signout: "signout",
};

export default function ClassroomNavbar() {
  const [render, setRender] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [menuClass, setMenuClass] = useState(" -translate-x-full");
  const [menuStyle, setMenuStyle] = useState({
    home: "text-azure bg-titanium border-r-azure border-r-4",
    myClassroom: "text-gray-600",
    createClassroom: "text-gray-600",
    userSetting: "text-gray-600",
    signout: "text-gray-600",
  });
  // TODO menu change on mobile should close the bar

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
    let path = `/app/${routeOf[menu]}`;
    navigate(path);
  };

  // Event emit when menu changed from anywhere
  const handleMenuChange = async (menu) => {
    let template = {
      home: "text-azure bg-titanium border-r-azure border-r-4",
      myClassroom: "text-gray-600",
      createClassroom: "text-gray-600",
      userSetting: "text-gray-600",
      signout: "text-gray-600",
    };
    for (let i in template) {
      if (i === menu) {
        template[i] = "text-azure bg-titanium border-r-azure border-r-4";
      } else {
        template[i] = "text-gray-600";
      }
    }
    setMenuStyle(template);
    setRender(!render);
  };

  const handleLogOut = () => {
    window.sessionStorage.accessToken = undefined;
    navigate("/");
  };

  useEffect(() => {}, []);

  useEffect(() => {
    handleMenuChange(state.app.currentMenu);
  }, [state.app.currentMenu]);

  return (
    <>
      {/* Large screen navigation */}
      <div className="flex h-screen relative w-fit">
        <div>
          <div className="fixed flex flex-col transition ease-in-out h-full w-[300px] bg-silver -translate-x-full laptop:translate-x-0  laptop:bottom-0 laptop:left-0 ">
            <span className="font-bold text-3xl  text-royal px-10 py-8 font-kanit">
              Smart <span className="text-golden">Classroom</span>
            </span>
            <button
              onClick={() => handleMenuClick("home")}
              className={`grid grid-cols-[20px_1fr] items-center transition-all text-xl  px-10 py-6 text-left font-kanit ${menuStyle.home} `}
            >
              <HomeIcon />
              <span className="ml-3">หน้าหลัก</span>
            </button>
            <button
              onClick={() => handleMenuClick("myClassroom")}
              className={`grid grid-cols-[20px_1fr] transition-all	text-xl  px-10 py-6 text-left font-kanit ${menuStyle.myClassroom}`}
            >
              <SchoolIcon />
              <span className="ml-3">ห้องเรียนของฉัน</span>
            </button>
            <button
              onClick={() => handleMenuClick("createClassroom")}
              className={`grid grid-cols-[20px_1fr] transition-all	text-xl  px-10 py-6 text-left font-kanit ${menuStyle.createClassroom}`}
            >
              <AddCircleOutlineIcon />
              <span className="ml-3">สร้างห้องเรียนใหม่</span>
            </button>
            <button
              onClick={() => handleMenuClick("userSetting")}
              className={`grid grid-cols-[20px_1fr] transition-all	text-xl  px-10 py-6 text-left font-kanit ${menuStyle.userSetting}`}
            >
              <SettingsIcon />
              <span className="ml-3">ตั้งค่าบัญชี</span>
            </button>
            <button
              onClick={() => handleMenuClick("signout")}
              className={`grid grid-cols-[20px_1fr] transition-all	text-xl  px-10 py-6 text-left font-kanit ${menuStyle.signout}`}
            >
              <LogoutIcon />
              <span className="ml-3">ออกจากระบบ</span>
            </button>
          </div>
          <div className="absolute w-72 laptop:static"></div>
        </div>
      </div>
      {/* Mobile Navigation */}
    </>
  );
}
