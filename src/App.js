import "./index.css";
import { Routes, Route } from "react-router-dom";

//Routes
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
import JoinClassroom from "./routes/classroomApp/join-classroom-page";
import ClassroomSubmittedFilesPage from "./routes/classroomApp/classroom/classroom-submitted-files-page";
import ClassroomAllMembersPage from "./routes/classroomApp/classroom/classroom-all-members-page";
import ClassroomMemberPage from "./routes/classroomApp/classroom/classroom-member-page";

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
          <Route path="join-classroom" element={<JoinClassroom />}></Route>
          <Route path="my-classroom/:classroomId" element={<ClassroomPage />}>
            <Route index element={<ClassroomMainPage />} />
            <Route
              path="classroom-information"
              element={<ClassroomInfoPage />}
            />
            <Route
              path="classroom-members"
              element={<ClassroomAllMembersPage />}
            />
            <Route
              path="classroom-members/:userId"
              element={<ClassroomMemberPage />}
            />
            <Route
              path="classroom-my-profile"
              element={<ClassroomMemberPage self={true} />}
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
              path="classroom-assignment/:contentId/submitted-files"
              element={<ClassroomSubmittedFilesPage />}
            ></Route>
          </Route>
          <Route path="user-setting" element={<SettingPage />}></Route>
          <Route path="signout" element={<SignOutPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
