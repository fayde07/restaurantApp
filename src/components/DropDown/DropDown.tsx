import React, { useContext } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserAuthContext } from "../../contexts/UserContext";
import { NavLink } from "react-router-dom";
import { getAuth, signOut } from "@firebase/auth";
import { auth } from "../../utils/firebase";

interface DropDownProps {}

const DropDown: React.FC<DropDownProps> = ({}) => {
  const { user, signUserIn } = useContext(UserAuthContext);
  const signedInMenu = (
    <Menu>
      <Menu.Item className="inactive" key="0">
        <a href="#">My Profile</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">My reservations</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="3"
        onClick={() => {
          signOut(auth)
            .then(() => {
              signUserIn({});
            })
            .catch((err: any) => {
              console.log(err.message);
            });
        }}
      >
        Log out
      </Menu.Item>
    </Menu>
  );
  const normalMenu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink className="inactive" to="/login">
          Log in
        </NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">other item</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown
        overlay={user?.email?.[0] ? signedInMenu : normalMenu}
        trigger={["click"]}
      >
        <Avatar icon={user?.email?.[0].toUpperCase() || <UserOutlined />}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <DownOutlined />
          </a>
        </Avatar>
      </Dropdown>
    </div>
  );
};
export default DropDown;
