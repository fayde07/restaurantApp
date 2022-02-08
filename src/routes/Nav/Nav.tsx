import { Auth, getAuth, onAuthStateChanged } from "@firebase/auth";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Dropdown from "../../components/DropDown/DropDown";
import UserContext, { UserAuthContext } from "../../contexts/UserContext";
import { auth } from "../../utils/firebase";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  // const { user, signUserIn } = useContext(UserAuthContext);

  return (
    <nav>
      {/* <div className="logo">
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/"
        >
          <img
            src="logo192.png"
            alt="redirect-home"
            height="35px"
            width="35px"
          />
        </NavLink>
      </div> */}
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
