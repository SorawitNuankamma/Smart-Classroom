export default function ManualPage() {
  return (
    <div className="h-screen public-app">
      <div className="px-16 grid my-20 gap-y-8 lg:px-48 lg:grid-cols-2">
        <div className="">
          <h1 className="text-5xl font-bold mb-10 text-blue-600/75">
            <span className="block text-royal">Manual</span>
            <span className="block text-golden">Classroom</span>
          </h1>
          <p className="text-blue-600/75 max-w-md text-lg text-darkcloud font-kanit">
            สร้างและบริหารห้องเรียนออนไลน์อย่างง่าย
            ที่นักเรียนและครูสามารถใช้งานได้บนเว็บไซต์ร่วมกับไลน์แอพพลิเคชั่น
          </p>
        </div>
        <div></div>
        <div className="mt-24 lg:mt-12"></div>
      </div>
    </div>
  );
}
