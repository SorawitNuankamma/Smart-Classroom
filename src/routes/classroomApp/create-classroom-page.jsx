import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/colors.css";

//
import GraderSetup from "../../components/graderSetup";
import ColorPicker from "../../components/colorPicker";
import IntervalPicker from "../../components/intervalPicker";

//TODO Refactoring make set Time Schedule and Set Grading Policy as own component

//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/root-action";
import { useSelector } from "react-redux";

//Service
import { isLogin } from "../../services/authentication";
import { postClassroom } from "../../services/classroom";

const timeValue = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export default function CreateClassroomPage() {
  // UI State
  const [initState, setInitState] = useState("opacity-0	translate-x-10	");
  // Field
  const [nameField, setNameField] = useState(""); // Submit State
  const [meetingLink, setMeetingLink] = useState("");
  const [descField, setDescField] = useState(""); // Submit State
  const [ruleField, setRuleField] = useState(""); // Submit State
  const [classColor, setClassColor] = useState("green"); // Submit State
  const [timeIntervals, setTimeIntervals] = useState([]); // Submit State

  const navigate = useNavigate();

  //Redux
  const dispatch = useDispatch();
  const { setCurrentAlert, setCurrentClassroomRole } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleCreateClassroom = async () => {
    //Validate data
    //packing data
    let sortedInterval = timeIntervals.slice().sort((a, b) => {
      if (timeValue[a[0]] < timeValue[b[0]]) {
        return -1;
      }
      if (timeValue[a[0]] < timeValue[b[0]]) {
        return 1;
      }
      return 0;
    });

    const classroomObject = {
      name: nameField,
      description: descField,
      color: classColor,
      rules: ruleField,
      meetingLink: meetingLink,
      timetable: sortedInterval,
    };
    let res = await postClassroom(classroomObject);
    console.log(res);
    if (res.status === "success") {
      console.log(res);
      setCurrentAlert({
        type: "success",
        title: "สำเร็จ",
        message: "สร้างห้องเรียนใหม่สำเร็จ",
        link: null,
      });
      setCurrentClassroomRole("Owner");
      navigate(`/app/my-classroom/${res.data.newClassroom.id}`);
    } else {
      setCurrentAlert({
        type: "error",
        title: "ข้อผิดพลาด",
        message: "มีข้อผิดพลาดเกิดขึ้น โปรดลองภายหลัง",
        link: null,
      });
    }
  };

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        await isLogin();
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
          <span className="text-5xl text-gray-600 ">สร้างห้องเรียนใหม่</span>
          <div className="">
            <label className="block mt-8">
              <span className="text-gray-700">ชื่อห้องเรียน</span>
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
              <span className="text-gray-700">คำอธิบายห้องเรียนเบื้องต้น</span>
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
                spellCheck="false"
                placeholder="a brief description of the classroom"
                onChange={(e) => {
                  setDescField(e.target.value);
                }}
              ></textarea>
            </label>
            <label className="block mt-8">
              <span className="text-gray-700">
                Link สำหรับการ meeting เช่น zoom หรือ google meet
              </span>
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
                placeholder="meeting url"
                onChange={(e) => {
                  setMeetingLink(e.target.value);
                }}
              ></input>
            </label>
            <label className="block mt-8">
              <span className="text-gray-700">กฎของห้องเรียน</span>
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
                spellCheck="false"
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
