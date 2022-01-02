import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Button(props) {
  const [btnClass, setBtnClass] = useState(
    "mt-24 bg-sky-500 px-5 py-4 text-white rounded-md text-2xl "
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (props.type == "link") {
      setBtnClass(
        "px-5 py-4 text-zinc-700 font-medium rounded-md text-lg lg:mt-0"
      );
    } else if (props.type == "small") {
      setBtnClass("bg-sky-500 px-5 py-3 text-white rounded-md text-lg ");
    } else if (props.type == "large") {
      setBtnClass(" bg-sky-500 px-5 py-3 text-white rounded-md text-lg ");
    }
  });

  const handleClick = () => {
    navigate(`${props.path}`);
  };

  return (
    <div className="">
      <button className={btnClass} onClick={handleClick}>
        {props.text}
      </button>
    </div>
  );
}
