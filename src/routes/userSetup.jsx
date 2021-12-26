import React, { useState, useEffect } from "react";

//Service
const userService = require("../services/user");

export default function UserSetup(props) {
  const [name, setName] = useState("");
  const [validatorText, setValidatorText] = useState("Unknown error");
  const [validatorClass, setValidatorClass] = useState("invisible");

  // TODO : check if user just signup if no reject this page

  const setNameForm = (e) => {
    setName(e.target.value);
  };

  const handleSetup = async () => {
    if (name === "") {
      setValidatorText("Please fill the name");
      setValidatorClass("text-red-500");
      return;
    }
    const data = {
      name: name,
    };
    let res = await userService.updateMyUser(data);
    if (res.status === "fail") {
      setValidatorText("Unknown Error");
      setValidatorClass("text-red-500");
      return;
    }
    console.log(res);
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 justify-items-center ">
        <div className="w-80 p-10 mt-20 bg-white grid grid-cols-1 justify-items-center gap-5 rounded-md shadow-md">
          <div className="text-3xl font-bold text-slate-700 text-center">
            Setup a new user
          </div>
          <img src="./images/User.svg" alt="user_pic" className="mt-5" />
          <input
            type="text"
            class="
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-blue-500
                    mt-5
                  "
            placeholder="Name"
            onChange={setNameForm}
          ></input>

          <span className={validatorClass}>{validatorText}</span>
          <button
            onClick={handleSetup}
            className="inline-flex items-center px-8 py-4 leading-6 text-xl font-semibold shadow rounded-md text-white bg-sky-500 hover:bg-indigo-400 transition ease-in-out duration-150 "
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}
