import Button from "./button";

export default function Navbar() {
  return (
    <div className="relative px-16 flex justify-between py-5 lg:px-48">
      <span className="font-bold text-2xl  text-zinc-700">Smart Classroom</span>
      <div className="flex invisible absolute md:visible md:static  ">
        <Button text="Main" type="link" />
        <Button text="About" type="link" />
        <Button text="Feature" type="link" />
        <Button text="Login" type="small" />
      </div>
    </div>
  );
}
