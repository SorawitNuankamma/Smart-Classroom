import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import * as filestack from "filestack-js";
import FileElement from "./fileElement";

import "../styles/colors.css";
import ClearIcon from "@mui/icons-material/Clear";

import {
  postSubmission,
  getMySubmission,
  patchSubmission,
} from "../services/submission";
import { useSelector } from "react-redux";

import { postFile, getFiles } from "../services/file";
import useSendLineMessage from "../hooks/useSendLineMessage";

const DICT = {
  student: {
    title: "ส่งงานที่ได้รับมอบหมาย",
    description: `ไฟล์ที่ถูก upload ขึ้นมาจะถือว่าเป็นการส่งงาน
            นักเรียนสามารถยกเลิกส่งงานได้โดยการคลิกลบไฟล์ในช่องการส่งงานด้านล่าง`,
    isStudent: true,
  },
  teacher: {
    title: "แนบไฟล์กับตัวบทความ",
    description: `ไฟล์ที่ถูก upload ขึ้นมาจะถูกแสดงร่วมกับตัวบทความ`,
    isStudent: false,
  },
};

export default function FilePicker(props) {
  const state = useSelector((state) => state);

  const [render, setRender] = useState(false);
  const [submission, setSubmission] = useState();
  const [isHavingSubmission, setIsHavingSubmission] = useState(false);
  const [submissionFiles, setSubmissionFiles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  let params = useParams();
  const sendLineMessage = useSendLineMessage();

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
    onFileUploadFinished: async (fileMeta) => {
      console.log(fileMeta);
      console.log(submission);
      const fileSave = {
        filename: fileMeta.filename,
        fileStackHandle: fileMeta.handle,
        mimetype: fileMeta.mimetype,
        size: fileMeta.size,
        fileStackURL: fileMeta.url,
        fileStackUploadId: fileMeta.uploadId,
        contentId: params.contentId,
        submissionId: submission.id,
      };
      console.log(fileSave);
      const res = await postFile(fileSave);
      console.log(res);
      let tempSubmissionFiles = submissionFiles;
      tempSubmissionFiles.push(res.data.newFile);
      setSubmissionFiles(tempSubmissionFiles);
      setRender(!render);
    },
  };
  // ComponentDidMount
  // TODO Load this user submission to this component from props
  // TODO if there are none file in submission yet, create submission on db and use it
  useEffect(() => {
    async function initial() {
      const res = await getMySubmission({ contentId: params.contentId });
      if (res.status === "success") {
        setSubmission(res.data.submission);
        setIsSubmitted(res.data.submission.isSubmitted);
        // Fetch file that belong to this submission
        const filesRes = await getFiles({
          submissionId: res.data.submission.id,
          isDeleted: false,
        });
        if (filesRes.status === "success") {
          setSubmissionFiles(filesRes.data.files);
        }
        setIsHavingSubmission(true);
      }
    }
    initial();
  }, []);

  //ComponentWillUnmount
  /*
  useLayoutEffect(() => {
    return () => {
      // Your code here.
    };
  }, []);
  */
  const handleConfirmSubmitting = async () => {
    const res = await patchSubmission(
      { isSubmitted: !isSubmitted },
      submission.id
    );
    if (res.status === "success") {
      if (!isSubmitted && state.user.currentClassroomRole === "Student") {
        await sendLineMessage({
          targetId: state.user.currentUser.lineUserId,
          text: `ส่งงานใน ${props.contentName} สำเร็จ`,
        });
      }
      setIsSubmitted(!isSubmitted);
    }
  };

  const handleCreateSubmission = async () => {
    const res = await postSubmission({
      userId: state.user.currentUser.id,
      classroomId: params.classroomId,
      contentId: params.contentId,
      isStudent: state.user.currentClassroomRole === "Student",
    });
    console.log(res);
    setSubmission(res.data.newSubmission);
    setIsHavingSubmission(true);
    setRender(!render);
  };

  return (
    <div className="mt-8">
      <span className="block text-2xl text-gray-600">
        {state.user.currentClassroomRole === "Student"
          ? "ส่งงานที่ได้รับมอบหมาย"
          : "แนบไฟล์ไปกับเนื้อหา"}
      </span>
      {!isHavingSubmission && (
        <>
          <span className="block mt-2 text-gray-400 text-sm">
            {state.user.currentClassroomRole === "Student"
              ? "หากยังไม่มีการส่งงาน สามารถสร้างช่องทางการส่งงานได้ด้านล่าง"
              : "หากยังไม่มีการแนบไฟล์ สามารถสร้างช่องทางการแนบไฟล์ได้ด้านล่าง"}
          </span>
          <button
            className="mt-5 bg-skyblue px-4 py-2 text-white rounded-md hover:bg-blue-600"
            onClick={handleCreateSubmission}
          >
            สร้างช่องทางการส่งงาน
            {state.user.currentClassroomRole === "Student"
              ? "สร้างช่องทางการส่งงาน"
              : "สร้างช่องทางการแนบไฟล์"}
          </button>
        </>
      )}
      {isHavingSubmission && (
        <>
          <span className="block mt-2 text-gray-400 text-sm">
            หากทำการยืนยันแล้ว จะไม่สามารถแก้ไขได้จนกว่าจะยกเลิกการยืนยัน
          </span>
          <div className="mt-5 bg-gray-50 min-h-[10rem] max-w-[45rem] py-1">
            {submissionFiles.map((el, index) => (
              <FileElement
                key={index}
                index={index}
                el={el}
                disableDelete={isSubmitted}
                onSuccess={() => {
                  let tempSubmissionFiles = submissionFiles;
                  tempSubmissionFiles.splice(index, 1);
                  setSubmissionFiles(tempSubmissionFiles);
                  setRender(!render);
                }}
              />
            ))}
          </div>
          <div className="mt-5 mb-5">
            <button
              className={`${
                isSubmitted ? "color-gray" : "bg-skyblue"
              } px-4 py-2 text-white rounded-md `}
              onClick={() => {
                client.picker(options).open();
              }}
              disabled={isSubmitted}
            >
              เลือกไฟล์
            </button>
            <button
              className={`${
                isSubmitted ? "color-red" : "color-green"
              } px-4 py-2 text-white rounded-md  ml-5`}
              onClick={handleConfirmSubmitting}
            >
              {isSubmitted
                ? state.user.currentClassroomRole === "Student"
                  ? "ยกเลิกการส่งงาน"
                  : "ยกเลิกการแนบไฟล์"
                : state.user.currentClassroomRole === "Student"
                ? "ยืนยันการส่งงาน"
                : "ยืนยันการแนบไฟล์"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/*
<div className="mt-8">
      <span>ส่งงานที่ได้รับมอบหมาย</span>
      <div className="flex flex-row gap-x-5 mt-1">
        {colorList.map((el, index) => (
          <button
            key={index}
            onClick={() => handleColorSelector(index)}
            className={`h-16 w-16 rounded-md shadow-lg color-${el} ${colorSelector[index]}`}
          ></button>
        ))}
      </div>
    </div>
*/
