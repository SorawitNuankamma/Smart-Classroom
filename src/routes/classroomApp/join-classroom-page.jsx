import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/root-action";
import { useSelector } from "react-redux";

//Service
const auth = require("../../services/authentication");
const classroomService = require("../../services/classroom");
//const userService = require("../services/user");

export default function JoinClassroomPage() {
  const [accessCode, setAccessCode] = useState({
    name: "",
  });
  const [initState, setInitState] = useState("opacity-0	translate-x-10	");

  const navigate = useNavigate();

  //Redux
  const dispatch = useDispatch();
  const { setCurrentAlert, setCurrentMenu } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleJoinClassroom = async () => {
    const res = await classroomService.joinClassroom({
      accessCode: accessCode,
    });
    console.log(res);
    if (res.status === "success") {
      setCurrentMenu("myClassroom");
      setCurrentAlert({
        type: "success",
        title: "สำเร็จ",
        message: "เข้าร่วมห้องเรียนสำเร็จ",
        link: null,
      });
      navigate(`../my-classroom/${res.data.classroom.id}`);
    } else {
      setCurrentMenu("home");
      setCurrentAlert({
        type: "error",
        title: "ล้มเหลว",
        message: "เข้าร่วมห้องเรียนไม่สำเร็จ",
        link: null,
      });
      navigate(`..`);
    }
  };

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        setInitState("opacity-100 translate-x-0");
      } catch {
        navigate("/login");
      }
    }
    initial();
  }, []);

  return (
    <div
      className={`ml-12  transition-all duration-500 flex flex-col ${initState}`}
    >
      <div className="mt-12 space-y-4 font-kanit">
        <span className="text-5xl text-gray-600 ">เข้าร่วมห้องเรียน</span>
      </div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      <div className="mt-6 font-kanit text-gray-600">
        <span className="text-2xl">รหัสห้องเรียน</span>
        <input
          type="text"
          className="
                    mt-6
                    block
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                    w-fit
                  "
          placeholder="Classroom Code"
          onChange={(e) => {
            setAccessCode(e.target.value);
          }}
        ></input>
        <button
          className="mt-6 px-5 py-3 bg-blue-600 text-white font-kanit rounded-md hover:bg-blue-700 transition-all ease-in-out"
          onClick={handleJoinClassroom}
        >
          เข้าร่วมห้องเรียน
        </button>
      </div>
    </div>
  );
}
