import { useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  IconButton,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import { removeMember, updateMember, toggleFavorite } from "../memberSlice.js";
import DeleteMemberModal from "./DeleteMemberModal.jsx";
import EditMemberModal from "./EditMemberModal.jsx";
import OverlayLoading from "../../../components/common/OverlayLoading.jsx";
const MemberCard = ({ member }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const open = Boolean(anchorEl);
  const MemberData = useSelector((state) => state.team.MemberData);
  const [memberData, setMemberData] = useState({
    name: "",
    designation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (selectedMemberId) {
      const memberToEdit = MemberData.find(
        (member) => member._id === selectedMemberId
      );
      if (memberToEdit) {
        setMemberData({
          name: memberToEdit.name.trim(),
          designation: memberToEdit.designation.trim(),
        });
      }
    }
  }, [selectedMemberId, MemberData]);

  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModalDelete = (id) => {
    setSelectedMemberId(id);
    setIsModalDeleteOpen(true);
    handleClose();
  };

  const handleCloseModalDelete = () => {
    setIsModalDeleteOpen(false);
    setSelectedMemberId(null);
  };

  const handleDeleteMember = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(removeMember(selectedMemberId));
      handleCloseModalDelete();
      setIsLoading(false);
    }, 2000);
  };

  const handleOpenEditModal = (id) => {
    setSelectedMemberId(id);
    setIsModalEditOpen(true);
    handleClose();
  };

  const handleCloseModalEdit = () => {
    setIsModalEditOpen(false);
    setIsModalEditOpen();
  };

  const handleSubmitEdit = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(
        updateMember({ _id: selectedMemberId, updatedData: memberData })
      );
      handleCloseModalEdit();
      setIsLoading(false);
    }, 2000);
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };
  return (
    <>
      <OverlayLoading isLoading={isLoading} message="Processing ..." />

      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            borderRadius: 1,
            overflow: "hidden",
            position: "relative",
            boxShadow: 2,
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
                top: 24,
                left: 24,
                backgroundColor: "white",
                width: 25,
                height: 25,
                cursor: "pointer",
              }}
              onClick={() => handleToggleFavorite(member._id)}
            >
              <i
                className={`ri-star-${member.favourite ? "fill" : "fill"}`}
                style={{
                  fontSize: 14,
                  color: member.favourite ? "#f7b500" : "#878a99",
                }}
              ></i>
            </IconButton>
            <IconButton
              sx={{
                position: "absolute",
                top: 18,
                right: 24,
                width: 25,
                height: 25,
                cursor: "pointer",
              }}
              onClick={handleClickOpen}
            >
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
              <MenuItem
                className="dropdown-item"
                onClick={() => handleOpenEditModal(member._id)}
              >
                <i className="ri-pencil-line  "></i>
                Edit
              </MenuItem>
              <MenuItem
                className="dropdown-item"
                onClick={() => handleOpenModalDelete(member._id)}
              >
                <i className="ri-delete-bin-5-line"></i>
                Delete
              </MenuItem>
            </Menu>
            <EditMemberModal
              isOpenEditModal={isModalEditOpen}
              handleCloseEditModal={handleCloseModalEdit}
              memberData={memberData}
              handleInputChange={handleInputChange}
              handleSubmitEdit={handleSubmitEdit}
            />
            <DeleteMemberModal
              isOpenModalDelete={isModalDeleteOpen}
              handleCloseModalDelete={handleCloseModalDelete}
              handleDeleteMember={handleDeleteMember}
            />
            <Avatar
              sx={{
                width: 90,
                height: 90,
                position: "absolute",
                bottom: -40,
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
          <CardContent sx={{ textAlign: "center", pt: 6, pr: 3, pl: 3 }}>
            <Typography variant="h6">{member.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {member.designation}
            </Typography>
            <Box display="flex" justifyContent="space-around" mt={2} mb={2}>
              <Box textAlign="center">
                <Typography variant="body1" fontWeight="600">
                  {member.projects}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Projects
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: "#ddd", borderStyle: "dashed" }}
              />
              <Box textAlign="center">
                <Typography variant="body1" fontWeight="600">
                  {member.tasks}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Tasks
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              sx={{
                width: "100%",
                textTransform: "none",
                backgroundColor: "#f3f6f9",
                borderColor: "#f3f6f9",
                color: "black",
                "&:hover": {
                  backgroundColor: "#e9ebec",
                  borderColor: "#e9ebec",
                },
              }}
            >
              View Profile
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
MemberCard.propTypes = {
  member: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    profileImage: PropTypes.string,
    backgroundImage: PropTypes.string.isRequired,
    projects: PropTypes.number.isRequired,
    tasks: PropTypes.number.isRequired,
    favourite: PropTypes.bool.isRequired,
  }).isRequired,
};
export default memo(MemberCard);
