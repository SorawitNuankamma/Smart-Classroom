import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./styles/colors.css";

//Service
const auth = require("../services/authentication");
const userService = require("../services/user");
const classroomService = require("../services/classroom");

export default function PageName() {
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
    <div className={`transition-all duration-500 flex flex-col ${initState}`}>
      <div className="m-12 space-y-4 font-kanit">
        <span className="text-5xl text-gray-600 ">This Classroom</span>
        <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 desktop:grid-cols-3 "></div>
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
