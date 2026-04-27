import React from "react";
import { Button, Col, Grid, Input, Layout, Row, Space, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

const defaultLinks = [
  { key: "home", label: "Home", to: "/home" },
  { key: "blogs", label: "Blogs", to: "/explore" },
  { key: "categories", label: "Categories", to: "/" },
  { key: "about", label: "About", to: "/about" },
  { key: "contact", label: "Contact", to: "/contact" },
];

const Navbar = ({
  activeKey = "home",
  links = defaultLinks,
  showAuthButtons = false,
  showSearchBar = false,
}) => {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        height: 80,
        lineHeight: "80px",
        paddingInline: screens.md ? 32 : 16,
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e6eaf5",
      }}
    >
      <Row justify="space-between" align="middle" wrap={false}>
        <Col>
          <Link to="/home">
            <Text style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>
              Blogify
            </Text>
          </Link>
        </Col>

        {screens.md && (
          <Col>
            <Space size={28}>
              {links.map((item) => {
                const isActive = item.key === activeKey;
                return (
                  <Link key={item.key} to={item.to}>
                    <Text
                      strong={isActive}
                      style={{
                        color: isActive ? "#1d4ed8" : "#475569",
                        borderBottom: isActive
                          ? "2px solid #1d4ed8"
                          : "2px solid transparent",
                      }}
                    >
                      {item.label}
                    </Text>
                  </Link>
                );
              })}
            </Space>
          </Col>
        )}

        {showSearchBar && (
          <Col>
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
              placeholder="Search articles..."
              style={{
                width: screens.md ? 220 : 160,
                borderRadius: 999,
                background: "#eef2ff",
                border: "1px solid rgba(118,119,125,0.10)",
              }}
            />
          </Col>
        )}

        {showAuthButtons && (
          <Col>
            <Space>
              {screens.md && (
                <Button type="text" onClick={() => navigate("/login")}>
                  Log in
                </Button>
              )}
              <Button
                type="primary"
                size="large"
                style={{
                  height: 46,
                  paddingInline: 24,
                  borderRadius: 12,
                  fontWeight: 700,
                  background: "#1d4ed8",
                  borderColor: "#1d4ed8",
                }}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </Space>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default Navbar;
