import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Flex, Card, Input, Typography, message } from "antd";
import {
  GithubOutlined,
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import axiosInstance from "../Utils/axiosInstance.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserDetails } from "../Redux/reducer.user.jsx";

const { Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ LOGIN API
  const onLogin = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("admin/login", {
        email: email,
        password: password,
      });
      console.log("Login response: ", data);
      if (data.status) {
        message.success("Login Successfully");
        dispatch(setUserDetails(data));
        const redirectTo = new URLSearchParams(location.search).get("redirect");
        navigate(redirectTo || "/dashboard");
        console.log(
          "Login successful, navigating to",
          redirectTo || "/dashboard",
        );
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-shell">
      <Card
        className="auth-card auth-card-login"
        styles={{ body: { padding: 34 } }}
      >
        <Form onFinish={onLogin} layout="vertical" className="auth-form">
          <div className="auth-title-wrap">
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">
              Continue your curated reading journey
            </p>
          </div>

          <Form.Item
            label="EMAIL ADDRESS"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Invalid email" },
            ]}
            className="auth-form-item"
          >
            <Input
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<MailOutlined className="auth-input-icon" />}
              className="auth-input"
            />
          </Form.Item>

          <div className="auth-password-head">
            <Text className="auth-form-label">PASSWORD</Text>
            <button
              type="button"
              className="auth-link-button"
              onClick={() => message.info("Forgot password flow can be added.")}
            >
              Forgot Password?
            </button>
          </div>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
            className="auth-form-item"
          >
            <Input.Password
              placeholder="........"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              prefix={<LockOutlined className="auth-input-icon" />}
              className="auth-input"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="auth-submit"
          >
            Log In
          </Button>

          <div className="auth-divider-text">OR CONTINUE WITH</div>

          <Flex gap={12} className="auth-social-wrap">
            <Button className="auth-social-btn" icon={<GoogleOutlined />}>
              Google
            </Button>
            <Button className="auth-social-btn" icon={<GithubOutlined />}>
              GitHub
            </Button>
          </Flex>

          <div className="auth-bottom-text">
            <span>Don&apos;t have an account?</span>
            <button
              type="button"
              className="auth-link-button"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
