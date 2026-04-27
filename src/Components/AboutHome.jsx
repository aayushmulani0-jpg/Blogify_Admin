import React from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Layout,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import {
  BookOutlined,
  BulbOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const visionItems = [
  {
    icon: <TeamOutlined />,
    title: "Share voice",
    description: "Empowering every individual to speak their truth.",
  },
  {
    icon: <BookOutlined />,
    title: "Spread knowledge",
    description: "Democratizing information and fostering continuous learning.",
  },
  {
    icon: <UsergroupAddOutlined />,
    title: "Inspire communities",
    description: "Connecting like-minded souls to create movements.",
  },
  {
    icon: <BulbOutlined />,
    title: "Build identity",
    description: "Providing the tools to craft a lasting personal brand.",
  },
];

const stats = [
  { value: "99.9%", label: "Uptime" },
  { value: "2M+", label: "Readers" },
  { value: "500K", label: "Blogs" },
  { value: "150+", label: "Countries" },
];

const AboutHome = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Navbar activeKey="about" showAuthButtons />

      <Content>
        <section style={{ padding: "104px 24px 104px" }}>
          <Row justify="center">
            <Col xs={24} xl={18}>
              <Row gutter={[40, 32]} align="middle">
                <Col xs={24} lg={13}>
                  <Space
                    direction="vertical"
                    size={24}
                    style={{ width: "100%" }}
                  >
                    <Tag color="blue" style={{ width: "fit-content" }}>
                      Our Story
                    </Tag>
                    <Title
                      level={1}
                      style={{
                        marginBottom: 0,
                        maxWidth: 700,
                        lineHeight: 1.03,
                      }}
                    >
                      About Blogify - Where Stories Come to Life
                    </Title>
                    <Paragraph
                      style={{
                        maxWidth: 640,
                        marginBottom: 0,
                        fontSize: 16,
                        lineHeight: 1.7,
                      }}
                    >
                      We believe every voice deserves a canvas. Blogify is more
                      than a platform; it&apos;s a digital sanctuary for
                      creators, thinkers, and storytellers to share their unique
                      perspectives with the world.
                    </Paragraph>
                  </Space>
                </Col>

                <Col xs={24} lg={11}>
                  <Card
                    bordered={false}
                    styles={{ body: { padding: 22 } }}
                    style={{ borderRadius: 28, background: "#eef1ff" }}
                  >
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwKnCFxq5mpAFkklHBoy1JVaBKZ5iexi4Ulh35dFMh95Ye-KnX87KQCc3aznlF6YI6MIsYM5KyebnrnVVEhCbrfx5QhliRSmlkjkCJjtyu37gc-CJH-dy2b9Njj1mz-nZtmipbpYzGmyF-xR-c3tM0PBlrSwGS5ks4BPKnLtzjpHAI7PoS7QN822Dpb0Ko-Kro4hU8TC4GeJU9vmIBt9K9PhE6E3h_pyc6gKcx-euqEqmrKbrpMKq68avzAm4wqq0cig6Yed806tcP"
                      alt="Minimalist workstation"
                      style={{
                        width: "100%",
                        borderRadius: 16,
                        display: "block",
                      }}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>

        <section style={{ padding: "0 24px 104px" }}>
          <Row justify="center">
            <Col xs={24} xl={18}>
              <Row gutter={[40, 32]} align="middle">
                <Col xs={24} lg={12}>
                  <Card
                    bordered={false}
                    style={{ borderRadius: 24, background: "#f1f4ff" }}
                    styles={{ body: { padding: 22 } }}
                  >
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAed7nBoTC_xYKOI6Ao5Imchqy9O2MnNbNEmnGPpVxasFGonkcTjuvYwRGQwAPV5qK3D8fMchQpXNPla8-J2Rt0-KWYMaBUfA2ML2AcxTMGFPArbvReY1VYo7WXY55xADrXzE_MRGM0D4qFNng1nBjrbP5J6jzCZJddH4H_NWERW2mfyMbphsSy9tKFv1rU7mYrCdSAIIxAnERTI60CVqJmoOqUB5LcuUiG93HTwGaSt1-l7uh1-l61yiLKJSc1Em39vZl5Vn_FpmCH"
                      alt="Creative team collaborating"
                      style={{
                        width: "100%",
                        borderRadius: 16,
                        display: "block",
                      }}
                    />
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Space
                    direction="vertical"
                    size={28}
                    style={{ width: "100%" }}
                  >
                    <Title level={2} style={{ marginBottom: 0, fontSize: 32 }}>
                      Our Vision
                    </Title>
                    <Space
                      direction="vertical"
                      size={20}
                      style={{ width: "100%" }}
                    >
                      {visionItems.map((item) => (
                        <Space key={item.title} align="start" size={16}>
                          <Avatar
                            shape="square"
                            size={40}
                            style={{ background: "#dfe7ff", color: "#1d4ed8" }}
                            icon={item.icon}
                          />
                          <Space direction="vertical" size={2}>
                            <Text strong style={{ fontSize: 16 }}>
                              {item.title}
                            </Text>
                            <Text type="secondary" style={{ maxWidth: 360 }}>
                              {item.description}
                            </Text>
                          </Space>
                        </Space>
                      ))}
                    </Space>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>

        <section style={{ padding: "0 24px 104px" }}>
          <Row justify="center">
            <Col xs={24} xl={18}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 0,
                  background:
                    "linear-gradient(180deg, #111a33 0%, #0e162d 100%)",
                  color: "#ffffff",
                  textAlign: "center",
                }}
                styles={{ body: { padding: "60px 24px 52px" } }}
              >
                <Space direction="vertical" size={22} style={{ width: "100%" }}>
                  <Title
                    level={2}
                    style={{ color: "#ffffff", marginBottom: 0 }}
                  >
                    Why Blogify?
                  </Title>
                  <Title
                    level={3}
                    style={{
                      color: "#60a5fa",
                      marginTop: 0,
                      marginBottom: 0,
                      fontStyle: "italic",
                    }}
                  >
                    Simplicity + Power
                  </Title>
                  <Paragraph
                    style={{
                      color: "#cbd5e1",
                      maxWidth: 780,
                      margin: "0 auto",
                      fontSize: 16,
                      lineHeight: 1.7,
                    }}
                  >
                    We&apos;ve engineered the perfect balance. Intuitive enough
                    for a beginner&apos;s first post, yet powerful enough to
                    fuel a professional media empire. That is the Blogify
                    promise.
                  </Paragraph>

                  <Row gutter={[24, 24]} justify="center">
                    {stats.map((item) => (
                      <Col xs={12} md={6} key={item.label}>
                        <Statistic
                          value={item.value}
                          valueStyle={{
                            color: "#ffffff",
                            fontSize: 24,
                            fontWeight: 700,
                          }}
                          suffix=""
                        />
                        <Text
                          style={{
                            color: "#94a3b8",
                            letterSpacing: 1.2,
                            textTransform: "uppercase",
                            fontSize: 12,
                          }}
                        >
                          {item.label}
                        </Text>
                      </Col>
                    ))}
                  </Row>
                </Space>
              </Card>
            </Col>
          </Row>
        </section>

        <section style={{ padding: "0 24px 112px" }}>
          <Row justify="center">
            <Col xs={24} xl={18}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 28,
                  background: "#dfe7ff",
                  textAlign: "center",
                }}
                styles={{ body: { padding: "60px 24px 68px" } }}
              >
                <Space direction="vertical" size={22} style={{ width: "100%" }}>
                  <Title level={2} style={{ marginBottom: 0 }}>
                    Ready to write your story?
                  </Title>
                  <Paragraph
                    style={{ maxWidth: 660, margin: "0 auto", lineHeight: 1.7 }}
                  >
                    Join thousands of creators who have found their home on
                    Blogify. Start your creative journey today.
                  </Paragraph>
                  <Button
                    type="primary"
                    size="large"
                    style={{ minWidth: 160 }}
                    onClick={() => navigate("/login?redirect=/blog")}
                  >
                    Start Your Journey
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </section>
      </Content>

      <Footer />
    </Layout>
  );
};

export default AboutHome;
