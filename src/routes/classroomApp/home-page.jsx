import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Service

export default function HomePage(props) {
  const state = useSelector((state) => state);

  const [initState, setInitState] = useState("opacity-0	translate-x-10	");

  const navigate = useNavigate();

  //TODO Implement Export CSV

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        //await auth.isLogin();
        console.log("home");
        // Initial Animation
        setInitState("opacity-100 translate-x-0");
      } catch {
        navigate("/login");
      }
    }
    initial();
  }, []);

  return (
    <div
      className={`transition-all duration-500 flex flex-col ${initState} w-96`}
    >
      <div className="m-12 font-kanit">
        <span className="text-5xl text-gray-600 ">
          สวัสดีคุณ {state.user.currentUser.name}
        </span>
      </div>
    </div>
  );
}
