import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Service
const auth = require("../services/authentication");
//const userService = require("../services/user");

export default function UserSetting() {
  const [user, setUser] = useState({
    name: "",
  });
  const [initState, setInitState] = useState("opacity-0	translate-x-10	");

  const navigate = useNavigate();

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
        <span className="text-5xl text-gray-600 ">{user.name} Setting</span>
      </div>
    </div>
  );
}
