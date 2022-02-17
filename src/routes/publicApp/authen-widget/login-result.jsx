import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { lineUserAuthen } from "../../../services/authentication";

//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux/root-action";

export default function LoginResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  //Redux
  const dispatch = useDispatch();
  const {
    setCurrentOperation,
    setCurrentAlert,
    setCurrentUser,
    setCurrentMenu,
  } = bindActionCreators(actionCreators, dispatch);

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        let res = await lineUserAuthen({
          code: searchParams.get("code"),
        });
        console.log(res);
        if (res.status === "fail") {
          navigate(`..`);
          return;
        }
        // Successfully login
        setCurrentAlert({
          type: "success",
          title: "สำเร็จ",
          message: "เข้าสู่ระบบสำเร็จ",
          link: null,
        });
        setCurrentUser(res.data.user);
        setCurrentMenu(`home`);
        window.sessionStorage.accessToken = res.token;
        navigate("/app");
      } catch (e) {
        console.log(e);
        setCurrentAlert({
          type: "error",
          title: "ล้มเหลว",
          message: "เข้าสู่ระบบล้มเหลว",
          link: null,
        });
        navigate("/");
      }
    }
    initial();
  }, []);

  return (
    <div className="grid justify-center  sm:shadow-md sm:rounded-lg landing-animation-right w-[400px] h-[600px] py-10 invisible">
      <span className="block text-4xl  mb-10 text-darkcloud font-kanit text-center">
        เข้าสู่ระบบ
      </span>
      <div className="relative h-52">
        <img src="../images/teacher2.webp" alt="" className="absolute" />
      </div>
      {false && (
        <>
          <button
            className="bg-line text-white mt-5 px-10 py-4 text-xl font-kanit rounded-md relative landing-animation-right hover:bg-[#09d45e]"
            onClick={() => {}}
          >
            <span className="px-2">เข้าสู่ระบบด้วย LINE</span>
          </button>
          <button
            className="bg-skyblue text-white mt-5 px-10 py-4 text-xl font-kanit rounded-md landing-animation-right"
            onClick={() => {}}
          >
            <span>สมัครสมาชิกใหม่</span>
          </button>
        </>
      )}
      <button
        className="bg-line text-white mt-5 px-10 py-4 text-xl font-kanit rounded-md relative landing-animation-right hover:bg-[#09d45e]"
        onClick={() => {}}
      >
        <span className="px-2">เข้าสู่ระบบด้วย Line</span>
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
