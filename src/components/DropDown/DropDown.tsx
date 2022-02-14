import React, { useContext } from 'react';
import {  Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserAuthContext } from '../../contexts/UserContext';
import DropDownMenu from '../DropDownMenu/DropDownMenu';


interface DropDownProps {}



const DropDown: React.FC<DropDownProps> = ({}) => {
  const { user } = useContext(UserAuthContext);

  return (
    <div>

        <Dropdown overlay={<DropDownMenu/>}  
        trigger={[ 'click' ]}
        >
          <Avatar
            icon={
              user?.email?.[0].toUpperCase() ||
              <UserOutlined />
            }
          >
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <DownOutlined />
              
            </a>
          </Avatar>
        </Dropdown>

    </div>
  );
};
export default DropDown;
