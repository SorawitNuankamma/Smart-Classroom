import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import ColorPicker from "../../../components/colorPicker";
import IntervalPicker from "../../../components/intervalPicker";

//Service
import { getClassroom, patchClassroom } from "../../../services/classroom";

const timeValue = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export default function ClassroomSettingPage() {
  const [classroom, setClassroom] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  // Field
  const [nameField, setNameField] = useState(""); // Submit State
  const [descField, setDescField] = useState(""); // Submit State
  const [ruleField, setRuleField] = useState(""); // Submit State
  const [classColor, setClassColor] = useState("green"); // Submit State
  const [meetingLink, setMeetingLink] = useState("");
  const [timeIntervals, setTimeIntervals] = useState([]); // Submit State

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await getClassroom(params.classroomId);
      setClassroom(res.data.classroom);
      setNameField(res.data.classroom.name);
      setDescField(res.data.classroom.description);
      setRuleField(res.data.classroom.rules);
      setClassColor(res.data.classroom.color);
      setMeetingLink(res.data.classroom.meetingLink);
      setTimeIntervals(res.data.classroom.timetable);
      console.log(res.data.classroom);
      setIsFetch(true);
    }
    initial();
  }, []);

  const handlePatchClassroom = async () => {
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
    console.log(classroomObject);

    let res = await patchClassroom(classroomObject, classroom.id);
    console.log(res);
    if (res.status === "success") {
      console.log(res);
      navigate(`../classroom-information`);
    } else {
      navigate(`../`);
    }
  };

  return (
    <div className="ml-12">
      <div
        className="mt-8 font-kanit text-blue-400 hover:text-blue-600 cursor-pointer"
        onClick={() => {
          navigate(`..`);
        }}
      >
        <ArrowBackIosIcon />
        ???????????????????????????????????????????????????
      </div>
      <div className="mt-8 font-kanit flex flex-row items-center">
        <span className="text-4xl text-gray-600 ">?????????????????????????????????????????????????????????????????????</span>
      </div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      {isFetch && (
        <div className="w-fit">
          <label className="block mt-8">
            <span className="text-gray-700">?????????????????????????????????</span>
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
              value={nameField}
              placeholder="classroom name"
              onChange={(e) => {
                setNameField(e.target.value);
              }}
            ></input>
          </label>
          <label className="block mt-8">
            <span className="text-gray-700">?????????????????????????????????????????????</span>
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
              value={descField}
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
              Link ??????????????????????????? meeting ???????????? zoom ???????????? google meet
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
              value={meetingLink}
              onChange={(e) => {
                setMeetingLink(e.target.value);
              }}
            ></input>
          </label>
          <label className="block mt-8">
            <span className="text-gray-700">????????????????????????????????????</span>
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
              value={ruleField}
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
            className={`mt-5 px-5 py-3 rounded-md shadow-lg text-xl text-white mr-3 bg-green-500`}
            onClick={handlePatchClassroom}
          >
            ????????????????????????????????????
          </button>
        </div>
      )}
    </div>
  );
}
