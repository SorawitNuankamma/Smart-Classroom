import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import "./styles/colors.css";

//Service
const auth = require("../services/authentication");
const userService = require("../services/user");
const classroomService = require("../services/classroom");

export default function Classroom() {
  // TODO : Implement the check if user is a member in the classroom
  const state = useSelector((state) => state);

  const [initState, setInitState] = useState("opacity-0	translate-x-10	");
  const [classroom, setClassroom] = useState([]);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        await auth.isLogin();
        // Fetch
        const res = await classroomService.getClassroom(params.id);
        setClassroom(res.data.classroom);
        // Initial Animation
        setInitState("opacity-100 translate-x-0");
      } catch {
        navigate("/login");
      }
    }
    initial();
  }, []);

  return (
    <div
      className={`transition-all duration-500 flex flex-col ${initState} w-full`}
    >
      <div className={`color-${classroom.color} w-full`}>
        <div className={`m-12 font-kanit `}>
          <span className={`text-5xl text-white w-screen `}>
            {classroom.name}
          </span>
        </div>
      </div>
      <div className="mx-12 space-y-4 font-kanit w-fit">
        <Outlet />
      </div>
    </div>
  );
}

/* Debug Stick
<button
          onClick={() => {
            console.log(classroom);
          }}
        >
          XDDD
        </button>

*/
