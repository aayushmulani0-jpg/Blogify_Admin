import React, { useEffect, useMemo, useState } from "react";
import {
  Layout,
  Typography,
  Button,
  Row,
  Col,
  Card,
  Avatar,
  Flex,
  Space,
  Tag,
  Grid,
  Divider,
} from "antd";
import {
  ArrowRightOutlined,
  StarFilled,
  CommentOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axiosInstance from "../Utils/axiosInstance";
import { getMediaPath } from "../Utils/getMediaPath";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const trendingPosts = [
  {
    title: "The Rise of Agentic AI in 2026",
    description:
      "How autonomous AI agents are transforming the way we work, create, and build the future.",
    category: "Artificial Intelligence",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQo1_A89RjEmyCE2chfIlZLMhVJ5HBLCT_LwzpZykwUWbHyL_HTvu0L1sbp6Pygc6s6bjolkL4nECqbVJvWNfN73HIR_dAvjwWlx5mUh1tQpxdNPzSlmVZeP-mJ7RvuCTvFv8Tp8dRkeWGqzlcVQna1gY5RccnLsHXShupB7tyY169YDQNvFlCSV10G34cT2zQ5FpYlaVmS93BKqe1bMBQ5WuF7tFA5nztAyjsTHNN_pTAWfiAkZCaWgQpjYAEisWQ_1T6vzAMrixL",
    author: "Akshay Patel",
    readTime: "9 min read",
    initials: "AP",
    avatarColor: "#6366f1",
  },
  {
    title: "Modern Web Design Trends 2026",
    description:
      "Calm interfaces, AI personalization, and the new era of thoughtful digital experiences.",
    category: "Web Design",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHKI47xCaF_ZzVD8JfiGhT18-_Z3GMhgpPOw1cG2W4b5oDWUstKPITJfY_r_iUUoRwnne7EuKdLcHaXsUdxYrLQiI4AOzB30aFcnFInD-P25RZIexH-uQ4A6cfUY31BgJjvCwfhK0U5VPWKxftHfARlwY87K-W6PDqh2cN5nuNGPV60Xufmu_M3SxZ3VjSuyPrY5ru0Orh1fFCnnq5z_-vI5LZ8uQFyKRioTGjz8GzKPlqD_l-VKv2S35d-5sS78lM9_WsLjC4hXcn",
    author: "Priya Sharma",
    readTime: "12 min read",
    initials: "PS",
    avatarColor: "#14b8a6",
  },
  {
    title: "Building Scalable SaaS in 2026",
    description:
      "Practical lessons from founders who successfully scaled from zero to millions.",
    category: "Entrepreneurship",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOpDVlBE6ZsXAH0QuT-JAh3D-ywSP-kiwfuMGlO1EwuuqfhO2Zepgt594hH5HUHSYXN-uDZ6co2XRTv-Gc-2nk9Zr1LHv0D8Bq3xd8sUNQjiTZyBgG6TUHPXDPmR5--AnxORZ2TL1tqVqb-yn0NNQr0yj8_UMEnd0m7GvbOaqkRV84YbiBl4xbEkxLK7LkG2zHMhIKqXinL7NtSp1TPbe8-7WTcuBWGkSArSIczqPF6AiYkl9m7xSdLVqF6SEbHEXRUhtjZvSAPp5m",
    author: "Rahul Verma",
    readTime: "7 min read",
    initials: "RV",
    avatarColor: "#f59e0b",
  },
  {
    title: "The Power of Daily Writing",
    description:
      "How showing up every day with the pen transformed my clarity and career.",
    category: "Personal Growth",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdxSH-nUiTaG9pQpL_18AaQNjm-_eK3H_iqH0FZ8OFvGGN8ysZCvWQkIbRhB3H-r7S27D5_f8hd2htm7Atq9StPa20MGAsNL8EX5h7xW_hno7yr4nzqg2ISQroW9WmHHrpCv1Yi7fzEycHTDAe9hWS7tpgO_8hiOlA2BKkKsHe0UA1DTkS1-uW6LDzWHYEqEjQRhl_wT6_iGTbIbD26s58xBytz1nydxGmbayR8NpUY-2tGYalHr1ErtCvk9VnqRtgSRWTTL-ofRQG",
    author: "Neha Gupta",
    readTime: "6 min read",
    initials: "NG",
    avatarColor: "#e11d48",
  },
];

const testimonials = [
  {
    quote:
      '"Blogify has completely transformed how I share my deep-dive research. The editorial focus is unparalleled."',
    author: "David G. Richardson",
    role: "TECH ANALYST",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRdkTOai6o1KPgpxg9S1dEs8IuYg77BEyXBFGRwGvdMGkzKtb_NUHG9TN7TjHsCzvAvS_vZUe8Oe4h1kUwZIZuGfh5LIy9IaQGTL6W3u0UDJtKOo8qVaKkQwo89utfKm_L48FQTEd_mtlnoV4Ho1HJ2n9YTmNJCXIUmb1x06esCHtHD4WxrnbF-yY2aExfNNNHsDTzUqfGSVlLp-QlrDMZ8B-LUu3butDLuTCLMEOP0AJASKy7pJwLMJEsb2v9DR1_h4qgAiL9pUzo",
  },
  {
    quote:
      '"Finally, a blogging platform that respects the reader as much as the writer. The typography is a dream."',
    author: "Sienna Williams",
    role: "LIFESTYLE JOURNALIST",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYiSi0CC7KnYppxASSm3bwi0e2PLpFDAaQV3DaA5S6if9xfCuLROTdsmJxXpm2GS74FkSxwWoIOB7aKwqYjlFYJarqtEWynuC5iF6wVieu6UqYjCW16oIyc9aYRq0pmstArqKiNRmqoa4y78cv7fKpSMQ4Tz51i7GGCRcfjY7ntznuwaJ5nrWe9ir5DF0yl3U533s4pUwXQM3DvncMWjs1coE3Le3zYQiQ_HkUgnB52bS74TRZkpyv_YmGWOAduvNR1GfwO8O-nU3d",
  },
  {
    quote:
      '"The community engagement tools built into Blogify are high-quality and actually meaningful."',
    author: "Michael S. Chen",
    role: "SAAS FOUNDER",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjUfJRMYdw88qBgZVQ2yvD9NVOWH1P9aMEUN8ZeJ8GYByJprK-q5iYQbcR3KD9wmI6bPUIS7e5UiHTcrKOydmP14KBKAVWRblLrggFTELkN7bqo1rbfDS_-Qwasan24do-1EbU0BAWAa7ZuCViZsDic2ZJyIovF8VNd7ro9a7_ti_X4tgxoUhdNsYSGcMEjifT5IdeotT1FAmTjzYbebMCmMvwY2SQkNvOH8lB2lXlEZaFuSCB3pNdCKTRjNF_K67RKAp6id9snI_O",
  },
];

const Home = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const getWordCount = (text = "") =>
    text.trim().split(/\s+/).filter(Boolean).length;

  const fetchTrendingBlogs = async () => {
    try {
      const res = await axiosInstance.post("/getAllUsersBlog", {
        limit: 4,
        page: 1,
      });
      setBlogs(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching trending blogs:", error);
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchTrendingBlogs();
  }, []);

  const trendingData = useMemo(() => {
    if (blogs.length > 0) {
      return blogs.slice(0, 4).map((blog, index) => {
        const palette = ["#6366f1", "#14b8a6", "#f59e0b", "#e11d48"];

        return {
          id: blog?._id,
          title: blog?.title || "Untitled Blog",
          description: (blog?.content || "No description available.").slice(
            0,
            140,
          ),
          fullDescription: blog?.content || "No description available.",
          category: blog?.category || blog?.hashTag?.[0] || "General",
          hashTag:
            Array.isArray(blog?.hashTag) && blog.hashTag.length > 0
              ? blog.hashTag
              : [],
          image: getMediaPath(blog?.coverImage),
        };
      });
    }
    return trendingPosts.map((post) => ({
      ...post,
      id: String(post?.title || "blog")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-"),
      fullDescription: post.description,
      hashTag: [post.category],
    }));
  }, [blogs]);

  return (
    <Layout
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f7f8ff",
        overflowX: "hidden",
      }}
    >
      <Navbar activeKey="home" showAuthButtons />

      <Content>
        <section
          style={{
            padding: screens.lg ? "112px 48px 92px" : "88px 18px 72px",
            background:
              "linear-gradient(135deg, #111a33 0%, #0b1730 55%, #0f234a 100%)",
          }}
        >
          <Row
            gutter={[40, 32]}
            align="middle"
            style={{ maxWidth: 1240, margin: "0 auto" }}
          >
            <Col xs={24} lg={11}>
              <Tag
                style={{
                  marginBottom: 24,
                  borderRadius: 999,
                  color: "#93c5fd",
                  borderColor: "rgba(147,197,253,0.25)",
                  background: "rgba(59,130,246,0.08)",
                  padding: "6px 12px",
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                EDITORIAL EXCELLENCE
              </Tag>
              <Title
                style={{
                  color: "#ffffff",
                  marginTop: 0,
                  marginBottom: 20,
                  fontSize: screens.xl ? 52 : screens.md ? 42 : 34,
                  lineHeight: 1.05,
                  fontWeight: 900,
                }}
              >
                Tune in to <span style={{ color: "#60a5fa" }}>Blogify</span>
              </Title>
              <Paragraph
                style={{
                  color: "#cbd5e1",
                  fontSize: 16,
                  lineHeight: 1.7,
                  maxWidth: 560,
                  marginBottom: 34,
                }}
              >
                Join us for fresh ideas, deep dives, and stories that matter.
                Curated by experts, written for thinkers.
              </Paragraph>
              <Space size="middle" wrap>
                <Button
                  size="large"
                  style={{ height: 52, paddingInline: 26, fontWeight: 700 }}
                >
                  Explore Latest
                </Button>
                <Button
                  ghost
                  size="large"
                  style={{ height: 52, paddingInline: 26, fontWeight: 700 }}
                >
                  Start Writing
                </Button>
              </Space>
            </Col>
            <Col xs={24} lg={13}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 24,
                  boxShadow: "0 26px 52px -24px rgba(0,0,0,0.6)",
                }}
                bodyStyle={{ padding: 12 }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQxPzSZ7fqhVv4szvETbq_p-sXJupSlmyWTzS5-gd868lX_MUsj3asN2JQuHqqh0hTvcBaiFYfN08v2SQBRLCxX-rcjeeakZVkx201y6EYVr61l6iSrwPEdqHUAHa68yZc0cbhz2RSiZ9yCjBzQZH59kQHZ7TPzgBpX-_euXpC7PqePqYXZ4Ab4lKA_cuA9qv8xktPQIJ20w-zCOUOBVCHjFdi1dNAxbHiQkqDYJg41Ni3eiXvV_U_nh3xHCt8U6nUEjO0sMCHl2vd"
                  alt="Hero workspace"
                  style={{ width: "100%", borderRadius: 16, display: "block" }}
                />
              </Card>
              <Card
                style={{
                  width: screens.md ? 350 : "100%",
                  marginTop: -36,
                  marginLeft: screens.md ? 22 : 0,
                  borderRadius: 14,
                  boxShadow: "0 24px 32px -26px rgba(0,0,0,0.7)",
                }}
              >
                <Space direction="vertical" size={6}>
                  <Space size={8}>
                    <StarFilled style={{ color: "#2563eb" }} />
                    <Text
                      style={{
                        fontSize: 11,
                        color: "#94a3b8",
                        letterSpacing: 1.2,
                      }}
                    >
                      FEATURED STORY
                    </Text>
                  </Space>
                  <Text
                    style={{
                      fontSize: 18,
                      lineHeight: 1.2,
                      color: "#0f172a",
                      fontWeight: 700,
                    }}
                  >
                    The Future of Generative Art in Web Design
                  </Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </section>

        <section
          style={{
            background: "#ffffff",
            padding: screens.lg ? "96px 48px" : "72px 18px",
          }}
        >
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <Row
              justify="space-between"
              align="bottom"
              gutter={[16, 20]}
              style={{ marginBottom: 44 }}
            >
              <Col>
                <Title
                  level={2}
                  style={{ margin: 0, fontSize: screens.md ? 40 : 30 }}
                >
                  Trending Now
                </Title>
                <Paragraph
                  style={{
                    marginTop: 12,
                    marginBottom: 0,
                    color: "#64748b",
                    fontSize: 15,
                  }}
                >
                  Stories that are making an impact this week
                </Paragraph>
              </Col>
              <Col>
                <Button
                  type="link"
                  style={{ paddingInline: 0, fontWeight: 700 }}
                  icon={<ArrowRightOutlined />}
                  onClick={() => navigate("/explore")}
                >
                  Explore all
                </Button>
              </Col>
            </Row>

            <Row gutter={[22, 22]}>
              {trendingData.map((post) => (
                <Col xs={24} sm={12} lg={6} key={post.title}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: 20,
                      overflow: "hidden",
                      height: "100%",
                    }}
                    styles={{ body: { padding: 0 } }}
                    cover={
                      <img
                        alt={post.category}
                        src={post.image}
                        style={{ height: 245, objectFit: "cover" }}
                      />
                    }
                  >
                    <div
                      style={{
                        padding: 24,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <Flex wrap gap={6} style={{ marginBottom: 16 }}>
                        {(post.hashTag || []).map((tag, index) => (
                          <Tag color="blue" key={`${post.title}-tag-${index}`}>
                            #{String(tag || "").replace(/^#/, "")}
                          </Tag>
                        ))}
                      </Flex>
                      <Text
                        style={{
                          color: "#0f172a",
                          fontSize: 20,
                          lineHeight: 1.2,
                          fontWeight: 700,
                        }}
                      >
                        {post.title}
                      </Text>
                      <Paragraph
                        style={{
                          color: "#64748b",
                          marginTop: 14,
                          marginBottom: 28,
                          minHeight: 76,
                        }}
                      >
                        {post.description}
                      </Paragraph>

                      {getWordCount(post.fullDescription) > 30 && (
                        <Button
                          type="primary"
                          style={{
                            width: "fit-content",
                            background: "#4f46e5",
                            borderColor: "#4f46e5",
                          }}
                          onClick={() =>
                            navigate(
                              `/explore/${
                                post?.id ||
                                String(post?.title || "blog")
                                  .toLowerCase()
                                  .trim()
                                  .replace(/\s+/g, "-")
                              }`,
                              {
                                state: {
                                  blog: {
                                    _id: post?.id,
                                    title: post?.title,
                                    content: post?.fullDescription,
                                    hashTag: post?.hashTag,
                                    author: post?.author,
                                    coverImage: post?.image,
                                  },
                                },
                              },
                            )
                          }
                        >
                          Read more
                        </Button>
                      )}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        <section
          style={{
            background: "#eceffc",
            padding: screens.lg ? "96px 48px" : "72px 18px",
          }}
        >
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <Title level={2} style={{ marginBottom: 10 }}>
                Who&apos;s using Blogify
              </Title>
              <Paragraph
                style={{ color: "#64748b", maxWidth: 640, margin: "0 auto" }}
              >
                From independent journalists to tech lead teams, our platform
                powers the world&apos;s most insightful voices.
              </Paragraph>
            </div>

            <Row gutter={[22, 22]}>
              {testimonials.map((item) => (
                <Col xs={24} md={8} key={item.author}>
                  <Card
                    style={{
                      borderRadius: 22,
                      height: "100%",
                      border: "1px solid #e2e8f0",
                    }}
                    bodyStyle={{ padding: 30 }}
                  >
                    <CommentOutlined
                      style={{
                        color: "#2563eb",
                        fontSize: 26,
                        marginBottom: 20,
                      }}
                    />
                    <Paragraph
                      style={{
                        color: "#334155",
                        fontSize: 15,
                        minHeight: 132,
                        lineHeight: 1.65,
                        fontStyle: "italic",
                      }}
                    >
                      {item.quote}
                    </Paragraph>
                    <Space align="center" size={12}>
                      <Avatar size={50} src={item.image} />
                      <div>
                        <Text
                          style={{
                            display: "block",
                            color: "#0f172a",
                            fontWeight: 700,
                          }}
                        >
                          {item.author}
                        </Text>
                        <Text
                          style={{
                            color: "#94a3b8",
                            fontSize: 12,
                            letterSpacing: 1.3,
                          }}
                        >
                          {item.role}
                        </Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>
      </Content>

      <Footer />
    </Layout>
  );
};

export default Home;
