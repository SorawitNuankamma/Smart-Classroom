import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import "../styles/colors.css";

//Service
import { isLogin } from "../../services/authentication";
import { getClassroom } from "../../services/classroom";

export default function ClassroomPage() {
  // TODO : Implement the check if user is a member in the classroom
  const state = useSelector((state) => state);

  const [initState, setInitState] = useState("opacity-0	translate-x-0	");
  const [classroom, setClassroom] = useState([]);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        //await isLogin();
        // Fetch
        const res = await getClassroom(params.classroomId);
        setClassroom(res.data.classroom);
        // Initial Animation
        setInitState("opacity-100 translate-x-0");
      } catch {
        console.log("error");
        //navigate("/login");
      }
    }
    initial();
  }, []);

  return (
    <div
      className={`transition-all duration-[125ms] flex flex-col ${initState} w-full`}
    >
      <div className={`color-${classroom.color} w-full  py-5`}>
        <div className={`m-12 font-kanit `}>
          <span className={`text-5xl text-white w-screen `}>
            {classroom.name}
          </span>
        </div>
      </div>
      <div className="space-y-4 font-kanit w-full">
        <Outlet />
      </div>
    </div>
  );
}
