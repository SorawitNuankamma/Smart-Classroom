import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//Redux
import { useSelector } from "react-redux";

//Service
const contentService = require("../../../services/content");

export default function ClassroomAllContentsPage(props) {
  const state = useSelector((state) => state);
  const [contents, setContents] = useState([]);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await contentService.getContents({
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
      <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 desktop:grid-cols-3 font-kanit w-fit">
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
            className={` px-5 py-3 w-64 h-32 cursor-pointer rounded-md  bg-rose-200	 shadow-md`}
          >
            <span className="block text-2xl text-gray-600">{el.title}</span>
            {checkType("assignment") && (
              <span className="block text-lg text-gray-600">
                Due {el.dueDate}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
