import React, { useState, useEffect, Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";

import parse from "html-react-parser";
import draftToHtml from "draftjs-to-html";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Divider from "@mui/material/Divider";

//Service
const contentService = require("../../../services/content");

const ifAssignment = {
  assignment: true,
};

const titleDict = {
  annoucement: "สร้างประกาศ",
  lesson: "สร้างบทเรียน",
  assignment: "สร้างแบบฝึกหัด",
};

export default function ClassroomCreateContentPage(props) {
  const [renderState, setRenderState] = useState(false);
  const [contentTitle, setContentTitle] = useState("");
  const [dueDate, setDueDate] = useState("none");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorHtml, setEditorHtml] = useState("");

  const [action, setAction] = useState("Create");

  const navigate = useNavigate();
  let params = useParams();
  const state = useSelector((state) => state);

  const handleContentSubmit = async () => {
    const contentObj = {
      title: contentTitle,
      writers: [
        {
          userId: state.user.currentUser.id,
          username: state.user.currentUser.name,
          pictureURL: state.user.currentUser.pictureURL,
          dateWriteAt: Date(),
        },
      ],
      type: props.type,
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      classId: params.classroomId,
      dueDate: dueDate,
    };
    // IF EDIT
    if (props.edit) {
      const res = await contentService.patchContent(
        contentObj,
        params.contentId
      );
      navigate(`../classroom-${props.type}/${params.contentId}`);
    } else {
      // If CREATE
      const res = await contentService.postContent(contentObj);
      const id = res.data.newContent.id;
      navigate(`../classroom-${props.type}/${id}`);
    }
    // TODO : Navigate to content page
  };

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      if (props.edit) {
        const res = await contentService.getContent(params.contentId);
        console.log(JSON.parse(res.data.content.body));
        setContentTitle(res.data.content.title);

        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(res.data.content.body))
          )
        );
        setEditorHtml(draftToHtml(JSON.parse(res.data.content.body)));
        setAction("Edit");
      }
    }
    initial();
  }, []);

  // ComponentDidUpdate
  useEffect(() => {
    // Check User roles
    async function onEditorChange() {
      setEditorHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())));
      setRenderState(!renderState);
    }
    onEditorChange();
  }, [editorState]);

  const handleEditorChange = (el) => {
    setEditorState(el);
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
      <div className="mt-8 font-kanit">
        <span className="text-4xl text-gray-600 ">{titleDict[props.type]}</span>
        <label className="block mt-8">
          <span className="text-gray-700">ชื่อบทความ</span>
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
                    max-w-2xl
                  "
            placeholder={`ชื่อบทความ`}
            value={contentTitle}
            onChange={(e) => {
              setContentTitle(e.target.value);
            }}
          ></input>
        </label>
        <div className="mt-8 bg-slate-100  min-h-30 p-3 max-w-6xl">
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={handleEditorChange}
          />
        </div>
        {
          false && (
            <>
              <div className="mt-8">
                <span className="mt-8 text-4xl text-gray-600 ">
                  Live Preview
                </span>
              </div>
              <div className="mt-8 font-sans min-h-30 max-w-6xl">
                <div className="max-w-6xl">{parse(editorHtml)}</div>
              </div>
            </>
          ) /*  BROKEN AT THIS MOMENT */
        }
        {ifAssignment[props.type] && (
          <div className="mt-8 w-fit">
            <label className="block ">
              <span className="text-gray-700">Due Date</span>
              <input
                type="date"
                className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
          </div>
        )}
        <div className="my-8">
          <button
            className="bg-sky-500 px-5 py-3 text-white rounded-md text-lg shadow-md"
            onClick={handleContentSubmit}
          >
            {titleDict[props.type]}
          </button>
        </div>
      </div>
    </div>
  );
}
