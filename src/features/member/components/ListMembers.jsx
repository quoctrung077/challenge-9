import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../../config/config.js";
import {
  Breadcrumbs,
  Link,
  Typography,
  Box,
  Grid,
  InputBase,
  Pagination,
  Button,
} from "@mui/material";
import useDebounce from "../../../hooks/useDebounce.js";
import MemberCard from "./CardMember.js";
import AddMemberModal from "./AddMemberModal.js";

const Team = () => {
  const teamData = useSelector((state) => state.team.teamData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        <Typography
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#495057",
          }}
        >
          Members
        </Typography>
        <Breadcrumbs separator=">" aria-label="breadcrumb">
          <Link underline="hover" color="#212529" href="#">
            Pages
          </Link>
          <Typography underline="hover" color="inherit" href="#">
            Members
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
            <Box
              sx={{ marginLeft: "8px", marginRight: "8px", display: "flex" }}
            >
              <i
                style={{ color: "#878a99", fontSize: "0.8125rem" }}
                className="ri-search-line"
              ></i>
            </Box>
            <InputBase
              className="search__input"
              width="500px"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search  . . ."
            />
          </Box>
          <Box
            className="add-member__container"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <i
                style={{
                  color: "#fff",
                  fontSize: "0.8125rem",
                  marginRight: "0.25rem",
                }}
                className="ri-add-fill"
              ></i>
            </Box>
            <Button
              className="add-member__button--text"
              sx={{ p: 0 }}
              onClick={handleOpenModal}
            >
              Add Members
            </Button>
            <AddMemberModal
              isOpen={isModalOpen}
              handleClose={handleCloseModal}
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
