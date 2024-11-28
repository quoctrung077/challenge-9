import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { addMember } from "../memberSlice";
import OverlayLoading from "../../../components/common/OverlayLoading";

const AddMemberModal = ({ isOpen, handleClose }) => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const dispatch = useDispatch();

  const handleAddMember = () => {
    if (name && designation) {
      setIsloading(true);
      setTimeout(() => {
        dispatch(addMember({ name, designation }));
        setName("");
        setDesignation("");
        handleClose();
        setIsloading(false);
      }, 2000);
    } else {
      setSnackbarMessage("Please enter name and designation");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <OverlayLoading
        isLoading={isLoading}
        message="Adding member..."
      ></OverlayLoading>
      <Modal open={isOpen} onClose={handleClose}>
        <Box
          className="member-modal__container"
          sx={{ bgcolor: "background.paper", boxShadow: 24, borderRadius: 2 }}
        >
          {/* Header */}
          <Box className="member-modal__header">
            <Box sx={{ position: "absolute", left: 20, top: 15 }}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "1rem", color: "#fff" }}
              >
                Add New Members
              </Typography>
            </Box>
            <Box sx={{ position: "absolute", right: 10, top: 10 }}>
              <IconButton
                sx={{
                  backgroundColor: "white",
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                }}
              >
                <i style={{ fontSize: "1rem" }} className="ri-image-fill"></i>
              </IconButton>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className="member-modal__avatar">
              <img
                style={{ borderRadius: "50%" }}
                src={"./src/assets/images/user-dummy.jpg"}
                alt=""
              />
              <Box
                className="add-avatar-icon"
                sx={{ position: "absolute", bottom: -11, right: -8 }}
              >
                <i className="ri-image-fill"></i>
              </Box>
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ p: 3, mt: 5 }}>
            <Box mb={3}>
              <Typography fontSize={"0.82rem"} fontWeight={500} mb={1}>
                Name
              </Typography>
              <TextField
                className="text-field"
                fullWidth
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Box>
            <Box mb={3}>
              <Typography fontSize={"0.82rem"} fontWeight={500} mb={1}>
                Designation
              </Typography>
              <TextField
                className="text-field"
                fullWidth
                placeholder="Enter designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Button className="btn-close" onClick={handleClose}>
                Close
              </Button>
              <Button
                className="btn-add-member"
                onClick={handleAddMember}
                disabled={isLoading}
              >
                Add Member
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar for displaying error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      />
    </>
  );
};

AddMemberModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default AddMemberModal;
