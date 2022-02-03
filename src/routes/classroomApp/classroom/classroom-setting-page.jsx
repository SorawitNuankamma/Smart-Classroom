import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import ColorPicker from "../../../components/colorPicker";
import IntervalPicker from "../../../components/intervalPicker";

//Service
import { getClassroom } from "../../../services/classroom";

export default function ClassroomSettingPage() {
  const [classroom, setClassroom] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  // Field
  const [nameField, setNameField] = useState(""); // Submit State
  const [descField, setDescField] = useState(""); // Submit State
  const [ruleField, setRuleField] = useState(""); // Submit State
  const [classColor, setClassColor] = useState("green"); // Submit State
  const [timeIntervals, setTimeIntervals] = useState([]); // Submit State

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await getClassroom(params.classroomId);
      setClassroom(res.data.classroom);
      setClassColor(res.data.classroom.color);
      setIsFetch(true);
    }
    initial();
  }, []);

  const handlePatchClassroom = () => {
    const template = {
      name: nameField,
      color: classColor,
      description: descField,
      rules: ruleField,
    };
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
        กลับไปหน้าที่แล้ว
      </div>
      <div className="mt-8 font-kanit flex flex-row items-center">
        <span className="text-4xl text-gray-600 ">แก้ไขข้อมูลของห้องเรียน</span>
      </div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      {isFetch && (
        <div className="w-fit">
          <label className="block mt-8">
            <span className="text-gray-700">ชื่อรายวิชา</span>
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
              value={classroom.name}
              placeholder="classroom name"
              onChange={(e) => {
                setNameField(e.target.value);
              }}
            ></input>
          </label>
          <label className="block mt-8">
            <span className="text-gray-700">คำอธิบายรายวิชา</span>
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
              value={classroom.description}
              rows="3"
              spellCheck="false"
              placeholder="a brief description of the classroom"
              onChange={(e) => {
                setDescField(e.target.value);
              }}
            ></textarea>
          </label>
          <label className="block mt-8">
            <span className="text-gray-700">กฎของรายวิชา</span>
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
              value={classroom.rules}
              spellCheck="false"
              placeholder="List of classroom rules"
              onChange={(e) => {
                setRuleField(e.target.value);
              }}
            ></textarea>
          </label>
          <ColorPicker callback={setClassColor} state={classColor} />
          <button
            className={`mt-5 px-5 py-3 rounded-md shadow-lg text-xl text-white mr-3 mt-2 bg-green-500`}
            onClick={handlePatchClassroom}
          >
            บันทึกข้อมูล
          </button>
        </div>
      )}
    </div>
  );
}
