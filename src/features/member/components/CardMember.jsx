import { useState, memo } from "react";
import { useDispatch } from "react-redux";
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
import { removeMember } from "../memberSlice.js";
import DeleteMemberModal from "./DeleteMemberModal.jsx";
import EditMemberModal from "./EditMemberModal.jsx";
const MemberCard = ({ member }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModalDelete = (id) => {
    setSelectedMemberId(id);
    setIsModalDeleteOpen(true);
  };

  const handleCloseModalDelete = () => {
    setIsModalDeleteOpen(false);
    setSelectedMemberId(null);
    setAnchorEl(null);
  };

  const handleDeleteMember = () => {
    dispatch(removeMember(selectedMemberId)); // Gọi action xóa thành viên theo id
    handleCloseModalDelete();
    setAnchorEl(null);
  };

  const handlOpenEditModal = (id) => {
    setSelectedMemberId(id);
    setIsModalEditOpen(true);
  };

  const handleCloseModalEdit = () => {
    setIsModalDeleteOpen(false);
    setIsModalEditOpen(null);
    setAnchorEl(null);
  };

  return (
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
          >
            <i
              className="ri-star-fill"
              style={{ fontSize: 14, color: "#878a99" }}
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
              onClick={() => handlOpenEditModal(member._id)}
            >
              <i className="ri-pencil-line  "></i>
              Edit
            </MenuItem>
            <EditMemberModal
              isOpenEditModal={isModalEditOpen}
              handleCloseEditModal={handleCloseModalEdit}
              memberId={selectedMemberId}
            />
            <MenuItem
              className="dropdown-item"
              onClick={() => handleOpenModalDelete(member._id)}
            >
              <i className="ri-delete-bin-5-line"></i>
              Delete
            </MenuItem>
            <DeleteMemberModal
              isOpenModalDelete={isModalDeleteOpen}
              handleCloseModalDelete={handleCloseModalDelete}
              handleDeleteMember={handleDeleteMember}
            />
          </Menu>
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
  }).isRequired,
};
export default memo(MemberCard);
