import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BookOutlined,
  DashboardOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  ConfigProvider,
  Button,
  Typography,
  message,
} from "antd";

const { Content, Footer, Sider } = Layout;
const { Text } = Typography;

const items = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "dashboard-contact",
    icon: <MailOutlined />,
    label: <Link to="/contact">Contact</Link>,
  },
  {
    key: "dashboard-user",
    icon: <GlobalOutlined />,
    label: <Link to="/dashboard/user">User</Link>,
  },
  {
    key: "blog",
    icon: <BookOutlined />,
    label: <Link to="/blog">Blog</Link>,
  },
  {
    key: "profile",
    icon: <UserOutlined />,
    label: <Link to="/profile">Profile</Link>,
  },
];

const ProLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedKey = () => {
    const path = location.pathname.substring(1);
    if (path === "dashboard" || path === "") return "dashboard";
    if (path === "dashboard/about") return "dashboard-about";
    if (path === "dashboard/contact") return "dashboard-contact";
    if (path === "dashboard/explore") return "dashboard-explore";
    if (path === "blog") return "blog";
    if (path === "profile") return "profile";
    return "dashboard";
  };

  const handleLogout = () => {
    // Clear user session/token
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    
    message.success("Logged out successfully!");
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: "#f4f7ff",
            headerBg: "rgba(255,255,255,0.82)",
            headerHeight: 64,
            siderBg: "#0f172a",
          },
          Menu: {
            darkItemBg: "transparent",
            darkItemColor: "#cbd5e1",
            darkItemHoverColor: "#ffffff",
            darkItemSelectedColor: "#ffffff",
            darkItemSelectedBg: "linear-gradient(135deg, #2563eb, #4f46e5)",
            itemBorderRadius: 10,
            itemMarginInline: 10,
            itemMarginBlock: 8,
            itemHeight: 42,
          },
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          width: "100vw",
          maxWidth: "100%",
          overflow: "clip",
          position: "relative",
          background:
            "radial-gradient(1200px 400px at 20% -10%, #dbeafe 0%, transparent 55%), #f4f7ff",
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          width={200}
          collapsedWidth={80}
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            overflow: "hidden",
            zIndex: 100,
            boxShadow: "8px 0 32px rgba(15,23,42,0.22)",
            borderRight: "1px solid rgba(148,163,184,0.16)",
            background:
              "linear-gradient(180deg, #0f172a 0%, #111827 48%, #1e293b 100%)",
            display: "flex",
            flexDirection: "column",
          }}
          theme="dark"
        >
          {/* Logo Section - Fixed at Top */}
          <div
            style={{
              height: 64,
              margin: 0,
              padding: collapsed ? "0 16px" : "0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              background: "transparent",
              color: "#fff",
              fontSize: collapsed ? 16 : 18,
              fontWeight: "bold",
              borderBottom: "1px solid rgba(148,163,184,0.15)",
              letterSpacing: 0.3,
              flexShrink: 0,
            }}
          >
            {collapsed ? "B" : "Blogify"}
          </div>

          {/* Navigation Menu - Scrollable Middle Section */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              minHeight: 0,
            }}
          >
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[getSelectedKey()]}
              items={items}
              style={{
                borderRight: 0,
                background: "transparent",
                paddingTop: 8,
                height: "100%",
              }}
            />
          </div>

          {/* Logout Button - Fixed at Bottom */}
          <div
            style={{
              padding: collapsed ? "12px 8px" : "16px",
              borderTop: "1px solid rgba(148,163,184,0.15)",
              background: "rgba(15, 23, 42, 0.95)",
              backdropFilter: "blur(10px)",
              flexShrink: 0,
            }}
          >
            <Button
              type="text"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              block
              style={{
                color: "#ef4444",
                height: 40,
                borderRadius: 10,
                fontSize: collapsed ? 16 : 14,
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                padding: collapsed ? "8px" : "8px 12px",
              }}
            >
              {!collapsed && "Logout"}
            </Button>
          </div>
        </Sider>

        <Layout
          style={{
            marginLeft: collapsed ? 80 : 200,
            minHeight: "100vh",
            width: collapsed ? "calc(100% - 80px)" : "calc(100% - 200px)",
            transition: "all 0.22s ease",
            background: "#f4f7ff",
          }}
        >
          <Content
            style={{
              margin: 0,
              padding: 0,
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: 0,
                flex: 1,
                background: "#f4f7ff",
                borderRadius: 0,
                width: "100%",
                height: "100%",
                border: 0,
                boxShadow: "none",
                overflowY: "auto",
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              padding: "12px 24px",
              background: "transparent",
              color: "#64748b",
              fontSize: 13,
              borderTop: "1px solid rgba(148,163,184,0.2)",
            }}
          >
            Blogify Admin ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default ProLayout;