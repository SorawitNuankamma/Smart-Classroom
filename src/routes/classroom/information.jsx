import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Component
import ClassroomMenuButton from "../../components/classroomMenuButton";

//Service
const classroomService = require("../../services/classroom");

export default function Information() {
  const [classroom, setClassroom] = useState([]);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await classroomService.getClassroom(params.id);
      setClassroom(res.data.classroom);
    }
    initial();
  }, []);

  return (
    <>
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">Description</span>
        <p className="mt-5 text-gray-600 ">{classroom.description}</p>
      </div>
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">Rules</span>
        <p className="mt-5 text-gray-600 ">{classroom.rules}</p>
      </div>
      <div className="mt-8 font-kanit">
        <span className="text-2xl text-gray-600 ">Classroom Access Code</span>
        <p className="mt-5 text-gray-600 ">{classroom.accessCode}</p>
      </div>
    </>
  );
}
