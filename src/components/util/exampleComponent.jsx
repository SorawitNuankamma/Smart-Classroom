import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CompName() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  // ComponentDidMount
  useEffect(() => {
    async function initial() {}
    initial();
  }, []);

  return <div className="flex flex-col"></div>;
}
