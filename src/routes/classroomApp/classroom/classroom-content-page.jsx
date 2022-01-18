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

//Service
const classroomService = require("../../../services/classroom");
const contentService = require("../../../services/content");

export default function ClassroomContentPage() {
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

  //Filestack dependencies
  const client = filestack.init(`ABXuU7bayRkeVh8mmyNAAz`);
  const options = {
    onFileSelected: (file) => {
      // If you throw any error in this function it will reject the file selection.
      // The error message will be displayed to the user as an alert.
      if (file.size > 20000 * 1000) {
        throw new Error("ไม่สามารถรองรับไฟล์ที่มีขนาดเกิน 20MB ได้");
      }
    },
    onFileUploadFinished: (fileMeta) => {
      console.log(fileMeta);
    },
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
      <div className="mt-8 font-kanit grid grid-cols-[1fr_50px] w-fit ">
        <span className="text-4xl text-gray-600 ">{content.title}</span>
        <button
          onClick={() => {
            navigate(`edit`);
          }}
        >
          <ModeEditIcon fontSize="large" />
        </button>
      </div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      <div className="mt-8 font-kanit">{contentBody}</div>

      {content.type === "assignment" && (
        <>
          <div className="mt-8 font-kanit">
            <span className="text-3xl text-gray-600 ">Submit Assignment</span>
          </div>
          <button
            className="bg-skyblue px-10 py-5 text-white rounded-md"
            onClick={() => {
              client.picker(options).open();
            }}
          >
            Selected File
          </button>
        </>
      )}
    </div>
  );
}
