import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";

//Redux
import { useSelector } from "react-redux";

//Service
import { getContents } from "../../../services/content";

export default function ClassroomAllContentsPage(props) {
  const state = useSelector((state) => state);
  const [contents, setContents] = useState([]);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await getContents({
        classId: params.classroomId,
        type: props.type,
      });

      setContents(res.data.contents);
    }
    initial();
  }, []);

  //Mapper Object
  const typeDict = {
    annoucement: "ประกาศของห้องเรียน",
    lesson: "บทเรียน",
    assignment: "แบบฝึกหัด",
  };

  const bgColorDict = {
    annoucement: `bg-[#49C5B6]`,
    lesson: `bg-[#3983DD]`,
    assignment: `bg-[#F9DD6C]`,
  };

  const textColorDict = {
    annoucement: `text-[#265A55]`,
    lesson: `text-[#C5E4FF]`,
    assignment: `text-[#B68E2A]`,
  };

  const checkType = (type) => {
    return props.type === type;
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
        <span className="text-4xl text-gray-600 ">{typeDict[props.type]}</span>
        {state.user.currentClassroomRole !== "student" && (
          <button
            className="ml-5 text-azure"
            onClick={() => {
              navigate(`../${props.createPath}`);
            }}
          >
            <AddCircleOutlineIcon fontSize="large" />
          </button>
        )}
      </div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      <div className="mt-8 flex flex-col space-y-4 font-kanit w-fit">
        {contents === [] && (
          <div className="px-5 py-3 w-64 h-32 cursor-pointer rounded-md  bg-gray-200 shadow-md animate-pulse">
            <span className="block text-2xl text-gray-600">Loading</span>
          </div>
        )}
        {contents.map((el, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`${el.id}`);
            }}
            className={`bg-[#f5f5f5] hover:bg-[#f0f0f0] transition-all ease-in-out cursor-pointer text-gray-600 text-xl w-[25rem] py-5 px-5 mt-4  items-center rounded-sm`}
          >
            <span className={` text-2xl text-gray-600`}>{el.title}</span>
            {false && checkType("assignment") && (
              <span className={` ${textColorDict[props.type]} `}>
                กำหนดส่ง {el.dueDate}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
