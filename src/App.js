import "./index.css";
import { Routes, Route } from "react-router-dom";

//Routes
import Frontpage from "./routes/frontpage";
import Login from "./routes/login";
import Navbar from "./components/navbar";
import Register from "./routes/register";
import UserSetup from "./routes/userSetup";

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
      </Routes>
    </div>
  );
}

export default App;
