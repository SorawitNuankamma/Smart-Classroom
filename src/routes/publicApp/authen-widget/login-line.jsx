import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux/root-action";

export default function LoginLine() {
  const navigate = useNavigate();

  //Redux
  const dispatch = useDispatch();
  const { setCurrentOperation, setCurrentAlert } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleLineLogin = () => {
    setCurrentOperation("login");
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656756645&redirect_uri=http://localhost:3000/authentication/result
&state=12345abcde&scope=profile%20openid`;
  };

  const handleLineSignUp = () => {
    setCurrentOperation("signup");
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656756645&redirect_uri=http://localhost:3000/authentication/result
&state=12345abcde&scope=profile%20openid`;
  };

  return (
    <div className="grid justify-center p-10 sm:shadow-md sm:rounded-lg landing-animation-right w-96  ">
      <span className="block text-4xl  mb-10 text-darkcloud font-kanit text-center">
        เข้าสู่ระบบ
      </span>
      <div className="relative h-52">
        <img src="../images/teacher2.webp" alt="" className="absolute" />
      </div>
      <button
        className="bg-line text-white mt-5 px-10 py-4 text-xl font-kanit rounded-md relative landing-animation-right"
        onClick={handleLineLogin}
      >
        <span className="px-2">เข้าสู่ระบบด้วย LINE</span>
      </button>
      <button
        className="bg-skyblue text-white mt-5 px-10 py-4 text-xl font-kanit rounded-md landing-animation-right"
        onClick={handleLineSignUp}
      >
        <span>สมัครสมาชิกใหม่</span>
      </button>
    </div>
  );
}
