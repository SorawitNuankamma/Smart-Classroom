import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";
//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux/root-action";
import { useSelector } from "react-redux";

//Service
import {
  getLineToken,
  lineUserLogin,
  isLogin,
  lineUserSignUp,
} from "../../../services/authentication";

export default function AuthenResult() {
  const state = useSelector((state) => state);

  const [user, setUser] = useState({});

  const [searchParams] = useSearchParams();
  //Redux
  const dispatch = useDispatch();
  const { setCurrentOperation, setCurrentUser } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const authenText = {
    login: {
      title: "เข้าสู่ระบบ",
      button: "ยืนยันการเข้าสู่ระบบ",
    },
    signup: {
      title: "สมัครสมาชิก",
      button: "ยืนยันการสมัครสมาชิก",
    },
    none: {
      title: "เข้าสู่ระบบ",
      button: "ยืนยันการเข้าสู่ระบบ",
    },
  };

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      let res = await getLineToken(searchParams.get("code"));
      window.sessionStorage.lineToken = res.access_token;

      if (state.app.currentOperation === "login") {
        res = await lineUserLogin();
        if (res.status === "fail") {
          navigate(`..`);
          return;
        }
        setCurrentUser(res.data.user);
        window.sessionStorage.accessToken = res.token;
        res = await isLogin();
      } else if (state.app.currentOperation === "signup") {
        res = await lineUserSignUp();
        if (res.status === "fail") {
          navigate(`..`);
          return;
        }
        setCurrentUser(res.data.user);
        window.sessionStorage.accessToken = res.token;
        res = await isLogin();
      } else {
        navigate(`..`);
      }
    }
    initial();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="grid justify-center p-10 sm:shadow-md sm:rounded-lg landing-animation-right  ">
      <span className="block text-4xl  mb-10 text-darkcloud font-kanit text-center">
        {authenText[state.app.currentOperation].title}
      </span>
      <div className="relative h-52">
        <img
          src={state.user.currentUser.pictureURL}
          alt=""
          className="absolute"
        />
      </div>
      <label className="font-kanit mt-10">
        <Checkbox />
        ตกลงตามข้อกำหนดและเงื่อนไข
      </label>
      <button className="bg-skyblue text-white mt-5 px-7 py-4 text-xl font-kanit rounded-md">
        <span>{authenText[state.app.currentOperation].button}</span>
      </button>
    </div>
  );
}
