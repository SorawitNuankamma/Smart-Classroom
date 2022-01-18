import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

//Service
const classroomService = require("../../../services/classroom");

export default function ClassroomInfoPage() {
  const [classroom, setClassroom] = useState([]);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await classroomService.getClassroom(params.classroomId);
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
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">
          ข้อมูลห้องเรียนเบื้องต้น
        </span>
        <p className="mt-3 text-gray-600 ">{classroom.description}</p>
      </div>
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">กฎของห้องเรียน</span>
        <p className="mt-3 text-gray-600 ">{classroom.rules}</p>
      </div>
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">
          รหัสใช้ในการเข้าห้องเรียน
        </span>
        <p className="mt-3 text-gray-600 ">{classroom.accessCode}</p>
      </div>
    </div>
  );
}
