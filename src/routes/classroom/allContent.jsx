import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button";

//Service
const contentService = require("../../services/content");

export default function AllContent(props) {
  const [contents, setContents] = useState([]);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await contentService.getContents({
        classId: params.id,
        type: props.type,
      });
      setContents(res.data.contents);
    }
    initial();
  }, []);

  //Mapper Object
  const typeDict = {
    annoucement: "Annoucement",
    lesson: "Lesson",
    assignment: "Assignment",
  };

  const checkType = (type) => {
    return props.type === type;
  };

  return (
    <>
      <div className="mt-8 font-kanit">
        <span className="text-4xl text-gray-600 ">
          Classroom {typeDict[props.type]}
        </span>
      </div>
      <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 desktop:grid-cols-3 font-kanit">
        {contents.map((el, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`${el.id}`);
            }}
            className={` px-5 py-3 w-64 h-32 cursor-pointer rounded-md  bg-rose-200	 shadow-md`}
          >
            <span className="block text-2xl text-gray-600">{el.title}</span>
            {checkType("assignment") && (
              <span className="block text-lg text-gray-600">
                Due {el.dueDate}
              </span>
            )}
          </div>
        ))}
      </div>
      <Button
        text={`Create New ${props.type}`}
        type="small"
        path={`../${props.createPath}`}
      />
    </>
  );
}
