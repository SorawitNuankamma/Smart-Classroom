import * as React from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/Sort";
import EditableField from "./editableField";
import { Button } from "@mui/material";

export default function ActionTable(props) {
  const renderElement = {
    none: (row, col, action, value, selectData) => {
      return value;
    },
    edit: (row, col, action, value, selectData) => {
      return (
        <EditableField
          text={value}
          callback={(editedValue) => {
            props.callback("edit", row, col, editedValue);
          }}
        />
      );
    },
    select: (row, col, action, value, selectData) => {
      return (
        <EditableField
          text={value}
          type="select"
          selectData={selectData}
          callback={(editedValue) => {
            props.callback("edit", row, col, editedValue);
          }}
        />
      );
    },
    delete: (row, col, action, value, selectData) => {
      return (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            props.callback("delete", row, col, null);
          }}
        >
          {value}
        </Button>
      );
    },
  };

  // ComponentDidMount
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.col.map((colName, index) => (
              <TableCell key={index}>
                {colName}

                {colName !== "การจัดการ" && (
                  <button
                    key={index}
                    onClick={() => {
                      props.callback("sort", 0, index, null);
                    }}
                  >
                    <SortIcon />
                  </button>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {row.map((field, index) => (
                <TableCell key={index}>
                  {renderElement[field.action](
                    field.row,
                    field.col,
                    field.action,
                    field.value,
                    field.selectData
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
