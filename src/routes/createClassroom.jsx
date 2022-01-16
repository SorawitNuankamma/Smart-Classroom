import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/colors.css";

//
import GraderSetup from "../components/graderSetup";
import ColorPicker from "../components/colorPicker";
import IntervalPicker from "../components/intervalPicker";

//TODO Refactoring make set Time Schedule and Set Grading Policy as own component

//Service
const auth = require("../services/authentication");
const classroomService = require("../services/classroom");

export default function CreateClassroom() {
  // UI State
  const [initState, setInitState] = useState("opacity-0	translate-x-10	");
  // Field
  const [nameField, setNameField] = useState(""); // Submit State
  const [descField, setDescField] = useState(""); // Submit State
  const [ruleField, setRuleField] = useState(""); // Submit State
  const [classColor, setClassColor] = useState("green"); // Submit State
  const [timeIntervals, setTimeIntervals] = useState([]); // Submit State

  const navigate = useNavigate();

  const handleCreateClassroom = async () => {
    //Validate data
    //packing data
    const classroomObject = {
      name: nameField,
      description: descField,
      color: classColor,
      rules: ruleField,
      timetable: timeIntervals,
    };
    let res = await classroomService.postClassroom(classroomObject);
    if (res.status === "fail") {
      navigate("/home/error");
    } else {
      window.localStorage.setItem(
        "newClassroom",
        JSON.stringify(res.data.newClassroom.id)
      );
      navigate("/home/createClassroomSuccessful");
    }
  };

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        await auth.isLogin();
        // Initial Animation
        setInitState("opacity-100 translate-x-0");
      } catch {
        navigate("/login");
      }
    }
    initial();
  }, []);

  return (
    <>
      <div
        className={`transition-all duration-500 flex flex-col ${initState} w-fit`}
      >
        <div className="m-12 space-y-4 font-kanit w-fit">
          <span className="text-5xl text-gray-600 ">Create A Classroom</span>
          <div className="">
            <label className="block mt-8">
              <span className="text-gray-700">Classroom name</span>
              <input
                type="text"
                className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                placeholder="classroom name"
                onChange={(e) => {
                  setNameField(e.target.value);
                }}
              ></input>
            </label>
            <label className="block mt-8">
              <span className="text-gray-700">Classroom Description</span>
              <textarea
                className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                rows="3"
                spellcheck="false"
                placeholder="a brief description of the classroom"
                onChange={(e) => {
                  setDescField(e.target.value);
                }}
              ></textarea>
            </label>
            <label className="block mt-8">
              <span className="text-gray-700">Classroom Rules</span>
              <textarea
                className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                rows="3"
                spellcheck="false"
                placeholder="List of classroom rules"
                onChange={(e) => {
                  setRuleField(e.target.value);
                }}
              ></textarea>
            </label>
            <ColorPicker callback={setClassColor} state={classColor} />
            <IntervalPicker callback={setTimeIntervals} state={timeIntervals} />
            <button
              className={`p-6 rounded-md shadow-lg text-xl text-white mr-3 mt-2 bg-green-500`}
              onClick={handleCreateClassroom}
            >
              Create A Classroom
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
