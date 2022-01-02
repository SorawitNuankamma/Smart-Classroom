import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button";

//Component
import ClassroomMenuButton from "../../components/classroomMenuButton";

//Service
const classroomService = require("../../services/classroom");

export default function Assignment() {
  const [classroom, setClassroom] = useState([]);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
    }
    initial();
  }, []);

  return (
    <>
      <div className="mt-8 font-kanit">
        <span className="text-4xl text-gray-600 ">Classroom Assignment</span>
      </div>
      <Button
        text="Create New Assignment"
        type="small"
        path="../createAssignment"
      />
    </>
  );
}
