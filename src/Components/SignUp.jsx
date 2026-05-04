import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Typography, message, Input, Flex, Card } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../Redux/reducer.user.jsx";
import axiosInstance from "../Utils/axiosInstance.jsx";

const { Text } = Typography;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityCode, setSecurityCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  // ✅ SIGNUP API
  const onSignup = async () => {
    try {
      setLoading(true);
      console.log("Signup details: ", { userName, email, password });

      const { data } = await axiosInstance.post("/admin/signup", {
        userName: userName,
        email: email,
        password: password,
      });
      console.log("Signup response: ", data);
      if (data.status) {
        message.success("Signup Successfully");
        // dispatch(setUserDetails(...data, { data: data.data }));
        dispatch(setUserDetails({ ...data, data: data.data }));
        navigate("/login");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updateCodeAtIndex = (index, value) => {
    const next = [...securityCode];
    next[index] = String(value || "").slice(-1);
    setSecurityCode(next);
  };

  return (
    <div className="auth-page-shell">
      <Card className="auth-card" styles={{ body: { padding: 34 } }}>
        <Form onFinish={onSignup} layout="vertical" className="auth-form">
          <div className="auth-title-wrap auth-title-left">
            <h1 className="auth-title">Join the collective.</h1>
            <p className="auth-subtitle">
              Create your account to start curating and sharing your stories.
            </p>
          </div>

          <Form.Item
            label="USERNAME"
            name="userName"
            rules={[{ required: true, message: "Please enter username" }]}
            className="auth-form-item"
          >
            <Input
              placeholder="johndoe"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              prefix={<UserOutlined className="auth-input-icon" />}
              className="auth-input"
            />
          </Form.Item>

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
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<MailOutlined className="auth-input-icon" />}
              className="auth-input"
            />
          </Form.Item>

          <Form.Item
            label="PASSWORD"
            name="password"
            rules={[
              { required: true, message: "Please enter password" },
              { min: 4, message: "Minimum 4 characters" },
            ]}
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

          {/* <div className="auth-code-head">
            <div>
              <Text className="auth-form-label">SECURITY CODE</Text>
              <Text className="auth-code-help">
                Check your email for the 6-digit code
              </Text>
            </div>
            <button
              type="button"
              className="auth-link-button"
              onClick={() => message.success("Code sent again.")}
            >
              Resend Code
            </button>
          </div>

          <div className="auth-code-grid">
            {securityCode.map((digit, index) => (
              <Input
                key={index}
                value={digit}
                maxLength={1}
                onChange={(e) => updateCodeAtIndex(index, e.target.value)}
                className="auth-code-input"
              />
            ))}
          </div> */}

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="auth-submit"
          >
            Sign Up
          </Button>

          <div className="auth-bottom-text">
            <span>Already have an account?</span>
            <button
              type="button"
              className="auth-link-button"
              onClick={() => navigate("/login")}
            >
              Log in here
            </button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
