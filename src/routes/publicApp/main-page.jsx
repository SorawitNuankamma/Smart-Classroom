export default function MainPage() {
  return (
    <div className="h-screen">
      <div className="px-16 grid my-20 gap-y-8 lg:px-48 lg:grid-cols-2 ">
        <div className="landing-animation-right">
          <h1 className="text-5xl font-bold mb-10 text-blue-600/75">
            <span className="block text-royal">Smart</span>
            <span className="block text-golden">Classroom</span>
          </h1>
          <p className="text-blue-600/75 max-w-md text-lg text-darkcloud font-kanit">
            สร้างและบริหารห้องเรียนออนไลน์อย่างง่าย
            ที่นักเรียนและครูสามารถใช้งานได้บนเว็บไซต์ร่วมกับไลน์แอพพลิเคชั่น
          </p>
        </div>
        <div className="landing-animation-left">
          <img
            src="./images/classroom_vector.webp"
            width="739px"
            height="auto"
            alt="classroom_image"
          />
        </div>
        <div className="mt-24 lg:mt-12">
          <button className="font-kanit text-2xl text-royal bg-white border-4 border-royal px-10 py-5 rounded-md shadow-md hover:scale-105 ease-in-out duration-200 landing-animation-right">
            สร้างห้องเรียนใหม่ทันที
          </button>
        </div>
      </div>
    </div>
  );
}
