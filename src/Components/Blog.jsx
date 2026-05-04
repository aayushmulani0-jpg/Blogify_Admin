import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Flex,
  Modal,
  Pagination,
  Space,
  Tag,
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
      "How artificial intelligence is reshaping the way designers and developers collaborate on complex digital products. From automated design systems to intelligent code generation, AI is becoming an integral part of the creative process. Teams are now able to prototype faster, iterate more efficiently, and deliver higher quality products by leveraging machine learning algorithms that understand design patterns and user preferences.",
    authorName: "Julian Wright",
    hashTag: ["AI", "Design", "Product"],
    createdAt: "2024-10-24T10:15:00.000Z",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
  },
  {
    _id: "b-2",
    title: "The Resurgence of Skeuomorphism in Web Apps",
    content:
      "Why digital interfaces are slowly returning to tactile textures and spatial depth after a decade of flat design. Modern skeuomorphism combines the best of both worlds - the clarity of flat design with the intuitive affordances of realistic textures. This hybrid approach is particularly effective in mobile applications where users benefit from familiar visual cues that guide their interactions.",
    authorName: "Priya Sharma",
    hashTag: ["UI", "Design", "Trends"],
    createdAt: "2024-10-22T09:00:00.000Z",
  },
  {
    _id: "b-3",
    title: "Remote First: Building Culture in Distributed Teams",
    content:
      "Exploring the frameworks that keep modern teams connected and motivated across time zones. Successful remote-first companies invest heavily in asynchronous communication tools, regular virtual team-building activities, and clear documentation practices. The key is creating a culture where every team member feels equally valued regardless of their physical location.",
    authorName: "Marcus Chen",
    hashTag: ["Culture", "Remote", "Team"],
    createdAt: "2024-10-21T14:30:00.000Z",
  },
  {
    _id: "b-4",
    title: "Data-Driven Storytelling for Digital Brands",
    content:
      "Leveraging analytics not just for conversion, but to craft narratives that resonate with human audiences. Modern brands are discovering that data can inform creative decisions without compromising authenticity. By analyzing user behavior patterns, content engagement metrics, and demographic insights, marketers can create personalized narratives that feel both relevant and genuine.",
    authorName: "Sarah Lee",
    hashTag: ["Analytics", "Brand", "Growth"],
    createdAt: "2024-10-19T17:45:00.000Z",
  },
  {
    _id: "b-5",
    title: "The New Era of Front-end Architecture",
    content:
      "How server components and edge strategies are changing the performance landscape of the modern web. The shift towards server-side rendering and edge computing is revolutionizing how we think about application architecture. Developers can now deliver lightning-fast experiences by moving computation closer to users while maintaining the interactivity of client-side applications.",
    authorName: "Daniel Rivera",
    hashTag: ["Frontend", "Performance", "Architecture"],
    createdAt: "2024-10-18T12:00:00.000Z",
  },
  {
    _id: "b-6",
    title: "The Psychology of Modern Minimalism",
    content:
      "Why we are moving toward simpler lifestyles and how that aesthetic translates into digital experiences. Minimalism in design isn't just about removing elements - it's about creating clarity and purpose. By reducing cognitive load, minimalist interfaces help users focus on what truly matters, leading to better engagement and satisfaction.",
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
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setSelectedBlog(blog);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedBlog(null);
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

  const tags = useMemo(() => {
    if (!selectedBlog) return [];
    if (Array.isArray(selectedBlog.hashTag)) return selectedBlog.hashTag;
    return [];
  }, [selectedBlog]);

  // Calculate avatar palette index for the selected blog
  const getSelectedBlogPalette = () => {
    if (!selectedBlog) return avatarPalette[0];
    const blogIndex = blogs.findIndex((b) => b._id === selectedBlog._id);
    return avatarPalette[blogIndex % avatarPalette.length];
  };

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

      {/* Blog Preview Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        centered
        style={{ top: 20 }}
        bodyStyle={{ padding: "32px", maxHeight: "80vh", overflowY: "auto" }}
      >
        {selectedBlog && (
          <div>
            {/* Author Info Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 600,
                  ...getSelectedBlogPalette(),
                }}
              >
                {getAuthorInitials(selectedBlog.authorName)}
              </div>
              <div style={{ marginLeft: 12 }}>
                <Text strong style={{ fontSize: 16, display: "block" }}>
                  {selectedBlog.authorName || "Unknown author"}
                </Text>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {formatFullDate(
                    selectedBlog.updatedAt || selectedBlog.createdAt,
                  )}
                </Text>
              </div>
            </div>

            {/* Blog Content */}
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              {/* Cover Image (if exists) */}
              {selectedBlog.coverImage && (
                <img
                  alt={selectedBlog.title}
                  src={selectedBlog.coverImage}
                  style={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "cover",
                    borderRadius: 12,
                    marginBottom: 8,
                  }}
                />
              )}

              <Title level={2} style={{ margin: 0 }}>
                {selectedBlog.title || "Untitled post"}
              </Title>

              {/* Tags */}
              {tags.length > 0 && (
                <Space wrap size={8}>
                  {tags.map((tag, index) => (
                    <Tag color="blue" key={`modal-tag-${index}`}>
                      #{String(tag || "").replace(/^#/, "")}
                    </Tag>
                  ))}
                </Space>
              )}

              <Divider style={{ margin: "8px 0" }} />

              {/* Full Content */}
              <Paragraph
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "#2c3e50",
                  marginBottom: 24,
                }}
              >
                {selectedBlog.content || "No content available."}
              </Paragraph>
            </Space>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <Button onClick={handleCloseModal}>Close</Button>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  deleteBlog(selectedBlog._id);
                  handleCloseModal();
                }}
              >
                Delete Post
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Blog;
