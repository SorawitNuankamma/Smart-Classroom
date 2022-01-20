import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

//Component
import ClassroomMenuButton from "../../../components/classroomMenuButton";

import InfoIcon from "@mui/icons-material/Info";
import CampaignIcon from "@mui/icons-material/Campaign";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ViewListIcon from "@mui/icons-material/ViewList";
import SettingsIcon from "@mui/icons-material/Settings";

//REDUX
import { useSelector } from "react-redux";

//Service
const classroomService = require("../../../services/classroom");

export default function ClassroomMainPage() {
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
    }
    initial();
  }, []);

  const handleRouting = (route) => {
    navigate(`${route}`);
  };

  return (
    <>
      <div
        className="ml-12 mt-8 font-kanit text-blue-400 hover:text-blue-600 cursor-pointer"
        onClick={() => {
          navigate(`../../my-classroom`);
        }}
      >
        <span className="text-azure">
          <ArrowBackIosIcon />
        </span>
        กลับไปหน้าที่แล้ว
      </div>
      <div className="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3 w-fit">
        <div className="ml-12 mt-8 font-kanit">
          <span className="text-xl text-gray-600">หน้าหลัก</span>
          <div
            className="bg-iron cursor-pointer text-gray-600 text-xl w-[20rem] py-5 px-5 rounded-md shadow-md mt-4 grid grid-cols-[25px_1fr] items-center"
            onClick={() => {
              handleRouting(`classroom-information`);
            }}
          >
            <span className="text-azure">
              <InfoIcon />
            </span>
            <span className="ml-3">ข้อมูลของห้องเรียน</span>
          </div>
          <div
            className="bg-iron cursor-pointer text-gray-600 text-xl w-[20rem] py-5 px-5 rounded-md shadow-md mt-4 grid grid-cols-[25px_1fr] items-center"
            onClick={() => {
              handleRouting(`classroom-annoucement`);
            }}
          >
            <span className="text-azure">
              <CampaignIcon />
            </span>
            <span className="ml-3">ประกาศ</span>
          </div>
          <div
            className="bg-iron cursor-pointer text-gray-600 text-xl w-[20rem] py-5 px-5 rounded-md shadow-md mt-4 grid grid-cols-[25px_1fr] items-center"
            onClick={() => {
              handleRouting(`classroom-lesson`);
            }}
          >
            <span className="text-azure">
              <MenuBookIcon />
            </span>
            <span className="ml-3">บทเรียน</span>
          </div>
          <div
            className="bg-iron cursor-pointer text-gray-600 text-xl w-[20rem] py-5 px-5 rounded-md shadow-md mt-4 grid grid-cols-[25px_1fr] items-center"
            onClick={() => {
              handleRouting(`classroom-assignment`);
            }}
          >
            <span className="text-azure">
              <AssignmentIcon />
            </span>
            <span className="ml-3">แบบฝึกหัด</span>
          </div>
        </div>
        {state.user.currentClassroomRole !== "student" && (
          <div className="ml-12 mt-8 font-kanit">
            <span className="text-xl text-gray-600">เมนูอาจารย์ผู้สอน</span>
            <div
              className="bg-iron cursor-pointer text-gray-600 text-xl w-[20rem] py-5 px-5 rounded-md shadow-md mt-4 grid grid-cols-[25px_1fr] items-center"
              onClick={() => {
                handleRouting(`classroom-assignment`);
              }}
            >
              <span className="text-azure">
                <AccountBoxIcon />
              </span>
              <span className="ml-3">สมาชิกห้องเรียน</span>
            </div>
            <div
              className="bg-iron cursor-pointer text-gray-600 text-xl w-[20rem] py-5 px-5 rounded-md shadow-md mt-4 grid grid-cols-[25px_1fr] items-center"
              onClick={() => {
                handleRouting(`classroom-scoreboard`);
              }}
            >
              <span className="text-azure">
                <ViewListIcon />
              </span>
              <span className="ml-3">คะแนนสมาชิกห้องเรียน</span>
            </div>
          </div>
        )}
        {state.user.currentClassroomRole === "owner" && (
          <div className="ml-12 mt-8 font-kanit">
            <span className="text-xl text-gray-600">เมนูผู้ดูแลห้องเรียน</span>
            <div
              className="bg-iron cursor-pointer text-gray-600 text-xl w-[20rem] py-5 px-5 rounded-md shadow-md mt-4 grid grid-cols-[25px_1fr] items-center"
              onClick={() => {
                handleRouting(`classroom-setting`);
              }}
            >
              <span className="text-azure">
                <SettingsIcon />
              </span>
              <span className="ml-3">ตั้งค่าห้องเรียน</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
