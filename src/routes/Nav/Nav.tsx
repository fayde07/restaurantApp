import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../../App.css';
import Dropdown from '../../components/DropDown/DropDown';

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  return (
    <div>
      <nav>
        <div className="logo">
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'activeNot')} to="/">
            <img src="logo192.png" alt="redirect-home" height="35px" width="35px" />
          </NavLink>
        </div>
        <div className="rest">
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'activeNot')} to="/home">
            Home
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'activeNot')} to="/about">
            About
          </NavLink>
        </div>
        <div>
          <Dropdown />
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
export default Nav;
