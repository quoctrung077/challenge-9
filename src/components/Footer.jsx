import { Box, Typography, Link } from "@mui/material";
import { memo } from "react";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 12px",
        backgroundColor: "#FFF",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Typography sx={{ color: "#98a6ad", fontSize: "13px" }}>
        © 2024 Velzon.
      </Typography>
      <Typography sx={{ color: "#98a6ad", fontSize: "13px" }}>
        Design & Develop by{" "}
        <Link
          href="https://themesbrand.com"
          target="_blank"
          rel="noopener"
          underline="none"
          color="inherit"
        >
          Themesbrand
        </Link>
      </Typography>
    </Box>
  );
}

export default memo(Footer);
