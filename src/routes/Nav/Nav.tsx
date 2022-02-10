import React, { useMemo, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../../App.css';
import Dropdown from '../../components/DropDown/DropDown';
import { UserContext } from '../../contexts/UserContext';

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  const [ user, setUser ] = useState(null);

  const providerValue = useMemo(() => ({ user, setUser }), [ user, setUser ]);

  return (
    <div>
      {/* <UserContext.Provider value={providerValue}> */}
        <nav>
          <div className="logo">
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/">
              <img src="logo192.png" alt="redirect-home" height="35px" width="35px" />
            </NavLink>
          </div>
          <div className="rest">
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/home">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/about">
              About
            </NavLink>
          </div>
          <div>
            <Dropdown />
          </div>
        </nav>
        <Outlet />
      {/* </UserContext.Provider> */}
    </div>
  );
};
export default Nav;
