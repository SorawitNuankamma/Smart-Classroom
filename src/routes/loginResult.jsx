import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/root-action";
import { Avatar, Button } from "@mui/material";

const auth = require("../services/authentication");

export default function LoginResult() {
  const [searchParams] = useSearchParams();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { setCurrentUser, setCurrentMenu } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const navigate = useNavigate();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      let res = await auth.getLineToken(searchParams.get("code"));
      window.sessionStorage.lineToken = res.access_token;
      res = await auth.lineUserLogin();
      console.log(res);
      if (res.status === "fail") {
        navigate(`../login`);
        return;
      }
      setCurrentUser(res.data.user);
      window.sessionStorage.accessToken = res.token;
      res = await auth.isLogin();
      console.log(res);
    }
    initial();
  }, []);

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 justify-items-center ">
        <div className="w-80 p-10 mt-20 bg-white grid grid-cols-1 justify-items-center gap-6 rounded-md shadow-md">
          <div className="text-3xl font-bold text-slate-700">
            Login as {state.user.currentUser.name}
          </div>
          <Avatar
            alt="Profile_pic"
            src={state.user.currentUser.pictureURL}
            sx={{ width: 100, height: 100 }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setCurrentMenu("home");
              navigate(`../home`);
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
