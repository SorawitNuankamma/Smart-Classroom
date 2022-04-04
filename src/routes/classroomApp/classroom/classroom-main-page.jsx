import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Divider from "@mui/material/Divider";

//Component
import ClassroomMenuButton from "../../../components/classroomMenuButton";

import InfoIcon from "@mui/icons-material/Info";
import CampaignIcon from "@mui/icons-material/Campaign";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ViewListIcon from "@mui/icons-material/ViewList";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

//REDUX
import { useSelector } from "react-redux";

//Service

const btnStyle = `bg-[#f5f5f5] hover:bg-[#f0f0f0] transition-all ease-in-out cursor-pointer text-gray-600 text-xl  py-5 px-5 mt-4 grid grid-cols-[25px_1fr] items-center rounded-sm w-72 lg:w-96 shadow-md rounded-md`;

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
    <div className="ml-12">
      <div
        className="mt-8 font-kanit text-blue-400 hover:text-blue-600 cursor-pointer"
        onClick={() => {
          navigate(`../../my-classroom`);
        }}
      >
        <span className="text-azure">
          <ArrowBackIosIcon />
        </span>
        กลับไปหน้าที่แล้ว
      </div>
      <div className="mt-8  font-kanit flex flex-row items-center">
        <span className="text-4xl text-gray-600 ">เมนูหลัก</span>
      </div>
      <div>
        <button
          onClick={() => {
            window.open(
              "https://cdn.filestackcontent.com/lwqHfwiYQVmXZv2z2inX"
            );
          }}
          className="text-green-600 text-sm"
        >
          วิธีการเชื่อมต่อห้องเรียนกับ Line
        </button>
      </div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      <div className="grid grid-cols-1 laptop:grid-cols-2 w-fit gap-3">
        <div className=" mt-8 font-kanit">
          <span className="text-xl text-gray-600">เมนูทั่วไป</span>
          <div
            className={btnStyle}
            onClick={() => {
              handleRouting(`classroom-information`);
            }}
          >
            <span className="text-azure">
              <InfoIcon fontSize="large" />
            </span>
            <span className="ml-8">ข้อมูลของห้องเรียน</span>
          </div>
          {false && (
            <div
              className={btnStyle}
              onClick={() => {
                handleRouting(`classroom-my-profile`);
              }}
            >
              <span className="text-azure">
                <PersonIcon fontSize="large" />
              </span>
              <span className="ml-8">ข้อมูลของฉันในห้องเรียน</span>
            </div>
          )}
          <div
            className={btnStyle}
            onClick={() => {
              handleRouting(`classroom-annoucement`);
            }}
          >
            <span className="text-azure">
              <CampaignIcon fontSize="large" />
            </span>
            <span className="ml-8">ประกาศ</span>
          </div>
          <div
            className={btnStyle}
            onClick={() => {
              handleRouting(`classroom-lesson`);
            }}
          >
            <span className="text-azure">
              <MenuBookIcon fontSize="large" />
            </span>
            <span className="ml-8">บทเรียน</span>
          </div>
          <div
            className={btnStyle}
            onClick={() => {
              handleRouting(`classroom-assignment`);
            }}
          >
            <span className="text-azure">
              <AssignmentIcon fontSize="large" />
            </span>
            <span className="ml-8">แบบฝึกหัด</span>
          </div>
          <div
            className={btnStyle}
            onClick={() => {
              handleRouting(`classroom-scoreboard`);
            }}
          >
            <span className="text-azure">
              <ViewListIcon fontSize="large" />
            </span>
            <span className="ml-8">คะแนนสมาชิกห้องเรียน</span>
          </div>
        </div>
        {state.user.currentClassroomRole !== "Student" && (
          <div className="mt-8 font-kanit">
            <span className="text-xl text-gray-600">เมนูอาจารย์ผู้สอน</span>
            <div
              className={btnStyle}
              onClick={() => {
                handleRouting(`classroom-members`);
              }}
            >
              <span className="text-azure">
                <AccountBoxIcon fontSize="large" />
              </span>
              <span className="ml-8">สมาชิกห้องเรียน</span>
            </div>
          </div>
        )}
        {state.user.currentClassroomRole === "Owner" && (
          <div className="mt-8 font-kanit">
            <span className="text-xl text-gray-600">เมนูผู้ดูแลห้องเรียน</span>
            <div
              className={btnStyle}
              onClick={() => {
                handleRouting(`classroom-setting`);
              }}
            >
              <span className="text-azure">
                <SettingsIcon fontSize="large" />
              </span>
              <span className="ml-8">ตั้งค่าห้องเรียน</span>
            </div>
            {false && (
              <div
                className={btnStyle}
                onClick={() => {
                  handleRouting(`classroom-bot-setting`);
                }}
              >
                <span className="text-azure">
                  <SettingsIcon fontSize="large" />
                </span>
                <span className="ml-8">
                  ตั้งค่า Bot และการเชื่อมต่อกับกลุ่มไลน์
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
