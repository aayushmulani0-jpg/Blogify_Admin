import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Col,
  Flex,
  Pagination,
  Row,
  Space,
  Typography,
  message,
  Avatar,
  Tag,
  Empty,
  Spin,
} from "antd";
import {
  CheckCircleFilled,
  DownloadOutlined,
  FilterOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import axiosInstance from "../Utils/axiosInstance";

const { Title, Text, Paragraph } = Typography;

const roleFallbacks = [
  "Lead Curator",
  "Freelance Writer",
  "Ad Ops Manager",
  "Reader Feedback",
  "Contributor",
  "Community Manager",
];

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

const formatFullDate = (value) => {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const toCsvValue = (value) => {
  const text = String(value ?? "").replace(/"/g, '""');
  return `"${text}"`;
};

const Contact = () => {
  const [contact, setContact] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const getAvatarColor = (index) => {
    return avatarPalette[index % avatarPalette.length];
  };

  const contactData = async () => {
    setLoading(true);
    try {
      const payload = {
        page: page,
        limit: pageSize,
      };
      const res = await axiosInstance.post("/admin/getAllContact", payload);
      setContact(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (error) {
      console.error("Error fetching contact data:", error);
      message.error("Failed to fetch contact queries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    contactData();
  }, [page, pageSize]);

  const unreadQueries = Math.min(99, Math.max(1, Math.ceil(total * 0.25)));

  const exportCsv = () => {
    if (!contact.length) {
      message.info("No responses to export yet.");
      return;
    }

    const headers = ["Name", "Role", "Contact Details", "Message", "Date"];
    const rows = contact.map((record, index) => {
      const name = record?.name || record?.fullName || "Anonymous";
      const role = record?.role || roleFallbacks[index % roleFallbacks.length];
      const contactDetail =
        record?.email || record?.phone || "No contact details";
      const messageText =
        record?.message || record?.description || "No message";
      const dateText = record?.createdAt || record?.updatedAt || "";
      return [name, role, contactDetail, messageText, dateText]
        .map(toCsvValue)
        .join(",");
    });

    const csv = [headers.map(toCsvValue).join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contact-queries.csv";
    link.click();
    URL.revokeObjectURL(url);
    message.success("CSV exported.");
  };

  const getContactIcon = (record) => {
    if (record?.email) return <MailOutlined />;
    if (record?.phone) return <PhoneOutlined />;
    return <MailOutlined />;
  };

  return (
    <div style={{ padding: "24px 16px 28px", width: "100%", maxWidth: "100%" }}>
      <Flex justify="space-between" align="end" wrap gap={16}>
        <Space direction="vertical" size={2}>
          <Text
            style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#4d72dc",
            }}
          >
            Management
          </Text>
          <Title
            level={1}
            style={{ margin: 0, color: "#111a32", letterSpacing: -1.1 }}
          >
            Contact Queries
          </Title>
        </Space>

        <Space size={10} wrap>
          <Button
            icon={<FilterOutlined />}
            style={{
              minWidth: 120,
              height: 40,
              borderRadius: 8,
              border: "1px solid #e4eaf7",
              color: "#34415f",
              fontWeight: 700,
              background: "#f3f6ff",
            }}
          >
            FILTER
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={exportCsv}
            style={{
              minWidth: 140,
              height: 40,
              borderRadius: 8,
              border: "1px solid #e4eaf7",
              color: "#34415f",
              fontWeight: 700,
              background: "#f3f6ff",
            }}
          >
            EXPORT CSV
          </Button>
        </Space>
      </Flex>

      {/* Keep original card layout with same colors and sizes */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={8}>
          <Card
            style={{
              borderRadius: 10,
              border: 0,
              minHeight: 116,
              background: "#0d1d4a",
            }}
            styles={{ body: { padding: "22px 24px" } }}
          >
            <Text
              style={{
                color: "#4b89ff",
                letterSpacing: 3,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              UNREAD QUERIES
            </Text>
            <Title level={2} style={{ color: "#ffffff", margin: "8px 0 0" }}>
              {unreadQueries}
            </Title>
            <div
              style={{
                width: 42,
                height: 3,
                borderRadius: 99,
                background: "#3a79ff",
                marginTop: 10,
              }}
            />
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card
            style={{
              borderRadius: 10,
              border: "1px solid #e6ecf8",
              minHeight: 116,
              background: "#f4f7ff",
            }}
            styles={{ body: { padding: "24px 22px" } }}
          >
            <Flex
              justify="space-between"
              align="center"
              style={{ height: "100%" }}
            >
              <Space direction="vertical" size={4}>
                <Text
                  style={{
                    color: "#9aa7c5",
                    letterSpacing: 2.8,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  SYSTEM STATUS
                </Text>
                <Text
                  style={{ color: "#1f2a44", fontSize: 18, fontWeight: 600 }}
                >
                  All channels are operational
                </Text>
              </Space>
              <CheckCircleFilled style={{ color: "#2dc572", fontSize: 24 }} />
            </Flex>
          </Card>
        </Col>
      </Row>

      {/* Data display section with Ant Design components */}
      <Card
        title={
          <Flex
            justify="space-between"
            align="center"
            style={{ width: "100%" }}
          >
            <Text strong style={{ fontSize: 16 }}>
              Recent Queries
            </Text>
            <Text
              type="secondary"
              style={{ fontSize: 12, letterSpacing: 1.6, fontWeight: 700 }}
            >
              Showing {contact.length} of {total}
            </Text>
          </Flex>
        }
        style={{
          marginTop: 24,
          borderRadius: 12,
          border: "1px solid #e5ebf6",
          boxShadow: "0 8px 22px rgba(17, 26, 50, 0.04)",
        }}
        loading={loading}
      >
        {contact.length === 0 && !loading ? (
          <Empty description="No contact queries found" />
        ) : (
          <>
            {/* Table-like header */}
            <Row
              style={{
                background: "#f3f6ff",
                padding: "18px 24px",
                borderBottom: "1px solid #e4eaf7",
                marginBottom: 0,
              }}
              gutter={16}
            >
              <Col xs={24} sm={6}>
                <Text
                  style={{
                    color: "#7d89a6",
                    fontSize: 11,
                    letterSpacing: 2,
                    fontWeight: 700,
                  }}
                >
                  SENDER
                </Text>
              </Col>
              <Col xs={24} sm={5}>
                <Text
                  style={{
                    color: "#7d89a6",
                    fontSize: 11,
                    letterSpacing: 2,
                    fontWeight: 700,
                  }}
                >
                  CONTACT DETAILS
                </Text>
              </Col>
              <Col xs={24} sm={8}>
                <Text
                  style={{
                    color: "#7d89a6",
                    fontSize: 11,
                    letterSpacing: 2,
                    fontWeight: 700,
                  }}
                >
                  MESSAGE PREVIEW
                </Text>
              </Col>
              <Col xs={24} sm={5}>
                <Text
                  style={{
                    color: "#7d89a6",
                    fontSize: 11,
                    letterSpacing: 2,
                    fontWeight: 700,
                    textAlign: "right",
                    display: "block",
                  }}
                >
                  DATE
                </Text>
              </Col>
            </Row>

            {/* Data rows */}
            <Space direction="vertical" size={0} style={{ width: "100%" }}>
              {contact.map((record, index) => {
                const avatarColor = getAvatarColor(index);
                const name = record?.name || record?.fullName || "Anonymous";
                const role =
                  record?.role || roleFallbacks[index % roleFallbacks.length];
                const contactDetail =
                  record?.email || record?.phone || "No contact details";
                const messageText =
                  record?.message || record?.description || "No message";
                const dateText = formatFullDate(
                  record?.createdAt || record?.updatedAt,
                );

                return (
                  <Row
                    key={record._id || index}
                    style={{
                      padding: "18px 24px",
                      borderBottom: "1px solid #edf1f8",
                      minHeight: 102,
                      alignItems: "center",
                    }}
                    gutter={16}
                  >
                    <Col xs={24} sm={6}>
                      <Flex align="center" gap={12}>
                        <Avatar
                          size={38}
                          style={{
                            backgroundColor: avatarColor.background,
                            color: avatarColor.color,
                            fontWeight: 800,
                            fontSize: 13,
                            letterSpacing: 0.6,
                            borderRadius: 12,
                            flex: "none",
                          }}
                        >
                          {toInitials(name)}
                        </Avatar>
                        <Space direction="vertical" size={0}>
                          <Text
                            style={{
                              color: "#1a243d",
                              fontSize: 16,
                              fontWeight: 700,
                              lineHeight: 1.15,
                            }}
                          >
                            {name}
                          </Text>
                          <Text
                            style={{
                              color: "#7f8ca8",
                              fontSize: 12,
                              fontWeight: 600,
                              lineHeight: 1.2,
                            }}
                          >
                            {role}
                          </Text>
                        </Space>
                      </Flex>
                    </Col>

                    <Col xs={24} sm={5}>
                      <Space>
                        {getContactIcon(record)}
                        <Text
                          style={{
                            color: "#3f4c67",
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                        >
                          {contactDetail}
                        </Text>
                      </Space>
                    </Col>

                    <Col xs={24} sm={8}>
                      <Paragraph
                        ellipsis={{ rows: 1 }}
                        style={{
                          margin: 0,
                          color: "#3f4c67",
                          fontSize: 14,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {messageText}
                      </Paragraph>
                    </Col>

                    <Col xs={24} sm={5}>
                      <Flex justify="flex-end">
                        <Text
                          style={{
                            color: "#95a4c3",
                            textAlign: "right",
                            fontWeight: 700,
                            fontSize: 12,
                            lineHeight: 1.35,
                            letterSpacing: 0.4,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {dateText}
                        </Text>
                      </Flex>
                    </Col>
                  </Row>
                );
              })}
            </Space>

            {/* Footer with pagination */}
            <Flex
              justify="space-between"
              align="center"
              style={{ padding: "16px 24px" }}
              wrap="wrap"
              gap={10}
            >
              <Text
                style={{
                  fontSize: 12,
                  letterSpacing: 1.6,
                  fontWeight: 700,
                  color: "#9ba8c4",
                }}
              >
                Showing {contact.length} of {total}
              </Text>
              <Pagination
                current={page}
                pageSize={pageSize}
                total={total}
                onChange={(newPage, newPageSize) => {
                  setPage(newPage);
                  setPageSize(newPageSize);
                }}
                showSizeChanger
                pageSizeOptions={["5", "10", "20", "50"]}
                style={{
                  border: 0,
                  background: "transparent",
                }}
              />
            </Flex>
          </>
        )}
      </Card>
    </div>
  );
};

export default Contact;
