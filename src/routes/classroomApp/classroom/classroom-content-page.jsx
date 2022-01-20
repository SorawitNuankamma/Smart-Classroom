import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as filestack from "filestack-js";
//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux/root-action";
import { useSelector } from "react-redux";
//Utility
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Divider from "@mui/material/Divider";

//Component
import ClassroomMenuButton from "../../../components/classroomMenuButton";
import FilePicker from "../../../components/filePicker";

//Service
const classroomService = require("../../../services/classroom");
const contentService = require("../../../services/content");

export default function ClassroomContentPage() {
  const state = useSelector((state) => state);

  const [content, setContent] = useState([]);
  const [contentBody, setContentBody] = useState("");

  const [classroom, setClassroom] = useState([]);
  const [fileInput, setFileInput] = useState(React.createRef());
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(fileInput.current.files[0]);
    };
  };

  const navigate = useNavigate();
  let params = useParams();

  //Redux
  const dispatch = useDispatch();
  const {
    setCurrentOperation,
    setCurrentUser,
    setCurrentAlert,
    setCurrentMenu,
  } = bindActionCreators(actionCreators, dispatch);

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await contentService.getContent(params.contentId);
      if (res.status === "fail") {
        setCurrentAlert({
          type: "error",
          title: "ล้มเหลว",
          message: "ไม่มีหน้านั้นอยู่ในระบบ",
          link: null,
        });
        navigate(`../`);
        return;
      }
      setContent(res.data.content);
      setContentBody(parse(draftToHtml(JSON.parse(res.data.content.body))));
    }
    initial();
  }, []);

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
      <div className="mt-8 font-kanit flex flex-row w-fit space-x-3 text-gray-600 ">
        <span className="text-4xl  ">{content.title}</span>
        {state.user.currentClassroomRole !== "student" && (
          <button
            className="text-azure"
            onClick={() => {
              navigate(`edit`);
            }}
          >
            <ModeEditIcon fontSize="large" />
          </button>
        )}
      </div>
      <span className="block mt-2 text-gray-400 text-sm">
        ถูกสร้างขึ้นเมื่อ {content.createDate}
      </span>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      <div className="mt-8 font-kanit min-h-[20rem]">{contentBody}</div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      {content.type === "assignment" && <FilePicker />}
    </div>
  );
}
