import { Outlet } from "react-router-dom";

export default function AuthenPage() {
  return (
    <div className="">
      <div className=" gap-y-8 px-20 lg:px-48 lg:grid-cols-2 main pt-20 pb-40 h-5/6">
        <div className="flex justify-center relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
