import FileSystemNavigator from "../../components/fileSystemNavigator";
import Divider from "@mui/material/Divider";
import "../styles/general.css";
import { Outlet } from "react-router-dom";

export default function ManualPage() {
  return (
    <div className="h-screen">
      <div className="px-20 lg:px-48 mt-10">
        <span className="font-kanit text-5xl">คู่มือการใช้งาน</span>
      </div>
      <div className="px-20 lg:px-48  mt-10">
        <Divider />
      </div>
      <div className="px-20 lg:px-48 mt-10 manual-body ">
        <div className="landing-animation-right">
          <FileSystemNavigator />
        </div>
        <div className="landing-animation-left">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
