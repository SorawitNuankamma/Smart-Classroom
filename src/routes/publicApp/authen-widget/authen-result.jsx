import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";
//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux/root-action";
import { useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

//Service
import {
  getLineToken,
  lineUserLogin,
  isLogin,
  lineUserSignUp,
} from "../../../services/authentication";

export default function AuthenResult() {
  const state = useSelector((state) => state);

  const [isLoad, setIsLoad] = useState(false);
  const [searchParams] = useSearchParams();
  //Redux
  const dispatch = useDispatch();
  const {
    setCurrentOperation,
    setCurrentUser,
    setCurrentAlert,
    setCurrentMenu,
  } = bindActionCreators(actionCreators, dispatch);

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
      //DEVELOPMENT ONLY
      if (searchParams.get("code") === "QWERTY") {
        window.sessionStorage.lineToken = "ASDFGH";
      }
      if (searchParams.get("code") === "YUIOP") {
        window.sessionStorage.lineToken = "XQEXN";
      }
      //DEVELOPMENT ONLY END

      if (state.app.currentOperation === "login") {
        try {
          res = await lineUserLogin();
          if (res.status === "fail") {
            navigate(`..`);
            return;
          }
          setIsLoad(true);
          // Successfully login
          setCurrentAlert({
            type: "success",
            title: "สำเร็จ",
            message: "เข้าสู่ระบบสำเร็จ",
            link: null,
          });
          setCurrentUser(res.data.user);
          window.sessionStorage.accessToken = res.token;
          res = await isLogin();
        } catch (e) {
          setCurrentAlert({
            type: "error",
            title: "ล้มเหลว",
            message: "เข้าสู่ระบบไม่สำเร็จ",
            link: null,
          });
          navigate(`..`);
        }
      } else if (state.app.currentOperation === "signup") {
        try {
          res = await lineUserSignUp();
          if (res.status === "fail" || !res) {
            console.log("failed to fetch");
            navigate(`../../`);
            return;
          }
          // Successfully signup
          setCurrentAlert({
            type: "success",
            title: "สำเร็จ",
            message: "สมัครสมาชิกสำเร็จ",
            link: null,
          });
          setCurrentUser(res.data.user);
          window.sessionStorage.accessToken = res.token;
          res = await isLogin();
        } catch (e) {
          setCurrentAlert({
            type: "error",
            title: "ล้มเหลว",
            message: "เข้าสู่ระบบไม่สำเร็จ",
            link: null,
          });
          navigate(`..`);
        }
      } else {
        console.log("error");
        navigate(`..`);
      }
    }
    initial();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-[400px] h-[600px] py-10 grid justify-center sm:shadow-md sm:rounded-lg landing-animation-right  ">
      {isLoad && (
        <>
          <span className="block text-4xl  mb-10 text-darkcloud font-kanit text-center">
            {authenText[state.app.currentOperation].title}
          </span>
          <div className="relative h-52 grid items-center justify-center">
            <Avatar
              alt="User profile pic"
              src={state.user.currentUser.pictureURL}
              sx={{ width: 170, height: 170 }}
            />
          </div>
          {state.app.currentOperation === "signup" ? (
            <label className="font-kanit mt-10">
              <Checkbox />
              ตกลงตามข้อกำหนดและเงื่อนไข
            </label>
          ) : null}
          <button
            className="bg-skyblue text-white mt-5 px-7 text-xl font-kanit rounded-md"
            onClick={() => {
              setCurrentMenu("home");
              navigate("/app");
            }}
          >
            <span>{authenText[state.app.currentOperation].button}</span>
          </button>
        </>
      )}
      {!isLoad && (
        <>
          <span className="block text-4xl  mb-10 text-darkcloud font-kanit text-center">
            <Skeleton variant="text" />
          </span>
          <div className="relative h-52 grid items-center justify-center">
            <Skeleton variant="circular" width={170} height={170} />
          </div>
        </>
      )}
    </div>
  );
}
