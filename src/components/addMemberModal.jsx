import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { addMember } from "../Slice/TeamSlice";

// eslint-disable-next-line react/prop-types
const AddMemberModal = ({ isOpen, handleClose }) => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const dispatch = useDispatch();

  const handleAddMember = () => {
    if (name && designation) {
      dispatch(addMember({ name, designation }));
      handleClose();
    } else {
      alert("Please enter name and designation");
    }
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        className="add-member-modal__container"
        sx={{ bgcolor: "background.paper", boxShadow: 24, borderRadius: 2 }}
      >
        {/* Header */}
        <Box className="add-member-modal__header">
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
          <Box className="add-member-modal__avatar">
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
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button className="btn-close" onClick={handleClose}>
              Close
            </Button>
            <Button className="btn-add-member" onClick={handleAddMember}>
              Add Member
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddMemberModal;
