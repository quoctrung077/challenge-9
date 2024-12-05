import { useState, useEffect } from "react";
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
import { addMember } from "../memberSlice.js";
import OverlayLoading from "../../../components/common/OverlayLoading.jsx";

const AddMemberModal = ({ isOpen, handleClose }) => {
  const [formAddMember, setFormAddMember] = useState({
    name: "",
    designation: "",
    isLoading: false,
    openSnackbar: false,
    snackbarMessage: "",
    isErrorName: false,
    isErrorDesignation: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormAddMember({
      name: "",
      designation: "",
      isLoading: false,
      openSnackbar: false,
      snackbarMessage: "",
      isErrorName: false,
      isErrorDesignation: false,
    });
  };

  const handleAddMember = () => {
    let hasError = false;

    // Validate name and designation
    const updatedForm = { ...formAddMember };
    if (!formAddMember.name.trim().replace(/\s+/g, " ")) {
      updatedForm.isErrorName = true;
      hasError = true;
    } else {
      updatedForm.isErrorName = false;
    }

    if (!formAddMember.designation.trim().replace(/\s+/g, " ")) {
      updatedForm.isErrorDesignation = true;
      hasError = true;
    } else {
      updatedForm.isErrorDesignation = false;
    }

    if (hasError) {
      updatedForm.snackbarMessage = "Please enter name or designation";
      updatedForm.openSnackbar = true;
      setFormAddMember(updatedForm);
      return;
    }

    // Submit form
    updatedForm.isLoading = true;
    setFormAddMember(updatedForm);

    setTimeout(() => {
      dispatch(
        addMember({
          name: formAddMember.name.trim().replace(/\s+/g, " "),
          designation: formAddMember.designation.trim().replace(/\s+/g, " "),
        })
      );
      resetForm();
      handleClose();
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setFormAddMember((prev) => ({ ...prev, openSnackbar: false }));
  };

  const handleCloseModal = () => {
    resetForm();
    handleClose();
  };

  return (
    <>
      <OverlayLoading
        isLoading={formAddMember.isLoading}
        message="Adding member..."
      />
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
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className="member-modal__avatar">
              <img
                style={{ borderRadius: "50%" }}
                src={"./images/user-dummy.jpg"}
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
                sx={{
                  "& .MuiFormHelperText-root": { marginLeft: 0 },
                }}
                fullWidth
                placeholder="Enter name"
                value={formAddMember.name}
                error={formAddMember.isErrorName}
                helperText={
                  formAddMember.isErrorName ? "Please enter a member name." : ""
                }
                onChange={(e) =>
                  setFormAddMember((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                required
              />
            </Box>
            <Box mb={3}>
              <Typography fontSize={"0.82rem"} fontWeight={500} mb={1}>
                Designation
              </Typography>
              <TextField
                sx={{
                  "& .MuiFormHelperText-root": { marginLeft: 0 },
                }}
                fullWidth
                error={formAddMember.isErrorDesignation}
                placeholder="Enter designation"
                helperText={
                  formAddMember.isErrorDesignation
                    ? "Please enter a designation."
                    : ""
                }
                value={formAddMember.designation}
                onChange={(e) =>
                  setFormAddMember((prev) => ({
                    ...prev,
                    designation: e.target.value,
                  }))
                }
                required
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Button className="btn-close" onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                className="btn-add-member"
                onClick={handleAddMember}
                disabled={formAddMember.isLoading}
              >
                Add Member
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar for displaying error message */}
      <Snackbar
        open={formAddMember.openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={formAddMember.snackbarMessage}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      />
    </>
  );
};

AddMemberModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddMemberModal;
