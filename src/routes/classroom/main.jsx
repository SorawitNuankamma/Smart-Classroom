import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Component
import ClassroomMenuButton from "../../components/classroomMenuButton";

export default function Main() {
  const navigate = useNavigate();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {}
    initial();
  }, []);

  return (
    <>
      <div className="mt-8 font-kanit">
        <span className="text-xl text-gray-600">Main</span>
        <ClassroomMenuButton text="Class Information" path="information" />
        <ClassroomMenuButton text="Annoucement" path="annoucement" />
        <ClassroomMenuButton text="Lesson" path="lesson" />
        <ClassroomMenuButton text="Assignment" path="assignment" />
      </div>
      <div className="mt-12 font-kanit">
        <span className="text-xl text-gray-600">Teacher Menu</span>
        <ClassroomMenuButton text="User List" path="" />
        <ClassroomMenuButton text="Scoreboard" path="" />
      </div>
      <div className="mt-12 font-kanit">
        <span className="text-xl text-gray-600">Class Admin</span>
        <ClassroomMenuButton text="Class Setting" path="" />
      </div>
    </>
  );
}
