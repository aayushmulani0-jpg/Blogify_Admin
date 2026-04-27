import React, { useState } from "react";
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
} from "antd";
import {
  CheckCircleFilled,
  DownloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

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

const dummyContactResponses = [
  {
    _id: "dummy-1",
    name: "Julianna Duarte",
    role: "Lead Curator",
    email: "j.duarte@agency.co",
    message:
      "Interested in potential partnership for the Q4 editorial campaign.",
    createdAt: "2024-10-24T10:15:00.000Z",
  },
  {
    _id: "dummy-2",
    name: "Marcus Kinsley",
    role: "Freelance Writer",
    email: "m.kinsley@freelance.net",
    message: "Pitch: The Evolution of Digital Minimalism in media products.",
    createdAt: "2024-10-22T09:00:00.000Z",
  },
  {
    _id: "dummy-3",
    name: "Sarah Lannister",
    role: "Ad Ops Manager",
    email: "sarah.l@globalmedia.com",
    message: "Inquiry regarding Q4 sponsorship options and rate card details.",
    createdAt: "2024-10-21T14:30:00.000Z",
  },
  {
    _id: "dummy-4",
    name: "Robert Sterling",
    role: "Reader Feedback",
    email: "robert_99@gmail.com",
    message:
      "Great article on typography. I wanted to suggest a related topic.",
    createdAt: "2024-10-19T17:45:00.000Z",
  },
];

const toInitials = (name = "") => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);

  if (!parts.length) return "NA";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const formatFullDate = (value) => {
  if (!value) {
    return "Date unavailable";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

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
  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 4,
  });

  const displayResponses = dummyContactResponses;

  const totalResponses = displayResponses.length;

  const pagedResponses = (() => {
    const start = (tablePagination.current - 1) * tablePagination.pageSize;
    return displayResponses.slice(start, start + tablePagination.pageSize);
  })();

  const unreadQueries = Math.min(
    99,
    Math.max(1, Math.ceil(displayResponses.length * 0.25)),
  );

  const exportCsv = () => {
    if (!displayResponses.length) {
      message.info("No responses to export yet.");
      return;
    }

    const headers = ["Name", "Role", "Contact Details", "Message", "Date"];
    const rows = displayResponses.map((record, index) => {
      const name = record?.name || record?.fullName || "Anonymous";
      const role = record?.role || roleFallbacks[index % roleFallbacks.length];
      const contact = record?.email || record?.phone || "No contact details";
      const messageText =
        record?.message || record?.description || "No message";
      const dateText = record?.createdAt || record?.updatedAt || "";
      return [name, role, contact, messageText, dateText]
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

  return (
    <div
      style={{
        padding: "24px 16px 28px",
        width: "100%",
        maxWidth: "100%",
        color: "#171f33",
      }}
    >
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
            onClick={() =>
              message.info("Static demo mode: filters are not enabled.")
            }
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

      <Card
        style={{
          borderRadius: 12,
          marginTop: 18,
          border: "1px solid #e5ebf6",
          boxShadow: "0 8px 22px rgba(17, 26, 50, 0.04)",
        }}
        styles={{ body: { padding: 0 } }}
      >
        <div className="contact-query-head-row">
          <Text>SENDER</Text>
          <Text>CONTACT DETAILS</Text>
          <Text>MESSAGE PREVIEW</Text>
          <Text style={{ textAlign: "right" }}>DATE</Text>
        </div>

        {pagedResponses.map((record, index) => {
          const absoluteIndex =
            (tablePagination.current - 1) * tablePagination.pageSize + index;
          const name = record?.name || record?.fullName || "Anonymous";
          const role =
            record?.role || roleFallbacks[absoluteIndex % roleFallbacks.length];
          const contact =
            record?.email || record?.phone || "No contact details";
          const preview =
            record?.message || record?.description || "No message shared.";
          const fullDate = formatFullDate(
            record?.createdAt || record?.updatedAt,
          );
          const palette = avatarPalette[absoluteIndex % avatarPalette.length];

          return (
            <div
              key={record?._id || `${contact}-${absoluteIndex}`}
              className="contact-query-data-row"
            >
              <div className="contact-query-sender-cell">
                <div
                  className="contact-query-avatar"
                  style={{
                    background: palette.background,
                    color: palette.color,
                  }}
                >
                  {toInitials(name)}
                </div>
                <div>
                  <div className="contact-query-name">{name}</div>
                  <div className="contact-query-role">{role}</div>
                </div>
              </div>

              <div className="contact-query-contact">{contact}</div>

              <div className="contact-query-message">{preview}</div>

              <div className="contact-query-date">{fullDate}</div>
            </div>
          );
        })}

        <div className="contact-query-footer">
          <Text className="contact-query-footer-label">
            SHOWING {Math.min(totalResponses, tablePagination.pageSize)} OF{" "}
            {totalResponses} QUERIES
          </Text>

          <Pagination
            current={tablePagination.current}
            total={totalResponses}
            pageSize={tablePagination.pageSize}
            showSizeChanger={false}
            onChange={(current) =>
              setTablePagination((prev) => ({ ...prev, current }))
            }
            size="small"
          />
        </div>
      </Card>

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

      <style>{`
        .contact-query-head-row,
        .contact-query-data-row {
          display: grid;
          grid-template-columns: minmax(220px, 1.2fr) minmax(190px, 1.1fr) minmax(220px, 1.8fr) 120px;
          gap: 18px;
          align-items: center;
          padding: 18px 24px;
        }

        .contact-query-head-row {
          background: #f3f6ff;
          border-bottom: 1px solid #e4eaf7;
        }

        .contact-query-head-row .ant-typography {
          color: #7d89a6;
          font-size: 11px;
          letter-spacing: 2px;
          font-weight: 700;
          margin: 0;
        }

        .contact-query-data-row {
          border-bottom: 1px solid #edf1f8;
          min-height: 102px;
        }

        .contact-query-sender-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .contact-query-avatar {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.6px;
          flex: none;
        }

        .contact-query-name {
          color: #1a243d;
          font-size: 16px;
          line-height: 1.15;
          font-weight: 700;
        }

        .contact-query-role {
          color: #7f8ca8;
          font-size: 12px;
          line-height: 1.2;
          margin-top: 4px;
          font-weight: 600;
        }

        .contact-query-contact {
          color: #3f4c67;
          font-size: 14px;
          font-weight: 600;
        }

        .contact-query-message {
          color: #3f4c67;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .contact-query-date {
          color: #95a4c3;
          text-align: right;
          font-weight: 700;
          font-size: 12px;
          line-height: 1.35;
          letter-spacing: 0.4px;
          white-space: nowrap;
        }

        .contact-query-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 16px 24px;
        }

        .contact-query-footer-label {
          font-size: 12px;
          letter-spacing: 1.6px;
          font-weight: 700;
          color: #9ba8c4;
        }

        .contact-query-footer .ant-pagination-item {
          border: 0;
          background: transparent;
        }

        .contact-query-footer .ant-pagination-item-active a {
          color: #4d72dc;
          font-weight: 700;
        }

        @media (max-width: 1100px) {
          .contact-query-head-row,
          .contact-query-data-row {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 14px 16px;
          }

          .contact-query-head-row {
            display: none;
          }

          .contact-query-date {
            text-align: left;
          }

          .contact-query-name {
            font-size: 18px;
          }

          .contact-query-role,
          .contact-query-contact,
          .contact-query-message,
          .contact-query-date {
            font-size: 14px;
          }

          .contact-query-footer {
            flex-wrap: wrap;
            padding: 14px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
