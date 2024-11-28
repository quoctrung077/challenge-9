import { useState, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumbs,
  Link,
  Typography,
  Box,
  InputBase,
  Button,
  Grid,
  Pagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import ProjectCard from "./CardProject.jsx";
import { SelectProjects } from "../projectSlice.js";
import { ITEMS_PER_PAGE_PROJECT } from "../../../config/config.js";
import useDebounce from "../../../hooks/useDebounce.js";

const ListProjects = () => {
  const projects = useSelector(SelectProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredData = useMemo(() => {
    return projects.filter((project) => {
      const lowerCaseQuery = debouncedSearchQuery.trim().toLowerCase();
      return project.projectTitle.toLowerCase().includes(lowerCaseQuery);
    });
  }, [projects, debouncedSearchQuery]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE_PROJECT;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE_PROJECT;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleAddNewClick = () => {
    navigate("/apps-projects-create");
  };

  return (
    <Box className="project__container">
      {/* Breadcrumbs */}
      <Box className="breadcrumb__container">
        <Typography
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#495057",
          }}
        >
          Projects List
        </Typography>
        <Breadcrumbs separator=">" aria-label="breadcrumb">
          <Link underline="hover" color="#212529" href="#">
            Projects
          </Link>
          <Typography underline="hover" color="inherit">
            Projects List
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box className="projects-list__container">
        {/* Search Bar */}
        <Box
          className="search__container"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            className="add-new-project__container"
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
              className="add-new-project__button--text"
              sx={{ p: 0 }}
              onClick={handleAddNewClick}
            >
              Add New
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #DDD",
              width: "250px",
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
              placeholder="Search  . . ."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={0}>
          {currentData.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(filteredData.length / ITEMS_PER_PAGE_PROJECT)}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(ListProjects);
