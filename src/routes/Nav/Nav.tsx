import React from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "../../components/DropDown/DropDown";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  // const { user, signUserIn } = useContext(UserAuthContext);

  return (
    <nav>
      <div className="rest">
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/home"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/about"
        >
          About
        </NavLink>
      </div>
      <div>
        <Dropdown />
      </div>
    </nav>
  );
};
export default Nav;
