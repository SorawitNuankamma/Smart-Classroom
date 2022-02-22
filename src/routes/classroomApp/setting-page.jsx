import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as filestack from "filestack-js";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/root-action";
import EditableField from "../../components/editableField";

//API Service
import { patchLineUser } from "../../services/lineUser";

export default function SettingPage() {
  const [initState, setInitState] = useState("opacity-0	translate-x-10	");

  //Filestack dependencies
  const client = filestack.init(`ABXuU7bayRkeVh8mmyNAAz`);
  const options = {
    onFileSelected: (file) => {
      // If you throw any error in this function it will reject the file selection.
      // The error message will be displayed to the user as an alert.
      if (file.size > 20000 * 1000) {
        throw new Error("ไม่สามารถรองรับไฟล์ที่มีขนาดเกิน 20MB ได้");
      }
    },
    onFileUploadFinished: async (fileMeta) => {
      let res = await patchLineUser(
        { pictureURL: fileMeta.url },
        state.user.currentUser.id
      );
      if (res.status === "success") {
        // setState
        let userCopy = JSON.parse(JSON.stringify(state.user.currentUser));
        userCopy.pictureURL = fileMeta.url;
        setCurrentUser(userCopy);
      }
      console.log(fileMeta);
    },
  };

  const navigate = useNavigate();
  //Redux
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { setCurrentOperation, setCurrentLoginTo, setCurrentUser } =
    bindActionCreators(actionCreators, dispatch);

  // ComponentDidMount
  useEffect(() => {
    async function initial() {
      try {
        // Initial Animation
        setInitState("opacity-100 translate-x-0");
      } catch {
        navigate("/login");
      }
    }
    initial();
  }, []);

  return (
    <div className={`transition-all duration-500 flex flex-col ${initState}`}>
      <div className="m-12 space-y-4 font-kanit">
        <span className="text-5xl text-gray-600 ">ตั้งค่าบัญชีของฉัน</span>
      </div>
      <div className="mx-12 font-kanit">
        <label className="block">
          <span className="text-gray-700 text-xl">ชื่อของฉัน</span>
          <div className="py-5">
            <EditableField
              text={state.user.currentUser.name}
              callback={async (value) => {
                //call api to set to database
                let res = await patchLineUser(
                  { name: value },
                  state.user.currentUser.id
                );
                console.log(res);
                if (res.status === "success") {
                  // setState
                  let userCopy = JSON.parse(
                    JSON.stringify(state.user.currentUser)
                  );
                  userCopy.name = value;
                  setCurrentUser(userCopy);
                }
              }}
            />
          </div>
        </label>
        <label className="block">
          <span className="text-gray-700 text-xl">รูปของฉัน</span>
          <img
            className="mt-5 w-64"
            src={state.user.currentUser.pictureURL}
            alt="user_image_profile"
            height="auto"
            width="auto"
          />
        </label>
        <button
          className="bg-skyblue px-4 py-2 text-white rounded-md hover:bg-blue-600 mt-5"
          onClick={() => {
            client.picker(options).open();
          }}
        >
          เลือกไฟล์
        </button>
      </div>
    </div>
  );
}
