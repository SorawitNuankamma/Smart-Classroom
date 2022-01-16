import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import "./styles/colors.css";
import PublicNavbar from "../components/public-navbar";
import Footer from "../components/footer";
import AppAlert from "../components/app-alert";

//Service

export default function PublicApp() {
  return (
    <>
      <AppAlert />
      <PublicNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
