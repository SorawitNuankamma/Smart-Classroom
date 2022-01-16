import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Service

export default function PublicNavbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row justify-between py-8 px-44 select-none">
        <span className="px-6 py-3 font-kanit font-semibold text-2xl text-darkcloud ">
          Smart Classroom
        </span>
        <ul className="flex flex-row justify-between space-x-10 font-kanit font-normal text-xl text-literature">
          <li className="py-3">
            <Link to=".">หน้าหลัก</Link>
          </li>
          <li className="py-3">
            <Link to="about">เกี่ยวกับ</Link>
          </li>
          <li className="py-3">
            <Link to="manual">คู่มือ</Link>
          </li>
          <li>
            <button
              className="px-6 py-3 bg-skyblue text-white rounded-md hover:bg-blue-600 transition-all"
              onClick={() => {
                navigate(`authentication`);
              }}
            >
              เข้าสู่ระบบ
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
