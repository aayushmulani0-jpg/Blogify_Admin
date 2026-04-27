import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Flex,
  Pagination,
  Typography,
  message,
} from "antd";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;
const PAGE_SIZE = 5;

const avatarPalette = [
  { background: "#dbe8ff", color: "#4b6df6" },
  { background: "#eadfff", color: "#7a4ded" },
  { background: "#d8f4e8", color: "#2f9d66" },
  { background: "#f8efcc", color: "#b8871c" },
  { background: "#ffdfe2", color: "#c55167" },
  { background: "#dff0ff", color: "#2d79c2" },
];

const staticBlogs = [
  {
    _id: "b-1",
    title: "The Future of Generative AI in Creative Workflows",
    content:
      "How artificial intelligence is reshaping the way designers and developers collaborate on complex digital products.",
    authorName: "Julian Wright",
    hashTag: ["AI", "Design", "Product"],
    createdAt: "2024-10-24T10:15:00.000Z",
  },
  {
    _id: "b-2",
    title: "The Resurgence of Skeuomorphism in Web Apps",
    content:
      "Why digital interfaces are slowly returning to tactile textures and spatial depth after a decade of flat design.",
    authorName: "Priya Sharma",
    hashTag: ["UI", "Design", "Trends"],
    createdAt: "2024-10-22T09:00:00.000Z",
  },
  {
    _id: "b-3",
    title: "Remote First: Building Culture in Distributed Teams",
    content:
      "Exploring the frameworks that keep modern teams connected and motivated across time zones.",
    authorName: "Marcus Chen",
    hashTag: ["Culture", "Remote", "Team"],
    createdAt: "2024-10-21T14:30:00.000Z",
  },
  {
    _id: "b-4",
    title: "Data-Driven Storytelling for Digital Brands",
    content:
      "Leveraging analytics not just for conversion, but to craft narratives that resonate with human audiences.",
    authorName: "Sarah Lee",
    hashTag: ["Analytics", "Brand", "Growth"],
    createdAt: "2024-10-19T17:45:00.000Z",
  },
  {
    _id: "b-5",
    title: "The New Era of Front-end Architecture",
    content:
      "How server components and edge strategies are changing the performance landscape of the modern web.",
    authorName: "Daniel Rivera",
    hashTag: ["Frontend", "Performance", "Architecture"],
    createdAt: "2024-10-18T12:00:00.000Z",
  },
  {
    _id: "b-6",
    title: "The Psychology of Modern Minimalism",
    content:
      "Why we are moving toward simpler lifestyles and how that aesthetic translates into digital experiences.",
    authorName: "Sienna Williams",
    hashTag: ["Psychology", "Minimalism", "Lifestyle"],
    createdAt: "2024-10-16T08:30:00.000Z",
  },
];

const getAuthorInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "BA";
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const formatFullDate = (value) => {
  if (!value) return "Date unavailable";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(staticBlogs);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(blogs.length / PAGE_SIZE));
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [blogs.length, currentPage]);

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    message.success("Deleted");
  };

  const handleOpen = (blog) => {
    navigate(`/explore/${blog._id}`, { state: { blog } });
  };

  const handleFilter = () => {
    message.info("Static mode: filters are not enabled.");
  };

  const handleExport = () => {
    if (!blogs.length) {
      message.info("No blogs to export");
      return;
    }

    const headers = ["Title", "Description", "Author", "Tags"];
    const rows = blogs.map((blog) => [
      blog.title || "Untitled",
      String(blog.content || "")
        .replace(/\s+/g, " ")
        .trim(),
      blog.authorName || "Unknown Author",
      Array.isArray(blog.hashTag) ? blog.hashTag.join(" | ") : "",
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "blogify-blogs.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    message.success("Export started");
  };

  const visibleBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return blogs.slice(startIndex, startIndex + PAGE_SIZE);
  }, [blogs, currentPage]);

  const totalPages = Math.max(1, Math.ceil(blogs.length / PAGE_SIZE));
  const startItem = blogs.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const endItem = Math.min(currentPage * PAGE_SIZE, blogs.length);

  return (
    <div className="blog-page-shell">
      <div className="blog-page-inner">
        <div className="blog-hero-card">
          <div>
            <div className="blog-section-label">MANAGEMENT</div>
            <Title level={1} className="blog-page-title">
              Editorial Blog Hub
            </Title>
          </div>

          <div className="blog-toolbar">
            <Button
              className="blog-toolbar-button"
              icon={<FilterOutlined />}
              onClick={handleFilter}
            >
              Filter
            </Button>
            <Button
              className="blog-toolbar-button"
              icon={<DownloadOutlined />}
              onClick={handleExport}
            >
              Export
            </Button>
            <Button
              type="primary"
              className="blog-create-button"
              onClick={() => message.info("Static mode: create is disabled.")}
            >
              Create
            </Button>
          </div>
        </div>

        <Card bordered={false} className="blog-table-card">
          <div className="blog-table-grid blog-table-head">
            <div>TITLE</div>
            <div>DESCRIPTION</div>
            <div>AUTHOR</div>
            <div>ACTION</div>
          </div>

          <Divider className="blog-table-divider" />

          {visibleBlogs.length ? (
            visibleBlogs.map((blog, index) => {
              const absoluteIndex = (currentPage - 1) * PAGE_SIZE + index;
              const palette =
                avatarPalette[absoluteIndex % avatarPalette.length];

              return (
                <div key={blog._id} className="blog-table-grid blog-table-row">
                  <div className="blog-title-cell">
                    <div className="blog-row-title">
                      {blog.title || "Untitled post"}
                    </div>
                    <div className="blog-row-subtitle">
                      {formatFullDate(blog.updatedAt || blog.createdAt)}
                    </div>
                  </div>

                  <Paragraph
                    className="blog-row-description"
                    ellipsis={{ rows: 2 }}
                  >
                    {blog.content || "No description available."}
                  </Paragraph>

                  <div className="blog-author-cell">
                    <div
                      className="blog-author-avatar"
                      style={{
                        background: palette.background,
                        color: palette.color,
                      }}
                    >
                      {getAuthorInitials(blog.authorName)}
                    </div>
                    <div className="blog-author-name">
                      {blog.authorName || "Unknown author"}
                    </div>
                  </div>

                  <div className="blog-action-cell">
                    <Button
                      type="text"
                      shape="circle"
                      icon={<ArrowRightOutlined />}
                      className="blog-icon-button blog-icon-button-primary"
                      onClick={() => handleOpen(blog)}
                    />
                    <Button
                      type="text"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      className="blog-icon-button blog-icon-button-danger"
                      onClick={() => deleteBlog(blog._id)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="blog-empty-state">
              <Title level={4} style={{ marginBottom: 8 }}>
                No blog posts yet
              </Title>
              <Text type="secondary">Create a post to populate the hub.</Text>
            </div>
          )}

          <div className="blog-table-footer">
            <div className="blog-footer-text">
              Showing {startItem} to {endItem} of {blogs.length} results
            </div>

            <Pagination
              current={currentPage}
              total={blogs.length}
              pageSize={PAGE_SIZE}
              showSizeChanger={false}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
