import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { useSelector } from "react-redux";

//Service
import { getClassroom } from "../../../services/classroom";

export default function ClassroomInfoPage() {
  const state = useSelector((state) => state);
  const [classroom, setClassroom] = useState([]);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await getClassroom(params.classroomId);
      setClassroom(res.data.classroom);
    }
    initial();
  }, []);

  return (
    <div className="ml-12">
      <div
        className="mt-8 font-kanit text-blue-400 hover:text-blue-600 cursor-pointer"
        onClick={() => {
          navigate(`..`);
        }}
      >
        <ArrowBackIosIcon />
        กลับไปหน้าที่แล้ว
      </div>
      <div className="mt-8 font-kanit flex flex-row items-center">
        <span className="text-4xl text-gray-600 ">ข้อมูลของห้องเรียน</span>
        {state.user.currentClassroomRole === "Owner" && (
          <button
            className="ml-5 text-azure"
            onClick={() => {
              navigate(`../classroom-setting`);
            }}
          >
            <ModeEditIcon fontSize="large" />
          </button>
        )}
      </div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">ชื่อห้องเรียน</span>
        <p className="mt-3 text-gray-600 ">{classroom.name}</p>
      </div>
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">คำอธิบายห้องเรียน</span>
        <p className="mt-3 text-gray-600 ">{classroom.description}</p>
      </div>
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">กฎของห้องเรียน</span>
        <p className="mt-3 text-gray-600 ">{classroom.rules}</p>
      </div>
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">รหัสเข้าห้องเรียน</span>
        <p className="mt-3 text-gray-600 ">{classroom.accessCode}</p>
      </div>
    </div>
  );
}
