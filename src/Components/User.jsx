import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Pagination,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  FilterOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const avatarPalette = [
  { background: "#dbe8ff", color: "#4b6df6" },
  { background: "#eadfff", color: "#7a4ded" },
  { background: "#d8f4e8", color: "#2f9d66" },
  { background: "#f8efcc", color: "#b8871c" },
  { background: "#ffdfe2", color: "#c55167" },
  { background: "#dff0ff", color: "#2d79c2" },
];

const toInitials = (name = "") => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "NA";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const directoryUsers = [
  {
    key: "1",
    name: "Marcus Thorne",
    role: "Editor-in-Chief",
    email: "marcus.t@blogify.editorial",
    createdAt: "Oct 24, 2023",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Marcus",
  },
  {
    key: "2",
    name: "Sarah Valerius",
    role: "Writer",
    email: "s.valerius@blogify.com",
    createdAt: "Oct 26, 2023",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah",
  },
  {
    key: "3",
    name: "Julian Leech",
    role: "Moderator",
    email: "j.leech@editorial.io",
    createdAt: "Oct 12, 2023",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Julian",
  },
];

const Explore = () => {
  const location = useLocation();
  const isDashboardExplore = location.pathname.startsWith("/dashboard");
  const [users, setUsers] = useState(directoryUsers);
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const pagedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [page, users]);

  const deleteUser = (userKey) => {
    setUsers((prev) => prev.filter((item) => item.key !== userKey));
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        const palette =
          avatarPalette[Number(record.key) % avatarPalette.length];

        return (
          <Space size={12}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: palette.background,
                color: palette.color,
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: 0.6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "none",
              }}
            >
              {toInitials(record.name)}
            </div>
            <Space direction="vertical" size={0}>
              <Text
                style={{
                  color: "#111a2e",
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: "1.15",
                }}
              >
                {record.name}
              </Text>
              <Text style={{ color: "#3a7cff", fontWeight: 600, fontSize: 12 }}>
                {record.role}
              </Text>
            </Space>
          </Space>
        );
      },
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      render: (value) => (
        <Text style={{ color: "#3f4c67", fontWeight: 600, fontSize: 14 }}>
          {value}
        </Text>
      ),
    },
    {
      title: "CREATED AT",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => (
        <Text style={{ color: "#3f4c67", fontWeight: 600, fontSize: 14 }}>
          {value}
        </Text>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      width: 110,
      render: (_, record) => (
        <Button
          danger
          type="text"
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => deleteUser(record.key)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0a1434",
          fontFamily:
            '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
          fontSize: 14,
        },
      }}
    >
      <div
        style={{ minHeight: "100vh", background: "#f4f6fb", color: "#131b2e" }}
      >
        <Content>
          <div
            style={{
              width: "100%",
              maxWidth: "100%",
              margin: 0,
              padding: isDashboardExplore ? "18px 14px 20px" : "44px 24px 32px",
            }}
          >
            <Row gutter={[16, 18]} align="middle" justify="space-between">
              <Col xs={24} md={15}>
                <Space direction="vertical" size={10}>
                  <Title
                    level={1}
                    style={{
                      margin: 0,
                      color: "#0f1830",
                      fontWeight: 800,
                      letterSpacing: -1.2,
                    }}
                  >
                    User Directory
                  </Title>
                  <Paragraph
                    style={{
                      margin: 0,
                      color: "#4d5870",
                      fontSize: 18,
                      fontWeight: 500,
                      lineHeight: 1.5,
                    }}
                  >
                    Manage your editorial team, guest contributors, and
                    subscriber permissions from a single authoritative view.
                  </Paragraph>
                </Space>
              </Col>
              <Col xs={24} md={9}>
                <Flex justify="flex-end" gap={12} wrap>
                  <Button
                    icon={<FilterOutlined />}
                    size="large"
                    style={{
                      height: 54,
                      minWidth: 180,
                      borderRadius: 8,
                      fontWeight: 700,
                      color: "#2d3850",
                    }}
                  >
                    Filter View
                  </Button>
                  <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    size="large"
                    style={{
                      height: 54,
                      minWidth: 170,
                      borderRadius: 8,
                      fontWeight: 700,
                      background: "#0b1738",
                    }}
                  >
                    Invite User
                  </Button>
                </Flex>
              </Col>
            </Row>

            <Row gutter={[22, 22]} style={{ marginTop: 32 }}>
              <Col xs={24} md={8}>
                <Card
                  style={{
                    borderRadius: 16,
                    border: "1px solid #dee5f1",
                    boxShadow: "0 8px 24px rgba(15, 24, 48, 0.04)",
                    height: "100%",
                  }}
                  styles={{ body: { padding: 28 } }}
                >
                  <Text
                    style={{
                      color: "#94a0b6",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 1.8,
                    }}
                  >
                    TOTAL CURATORS
                  </Text>
                  <Title
                    level={2}
                    style={{ margin: "8px 0 0", color: "#121d34" }}
                  >
                    1,284
                  </Title>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card
                  style={{
                    borderRadius: 16,
                    border: "1px solid #dee5f1",
                    boxShadow: "0 8px 24px rgba(15, 24, 48, 0.04)",
                    height: "100%",
                  }}
                  styles={{ body: { padding: 28 } }}
                >
                  <Text
                    style={{
                      color: "#94a0b6",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 1.8,
                    }}
                  >
                    ACTIVE SESSIONS
                  </Text>
                  <Title
                    level={2}
                    style={{ margin: "8px 0 0", color: "#121d34" }}
                  >
                    432
                  </Title>
                </Card>
              </Col>

              <Col xs={24} md={8}>
                <Card
                  style={{
                    borderRadius: 16,
                    border: "none",
                    background: "#09163a",
                    boxShadow: "0 8px 24px rgba(9, 22, 58, 0.25)",
                    height: "100%",
                  }}
                  styles={{ body: { padding: 28 } }}
                >
                  <Text
                    style={{
                      color: "#7f90b6",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 1.8,
                    }}
                  >
                    PLATFORM GROWTH
                  </Text>
                  <Title
                    level={2}
                    style={{ margin: "8px 0 0", color: "#ffffff" }}
                  >
                    +24%{" "}
                    <span style={{ fontSize: 20, color: "#9aa8c6" }}>
                      this month
                    </span>
                  </Title>
                </Card>
              </Col>
            </Row>

            <Card
              style={{
                marginTop: 26,
                borderRadius: 18,
                border: "1px solid #dfe6f2",
                boxShadow: "0 8px 24px rgba(15, 24, 48, 0.04)",
              }}
              styles={{ body: { padding: 0 } }}
            >
              <Table
                columns={columns}
                dataSource={pagedUsers}
                pagination={false}
                rowKey="key"
                size="middle"
                scroll={{ x: 900 }}
                style={{ borderRadius: 16, overflow: "hidden" }}
                rowClassName={() => "directory-row"}
              />

              <Divider style={{ margin: 0 }} />

              <Flex
                justify="space-between"
                align="center"
                wrap
                gap={12}
                style={{ padding: "20px 24px" }}
              >
                <Text
                  style={{ color: "#6f7d98", fontWeight: 600, fontSize: 14 }}
                >
                  Showing 3 of{" "}
                  <span style={{ color: "#121d34", fontWeight: 800 }}>
                    1,284
                  </span>{" "}
                  users
                </Text>

                <Pagination
                  current={page}
                  total={users.length}
                  pageSize={pageSize}
                  showSizeChanger={false}
                  onChange={(newPage) => setPage(newPage)}
                  itemRender={(itemPage, type, originalElement) => {
                    if (type === "prev") {
                      return (
                        <Button shape="circle" icon={<ArrowLeftOutlined />} />
                      );
                    }
                    if (type === "next") {
                      return (
                        <Button shape="circle" icon={<ArrowRightOutlined />} />
                      );
                    }
                    return originalElement;
                  }}
                />
              </Flex>
            </Card>

            <style>
              {`
                .directory-row td {
                  padding: 18px 24px !important;
                }

                .ant-table-thead > tr > th {
                  background: #f2f5fa !important;
                  color: #8b98b0 !important;
                  font-size: 11px !important;
                  font-weight: 700 !important;
                  letter-spacing: 2px;
                  padding: 18px 24px !important;
                  border-bottom: 1px solid #e1e8f3 !important;
                }

                .ant-table-tbody > tr > td {
                  border-bottom: 1px solid #edf1f7 !important;
                }
              `}
            </style>
          </div>
        </Content>
      </div>
    </ConfigProvider>
  );
};

export default Explore;
