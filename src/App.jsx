import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import ProLayout from "./Site/Prolayout";
import Dashboard from "./Components/Dashboard";
import About from "./Components/About";
import Contact from "./Components/Contact";
import NotFound from "./Site/NotFound";
import Blog from "./Components/Blog";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import { useSelector } from "react-redux";
import User from "./Components/User";
import ExploreBlogDetails from "./Components/ExploreBlogDetails";
import AboutHome from "./Components/AboutHome";
import ContactHome from "./Components/ContactHome";

function App() {
  const isAuthenticated = useSelector((state) => !!state.user.token);
  console.log("App component - isAuthenticated: ", isAuthenticated);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily:
            '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
          fontSize: 14,
        },
      }}
    >
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<User />} />
        <Route path="/explore/:blogId" element={<ExploreBlogDetails />} />
        <Route path="/about" element={<AboutHome />} />
        <Route path="/contacthome" element={<ContactHome />} />
        <Route
          path="/"
          element={
            isAuthenticated ? <ProLayout /> : <Navigate to="/home" replace />
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/about" element={<About />} />
          <Route path="dashboard/user" element={<User />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
