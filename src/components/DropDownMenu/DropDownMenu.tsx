import React, { useContext } from 'react'
import { UserAuthContext } from '../../contexts/UserContext';
import { Menu, Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';
import { signOut } from '@firebase/auth';
import { getAuth } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import {contextDefaultValues} from '../../contexts/UserContext'



interface DropDownMenuProps {
}

 const DropDownMenu: React.FC<DropDownMenuProps> = ({}) => {
  const { user, signUserIn} = useContext(UserAuthContext);

  

    return (<div>
      {user?.email? 
      (<Menu>
        <Menu.Item className="inactive" key="0">
          {/* <NavLink className="inactive" to="/login">
            My profile
          </NavLink> */}
          <a href="#">My Profile</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="#">My reservations</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="3"
          onClick={() => {
            console.log(getAuth().currentUser);
            signOut(auth)
              .then(() => {
                signUserIn({})
                console.log(getAuth().currentUser);
              })
              .catch((err: any) => {
                console.log(err.message);
              });
          }}
        >
          Log out
        </Menu.Item>
      </Menu>):(<Menu>
    <Menu.Item key="0">
      <NavLink className="inactive" to="/login">
        Log in
      </NavLink>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#">other item</a>
    </Menu.Item>
    {/* <Menu.Divider />
    <Menu.Item
      key="3"
      onClick={() => {
        signOut(auth)
          .then(() => {
            console.log(getAuth().currentUser);
          })
          .catch((err: any) => {
            console.log(err.message);
          });
      }}
    >
      Log out
    </Menu.Item> */}
  </Menu>)}
    </div>);

}
export default DropDownMenu