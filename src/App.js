import "./index.css";
import { Routes, Route } from "react-router-dom";

//Routes
/* LEGACY ROUTE
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
import CreateContent from "./routes/classroom/createContent";
import Content from "./routes/classroom/content";
import AllContent from "./routes/classroom/allContent";
import SubmitAssignment from "./routes/classroom/submitAssignment";
import LoginResult from "./routes/loginResult";
*/
import PublicApp from "./routes/publicApp";
import MainPage from "./routes/publicApp/main-page";
import AboutPage from "./routes/publicApp/about-page";
import ManualPage from "./routes/publicApp/manual-page";
import AuthenPage from "./routes/publicApp/authen-page";
import LoginLine from "./routes/publicApp/authen-widget/login-line";
import AuthenResult from "./routes/publicApp/authen-widget/authen-result";
import ClassroomApp from "./routes/classroomApp";
import HomePage from "./routes/classroomApp/home-page";
import CreateClassroomPage from "./routes/classroomApp/create-classroom-page";
import MyClassroomPage from "./routes/classroomApp/my-classroom-page";
import SettingPage from "./routes/classroomApp/setting-page";
import SignOutPage from "./routes/classroomApp/signout-page";
import ClassroomPage from "./routes/classroomApp/classroom-page";
import AppAlert from "./components/app-alert";
import ClassroomMainPage from "./routes/classroomApp/classroom/classroom-main-page";
import ClassroomInfoPage from "./routes/classroomApp/classroom/classroom-info-page";
import ClassroomAllContentsPage from "./routes/classroomApp/classroom/classroom-all-contents-page";
import ClassroomContentPage from "./routes/classroomApp/classroom/classroom-content-page";
import ClassroomCreateContentPage from "./routes/classroomApp/classroom/classroom-create-content-page";
import ClassroomSubmitAssignmentPage from "./routes/classroomApp/classroom/classroom-submit-assignment-page";
/*
<Route path="/" element={<Navbar />}>
          <Route path="" element={<Frontpage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user_setup" element={<UserSetup />} />
          <Route path="loginResult" element={<LoginResult />} />
        </Route>
*/

function App() {
  return (
    <div className="relative">
      <AppAlert />
      <Routes>
        <Route path="/" element={<PublicApp />}>
          <Route index element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="manual" element={<ManualPage />} />
          <Route path="authentication" element={<AuthenPage />}>
            <Route index element={<LoginLine />} />
            <Route path="result" element={<AuthenResult />} />
          </Route>
        </Route>
        <Route path="/app" element={<ClassroomApp />}>
          <Route index element={<HomePage />}></Route>
          <Route
            path="create-classroom"
            element={<CreateClassroomPage />}
          ></Route>
          <Route path="my-classroom" element={<MyClassroomPage />}></Route>
          <Route path="my-classroom/:classroomId" element={<ClassroomPage />}>
            <Route index element={<ClassroomMainPage />} />
            <Route
              path="classroom-information"
              element={<ClassroomInfoPage />}
            />
            <Route
              path="classroom-annoucement"
              element={
                <ClassroomAllContentsPage
                  type="annoucement"
                  createPath="create-annoucement"
                />
              }
            />
            <Route
              path="classroom-lesson"
              element={
                <ClassroomAllContentsPage
                  type="lesson"
                  createPath="create-lesson"
                />
              }
            />
            <Route
              path="classroom-assignment"
              element={
                <ClassroomAllContentsPage
                  type="assignment"
                  createPath="create-assignment"
                />
              }
            />
            <Route
              path="classroom-annoucement/:contentId"
              element={<ClassroomContentPage />}
            ></Route>
            <Route
              path="classroom-lesson/:contentId"
              element={<ClassroomContentPage />}
            ></Route>
            <Route
              path="classroom-assignment/:contentId"
              element={<ClassroomContentPage />}
            ></Route>
            <Route
              path="create-annoucement"
              element={<ClassroomCreateContentPage type="annoucement" />}
            ></Route>
            <Route
              path="create-lesson"
              element={<ClassroomCreateContentPage type="lesson" />}
            ></Route>
            <Route
              path="create-assignment"
              element={<ClassroomCreateContentPage type="assignment" />}
            ></Route>
            <Route
              path="classroom-annoucement/:contentId/edit"
              element={
                <ClassroomCreateContentPage edit={true} type="annoucement" />
              }
            ></Route>
            <Route
              path="classroom-lesson/:contentId/edit"
              element={<ClassroomCreateContentPage edit={true} type="lesson" />}
            ></Route>
            <Route
              path="classroom-assignment/:contentId/edit"
              element={
                <ClassroomCreateContentPage edit={true} type="assignment" />
              }
            ></Route>
            <Route
              path="classroom-assignment/:contentId/submit-assignment"
              element={<ClassroomSubmitAssignmentPage />}
            ></Route>
          </Route>
          <Route path="user-setting" element={<SettingPage />}></Route>
          <Route path="signout" element={<SignOutPage />}></Route>
        </Route>
        {/* LEGACY ROUTE */}
        {/*<Route path="/home" element={<Dashbar />}>
          <Route index element={<Home />} />
          <Route path="createClassroom" element={<CreateClassroom />} />
          <Route path="myClassroom" element={<MyClassrooms />} />
          <Route path="myClassroom/:id" element={<Classroom />}>
            <Route index element={<Main />} />
            <Route path="information" element={<Information />}></Route>
            <Route
              path="annoucement"
              element={
                <AllContent type="annoucement" createPath="createAnnoucement" />
              }
            ></Route>
            <Route
              path="lesson"
              element={<AllContent type="lesson" createPath="createLesson" />}
            ></Route>
            <Route
              path="assignment"
              element={
                <AllContent type="assignment" createPath="createAssignment" />
              }
            ></Route>
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
            <Route
              path="assignment/:contentId/submitAssignment"
              element={<SubmitAssignment />}
            ></Route>
          </Route>
          <Route path="setting" element={<UserSetting />} />
          <Route
            path="createClassroomSuccessful"
            element={<CreateClassSuccessful />}
          />
        </Route>*/}
      </Routes>
    </div>
  );
}

export default App;
