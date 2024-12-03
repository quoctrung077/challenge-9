import { Box } from "@mui/material";
import PropTypes from "prop-types";
const OverlayLoading = ({ isLoading, message }) => {
  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <Box textAlign="center" color="white">
        <lord-icon
          src="https://cdn.lordicon.com/jxhgzthg.json"
          trigger="loop"
          state="loop-cycle"
          style={{
            width: "150px",
            height: "150px",
          }}
        ></lord-icon>
        {message && (
          <Box mt={2} fontSize="1rem" fontWeight="bold">
            {message}
          </Box>
        )}
      </Box>
    </Box>
  );
};

OverlayLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

export default OverlayLoading;
