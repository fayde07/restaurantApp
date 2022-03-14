import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "../../components/DropDown/DropDown";
import { UserAuthContext } from "../../contexts/UserContext";
import { db } from "../../utils/firebase";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  const { user, signUserIn } = useContext(UserAuthContext);

  const usersCollection = collection(db, "users");
  const [allUsers, setAllUsers] = useState<any>([]);
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const data = await getDocs(usersCollection);
    setAllUsers(data.docs.map((user) => ({ ...user.data(), id: user.id })));
  };

  const isUserAdmin = !!allUsers?.find((u: any) => user?.email === u?.email);


  const menuType = (isUserAdmin: boolean) => {
    if (!isUserAdmin) {
      return (
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
      );
    } else {
      return (
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
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </div>
      );
    }
  };

console.log(user);

  return (
    <nav>
      
      {menuType(isUserAdmin)}
      <div>
        <Dropdown />
      </div>
    </nav>
  );
};
export default Nav;
