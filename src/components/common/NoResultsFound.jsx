import { Box, Typography } from "@mui/material";

const NoResultsFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "300px",
      }}
    >
      <lord-icon
        src="https://cdn.lordicon.com/msoeawqm.json"
        trigger="loop"
        colors="primary:#405189,secondary:#0ab39c"
        style={{ width: "72px", height: "72px" }}
      ></lord-icon>
      <Typography
        sx={{
          mt: 2,
          fontSize: "16.25px",
          lineHeight: "19.5px",
          fontWeight: 500,
          color: "#495057",
        }}
      >
        Sorry! No Result Found
      </Typography>
    </Box>
  );
};

export default NoResultsFound;
