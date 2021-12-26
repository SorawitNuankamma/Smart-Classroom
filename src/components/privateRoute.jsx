import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Service
const userService = require("../services/user");

export default function PrivateRoute() {
  const [user, setUser] = useState({
    name: "",
  });

  const navigate = useNavigate();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      let res = await userService.getMyUser();
      setUser(res.data.user);
    }
    initial();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="m-14 space-y-4">
        <span className="text-4xl text-blue-800">Welcome {user.name}</span>
        <p>this is your home page</p>
      </div>
    </div>
  );
}
