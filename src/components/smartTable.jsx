import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useNavigate, Link } from "react-router-dom";

import FileElement from "./fileElement";
import EditField from "./editField";

import SortIcon from "@mui/icons-material/Sort";

//Document will
export default function SmartTable(props) {
  const [column, setColumn] = useState([]);
  const [rows, setRows] = useState([]);
  const [render, setRender] = useState(false);

  const navigate = useNavigate();

  const getSortFunction = (columnName, sortInvert, type = "text") => {
    return (a, b) => {
      let firstValue = a[columnName].value;
      let secondValue = b[columnName].value;
      if (type === "number") {
        firstValue = parseInt(firstValue);
        secondValue = parseInt(secondValue);
      }
      console.log(firstValue);
      console.log(secondValue);
      if (firstValue < secondValue) {
        console.log(`${firstValue} < ${secondValue} `);
        if (sortInvert) return 1;
        return -1;
      }
      if (firstValue > secondValue) {
        console.log(`${firstValue} > ${secondValue} `);
        if (sortInvert) return -1;
        return 1;
      }
      return 0;
    };
  };

  function renderType(data, type, index) {
    if (type === "link") {
      return (
        <TableCell key={index} component="th" scope="row">
          <span className="text-blue-600  ">
            <Link to={data.path}>{data.value}</Link>
          </span>
        </TableCell>
      );
    }
    if (type === "files") {
      return (
        <TableCell key={index} component="th" scope="row">
          {data.value.map((el, index) => (
            <FileElement
              key={index}
              index={index}
              el={el}
              disableDelete={true}
            />
          ))}
        </TableCell>
      );
    }
    if (type === "editField") {
      return (
        <TableCell key={index} component="th" scope="row">
          <EditField
            callback={data.callback}
            text={data.value}
            type={data.type}
            selectData={data.selectData}
            editEnable={data.editEnable}
          />
        </TableCell>
      );
    }

    return (
      <TableCell key={index} component="th" scope="row">
        <span className="">
          {data.value === "" || data.value === 0 ? "ไม่มี" : data.value}
        </span>
      </TableCell>
    );
  }

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      setColumn(props.column);
      setRows(props.rows);
    }
    initial();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Object.keys(column).map((columnName, index) => (
              <TableCell key={index}>
                <div className="flex flex-row items-center">
                  <span className="">{column[columnName].name}</span>
                  {column[columnName].sortAble && false && (
                    // Disable sort due to rendering bug
                    <button
                      className="ml-3 text-azure"
                      onClick={() => {
                        //console.log(rows);
                        let temRows = rows;
                        console.log(column[columnName].sortInvert);
                        console.log(temRows);
                        temRows.sort(
                          getSortFunction(
                            columnName,
                            column[columnName].sortInvert,
                            column[columnName].type
                          )
                        );
                        console.log(temRows);

                        //console.log(temRows);
                        setRows(temRows);
                        setRender(!render);
                      }}
                    >
                      <SortIcon />
                    </button>
                  )}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.keys(row).map((columnName, index) =>
                renderType(row[columnName], column[columnName].type, index)
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
