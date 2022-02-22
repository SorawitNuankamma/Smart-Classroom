import React, { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function EditableField(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [render, setRender] = useState(false); // WTF is this
  const [fieldValue, setFieldValue] = useState("");

  useEffect(() => {
    setFieldValue(props.text);
  }, []);

  return (
    <div className="relative">
      <button
        className="invisible absolute"
        onClick={() => {
          setRender(!render);
        }}
      >
        d
      </button>
      {isEditing && (
        <>
          <input
            type="text"
            value={fieldValue}
            className="
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
            placeholder="classroom name"
            onChange={(e) => {
              setFieldValue(e.target.value);
            }}
          ></input>
          <button
            onClick={async () => {
              await props.callback(fieldValue);
              setIsEditing(!isEditing);
            }}
            className="px-2 text-azure"
          >
            <CheckIcon fontSize="large" />
          </button>
          <button
            onClick={() => {
              setFieldValue(props.text);
              setIsEditing(!isEditing);
            }}
            className="px-2 text-azure"
          >
            <ClearIcon fontSize="large" />
          </button>
        </>
      )}
      {!isEditing && (
        <>
          <input
            disabled={true}
            type="text"
            value={props.text}
            className="
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
            placeholder="classroom name"
          ></input>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
            }}
            className="px-5 text-azure"
          >
            <EditIcon fontSize="large" />
          </button>
        </>
      )}
    </div>
  );
}
