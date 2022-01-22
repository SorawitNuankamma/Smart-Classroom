import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ClearIcon from "@mui/icons-material/Clear";

import { patchFile } from "../services/file";

export default function FileElement(props) {
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

    props.onSuccess();
  };

  return (
    <div
      key={props.index}
      className="ml-3 mt-3 px-3 py-1 border-2 border-skyblue bg-white w-fit rounded-2xl flex flex-row items-center"
    >
      <button
        key={props.index}
        className="text-gray-600 hover:text-skyblue"
        onClick={() => {
          handleFileDownload(props.el);
        }}
      >
        {props.el.filename}
      </button>
      {!props.disableDelete && (
        <button
          key={props.index + "1"}
          className="text-gray-600 hover:text-red-500 ml-2"
          onClick={() => {
            handleFileDelete(props.el, props.index);
          }}
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
}
