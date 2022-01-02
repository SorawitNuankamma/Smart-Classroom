import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button";

import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";

//Component
import ClassroomMenuButton from "../../components/classroomMenuButton";

//Service
const classroomService = require("../../services/classroom");
const contentService = require("../../services/content");

export default function Content() {
  const [content, setContent] = useState([]);

  const navigate = useNavigate();
  let params = useParams();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      // Fetch
      const res = await contentService.getContent(params.contentId);
      setContent(res.data.content);
    }
    initial();
  }, []);

  return (
    <>
      <div className="mt-8 font-kanit">
        <span className="text-4xl text-gray-600 ">{content.title}</span>
      </div>
      <div className="mt-8 font-kanit">{parse(draftToHtml(content.body))}</div>

      <Button text="Edit Annoucement" type="small" path="edit" />
    </>
  );
}
