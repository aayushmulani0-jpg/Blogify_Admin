import React from "react";
import { Row, Col, Card, Typography, Avatar, Space, Statistic } from "antd";
import {
  TeamOutlined,
  RocketOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: "40px 24px", maxWidth: 1200, margin: "auto" }}>
      {/* Hero Section */}
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Title level={2}>About Our Company</Title>
          <Paragraph type="secondary">
            We build modern digital solutions that help businesses streamline
            operations, improve customer engagement, and grow efficiently. Our
            team focuses on delivering scalable and reliable technology for
            real-world problems.
          </Paragraph>
        </Col>

        {/* Company Stats */}
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Customers"
                  value={1200}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>

            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Projects Completed"
                  value={350}
                  prefix={<RocketOutlined />}
                />
              </Card>
            </Col>

            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Awards"
                  value={15}
                  prefix={<TrophyOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Mission & Vision */}
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Our Mission</Title>
            <Paragraph type="secondary">
              Our mission is to create powerful and intuitive digital products
              that simplify complex workflows and empower businesses to operate
              more efficiently.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Our Vision</Title>
            <Paragraph type="secondary">
              We aim to become a global technology partner by continuously
              innovating and delivering high-quality software solutions that
              drive real business impact.
            </Paragraph>
          </Card>
        </Col>

        {/* Team Section */}
        <Col span={24}>
          <Title level={3}>Our Team</Title>
        </Col>

        {[
          { name: "Aayush Patel", role: "Frontend Developer" },
          { name: "Rahul Sharma", role: "Backend Developer" },
          { name: "Priya Shah", role: "UI/UX Designer" },
        ].map((member) => (
          <Col xs={24} sm={12} md={8} key={member.name}>
            <Card>
              <Space
                direction="vertical"
                align="center"
                style={{ width: "100%" }}
              >
                <Avatar size={80}>{member.name.charAt(0)}</Avatar>
                <Title level={5}>{member.name}</Title>
                <Text type="secondary">{member.role}</Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default About;
