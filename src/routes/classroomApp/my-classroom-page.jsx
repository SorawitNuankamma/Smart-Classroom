import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "../styles/colors.css";

//Service
const auth = require("../../services/authentication");
const classroomService = require("../../services/classroom");

export default function MyClassroomPage() {
  const state = useSelector((state) => state);

  const [initState, setInitState] = useState("opacity-0	translate-x-10	");
  const [classrooms, setClassrooms] = useState([]);

  const navigate = useNavigate();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        await auth.isLogin();
        const res = await classroomService.getMyClassrooms();
        setClassrooms(res.data.classrooms);
        // Initial Animation
        setInitState("opacity-100 translate-x-0");
      } catch {
        console.log("error");
        //navigate("/login");
      }
    }
    initial();
  }, []);

  const handleClickClassroom = (id) => {
    navigate(`${id}`);
  };

  return (
    <div className={`transition-all duration-500 flex flex-col ${initState}`}>
      <div className="m-12 space-y-4 font-kanit">
        <span className="text-5xl text-gray-600 ">
          {state.user.currentUser.name} Classrooms
        </span>
        <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 desktop:grid-cols-3 w-fit">
          {classrooms.map((el, index) => (
            <div
              key={index}
              onClick={() => handleClickClassroom(el.id)}
              className={`color-${el.color} px-5 py-3 w-64 h-32 cursor-pointer rounded-md`}
            >
              <span className="block text-2xl text-white">{el.name}</span>
              <span className="block text-white">{el.users[0].name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/*
{
  state.user.currentUser.classroom.map((el, index) => (
    <button key={index} className={``}>
      XDDD
    </button>
  ));
}*/
