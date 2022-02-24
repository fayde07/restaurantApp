import React, { useContext } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { UserAuthContext } from "../../contexts/UserContext";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const { user, signUserIn } = useContext(UserAuthContext);

  const navigate = useNavigate();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values: any) => {
    const { username, password } = values;

    const handlelogin = async () => {
      let newUser = await signInWithEmailAndPassword(auth, username, password);
      await signUserIn(newUser.user);
    };
    
    const redirectToHome = () => navigate("/home");
    const loginAndRedirect = () => {
      handlelogin();
      redirectToHome();
    };
    loginAndRedirect();
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          // label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username or email"
          />
        </Form.Item>

        <Form.Item
          // label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            Log in
          </Button>
          Or <NavLink to="/register">register now!</NavLink>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
