import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";

import SmartTable from "../../../components/smartTable";

//Redux
import { useSelector } from "react-redux";

//Service
import {
  getClassroom,
  patchClassroom,
  getAllMembersAndSubmissions,
} from "../../../services/classroom";

import { patchSubmission } from "../../../services/submission";

function exportToCsv(filename, rows) {
  var processRow = function (row) {
    var finalVal = "";
    for (var j = 0; j < row.length; j++) {
      var innerValue = row[j] === null ? "" : row[j].toString();
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      }
      var result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
      if (j > 0) finalVal += ",";
      finalVal += result;
    }
    return finalVal + "\n";
  };

  var csvFile = "";
  for (var i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

export default function ClassroomScoreBoardPage(props) {
  const state = useSelector((state) => state);
  const [classroom, setClassroom] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [column, setColumn] = useState();
  const [rows, setRows] = useState();

  const navigate = useNavigate();
  let params = useParams();

  const handleExportToCSV = async () => {
    // Creating rows in form of an array
    const res = await getAllMembersAndSubmissions({
      classroomId: params.classroomId,
    });

    let columnObject = res.data.column;
    let rowObjects = res.data.memberSubmissions;
    const exportRow = [];

    // Create header array
    const headerRow = [];
    Object.keys(res.data.column).forEach((column) => {
      headerRow.push(columnObject[column].name);
    });
    exportRow.push(headerRow);

    // Create each row array
    rowObjects.forEach((rowObject) => {
      const row = [];
      Object.keys(rowObject).forEach((column) => {
        row.push(rowObject[column].value);
      });
      exportRow.push(row);
    });

    // Create CSV
    exportToCsv("student_score", exportRow);
  };

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await getAllMembersAndSubmissions({
        classroomId: params.classroomId,
      });
      //Apply Callback function to element+
      res.data.memberSubmissions.forEach((row, index) => {
        Object.keys(row).forEach((column, index) => {
          // Accessing each element
          if (index === 0) return; // Skipping first element
          // Assign each element with their function that can change the element
          row[column].callback = async (value) => {
            const res = await patchSubmission(
              { score: value, isGraded: true },
              row[column].element.id
            );
            if (res.status === "success") {
              return res.data.submission.score;
            } else {
              throw new Error("error : request unsuccessful");
            }
          };
        });
      });

      console.log(res.data.memberSubmissions);

      setColumn(res.data.column);
      setRows(res.data.memberSubmissions);

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
        <span className="text-4xl text-gray-600 ">คะแนนรวมของนักเรียน</span>
      </div>
      <div className=" max-w-6xl mt-5">
        <Divider />
      </div>
      <div className="mt-5 max-w-6xl">
        {fetchStatus && <SmartTable column={column} rows={rows} />}
      </div>
      <div className="mt-5">
        <button
          className="px-5 py-3 bg-green-500 hover:bg-green-600 font-kanit text-white rounded-md shadow-sm transition-all ease-in-out"
          onClick={handleExportToCSV}
        >
          Export to CSV
        </button>
      </div>
      <div className="mt-5 text-azure hover:text-blue-500 transition-all ease-in-out ">
        <a href="https://benzneststudios.com/walletstory/docs/convert-csv-to-utf-8-in-ms-excel/">
          วิธีการเปิด CSV ไฟล์ด้วย Excel หากมีปัญหาภาษา
        </a>
      </div>
    </div>
  );
}
