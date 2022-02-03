import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";

//Redux
import { useSelector } from "react-redux";
import SmartTable from "../../../components/smartTable";

//Service
import {
  getSubmissionsAndFile,
  patchSubmission,
} from "../../../services/submission";

import { getMemberInfo } from "../../../services/classroom";

export default function ClassroomSubmittedFilesPage(props) {
  const state = useSelector((state) => state);
  const [submissions, setSubmissions] = useState();
  const [members, setMembers] = useState();
  const [rows, setRows] = useState();
  const [isFetch, setIsFetch] = useState(false);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await getSubmissionsAndFile({ contentId: params.contentId });
      console.log(res.data.submissionsAndFiles);
      const rowsTemplate = res.data.submissionsAndFiles.map((el) => {
        return {
          name: {
            value: el.member.name,
            path: `../classroom-members/${el.member.userId}`,
          },
          code: {
            value: el.member.code,
          },
          status: {
            value: "ส่งแล้ว",
          },
          score: {
            value: el.score,
            type: "field",
            callback: async (value) => {
              const res = await patchSubmission(
                { score: value, isGraded: true },
                el.id
              );
              if (res.status === "success") {
                return res.data.submission.score;
              } else {
                throw new Error("error : request unsuccessful");
              }
            },
            editEnable: true,
          },
          comment: {
            value: el.comment,
            type: "field",
            callback: async (value) => {
              const res = await patchSubmission({ comment: value }, el.id);
              if (res.status === "success") {
                return res.data.submission.comment;
              } else {
                throw new Error("error : request unsuccessful");
              }
            },
            editEnable: true,
          },

          submission: {
            value: el.files,
          },
        };
      });
      setRows(rowsTemplate);
      setIsFetch(true);
    }
    initial();
  }, []);

  // Manually Set for each page
  const columnObject = {
    name: {
      name: "ชื่อ",
      type: "link",
      sortAble: true,
      sortInvert: false,
    },
    code: {
      name: "รหัส",
      type: "number",
      sortAble: true,
      sortInvert: false,
    },
    status: {
      name: "สถานะ",
      type: "text",
      sortAble: true,
      sortInvert: true,
    },
    score: {
      name: "คะแนน",
      type: "editField",
      sortAble: true,
      sortInvert: false,
    },
    comment: {
      name: "ความคิดเห็น",
      type: "editField",
      sortAble: true,
      sortInvert: false,
    },
    submission: {
      name: "ไฟล์ที่ส่ง",
      type: "files",
      sortAble: false,
      sortInvert: true,
    },
  };

  const rowsObject = [
    {
      name: {
        value: "Sorawit",
      },
      code: {
        value: "11452",
      },
      status: {
        value: "ส่งแล้ว",
      },
      score: {
        value: 50,
        type: "field",
      },
      comment: {
        value: "",
      },
      submission: {
        value: [
          {
            _id: {
              $oid: "61e72aa772767c138dd039f2",
            },
            filename: "6110503495_สรวิชญ์ นวลคำมา_page-0001.jpg",
            fileStackHandle: "SMXialyfQiaNp93dD9Cw",
            mimetype: "image/jpeg",
            size: 173534,
            fileStackURL:
              "https://cdn.filestackcontent.com/SMXialyfQiaNp93dD9Cw",
            fileStackUploadId: "9au96e600BwACo06",
            contentId: "61e7290064c470136e72b07b",
            submissionId: "61e8b550b65c7d0cc47e0934",
            uploadDate: "Wed Jan 19 2022 04:01:27 GMT+0700 (Indochina Time)",
            isDeleted: true,
            __v: 0,
          },
        ],
      },
    },
  ];

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
        <span className="text-4xl text-gray-600 ">ไฟล์ที่ถูกส่งมา</span>
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
      <div className="mt-5 max-w-6xl">
        {isFetch && <SmartTable column={columnObject} rows={rows} />}
      </div>
    </div>
  );
}
