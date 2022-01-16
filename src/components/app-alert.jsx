import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/root-action";
import { useSelector } from "react-redux";

export default function AppAlert() {
  const state = useSelector((state) => state);
  const [visibility, setVisibility] = useState("invisible -translate-y-20");

  const navigate = useNavigate();

  //Redux
  const dispatch = useDispatch();
  const { setCurrentOperation, setCurrentAlert } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // Event Emitter
  useEffect(() => {
    async function onStateChange() {
      //Loop preventation
      if (state.app.currentAlert) {
        setVisibility("visible translate-y-0");
        setTimeout(() => {
          setVisibility("invisible -translate-y-20");
          setCurrentAlert(null);
        }, 5000);
      }
    }
    onStateChange();
  }, [state.app.currentAlert]);

  return (
    <div
      className={`transition-all ease-in-out fixed top-10 left-1/2 -translate-x-48 w-96 z-10 ${visibility}`}
    >
      <Alert severity="error">
        <AlertTitle>ข้อผิดพลาด</AlertTitle>
        ผู้ใช้ยังไม่ได้เป็นสมาชิก
      </Alert>
    </div>
  );
}
