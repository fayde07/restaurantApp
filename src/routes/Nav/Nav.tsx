import { Auth, getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import "antd/dist/antd.css";

import Dropdown from '../../components/DropDown/DropDown';
import UserContext, { UserAuthContext } from '../../contexts/UserContext';
import { auth } from '../../utils/firebase';

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  const { user, signUserIn } = useContext(UserAuthContext);
  console.log(user);

  // const isAuth = getAuth()
  // const loggedUser = isAuth.currentUser
  // if(loggedUser) {
  //   setUser(loggedUser)
  // }

  // console.log(loggedUser.uid);

  // useEffect(() => {
  //   if(loggedUser){
  //     const unsub = onAuthStateChanged(auth,(currentUser)=>{
  //       setUser(currentUser)
  //     })

  //     return unsub;
  //   }
  // },[])

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (currentUser: any) => {
  //     signUserIn(currentUser);
  //   });
  //   return unsub;
  // }, []);

  return (
    <div>

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

      {/* <Outlet /> */}
    </div>
  );
};
export default Nav;
