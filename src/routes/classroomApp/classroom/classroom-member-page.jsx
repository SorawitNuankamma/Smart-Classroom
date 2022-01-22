import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";

import SmartTable from "../../../components/smartTable";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

//Redux
import { useSelector } from "react-redux";

//Service
const contentService = require("../../../services/content");

//Service
const classroomService = require("../../../services/classroom");

export default function ClassroomMemberPage(props) {
  const state = useSelector((state) => state);
  const [submissions, setSubmissions] = useState();
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch classroom
      const res = await classroomService.getMemberInfo({
        userId: params.userId,
        classroomId: params.classroomId,
      });
      console.log(res);
      setUser(res.data.newUserObject);
      setSubmissions(res.data.submissions);

      // Fetch submission on this classroom belong to this user
    }
    initial();
  }, []);

  return (
    <div className="ml-12">
      <div
        className="mt-8 font-kanit text-blue-400 hover:text-blue-600 cursor-pointer"
        onClick={() => {
          navigate(`../classroom-members`);
        }}
      >
        <ArrowBackIosIcon />
        กลับไปหน้าที่แล้ว
      </div>
      <div className="mt-8 font-kanit flex flex-row items-center">
        <span className="text-4xl text-gray-600 ">ข้อมูลของ {user.name}</span>
        <button
          className="ml-5 text-azure"
          onClick={() => {
            navigate(``);
          }}
        >
          <ModeEditIcon fontSize="large" />
        </button>
      </div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">ชื่อสมาชิก</span>
        <p className="mt-3 text-gray-600 ">{user.name}</p>
      </div>
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">รหัสสมาชิก</span>
        <p className="mt-3 text-gray-600 ">
          {user.code === "0" ? "ยังไม่ถูกสร้าง" : user.code}
        </p>
      </div>
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">รูปภาพของสมาชิก</span>
        <img
          src={user.pictureURL}
          alt="user picture"
          height="200px"
          width="200px"
        />
      </div>
    </div>
  );
}
