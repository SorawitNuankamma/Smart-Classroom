import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import "./styles/colors.css";
import PublicNavbar from "../components/public-navbar";
import Footer from "../components/footer";
import AppAlert from "../components/app-alert";
import ClassroomNavbar from "../components/classroom-navbar";
import MenuIcon from "@mui/icons-material/Menu";

//Service
const btnStyle = `px-7 py-5 transition-all ease-in-out hover:text-azure  text-left`;

export default function ClassroomApp() {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        className="grid grid-cols-[0px_1fr] laptop:grid-cols-classroomApp relative "
        onClick={() => {
          if (showNavMenu) setShowNavMenu(false);
        }}
      >
        <div className="col-span-1">
          <ClassroomNavbar />
        </div>
        <div className="col-span-auto">
          <Outlet />
        </div>
        {showNavMenu && (
          <div className="visible laptop:invisible fixed border-2 border-blue-200 right-10 bottom-32 flex flex-col-reverse font-kanit rounded-md shadow-sm bg-white">
            <button
              className={btnStyle}
              onClick={() => {
                navigate("/app/signout");
              }}
            >
              ออกจากระบบ
            </button>
            <button
              className={btnStyle}
              onClick={() => {
                navigate("/app/user-setting");
              }}
            >
              ตั้งค่าบัญชี
            </button>
            <button
              className={btnStyle}
              onClick={() => {
                navigate("/app/join-classroom");
              }}
            >
              เข้าร่วมห้องเรียน
            </button>
            <button
              className={btnStyle}
              onClick={() => {
                navigate("/app/my-classroom");
              }}
            >
              ห้องเรียนของฉัน
            </button>
            <button
              className={btnStyle}
              onClick={() => {
                navigate("/app");
              }}
            >
              หน้าหลัก
            </button>
          </div>
        )}
        <button
          onClick={() => {
            setShowNavMenu(!showNavMenu);
          }}
          className="fixed bottom-10 right-10 bg-azure p-3 text-white rounded-2xl visible laptop:invisible"
        >
          <MenuIcon fontSize="large" />
        </button>
      </div>
    </>
  );
}
