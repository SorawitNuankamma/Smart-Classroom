import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Component

//Service
const classroomService = require("../../../services/classroom");

export default function ClassroomSubmitAssignmentPage() {
  const [classroom, setClassroom] = useState([]);
  const [fileInput, setFileInput] = useState(React.createRef());
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
    }
    initial();
  }, []);

  const handleSubmit = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(fileInput.current.files[0]);
    };
  };

  return (
    <>
      <div className="mt-8 font-kanit">
        <span className="text-3xl text-gray-600 ">Submit Assignment</span>
      </div>
      <div className="mt-8">
        <input type="file" id="avatar" name="avatar" ref={fileInput}></input>
      </div>
      <div className="mt-8 font-kanit">
        <button
          className="block bg-sky-500 px-5 py-3 text-white rounded-md text-lg"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="mt-8 font-kanit">
        <button
          className="block bg-sky-500 px-5 py-3 text-white rounded-md text-lg"
          type="submit"
          onClick={() => {
            setFileInput(React.createRef());
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}
