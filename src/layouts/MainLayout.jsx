import { useState, useEffect, useRef } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/Sidebar";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 600;
      setIsMobile(isMobileView);
      // ngăn chặn giữ trạng thái collapsed nếu chuyển sang mobile
      if (isMobileView) {
        setIsSidebarCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const handleSidebarToggle = () => {
    if (isMobile) {
      setIsSidebarVisible((prevState) => !prevState);
    } else {
      setIsSidebarCollapsed((prevState) => !prevState);
    }
  };

  return (
    <div className="layout-container">
      <div
        ref={sidebarRef}
        className={`layout-left ${
          isMobile && !isSidebarVisible ? "hidden" : ""
        }`}
      >
        <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
      </div>
      <div className="layout-right">
        <Header handleToggleSidebar={handleSidebarToggle} />
        {children}
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
