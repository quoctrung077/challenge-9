import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../config/config.js";
import {
  Breadcrumbs,
  Link,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  IconButton,
  InputBase,
  Pagination,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useDebounce from "../hooks/useDebounce";

const Team = () => {
  const teamData = useSelector((state) => state.team.teamData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Tính dữ liệu cho trang hiện tại
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const filteredData = useMemo(() => {
    return teamData.filter((member) => {
      const lowerCaseQuery = debouncedSearchQuery.toLowerCase();
      return (
        member.name.toLowerCase().includes(lowerCaseQuery) ||
        member.designation.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }, [teamData, debouncedSearchQuery]); // re render lại khii teamdata or từ khoá debouncedSearchQuery thay đổi

  // Hiển thị dữ liệu cho trang hiện tại
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Box className="team__container">
      {/* Breadcrumbs */}
      <Box className="breadcrumb__container">
        <Typography>Team</Typography>
        <Breadcrumbs separator=">" aria-label="breadcrumb">
          <Link underline="hover" color="#212529" href="#">
            Pages
          </Link>
          <Typography underline="hover" color="inherit" href="#">
            Team
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box className="member-list__container">
        {/* Search Bar */}
        <Box className="search__container">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #DDD",
              width: "500px",
              borderRadius: "0.25rem",
              padding: "0.25rem",
            }}
          >
            <Box sx={{ marginLeft: "8px", marginRight: "8px" }}>
              <i style={{ color: "#495057" }} className="ri-search-line"></i>
            </Box>
            <InputBase
              width="250px"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search  . . ."
            />
          </Box>
        </Box>

        {/* Team Cards */}
        <Grid container spacing={3}>
          {currentData.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: 3,
                }}
              >
                {/* Card Background */}
                <CardMedia
                  component="div"
                  sx={{
                    height: 150,
                    backgroundImage: `url(${member.backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      backgroundColor: "white",
                      width: 30,
                      height: 30,
                    }}
                  >
                    <StarIcon color="warning" />
                  </IconButton>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "white",
                      width: 30,
                      height: 30,
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      position: "absolute",
                      bottom: -30,
                      left: "50%",
                      transform: "translateX(-50%)",
                      border: "2px solid white",
                    }}
                    src={member.profileImage}
                  >
                    {!member.profileImage &&
                      member.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                  </Avatar>
                </CardMedia>

                {/* Card Content */}
                <CardContent sx={{ textAlign: "center", pt: 5 }}>
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.designation}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    mt={2}
                    mb={2}
                  >
                    <Typography variant="body2">
                      {member.projects} Projects
                    </Typography>
                    <Typography variant="body2">
                      {member.tasks} Tasks
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: "none" }}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(filteredData.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Team;
