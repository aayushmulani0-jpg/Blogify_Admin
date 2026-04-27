import React from "react";
import { Avatar, Col, Divider, Grid, Row, Space, Typography } from "antd";
import {
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Footer = ({
  description = "A clean space for writers and thinkers to share meaningful ideas with the world.",
}) => {
  const screens = useBreakpoint();

  return (
    <footer
      style={{
        background: "#020617",
        color: "#94a3b8",
        padding: screens.lg ? "72px 48px 32px" : "56px 18px 24px",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <Row gutter={[24, 32]}>
          <Col xs={24} md={10}>
            <Space align="center" size={12} style={{ marginBottom: 16 }}>
              <Link to="/home" style={{ textDecoration: "none" }}>
                <Space align="center" size={12}>
                  <Avatar
                    shape="square"
                    size={42}
                    style={{
                      borderRadius: 11,
                      background:
                        "linear-gradient(135deg, #2563eb, #4f46e5, #7c3aed)",
                      fontSize: 16,
                      fontWeight: 800,
                    }}
                  >
                    B
                  </Avatar>
                  <Text
                    style={{ color: "#ffffff", fontSize: 28, fontWeight: 700 }}
                  >
                    Blogify
                  </Text>
                </Space>
              </Link>
            </Space>
            <Paragraph
              style={{ color: "#94a3b8", maxWidth: 420, marginBottom: 0 }}
            >
              {description}
            </Paragraph>
          </Col>
          <Col xs={12} md={4}>
            <Text
              style={{
                color: "#ffffff",
                fontWeight: 700,
                display: "block",
                marginBottom: 14,
              }}
            >
              Platform
            </Text>
            <Space direction="vertical" size={8}>
              <Link to="/explore" style={{ textDecoration: "none" }}>
                <Text style={{ color: "#94a3b8" }}>Browse Blogs</Text>
              </Link>
              <Link
                to="/login?redirect=/blog"
                style={{ textDecoration: "none" }}
              >
                <Text style={{ color: "#94a3b8" }}>Write a Post</Text>
              </Link>
              <Link to="/explore" style={{ textDecoration: "none" }}>
                <Text style={{ color: "#94a3b8" }}>Categories</Text>
              </Link>
            </Space>
          </Col>
          <Col xs={12} md={4}>
            <Text
              style={{
                color: "#ffffff",
                fontWeight: 700,
                display: "block",
                marginBottom: 14,
              }}
            >
              Company
            </Text>
            <Space direction="vertical" size={8}>
              <Link to="/about" style={{ textDecoration: "none" }}>
                <Text style={{ color: "#94a3b8" }}>About Us</Text>
              </Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <Text style={{ color: "#94a3b8" }}>Contact</Text>
              </Link>
              <Link to="/home" style={{ textDecoration: "none" }}>
                <Text style={{ color: "#94a3b8" }}>Blogify for Teams</Text>
              </Link>
            </Space>
          </Col>
          <Col xs={24} md={6}>
            <Text
              style={{
                color: "#ffffff",
                fontWeight: 700,
                display: "block",
                marginBottom: 14,
              }}
            >
              Follow Us
            </Text>
            <Space size={20}>
              <a
                href="https://youtube.com/@parthkoshti3183"
                aria-label="Youtube"
                target="_blank"
                rel="noreferrer"
              >
                <YoutubeOutlined style={{ fontSize: 20, color: "#e2e8f0" }} />
              </a>
              <a
                href="https://www.instagram.com/parth.3183"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramOutlined style={{ fontSize: 20, color: "#e2e8f0" }} />
              </a>
              <Link to="/about" aria-label="LinkedIn">
                <LinkedinOutlined style={{ fontSize: 20, color: "#e2e8f0" }} />
              </Link>
              <Link to="/contact" aria-label="Twitter">
                <TwitterOutlined style={{ fontSize: 20, color: "#e2e8f0" }} />
              </Link>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#334155", margin: "34px 0 18px" }} />
        <Text
          style={{ color: "#94a3b8", display: "block", textAlign: "center" }}
        >
          {`© ${new Date().getFullYear()} Blogify • by Parthkoshti. All rights reserved.`}
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
