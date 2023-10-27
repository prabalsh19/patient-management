import { NavLink } from "react-router-dom";
import "./styles.scss";
const SideNav = () => {
  return (
    <div className="sideNav">
      <h1 className="sideNav__logo">PatMed</h1>
      <div className="sideNav__links">
        <NavLink to={"/"}>Hospital</NavLink>
        <NavLink to={"/patient"}>Patient</NavLink>
        <NavLink to={"/ward"}>Ward</NavLink>
      </div>
    </div>
  );
};

export default SideNav;
