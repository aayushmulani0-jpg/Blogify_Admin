import React from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Statistic,
  List,
  Avatar,
  Progress,
  Space,
} from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Dashboard = () => {
  const recentActivities = [
    { title: "New user registered", time: "2 minutes ago" },
    { title: "Order #1024 completed", time: "10 minutes ago" },
    { title: "Payment received", time: "30 minutes ago" },
    { title: "Support ticket resolved", time: "1 hour ago" },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Dashboard</Title>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Users"
              value={1240}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Orders"
              value={320}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Revenue"
              value={14500}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Growth"
              value={18}
              suffix="%"
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Content Section */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {/* Recent Activity */}
        <Col xs={24} md={14}>
          <Card title="Recent Activity">
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.title}
                    description={item.time}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Project Progress */}
        <Col xs={24} md={10}>
          <Card title="Project Progress">
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text>Website Redesign</Text>
                <Progress percent={80} />
              </div>

              <div>
                <Text>Mobile App</Text>
                <Progress percent={55} />
              </div>

              <div>
                <Text>CRM Integration</Text>
                <Progress percent={70} />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;