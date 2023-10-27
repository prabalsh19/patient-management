import { Outlet } from "react-router-dom";
import "./App.scss";
import SideNav from "./components/SideNav";

function App() {
  return (
    <div className="app">
      <SideNav />
      <Outlet />
    </div>
  );
}

export default App;
