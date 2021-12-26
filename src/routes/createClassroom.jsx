import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/colors.css";

//Service
const auth = require("../services/authentication");
const userService = require("../services/user");

export default function CreateClassroom() {
  //State for submit
  const [renderState, setRenderState] = useState(false); //throwaway state for forcing page re-render
  const [nameField, setNameField] = useState("");
  const [descField, setDescField] = useState("");
  const [timeSchedules, setTimeSchedules] = useState([]);
  const [classColor, setClassColor] = useState("green");
  //UI
  const [dateSelected, setDateSelect] = useState("Monday");
  const [startTime, setStartTime] = useState("0:00");
  const [endTime, setEndTime] = useState("0:00");
  //not scalable
  const [colorSelector, setColorSelector] = useState([
    "border-4 border-indigo-600",
    "",
    "",
    "",
  ]);
  const [initState, setInitState] = useState("opacity-0	translate-x-10	");

  // color to choose from
  const colorList = ["green", "red", "blue", "yellow"];

  const navigate = useNavigate();

  // Set Time Schedule
  const handleDateSelect = (e) => {
    setDateSelect(e.target.value);
  };

  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const handleTimeSchedules = () => {
    const timeScheduleObject = [
      dateSelected,
      {
        start: startTime,
        end: endTime,
      },
    ];
    const timeScheduleList = timeSchedules;
    timeScheduleList.push(timeScheduleObject);
    setTimeSchedules(timeScheduleList);
    setRenderState(!renderState);
  };

  const handleColorSelector = (colorIndex) => {
    const selectedColor = colorList[colorIndex];
    if (selectedColor === classColor) {
      return;
    }
    let template = ["", "", "", ""];
    template[colorIndex] = "border-4 border-indigo-600";
    setColorSelector(template);
    setClassColor(selectedColor);
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
      <div className={`transition-all duration-500 flex flex-col ${initState}`}>
        <div className="m-12 space-y-4 font-kanit">
          <span className="text-5xl text-gray-600 ">Create A Classroom</span>
          <div className="">
            <label className="block mt-8">
              <span className="text-gray-700">Class name</span>
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
                placeholder=""
              ></input>
            </label>
            <label className="block mt-8">
              <span className="text-gray-700">Class Description</span>
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
              ></textarea>
            </label>
            <div className="mt-8">
              <span>Color</span>
              <div className="flex flex-row gap-x-5 mt-1">
                {colorList.map((el) => (
                  <button
                    onClick={(e) => handleColorSelector(colorList.indexOf(el))}
                    className={`h-20 w-20 rounded-md shadow-lg color-${el} ${
                      colorSelector[colorList.indexOf(el)]
                    }`}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <span>Set Time Schedule</span>
              <div className="mt-3">
                <div>
                  <span>Day</span>
                  <select
                    class="
                  mt-2
                  ml-3
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                    onChange={handleDateSelect}
                  >
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                </div>
                <div>
                  <span>Start Time</span>
                  <input
                    type="text"
                    className="
                    mt-2
                    ml-3
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                    placeholder="example 9:30"
                    onChange={handleStartTime}
                  ></input>
                </div>
                <div>
                  <span>End Time</span>
                  <input
                    type="text"
                    className="
                    mt-2
                    ml-3
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                    placeholder="example 12:00"
                    onChange={handleEndTime}
                  ></input>
                </div>
              </div>
              <button
                className="bg-iron p-4 text-lg text-liture rounded-md shadow-md block mt-5"
                onClick={handleTimeSchedules}
              >
                Add Schedule
              </button>
              <div className="mt-3 w-96">
                {timeSchedules.map((el) => (
                  <button
                    className={`p-3 rounded-md shadow-lg color-${el[0]} mr-3`}
                  >{`${el[0]} ${el[1].start}-${el[1].end}`}</button>
                ))}
              </div>
              <button className="bg-iron p-4 text-lg text-liture rounded-md shadow-md block mt-5">
                Set grading policy
              </button>
              <button className="bg-iron p-4 text-lg text-liture rounded-md shadow-md block mt-5">
                Set grading policy
              </button>
              <button className="bg-iron p-4 text-lg text-liture rounded-md shadow-md block mt-5">
                Set grading policy
              </button>
              <button className="bg-iron p-4 text-lg text-liture rounded-md shadow-md block mt-5">
                Set grading policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
