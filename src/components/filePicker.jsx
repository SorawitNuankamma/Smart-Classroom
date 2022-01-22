import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import * as filestack from "filestack-js";
import FileElement from "./fileElement";

import "../styles/colors.css";
import ClearIcon from "@mui/icons-material/Clear";

import { postSubmission, getMySubmission } from "../services/submission";
import { postFile, getFiles, patchFile } from "../services/file";

import { useSelector } from "react-redux";

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
  const [isSubmission, setIsSubmission] = useState(false);
  const [submissionFiles, setSubmissionFiles] = useState([]);

  let params = useParams();

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
      console.log(submission);
      const res = await getMySubmission({ contentId: params.contentId });
      if (res.status === "success") {
        setIsSubmission(true);
        setSubmission(res.data.submission);
        // Fetch file that belong to this submission
        const filesRes = await getFiles({
          submissionId: res.data.submission.id,
          isDeleted: false,
        });
        if (filesRes.status === "success") {
          setSubmissionFiles(filesRes.data.files);
          console.log(submission);
        }
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

  const handleCreateSubmission = async () => {
    const res = await postSubmission({
      userId: state.user.currentUser.id,
      classroomId: params.classroomId,
      contentId: params.contentId,
      isStudent: true,
    });
    console.log(res);
    setSubmission(res.data.newSubmission);
    setIsSubmission(true);
    setRender(!render);
  };

  const handleFileDownload = (file) => {
    window.open(`https://cdn.filestackcontent.com/${file.fileStackHandle}`);
  };

  const handleFileDelete = async (file, index) => {
    //TODO Delete file on filestack
    //Delete file on mongoDB
    let res = await patchFile(
      {
        isDeleted: true,
      },
      `${file.id}`
    );
    //Delete file in state
    let tempSubmissionFiles = submissionFiles;
    tempSubmissionFiles.splice(index, 1);
    setSubmissionFiles(tempSubmissionFiles);
    setRender(!render);
  };

  return (
    <div className="mt-8">
      <span className="block text-2xl text-gray-600">
        ส่งงานที่ได้รับมอบหมาย
      </span>
      {!isSubmission && (
        <>
          <span className="block mt-2 text-gray-400 text-sm">
            หากยังไม่มีการส่งงาน สามารถสร้างช่องทางการส่งงานได้ด้านล่าง
          </span>
          <button
            className="mt-5 bg-skyblue px-4 py-2 text-white rounded-md hover:bg-blue-600"
            onClick={handleCreateSubmission}
          >
            สร้างช่องทางการส่งงาน
          </button>
        </>
      )}
      {isSubmission && (
        <>
          <span className="block mt-2 text-gray-400 text-sm">
            ไฟล์ที่ถูก upload ขึ้นมาจะถือว่าเป็นการส่งงาน
            นักเรียนสามารถยกเลิกส่งงานได้โดยการคลิกลบไฟล์ในช่องการส่งงานด้านล่าง
          </span>
          <div className="mt-5 bg-gray-50 min-h-[10rem] max-w-[45rem] py-1">
            {submissionFiles.map((el, index) => (
              <FileElement
                key={index}
                index={index}
                el={el}
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
              className="bg-skyblue px-4 py-2 text-white rounded-md hover:bg-blue-600"
              onClick={() => {
                client.picker(options).open();
              }}
            >
              เลือกไฟล์
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
