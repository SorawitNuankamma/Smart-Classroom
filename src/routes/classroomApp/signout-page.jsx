import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/root-action";
import { useSelector } from "react-redux";

//Service
const auth = require("../../services/authentication");
//const userService = require("../services/user");

export default function SignOutPage() {
  const [user, setUser] = useState({
    name: "",
  });
  const [initState, setInitState] = useState("opacity-0	translate-x-10	");

  const navigate = useNavigate();
  //Redux
  const dispatch = useDispatch();
  const { setCurrentUser, setCurrentAlert } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        console.log("wtf");
        await auth.isLogin();
        //const res = await userService.getMyUser();
        //setUser(res.data.user);
        // Initial Animation
        setInitState("opacity-100 translate-x-0");
      } catch {
        navigate("/login");
      }
    }
    initial();
  }, []);

  return (
    <div className={`transition-all duration-500 flex flex-col ${initState}`}>
      <div className="m-12 space-y-4 font-kanit">
        <span className="text-5xl text-gray-600 ">
          คุณต้องการลงชื่อออกหรือไม่
        </span>
        <div className=" max-w-6xl mt-5">
          <Divider />
        </div>
        <button
          onClick={() => {
            window.sessionStorage.accessToken = null;
            window.sessionStorage.lineToken = null;
            setCurrentUser("none");
            setCurrentAlert({
              type: "success",
              title: "สำเร็จ",
              message: "ลงชื่อออกสำเร็จ",
              link: null,
            });
            navigate(`/`);
          }}
          className="px-5 py-3 bg-red-400 font-kanit text-white w-fit rounded-md"
        >
          ใช่ ลงชื่อฉันออก
        </button>
      </div>
    </div>
  );
}
