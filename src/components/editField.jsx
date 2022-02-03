import React, { useState, useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function EditField(props) {
  const [text, setText] = useState();
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [editTextField, setEditTextField] = useState("");

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      setEditTextField(props.text);
      setText(props.text);
    }
    initial();
  }, []);

  return (
    <div className="flex flex-row items-center">
      {isOnEdit && (
        <div className="max-w-96">
          {props.type === "field" && (
            <input
              type="text"
              className="
                    w-32
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
              placeholder="ค่าใหม่"
              value={editTextField}
              onChange={(e) => {
                setEditTextField(e.target.value);
              }}
            ></input>
          )}
          {props.type === "selector" && (
            <select
              className="
                    w-fit
                    mt-1
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
              value={editTextField}
              onChange={(e) => {
                setEditTextField(e.target.value);
              }}
            >
              {props.selectData.map((el, index) => (
                <option key={index} value={el}>
                  {el}
                </option>
              ))}
            </select>
          )}
          <button
            className="ml-3 text-azure"
            onClick={async () => {
              try {
                let value = await props.callback(editTextField);
                setText(value);
                setIsOnEdit(false);
                console.log("success");
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <CheckIcon fontSize="large" />
          </button>
          <button
            className="ml-3 text-azure"
            onClick={() => {
              setIsOnEdit(false);
            }}
          >
            <ClearIcon fontSize="large" />
          </button>
        </div>
      )}
      {!isOnEdit && (
        <div className="max-w-96">
          <span className="">{text}</span>
          {props.editEnable && (
            <button
              className="ml-3 text-azure"
              onClick={() => {
                setIsOnEdit(true);
              }}
            >
              <EditIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
