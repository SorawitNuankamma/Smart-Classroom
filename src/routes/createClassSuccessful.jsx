import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/root-action";

//Service
const auth = require("../services/authentication");
const classroomService = require("../services/classroom");

export default function CreateClassSuccessful() {
  const [classroom, setClassroom] = useState({
    name: "",
    accessCode: "",
  });
  const [initState, setInitState] = useState("opacity-0	translate-x-10	");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { setCurrentMenu } = bindActionCreators(actionCreators, dispatch);

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        await auth.isLogin();
        let classId = JSON.parse(window.localStorage.getItem("newClassroom"));
        let res = await classroomService.getClassroom(classId);
        setClassroom(res.data.classroom);
        // Initial Animation
        setInitState("opacity-100 translate-x-0");
      } catch {
        navigate("/login");
        return;
      }
    }
    initial();
  }, []);

  const handleFinish = () => {
    setCurrentMenu("myClassroom");
    navigate("/home/myClassroom");
  };

  return (
    <div className={`transition-all duration-500 flex flex-col ${initState}`}>
      <div className="m-12 space-y-4 font-kanit">
        <span className="text-5xl text-gray-600 ">
          Create Classroom Successful
        </span>
        <div className="mt-8">
          <span className="block mt-3 text-xl">
            Classroom {classroom.name} Has been create
          </span>
          <span className="block mt-3 text-xl">
            Class Code is{classroom.accessCode}
            <span className="bg-slate-300 p-2 mx-3">
              {classroom.accessCode}
            </span>
          </span>
        </div>
        <button
          className={`p-4 rounded-md shadow-lg text-xl text-white mr-3 mt-2 bg-blue-500`}
          onClick={handleFinish}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
