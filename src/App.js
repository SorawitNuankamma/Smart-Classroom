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
import MyClassrooms from "./routes/myClassrooms";
import CreateClassroom from "./routes/createClassroom";
import UserSetting from "./routes/userSetting";
import CreateClassSuccessful from "./routes/createClassSuccessful";
import Classroom from "./routes/classroom";
import Main from "./routes/classroom/main";
import Information from "./routes/classroom/information";
import Lesson from "./routes/classroom/lesson";
import Assignment from "./routes/classroom/assignment";
import Annoucement from "./routes/classroom/annoucement";
import CreateContent from "./routes/classroom/createContent";
import Content from "./routes/classroom/content";

function App() {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="" element={<Frontpage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user_setup" element={<UserSetup />} />
        </Route>
        <Route path="/home" element={<Dashbar />}>
          <Route index element={<Home />} />
          <Route path="createClassroom" element={<CreateClassroom />} />
          <Route path="myClassroom" element={<MyClassrooms />} />
          <Route path="myClassroom/:id" element={<Classroom />}>
            <Route index element={<Main />} />
            <Route path="information" element={<Information />}></Route>
            <Route path="annoucement" element={<Annoucement />}></Route>
            <Route path="lesson" element={<Lesson />}></Route>
            <Route path="assignment" element={<Assignment />}></Route>
            <Route path="annoucement/:contentId" element={<Content />}></Route>
            <Route path="lesson/:contentId" element={<Content />}></Route>
            <Route path="assignment/:contentId" element={<Content />}></Route>
            <Route
              path="createAnnoucement"
              element={<CreateContent type="annoucement" />}
            ></Route>
            <Route
              path="createLesson"
              element={<CreateContent type="lesson" />}
            ></Route>
            <Route
              path="createAssignment"
              element={<CreateContent type="assignment" />}
            ></Route>
            <Route
              path="annoucement/:contentId/edit"
              element={<CreateContent edit={true} type="annoucement" />}
            ></Route>
            <Route
              path="lesson/:contentId/edit"
              element={<CreateContent edit={true} type="lesson" />}
            ></Route>
            <Route
              path="assignment/:contentId/edit"
              element={<CreateContent edit={true} type="assignment" />}
            ></Route>
          </Route>
          <Route path="setting" element={<UserSetting />} />
          <Route
            path="createClassroomSuccessful"
            element={<CreateClassSuccessful />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
