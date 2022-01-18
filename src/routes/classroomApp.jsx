import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import "./styles/colors.css";
import PublicNavbar from "../components/public-navbar";
import Footer from "../components/footer";
import AppAlert from "../components/app-alert";
import ClassroomNavbar from "../components/classroom-navbar";

//Service

export default function ClassroomApp() {
  return (
    <>
      <div className="grid grid-cols-[0px_1fr] laptop:grid-cols-classroomApp ">
        <div className="col-span-1">
          <ClassroomNavbar />
        </div>
        <div className="col-span-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
