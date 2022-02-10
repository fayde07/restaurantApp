import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'antd';

import { UserOutlined } from '@ant-design/icons';

interface DropDownProps {}

const menu = (
  <Menu>
    <Menu.Item key="0">
      <NavLink className="activeNot" to="/login">
        Log in
      </NavLink>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Log out</Menu.Item>
  </Menu>
);

//nu mai pot inchide dropdownul.

const DropDown: React.FC<DropDownProps> = ({}) => {
  return (
    <div>
      <Dropdown overlay={menu} trigger={[ 'click' ]}>
        <Avatar icon={<UserOutlined />}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <DownOutlined />
          </a>
        </Avatar>
      </Dropdown>
    </div>
  );
};
export default DropDown;
