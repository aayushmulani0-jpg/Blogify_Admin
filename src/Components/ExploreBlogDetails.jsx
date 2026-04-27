import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Layout,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axiosInstance from "../Utils/axiosInstance";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const normalizeTitleKey = (title = "") =>
  title.toLowerCase().trim().replace(/\s+/g, "-");

const ExploreBlogDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { blogId } = useParams();
  const [blog, setBlog] = useState(location.state?.blog || null);

  useEffect(() => {
    const loadBlog = async () => {
      if (blog) return;
      try {
        const res = await axiosInstance.get("/blogs/getAllBlog");
        const list = Array.isArray(res?.data?.data) ? res.data.data : [];
        const found = list.find((item) => {
          const idMatch = String(item?._id || "") === String(blogId || "");
          const titleMatch =
            normalizeTitleKey(item?.title) === String(blogId || "");
          return idMatch || titleMatch;
        });
        setBlog(found || null);
      } catch (error) {
        setBlog(null);
      }
    };

    loadBlog();
  }, [blog, blogId]);

  const tags = useMemo(() => {
    if (!blog) return [];
    if (Array.isArray(blog.hashTag)) return blog.hashTag;
    return [];
  }, [blog]);

  const imageSrc = blog?.coverImage || blog?.image;
  const content =
    blog?.content || blog?.fullDescription || blog?.description || "";
  const author = blog?.authorName || blog?.author || "Unknown author";

  return (
    <Layout style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Navbar activeKey="blogs" showSearchBar />

      <Content style={{ padding: "32px 24px 48px" }}>
        <Row justify="center">
          <Col xs={24} xl={18}>
            <Card
              bordered={false}
              style={{ borderRadius: 20 }}
              styles={{ body: { padding: 24 } }}
            >
              <Space direction="vertical" size={20} style={{ width: "100%" }}>
                <Button
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate("/explore")}
                  style={{ width: "fit-content" }}
                >
                  Back to Explore
                </Button>

                {imageSrc && (
                  <img
                    alt={blog?.title || "Blog cover"}
                    src={imageSrc}
                    style={{
                      width: "100%",
                      maxHeight: 480,
                      objectFit: "cover",
                      borderRadius: 14,
                      display: "block",
                    }}
                  />
                )}

                <Title level={2} style={{ margin: 0 }}>
                  {blog?.title || "Blog not found"}
                </Title>

                <Space wrap size={8}>
                  {tags.map((tag, index) => (
                    <Tag color="blue" key={`details-tag-${index}`}>
                      #{String(tag || "").replace(/^#/, "")}
                    </Tag>
                  ))}
                </Space>

                <Text type="secondary">By {author}</Text>

                <Divider style={{ margin: "8px 0" }} />

                <Paragraph
                  style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 0 }}
                >
                  {content || "No content available for this blog."}
                </Paragraph>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer description="Curating the finest digital experiences and design insights since 2024." />
    </Layout>
  );
};

export default ExploreBlogDetails;
