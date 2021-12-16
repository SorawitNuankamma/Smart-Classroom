import React, { useState, useEffect } from "react";

export default function Button(props) {
  const [btnClass, setBtnClass] = useState(
    "mt-24 bg-sky-500 px-5 py-4 text-white rounded-md text-2xl "
  );

  useEffect(() => {
    if (props.type == "link") {
      setBtnClass(
        "px-5 py-4 text-zinc-700 font-medium rounded-md text-lg lg:mt-0"
      );
    } else if (props.type == "small") {
      setBtnClass(
        "mt-24 bg-sky-500 px-5 py-3 text-white rounded-md text-lg lg:mt-0"
      );
    }
  });

  return (
    <div className="">
      <a className={btnClass} href="#">
        {props.text}
      </a>
    </div>
  );
}
