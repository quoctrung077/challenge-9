import { AppBar, Toolbar, IconButton, InputBase, Box } from "@mui/material";
import "remixicon/fonts/remixicon.css";
import { useState, useEffect, memo } from "react";

// eslint-disable-next-line react/prop-types
const Header = ({ handleToggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 600);
  };

  useEffect(() => {
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        height: "70px",
        boxShadow: "none",
        borderBottom: "1px solid #e9e9e9",
      }}
    >
      <Toolbar id="toolbar123" style={{ paddingLeft: "0", height: "100%" }}>
        {isMobile ? (
          <IconButton onClick={handleToggleSidebar}>
            <i className="ri-arrow-right-line"></i>
          </IconButton>
        ) : (
          <IconButton onClick={handleToggleSidebar}>
            <i className="ri-menu-line"></i>
          </IconButton>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f3f3f9",
            color: "#495057",
            padding: "4px ",
            borderRadius: "4px",
          }}
        >
          <Box sx={{ marginLeft: "8px", marginRight: "8px" }}>
            <i style={{ color: "#495057" }} className="ri-search-line"></i>
          </Box>
          <InputBase placeholder="Search  . . ." />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
