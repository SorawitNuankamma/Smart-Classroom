import React, { useState, useEffect, Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";

import parse from "html-react-parser";
import draftToHtml from "draftjs-to-html";

//Service
const contentService = require("../../services/content");

const ifAssignment = {
  assignment: true,
};

export default function CreateContent(props) {
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
          dateWriteAt: Date(),
        },
      ],
      type: props.type,
      body: convertToRaw(editorState.getCurrentContent()),
      classId: params.id,
      dueDate: dueDate,
    };
    // IF EDIT
    if (props.edit) {
      const res = await contentService.patchContent(
        contentObj,
        params.contentId
      );
      navigate(`../annoucement/${params.contentId}`);
    } else {
      // If CREATE
      const res = await contentService.postContent(contentObj);
      const id = res.data.newContent.id;
      navigate(`../${props.type}/${id}`);
    }
    // TODO : Navigate to content page
  };

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      if (props.edit) {
        const res = await contentService.getContent(params.contentId);
        setContentTitle(res.data.content.title);
        setEditorState(
          EditorState.createWithContent(convertFromRaw(res.data.content.body))
        );
        setEditorHtml(draftToHtml(res.data.content.body));
        setAction("Edit");
      }
    }
    initial();
  }, []);

  // ComponentDidUpdate
  useEffect(() => {
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
    <>
      <div className="mt-8 font-kanit">
        <span className="text-4xl text-gray-600 ">
          {action} {props.type}
        </span>
        <label className="block mt-8">
          <span className="text-gray-700">Title</span>
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
            placeholder={`${props.type} title`}
            value={contentTitle}
            onChange={(e) => {
              setContentTitle(e.target.value);
            }}
          ></input>
        </label>
        <div className="mt-8 bg-slate-100  min-h-30 p-3">
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={handleEditorChange}
          />
        </div>
        <div className="mt-8">
          <span className="mt-8 text-4xl text-gray-600 ">Live Preview</span>
        </div>
        <div className="mt-8 font-sans min-h-30">
          <div className="">{parse(editorHtml)}</div>
        </div>
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
            {action} {props.type}
          </button>
        </div>
      </div>
    </>
  );
}
