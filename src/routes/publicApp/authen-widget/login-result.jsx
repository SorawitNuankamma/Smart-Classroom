import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { lineUserAuthen } from "../../../services/authentication";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux/root-action";

export default function LoginResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  //Redux
  const state = useSelector((state) => state);
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
        navigate(state.app.currentLoginTo);
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
    <div className="grid justify-center  sm:rounded-lg landing-animation-right w-[400px] h-[600px] py-10">
      <span className="block text-4xl  mb-10 text-darkcloud font-kanit text-center">
        กำลังเข้าสู่ระบบ
      </span>
      <div className="relative">
        <svg
          className="animate-spin"
          width="256px"
          height="256px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="#06C755"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"
          />
        </svg>
      </div>
    </div>
  );
}
