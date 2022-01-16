import { Outlet } from "react-router-dom";

export default function AuthenPage() {
  return (
    <div className="h-screen">
      <div className="px-16 my-20 gap-y-8 lg:px-48 ">
        <div className="flex justify-center relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
