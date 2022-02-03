import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";

import SmartTable from "../../../components/smartTable";

//Redux
import { useSelector } from "react-redux";

//Service
import { getClassroom, patchClassroom } from "../../../services/classroom";

// Manually Set for each page
const columnObject = {
  name: {
    name: "ชื่อ",
    type: "link",
    sortAble: true,
    sortInvert: true,
  },
  code: {
    name: "รหัสนักเรียน",
    type: "number",
    sortAble: true,
    sortInvert: false,
  },
  role: {
    name: "บทบาทในห้องเรียน",
    type: "editField",
    sortAble: true,
    sortInvert: true,
  },
  action: {
    name: "แก้ไข",
    type: "action",
    sortAble: false,
    sortInvert: false,
  },
};

//Testing data
const rowsObject = [
  {
    name: {
      text: "sorawit",
      link: `61e3751ead076820f8389034`,
    },
    code: 11452,
    role: "student",
    action: "delete",
  },
  {
    name: {
      text: "sorawit",
      link: `61e3751ead076820f8389034`,
    },
    code: 11452,
    role: "student",
    action: "delete",
  },
];

export default function ClassroomAllMembersPage(props) {
  const state = useSelector((state) => state);
  const [classroom, setClassroom] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [rows, setRows] = useState();

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await getClassroom(params.classroomId);
      setClassroom(res.data.classroom);
      let rowTemplate = res.data.classroom.users.map((el) => {
        return {
          name: {
            value: el.name,
            path: `${el.userId}`,
          },
          code: {
            value: el.code,
          },
          role: {
            value: el.classroomRole,
            type: "selector",
            selectData: ["Student", "Teacher Assistance", "Teacher"],
            callback: async (value) => {
              //get classroom users
              let newUsersArray = res.data.classroom.users;
              newUsersArray.map((user) => {
                if (el === user) {
                  user.classroomRole = value;
                }
              });
              const response = await patchClassroom(
                { users: newUsersArray },
                params.classroomId
              );
              if (response.status === "success") {
                return value;
              } else {
                throw new Error("error : request unsuccessful");
              }
            },
            editEnable: el.classroomRole === "Owner" ? false : true,
          },
          action: {
            value: "delete",
          },
        };
      });
      setRows(rowTemplate);
      setFetchStatus(true);
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
      <div className="mt-8 font-kanit flex flex-row items-center">
        <span className="text-4xl text-gray-600 ">สมาชิกของห้องเรียน</span>
        <button
          className="ml-5 text-azure"
          onClick={() => {
            navigate(``);
          }}
        >
          <AddCircleOutlineIcon fontSize="large" />
        </button>
      </div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      <div className="mt-5 max-w-6xl">
        {fetchStatus && <SmartTable column={columnObject} rows={rows} />}
      </div>
    </div>
  );
}
