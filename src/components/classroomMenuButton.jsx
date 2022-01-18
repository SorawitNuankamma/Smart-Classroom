import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ClassroomMenuButton(props) {
  const navigate = useNavigate();

  const handleRouting = () => {
    navigate(`${props.path}`);
  };

  return (
    <div
      className="bg-iron cursor-pointer text-gray-600 text-xl w-72 py-5 px-5 rounded-md shadow-md mt-4"
      onClick={handleRouting}
    >
      <span>{props.text}</span>
    </div>
  );
}
