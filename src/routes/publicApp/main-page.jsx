import { useNavigate, useParams } from "react-router-dom";
import "../../App.css";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className=" grid grid-cols-[1fr_0px] gap-y-8 px-20 lg:px-48 lg:grid-cols-2 main pt-40 pb-60  ">
        <div className="landing-animation-right">
          <h1 className="text-5xl lg:text-7xl font-bold mb-10 text-blue-600/75">
            <span className="block text-royal">Smart</span>
            <span className="block text-[#30A0E0]">Classroom</span>
          </h1>
          <p className="text-blue-600/75 max-w-md text-lg text-darkcloud font-kanit">
            สร้างและบริหารห้องเรียนออนไลน์อย่างง่าย
            ที่นักเรียนและครูสามารถใช้งานได้บนเว็บไซต์ร่วมกับไลน์แอพพลิเคชั่น
          </p>
          <button
            onClick={() => {
              navigate("./authentication");
            }}
            className="font-kanit text-2xl text-royal bg-white border-4 border-royal px-10 py-5 mt-20 rounded-md shadow-md hover:scale-105 ease-in-out duration-200 landing-animation-right"
          >
            เริ่มต้นใช้งาน
          </button>
        </div>
        <div className="landing-animation-left">
          <img
            src="https://cdn.filestackcontent.com/HOBcOnS7R0Cb03Qu92Hd"
            width="739px"
            height="auto"
            alt="classroom_image"
          />
        </div>
      </div>
    </div>
  );
}
