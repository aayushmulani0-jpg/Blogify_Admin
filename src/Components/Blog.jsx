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
import axiosInstance from "../Utils/axiosInstance";

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
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(5);
  const [totalBlogs,setTotalBlogs] = useState(0);

   const allBlogs = async() =>{
     try {
      const payload = {
        page:page,
        limit:pageSize
      }
      const res = await axiosInstance.post("/admin/getAllUsersBlog",payload);
      setBlogs(res.data.blogs);
      setTotalBlogs(res.data.total);  
     } catch (error) {
        message.error("Failed to fetch blogs");
     }
   }

    useEffect(() => {
      allBlogs();
    }, [page, pageSize]);

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
