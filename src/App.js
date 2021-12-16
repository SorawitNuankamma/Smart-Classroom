import "./index.css";

//Component
import NavMenu from "./components/navMenu";

//Pages
import Frontpage from "./pages/frontpage";

function App() {
  return (
    <div className="relative">
      <Frontpage />
      <NavMenu />
    </div>
  );
}

export default App;
