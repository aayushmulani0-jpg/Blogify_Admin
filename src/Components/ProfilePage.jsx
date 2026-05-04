import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
  Upload,
  message,
  Modal,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CameraOutlined,
  SaveOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  // Mock user data - replace with your API call
  const [userData, setUserData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@blogify.com",
    phone: "+1 (555) 123-4567",
    role: "Admin",
    department: "Engineering",
    joinDate: "2024-01-15",
  });

  useEffect(() => {
    form.setFieldsValue(userData);
  }, [userData, form]);

  const handleSaveProfile = async (values) => {
    setLoading(true);
    try {
      // API call to update profile
      // await axiosInstance.put('/user/profile', values);
      
      setUserData({ ...userData, ...values });
      message.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values) => {
    try {
      // API call to change password
      // await axiosInstance.put('/user/change-password', values);
      
      message.success("Password changed successfully!");
      setIsPasswordModalVisible(false);
      passwordForm.resetFields();
    } catch (error) {
      message.error("Failed to change password");
    }
  };

  const handleAvatarUpload = (info) => {
    if (info.file.status === "done") {
      message.success("Avatar updated successfully!");
    } else if (info.file.status === "error") {
      message.error("Avatar upload failed");
    }
  };

  const getInitials = () => {
    return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
  };

  const customAvatarProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        return false;
      }
      return true;
    },
    onChange: handleAvatarUpload,
  };

  return (
    <div className="blog-page-shell">
      <div className="blog-page-inner">
        {/* Hero Card */}
        <div className="blog-hero-card">
          <div>
            <div className="blog-section-label">SETTINGS</div>
            <Title level={1} className="blog-page-title">
              Profile Settings
            </Title>
          </div>
          <Button
            className="blog-toolbar-button"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        {/* Profile Info Card */}
        <Card bordered={false} className="blog-table-card" style={{ marginBottom: 24 }}>
          <div style={{ padding: "8px 0" }}>
            {/* Avatar and User Info Row */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 20
            }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  size={80}
                  src={avatarUrl}
                  icon={<UserOutlined />}
                  style={{
                    border: "3px solid #4f46e5",
                    backgroundColor: avatarUrl
                      ? "transparent"
                      : "#4f46e5",
                  }}
                >
                  {!avatarUrl && (
                    <span style={{ fontSize: 28, fontWeight: "bold" }}>
                      {getInitials()}
                    </span>
                  )}
                </Avatar>
                {isEditing && (
                  <Upload {...customAvatarProps}>
                    <Button
                      shape="circle"
                      size="small"
                      icon={<CameraOutlined />}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        background: "white",
                        border: "2px solid #4f46e5",
                      }}
                    />
                  </Upload>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <Title level={3} style={{ margin: 0, color: "#1e293b" }}>
                  {userData.firstName} {userData.lastName}
                </Title>
                <Text style={{ color: "#64748b", fontSize: 15 }}>
                  {userData.role} • {userData.department}
                </Text>
                <br />
                <Text style={{ color: "#94a3b8", fontSize: 13 }}>
                  Member since {dayjs(userData.joinDate).format("MMMM YYYY")}
                </Text>
              </div>
              <Button
                type={isEditing ? "default" : "primary"}
                icon={isEditing ? <EyeOutlined /> : <EditOutlined />}
                onClick={() => setIsEditing(!isEditing)}
                className={isEditing ? "blog-toolbar-button" : "blog-create-button"}
                style={isEditing ? {} : { 
                  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                  border: "none",
                  color: "white"
                }}
              >
                {isEditing ? "View Profile" : "Edit Profile"}
              </Button>
            </div>

            <Divider style={{ margin: "0 0 24px 0", borderColor: "#e2e8f0" }} />

            {/* Edit Form */}
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSaveProfile}
              initialValues={userData}
              disabled={!isEditing}
            >
              <Row gutter={[24, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={<span style={{ color: "#475569", fontWeight: 500 }}>First Name</span>}
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <Input 
                      prefix={<UserOutlined style={{ color: "#94a3b8" }} />} 
                      size="large"
                      style={{ 
                        borderRadius: 8,
                        borderColor: "#e2e8f0"
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={<span style={{ color: "#475569", fontWeight: 500 }}>Last Name</span>}
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
                    ]}
                  >
                    <Input 
                      prefix={<UserOutlined style={{ color: "#94a3b8" }} />} 
                      size="large"
                      style={{ 
                        borderRadius: 8,
                        borderColor: "#e2e8f0"
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[24, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={<span style={{ color: "#475569", fontWeight: 500 }}>Email</span>}
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input 
                      prefix={<MailOutlined style={{ color: "#94a3b8" }} />} 
                      size="large"
                      style={{ 
                        borderRadius: 8,
                        borderColor: "#e2e8f0"
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={<span style={{ color: "#475569", fontWeight: 500 }}>Phone</span>}
                    name="phone"
                  >
                    <Input 
                      prefix={<PhoneOutlined style={{ color: "#94a3b8" }} />} 
                      size="large"
                      style={{ 
                        borderRadius: 8,
                        borderColor: "#e2e8f0"
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {isEditing && (
                <div style={{ textAlign: "right", marginTop: 32 }}>
                  <Space>
                    <Button 
                      onClick={() => setIsEditing(false)}
                      className="blog-toolbar-button"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SaveOutlined />}
                      loading={loading}
                      className="blog-create-button"
                      style={{ 
                        background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                        border: "none",
                        color: "white"
                      }}
                    >
                      Save Changes
                    </Button>
                  </Space>
                </div>
              )}
            </Form>
          </div>
        </Card>

        {/* Security Card */}
        <Card bordered={false} className="blog-table-card">
          <div style={{ padding: "8px 0" }}>
            <Title level={4} style={{ marginBottom: 24, color: "#1e293b" }}>
              Security
            </Title>

            <div className="blog-table-grid" style={{ 
              gridTemplateColumns: "1fr auto",
              padding: "16px 0",
              borderBottom: "1px solid #f1f5f9"
            }}>
              <div>
                <Text strong style={{ fontSize: 15, color: "#1e293b" }}>Password</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 13 }}>Last changed 3 months ago</Text>
              </div>
              <Button
                icon={<LockOutlined />}
                onClick={() => setIsPasswordModalVisible(true)}
                className="blog-toolbar-button"
              >
                Change Password
              </Button>
            </div>

            <div className="blog-table-grid" style={{ 
              gridTemplateColumns: "1fr auto",
              padding: "16px 0"
            }}>
              <div>
                <Text strong style={{ fontSize: 15, color: "#dc2626" }}>Delete Account</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Permanently delete your account and all data
                </Text>
              </div>
              <Button 
                danger 
                icon={<DeleteOutlined />}
                style={{ 
                  borderRadius: 8,
                  borderColor: "#fca5a5",
                  color: "#dc2626"
                }}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </Card>

        {/* Change Password Modal */}
        <Modal
          title={
            <span style={{ color: "#1e293b", fontSize: 18 }}>
              Change Password
            </span>
          }
          open={isPasswordModalVisible}
          onCancel={() => setIsPasswordModalVisible(false)}
          footer={null}
          width={480}
          style={{ borderRadius: 16 }}
        >
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handleChangePassword}
            style={{ marginTop: 24 }}
          >
            <Form.Item
              label={<span style={{ color: "#475569", fontWeight: 500 }}>Current Password</span>}
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: "#94a3b8" }} />} 
                size="large"
                style={{ 
                  borderRadius: 8,
                  borderColor: "#e2e8f0"
                }}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "#475569", fontWeight: 500 }}>New Password</span>}
              name="newPassword"
              rules={[
                { required: true, message: "Please enter a new password" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#94a3b8" }} />}
                size="large"
                style={{ 
                  borderRadius: 8,
                  borderColor: "#e2e8f0"
                }}
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "#475569", fontWeight: 500 }}>Confirm New Password</span>}
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: "#94a3b8" }} />} 
                size="large"
                style={{ 
                  borderRadius: 8,
                  borderColor: "#e2e8f0"
                }}
              />
            </Form.Item>

            <div style={{ textAlign: "right", marginTop: 24 }}>
              <Space>
                <Button 
                  onClick={() => setIsPasswordModalVisible(false)}
                  style={{ borderRadius: 8 }}
                >
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  style={{ 
                    borderRadius: 8,
                    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                    border: "none"
                  }}
                >
                  Change Password
                </Button>
              </Space>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePage;