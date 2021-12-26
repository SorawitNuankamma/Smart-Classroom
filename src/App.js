import "./index.css";
import { Routes, Route } from "react-router-dom";

//Routes
import Frontpage from "./routes/frontpage";
import Login from "./routes/login";
import Navbar from "./components/navbar";
import Register from "./routes/register";
import UserSetup from "./routes/userSetup";
import Dashbar from "./components/dashbar";
import Home from "./routes/home";
import MyClassroom from "./routes/myClassroom";
import CreateClassroom from "./routes/createClassroom";
import UserSetting from "./routes/userSetting";

function App() {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Frontpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user_setup" element={<UserSetup />} />
        </Route>
        <Route path="/home" element={<Dashbar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/myClassroom" element={<MyClassroom />} />
          <Route path="/home/createClassroom" element={<CreateClassroom />} />
          <Route path="/home/setting" element={<UserSetting />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
