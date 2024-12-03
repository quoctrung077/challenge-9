import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  IconButton,
  Box,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";
import DeleteProjectModal from "./DeleteProjectModal.jsx";
import { removeProject, toggleFavorite } from "../projectSlice.js";
import OverlayLoading from "../../../components/common/OverlayLoading.jsx";

const CardProject = ({ project }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedProjectId, setselectedProjectId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const open = Boolean(anchorEl);
  const { projectTitle, status, deadline, members } = project;
  const progressValue = useMemo(() => Math.floor(Math.random() * 100), []);

  // Memoize the random color generation so it only runs once during the initial render
  const randomColor = useMemo(() => {
    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    return getRandomColor();
  }, []);

  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModalDelete = (id) => {
    setselectedProjectId(id);
    setIsModalDeleteOpen(true);
  };

  const handleCloseModalDelete = () => {
    setIsModalDeleteOpen(false);
    setselectedProjectId(null);
    setAnchorEl(null);
  };

  const handleDeleteMember = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(removeProject(selectedProjectId));
      handleCloseModalDelete();
      setIsLoading(false);
      setAnchorEl(null);
    }, 2000);
  };

  // Function to get the status class
  const getStatusClass = () => {
    switch (status) {
      case "Completed":
        return "status status--completed";
      case "Inprogress":
        return "status status--inprogress";
      default:
        return "status";
    }
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <>
      <OverlayLoading isLoading={isLoading} message="Processing ..." />
      <Card sx={{ maxWidth: 500, position: "relative" }}>
        <Box
          className="project-card__header"
          sx={{ backgroundColor: randomColor }}
        >
          <Box>
            <IconButton onClick={() => handleToggleFavorite(project._id)}>
              <i
                className={`ri-star-${project.favourite ? "fill" : "fill"}`}
                style={{
                  fontSize: 14,
                  color: project.favourite ? "#f7b500" : "#878a99",
                }}
              ></i>
            </IconButton>
            <IconButton onClick={handleClickOpen}>
              <i className="ri-more-fill"></i>
            </IconButton>
            <Menu
              className="dropdown-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem className="dropdown-item">
                <i className="ri-pencil-line  "></i>
                Edit
              </MenuItem>
              <MenuItem className="dropdown-item">
                <i className="ri-eye-fill "></i>
                View
              </MenuItem>
              <Divider />
              <MenuItem
                className="dropdown-item"
                onClick={() => handleOpenModalDelete(project._id)}
              >
                <i className="ri-delete-bin-5-line"></i>
                Delete
              </MenuItem>
              <DeleteProjectModal
                isOpenModalDelete={isModalDeleteOpen}
                handleCloseModalDelete={handleCloseModalDelete}
                handleDeleteMember={handleDeleteMember}
              />
            </Menu>
          </Box>
          <Box
            className="text-center"
            component="img"
            src={"../src/assets/images/slack.png"}
          ></Box>
        </Box>

        <CardContent className="project-card__content">
          <Typography className="project-card__title" component="div">
            {projectTitle}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ mt: 1 }}>
              <Typography className="project-card__text">Status: </Typography>
              <Box className={getStatusClass(project.status)}>{status}</Box>
            </Box>
            <Box sx={{ width: "40%", mt: 1 }}>
              <Typography className="project-card__text">Deadline:</Typography>
              <Box className="project-card__deadline">{deadline}</Box>
            </Box>
          </Box>
          <Box className="team-members__container">
            <Box className="team-members__wrapper">
              <Typography className="team-members__title">Team :</Typography>
              <Box sx={{ display: "flex", ml: 2 }}>
                {members.teamMembers.map((member, index) => (
                  <Avatar className="team-members__avatar" key={index}>
                    {member[0]}
                  </Avatar>
                ))}
                <Box
                  className="team-members__add"
                  sx={{ bgcolor: "primary.main" }}
                >
                  +
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "13px", lineHeight: "19.5px" }}>
              Tasks
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box display={{ display: "flex" }}>
                <i
                  className="ri-list-check"
                  style={{ fontSize: " 0.8125rem" }}
                ></i>
              </Box>

              <Typography sx={{ fontSize: "13px", lineHeight: "19.5px" }}>
                12/20
              </Typography>
            </Box>
          </Box>
          <LinearProgress
            className="linear-progress"
            variant="determinate"
            value={progressValue}
            sx={{ marginTop: 2 }}
          />
        </CardContent>
      </Card>
    </>
  );
};

CardProject.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    projectTitle: PropTypes.string.isRequired,
    thumbnailImage: PropTypes.string.isRequired,
    projectDescription: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    members: PropTypes.shape({
      teamLead: PropTypes.string.isRequired,
      teamMembers: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    favourite: PropTypes.bool.isRequired,
  }).isRequired,
};

export default memo(CardProject);
