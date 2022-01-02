import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button";

//Component
import ClassroomMenuButton from "../../components/classroomMenuButton";

//Service
const classroomService = require("../../services/classroom");
const contentService = require("../../services/content");

export default function Annoucement() {
  const [classroom, setClassroom] = useState([]);
  const [annoucements, setAnnoucements] = useState([]);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await contentService.getContents({
        classId: params.id,
        type: "annoucement",
      });
      setAnnoucements(res.data.contents);
    }
    initial();
  }, []);

  return (
    <>
      <div className="mt-8 font-kanit">
        <span className="text-4xl text-gray-600 ">Classroom Annoucement</span>
      </div>
      <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 desktop:grid-cols-3 w-fit">
        {annoucements.map((el, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`${el.id}`);
            }}
            className={` px-5 py-3 w-64 h-32 cursor-pointer rounded-md  bg-amber-100`}
          >
            <span className="block text-2xl text-gray-600">{el.title}</span>
          </div>
        ))}
      </div>
      <Button
        text="Create New Annouce"
        type="small"
        path="../createAnnoucement"
      />
    </>
  );
}
