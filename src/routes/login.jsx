import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

//service
const auth = require("../services/authentication");

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatorText, setValidatorText] = useState("Unknown error");
  const [validatorClass, setValidatorClass] = useState("invisible");

  const setEmailForm = (e) => {
    setEmail(e.target.value);
  };

  const setPasswordForm = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setValidatorText("Please specify a correct email or password");
      setValidatorClass("text-red-500");
    } else {
      let data = {
        email: email,
        password: password,
      };
      setValidatorClass("invisible");
      let res = await auth.userLogin(data);
      if (res.status === "fail") {
        setValidatorText(res.message);
        setValidatorClass("text-red-500");
        return;
      }
      console.log(res.token);
      setValidatorText("Login successful");
      setValidatorClass("text-green-500");
      window.sessionStorage.accessToken = res.token;
      console.log(window.sessionStorage);
      //window.location.href = "/";
    }
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 justify-items-center ">
        <div className="w-80 p-10 mt-20 bg-white grid grid-cols-1 justify-items-center gap-6 rounded-md shadow-md">
          <div className="text-3xl font-bold text-slate-700">Login</div>
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
          <span className={validatorClass}>{validatorText}</span>
          <button
            onClick={handleLogin}
            className="inline-flex items-center px-8 py-4 leading-6 text-xl font-semibold shadow rounded-md text-white bg-sky-500 hover:bg-indigo-400 transition ease-in-out duration-150 "
          >
            login
          </button>
          <Link to="../register" className="text-sky-500">
            Register new account
          </Link>
        </div>
      </div>
    </div>
  );
}
