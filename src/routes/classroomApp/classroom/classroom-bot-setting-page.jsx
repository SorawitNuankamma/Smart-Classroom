import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

//Service
import { getClassroom } from "../../../services/classroom";
import { Switch } from "@mui/material";

export default function ClassroomBotSettingPage() {
  const [classroom, setClassroom] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const isLineConnected = useRef(false);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await getClassroom(params.classroomId);
      console.log(res.data.classroom);
      isLineConnected.current = res.data.classroom.lineGroupChatId
        ? true
        : false;
      console.log(isLineConnected.current);
      setClassroom(res.data.classroom);
      setIsFetch(true);
    }
    initial();
  }, []);

  const handleSwitch = (value, event) => {
    console.log(`${value} ${event}`);
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
        <span className="text-4xl text-gray-600 ">
          ตั้งค่าการแจ้งเตือนของ Bot
        </span>
        <button
          className="ml-5 text-azure"
          onClick={() => {
            navigate(`../classroom-setting`);
          }}
        >
          <ModeEditIcon fontSize="large" />
        </button>
      </div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      {isFetch && (
        <>
          <div className="mt-8 font-kanit">
            <span
              onClick={() => {
                if (!isLineConnected.current) {
                  window.open("https://www.w3schools.com");
                }
              }}
              className={`text-xl ${
                classroom.lineGroupChatId ? "text-green-500" : "text-red-500"
              } cursor-pointer`}
            >
              {classroom.lineGroupChatId
                ? "ห้องเรียนนี้ถูกเชื่อมต่อกับกลุ่ม Line เรียบร้อยแล้ว"
                : "ห้องเรียนยังไม่ได้ถูกเชื่อมต่อกับกลุ่ม Line"}
            </span>
          </div>
          <div className="mt-8 font-kanit">
            <span className="text-2xl text-gray-600 ">
              การตั้งค่าการแจ้งเตือน
            </span>
          </div>
          <div className="mt-8 font-kanit">
            <div className="mr-10 inline-block">
              <Switch
                checked={classroom.notificationOn.startClass}
                disabled={!isLineConnected.current}
                onChange={(e) => {
                  handleSwitch(e.target.value, "startClass");
                }}
              />
            </div>
            <span>แจ้งเตือนก่อนเริ่มการเรียน 10 นาที</span>
          </div>
          <div className="mt-8 font-kanit">
            <div className="mr-10 inline-block">
              <Switch
                checked={classroom.notificationOn.postingAnnoucement}
                disabled={!isLineConnected.current}
                onChange={(e) => {
                  handleSwitch(e.target.value, "postingAnnoucement");
                }}
              />
            </div>
            <span>แจ้งเตือนเมื่อทำการสร้างประกาศ</span>
          </div>
          <div className="mt-8 font-kanit">
            <div className="mr-10 inline-block">
              <Switch
                checked={classroom.notificationOn.postingLesson}
                disabled={!isLineConnected.current}
                onChange={(e) => {
                  handleSwitch(e.target.value, "postingLesson");
                }}
              />
            </div>
            <span>แจ้งเตือนเมื่อทำการสร้างบทเรียน</span>
          </div>
          <div className="mt-8 font-kanit">
            <div className="mr-10 inline-block">
              <Switch
                checked={classroom.notificationOn.postingAssignment}
                disabled={!isLineConnected.current}
                onChange={(e) => {
                  handleSwitch(e.target.value, "postingAssignment");
                }}
              />
            </div>
            <span>แจ้งเตือนเมื่อทำการสร้างแบบฝึกหัด</span>
          </div>
          <div className="mt-8 font-kanit">
            <div className="mr-10 inline-block">
              <Switch
                checked={classroom.notificationOn.assignmentDeadline}
                disabled={!isLineConnected.current}
                onChange={(e) => {
                  handleSwitch(e.target.value, "assignmentDeadline");
                }}
              />
            </div>
            <span>แจ้งเตือนเมื่อเหลือเวลาทำแบบฝึกหัดเพียง 1 วัน</span>
          </div>
        </>
      )}
    </div>
  );
}
