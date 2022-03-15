import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";
import { DataGrid } from "@mui/x-data-grid";

import SmartTable from "../../../components/smartTable";
import ActionTable from "../../../components/actionTable";

//Redux
import { useSelector } from "react-redux";

//Service
import { getClassroom, patchClassroom } from "../../../services/classroom";

//Class
import Field from "../../../classes/field";
import EnhancedTable from "../../../components/enhancedTable";
import EditModal from "../../../components/editModal";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "ชื่อ",
    width: 150,
    editable: false,
  },
  {
    field: "studentCode",
    headerName: "รหัสนักเรียน",
    type: "number",
    width: 150,
    editable: false,
  },
  {
    field: "email",
    headerName: "อีเมลล์",
    width: 150,
    editable: false,
  },
  {
    field: "classroomRole",
    headerName: "บทบาท",
    width: 110,
    editable: false,
  },
];

const editableColumn = [
  {
    value: "name",
    title: "ชื่อ",
    type: "field",
  },
  {
    value: "studentCode",
    title: "รหัสนักเรียน",
    type: "field",
  },
  {
    value: "email",
    title: "อีเมลล์",
    type: "field",
  },
  {
    value: "classroomRole",
    title: "บทบาท",
    type: "select",
    selectOption: ["Student", "TA", "Teacher"],
  },
];

export default function ClassroomAllMembersPage(props) {
  const state = useSelector((state) => state);
  const [classroom, setClassroom] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(false);
  const usersArrayMapper = useRef({});
  //const [rows, setRows] = useState();
  const sortByColumnName = useRef(null);
  const columnSortInvert = useRef({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const navigate = useNavigate();
  let params = useParams();

  const handleCallback = async (field) => {
    console.log(field);
    // clone users array
    let usersClone = JSON.parse(JSON.stringify(classroom.users));
    if (field.isDeleting) {
      usersClone.splice(usersArrayMapper.current[field.id], 1);
    } else {
      usersClone[usersArrayMapper.current[field.id]][field.property] =
        field.value;
    }
    let res = await patchClassroom({ users: usersClone }, classroom.id);
    // update table state
    let classroomClone = JSON.parse(JSON.stringify(classroom));
    classroomClone.users = usersClone;
    setClassroom(classroomClone);
  };

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await getClassroom(params.classroomId);
      setClassroom(res.data.classroom);
      res.data.classroom.users.forEach((user, index) => {
        usersArrayMapper.current[user.id] = index;
      });
      //let rows = res.data.classroom.users.map((user) => createRow(user));
      //setRows(rows);
      //let newRows = renderTable(res.data.classroom.users);
      //setRows(newRows);
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
      </div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      <div className="mt-5 max-w-6xl">
        {fetchStatus && (
          <>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={classroom.users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                isCellEditable={(params) => {
                  console.log(params);
                }}
              />
            </div>
            <div className="mt-3">
              <EditModal
                userIdList={classroom.users.map((el) => el.id)}
                editableColumn={editableColumn}
                callback={handleCallback}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
