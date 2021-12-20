import React, { useState, useEffect } from "react";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";

//service
const auth = require("../services/authentication");

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validatorClass, setValidatorClass] = useState("invisible");
  const [validatorText, setValidatorText] = useState("Unknown Error");

  let navigate = useNavigate();

  const setEmailForm = (e) => {
    setEmail(e.target.value);
  };

  const setPasswordForm = (e) => {
    setPassword(e.target.value);
  };

  const setPasswordConfirmForm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleUserRegister = async () => {
    if (email === "" || password === "") {
      setValidatorClass("text-red-500");
      setValidatorText("Please fill a proper email and password");
    } else if (passwordConfirm !== password) {
      setValidatorClass("text-red-500");
      setValidatorText("Password do not match");
    } else {
      let data = {
        email: email,
        password: password,
      };
      setValidatorClass("invisible");
      let res = await auth.userRegister(data);
      console.log(res);
      if (res.status === "fail") {
        setValidatorText(res.message);
        setValidatorClass("text-red-500");
      } else {
        setValidatorText("Register successful");
        window.sessionStorage.accessToken = res.token;
        setValidatorClass("text-green-500");
        navigate("/user_setup");
      }
    }
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 justify-items-center ">
        <div className="w-80 p-10 mt-20 bg-white grid grid-cols-1 justify-items-center gap-6 rounded-md shadow-md">
          <div className="text-3xl font-bold text-slate-700">Register</div>
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
            placeholder="Email"
            onChange={setEmailForm}
          ></input>
          <input
            type="password"
            class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-blue-500
                  "
            placeholder="Password"
            onChange={setPasswordForm}
          ></input>
          <input
            type="password"
            class="
                    mt-0
                    block
                    w-full
                    px-0.5
                    border-0 border-b-2 border-gray-200
                    focus:ring-0 focus:border-blue-500
                  "
            placeholder="Confirm password"
            onChange={setPasswordConfirmForm}
          ></input>
          <span className={validatorClass}>{validatorText}</span>
          <button
            className=" bg-sky-500 px-10 py-3 text-white rounded-md text-2xl"
            onClick={handleUserRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
