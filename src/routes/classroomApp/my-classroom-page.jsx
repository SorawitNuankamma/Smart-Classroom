import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Divider from "@mui/material/Divider";
import AddBoxIcon from "@mui/icons-material/AddBox";

import "../styles/colors.css";
//Redux
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/root-action";
import { useSelector } from "react-redux";

//Service
import { isLogin } from "../../services/authentication";
import { getMyClassrooms } from "../../services/classroom";

export default function MyClassroomPage() {
  const state = useSelector((state) => state);

  const [initState, setInitState] = useState("opacity-0	translate-x-0	");
  const [classrooms, setClassrooms] = useState([]);
  const [isFetch, setIsFetch] = useState(false);

  const navigate = useNavigate();
  //Redux
  const dispatch = useDispatch();
  const { setCurrentClassroomRole } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        await isLogin();
        const res = await getMyClassrooms();
        if (res.status === "fail") {
          console.log("fetching failed");
          return;
        }
        setClassrooms(res.data.classrooms);
        setIsFetch(true);
        // Initial Animation
        setInitState("opacity-100 translate-x-0");
      } catch {
        console.log("error");
        //navigate("/login");
      }
    }
    initial();
  }, []);

  const handleClickClassroom = (id, index) => {
    let role;
    classrooms[index].users.forEach((el) => {
      if (el.userId === state.user.currentUser.id) {
        role = el.classroomRole;
      }
    });
    setCurrentClassroomRole(role);
    navigate(`${id}`);
  };

  return (
    <div
      className={`transition-all duration-[250ms] flex flex-col ${initState}`}
    >
      <div className="m-12 space-y-4 font-kanit ">
        <div className="flex flex-row items-center">
          <span className="text-5xl text-gray-600  ">
            ห้องเรียนของ {state.user.currentUser.name}
          </span>
          <button
            className="ml-3 text-azure"
            onClick={() => {
              navigate(`../create-classroom`);
            }}
          >
            <AddBoxIcon fontSize="large" />
          </button>
        </div>

        <div className=" max-w-6xl mt-5">
          <Divider />
        </div>
        <div className="mt-16 grid gap-4 grid-cols-1 md:grid-cols-2 desktop:grid-cols-3 w-fit">
          {isFetch &&
            classrooms.map((el, index) => (
              <div
                key={index}
                onClick={() => handleClickClassroom(el.id, index)}
                className={`color-${el.color} px-5 py-3 w-64 h-32 cursor-pointer rounded-md`}
              >
                <span className="block text-2xl text-white">{el.name}</span>
                <span className="block text-white">{el.users[0].name}</span>
              </div>
            ))}
          {!isFetch && (
            <div
              className={`animate-pulse bg-gray-200 px-5 py-3 w-64 h-32 cursor-pointer rounded-md`}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}

/*
{
  state.user.currentUser.classroom.map((el, index) => (
    <button key={index} className={``}>
      XDDD
    </button>
  ));
}*/
