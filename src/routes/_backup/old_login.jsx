import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/root-action";
import { WindowSharp } from "@mui/icons-material";

//service
const auth = require("../services/authentication");

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatorText, setValidatorText] = useState("Unknown error");
  const [validatorClass, setValidatorClass] = useState("invisible");

  //Redux
  const dispatch = useDispatch();
  const { setCurrentUser, setCurrentMenu } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const navigate = useNavigate();

  const setEmailForm = (e) => {
    setEmail(e.target.value);
  };

  const setPasswordForm = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    console.log(actionCreators);
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
      setValidatorText("Login successful");
      setValidatorClass("text-green-500");
      // set app user
      setCurrentUser(res.data.user);
      setCurrentMenu("home");
      //setCurrentMenu("home");
      window.sessionStorage.accessToken = res.token;
      navigate("/home");
    }
  };

  const handleLineLogin = () => {
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656756645&redirect_uri=http://localhost:3000/loginResult
&state=12345abcde&scope=profile%20openid`;
  };

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 justify-items-center ">
        <div className="w-80 p-10 mt-20 bg-white grid grid-cols-1 justify-items-center gap-6 rounded-md shadow-md">
          <div className="text-3xl font-bold text-slate-700">Login</div>
          <input
            type="text"
            className="
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
            className="
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
          <button
            className="bg-line font-kanit text-white py-2 px-5 rounded-md text-xl "
            onClick={handleLineLogin}
          >
            <img
              src="./images/line_login.png"
              alt="login_logo"
              className="inline mr-3"
            />
            Log in with LINE
          </button>
          <Link to="../register" className="text-sky-500">
            Register new account
          </Link>
        </div>
      </div>
    </div>
  );
}
