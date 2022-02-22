import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux/root-action";

export default function LoginLine() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientRoute = `https://smart-classroom-demo.vercel.app/`;

  //Redux
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { setCurrentOperation, setCurrentLoginTo } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleLineLogin = () => {
    setCurrentOperation("login");
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656756645&redirect_uri=${clientRoute}authentication/result&state=12345abcde&scope=profile%20openid`;
  };

  const handleLineSignUp = () => {
    setCurrentOperation("signup");
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656756645&redirect_uri=${clientRoute}authentication/result&state=12345abcde&scope=profile%20openid`;
  };

  const handleLineAuth = () => {
    console.log(
      `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${
        process.env.REACT_APP_ENV === "development"
          ? process.env.REACT_APP_LINE_CLIENT_DEV
          : process.env.REACT_APP_LINE_CLIENT_PROD
      }&redirect_uri=${
        process.env.REACT_APP_ENV === "development"
          ? process.env.REACT_APP_LINE_CALLBACK_DEV
          : process.env.REACT_APP_LINE_CALLBACK_PROD
      }&state=12345abcde&scope=profile%20openid`
    );

    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_LINE_CLIENT_DEV
        : process.env.REACT_APP_LINE_CLIENT_PROD
    }&redirect_uri=${
      process.env.REACT_APP_ENV === "development"
        ? process.env.REACT_APP_LINE_CALLBACK_DEV
        : process.env.REACT_APP_LINE_CALLBACK_PROD
    }&state=12345abcde&scope=profile%20openid`;
  };

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        console.log(process.env);
        if (searchParams.get("loginTo")) {
          setCurrentLoginTo(searchParams.get("loginTo"));
        } else {
          setCurrentLoginTo("/app");
        }
      } catch {}
    }
    initial();
  }, []);

  return (
    <div className="landing-animation-right w-[400px] h-[600px] py-10 ">
      <span className="block text-4xl  mb-10 text-darkcloud font-kanit text-center">
        เข้าสู่ระบบ
      </span>
      <div className="grid justify-center content-center">
        <img
          src="https://cdn.filestackcontent.com/UeOsXCetRxeQtdS29r5b"
          alt="user_icon"
          width="192px"
          height="auto"
        />
      </div>
      <div className="grid justify-center content-center mt-10">
        <button
          className="bg-line text-white mt-5 px-10 py-4 text-xl font-kanit rounded-md relative landing-animation-right hover:bg-[#09d45e] mx-auto transition-all ease-in-out shadow-sm"
          onClick={handleLineAuth}
        >
          <span className="">เข้าสู่ระบบด้วย Line</span>
        </button>
      </div>
      {
        //DEVELOPMENT ONLY
        false && (
          <div>
            <button
              className="text-green-500 text-1xl block"
              onClick={() => {
                setCurrentOperation("login");
                navigate(`result?code=QWERTY`);
              }}
            >
              LOGIN AS FAKEUSER
            </button>
            <button
              className="text-green-500 text-1xl block"
              onClick={() => {
                setCurrentOperation("login");
                navigate(`result?code=YUIOP`);
              }}
            >
              LOGIN AS FAKEUSER2
            </button>
          </div>
        )
        //DEVELOPMENT ONLY END
      }
    </div>
  );
}
