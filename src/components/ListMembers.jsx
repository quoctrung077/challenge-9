import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../config/config.js";
import {
  Breadcrumbs,
  Link,
  Typography,
  Box,
  Grid,
  InputBase,
  Pagination,
} from "@mui/material";

import useDebounce from "../hooks/useDebounce";

import MemberCard from "./cardMember.jsx";

const Team = () => {
  const teamData = useSelector((state) => state.team.teamData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Calculate data for the current page
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
  }, [teamData, debouncedSearchQuery]);

  // Display data for the current page
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
            <MemberCard key={index} member={member} />
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
