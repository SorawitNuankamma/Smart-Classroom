import Button from "../components/button";
import Navbar from "../components/navbar";

export default function Frontpage() {
  return (
    <div className="h-screen">
      <div className="px-16 grid my-20 gap-y-8 lg:px-48 lg:grid-cols-2">
        <div className="">
          <h1 className="text-5xl font-bold mb-10 text-blue-600/75">
            Smart Classroom
          </h1>
          <p className="text-blue-600/75 max-w-md text-lg">
            Create and manage an interactive and fully feature online classroom
            for teacher and student with LINE LIFF support
          </p>
        </div>
        <div>
          <img
            src="./images/classroom_vector.jpg"
            width="739px"
            height="auto"
            alt="classroom_image"
          />
        </div>
        <div className="mt-24 lg:mt-12">
          <Button text="Create a classroom" path="/login" />
        </div>
      </div>
    </div>
  );
}
