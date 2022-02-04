import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux/root-action";

export default function LoginLine() {
  const navigate = useNavigate();
  const clientRoute = `https://smart-classroom-demo.vercel.app/`;

  //Redux
  const dispatch = useDispatch();
  const { setCurrentOperation } = bindActionCreators(actionCreators, dispatch);

  const handleLineLogin = () => {
    setCurrentOperation("login");
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656756645&redirect_uri=${clientRoute}authentication/result&state=12345abcde&scope=profile%20openid`;
  };

  const handleLineSignUp = () => {
    setCurrentOperation("signup");
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656756645&redirect_uri=${clientRoute}authentication/result&state=12345abcde&scope=profile%20openid`;
  };

  return (
    <div className="grid justify-center  sm:shadow-md sm:rounded-lg landing-animation-right w-[400px] h-[600px] py-10  ">
      <span className="block text-4xl  mb-10 text-darkcloud font-kanit text-center">
        เข้าสู่ระบบ
      </span>
      <div className="relative h-52">
        <img src="../images/teacher2.webp" alt="" className="absolute" />
      </div>
      <button
        className="bg-line text-white mt-5 px-10 py-4 text-xl font-kanit rounded-md relative landing-animation-right hover:bg-[#09d45e]"
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
      {
        //DEVELOPMENT ONLY
        <>
          <button
            className="text-green-500 text-1xl"
            onClick={() => {
              setCurrentOperation("login");
              navigate(`result?code=QWERTY`);
            }}
          >
            LOGIN AS FAKEUSER
          </button>
          <button
            className="text-green-500 text-1xl"
            onClick={() => {
              setCurrentOperation("login");
              navigate(`result?code=YUIOP`);
            }}
          >
            LOGIN AS FAKEUSER2
          </button>
        </>
        //DEVELOPMENT ONLY END
      }
    </div>
  );
}
