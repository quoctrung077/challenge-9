import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useState } from "react";

const EditMemberModal = ({
  isOpenEditModal,
  handleCloseEditModal,
  handleSubmitEdit,
  handleInputChange,
  memberData,
}) => {
  const [errors, setErrors] = useState({ name: "", designation: "" });

  const validateFields = () => {
    const nameError = !memberData.name.trim() ? "Name cannot be empty." : "";
    const designationError = !memberData.designation.trim()
      ? "Designation cannot be empty."
      : "";

    setErrors({ name: nameError, designation: designationError });
    return !nameError && !designationError;
  };

  const handleSave = () => {
    if (validateFields()) {
      handleSubmitEdit();
    }
  };

  return (
    <Modal open={isOpenEditModal || false} onClose={handleCloseEditModal}>
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
              Edit Member
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
            <IconButton onClick={handleCloseEditModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className="member-modal__avatar">
            <img
              style={{ borderRadius: "50%" }}
              src={"./images/user-dummy.jpg"}
              alt="avatar"
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
              name="name"
              value={memberData.name || ""}
              onChange={handleInputChange}
              required
              error={!!errors.name}
              helperText={errors.name}
            />
          </Box>
          <Box mb={3}>
            <Typography fontSize={"0.82rem"} fontWeight={500} mb={1}>
              Designation
            </Typography>
            <TextField
              className="text-field"
              fullWidth
              name="designation"
              value={memberData.designation || ""}
              onChange={handleInputChange}
              required
              error={!!errors.designation}
              helperText={errors.designation}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button className="btn-close" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button
              className="btn-add-member"
              onClick={handleSave}
              disabled={
                !memberData.name.trim() || !memberData.designation.trim()
              }
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

EditMemberModal.propTypes = {
  isOpenEditModal: PropTypes.bool.isRequired,
  handleCloseEditModal: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  memberData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditMemberModal;
