import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateMember } from "../Slice/TeamSlice";

const EditMemberModal = ({
  // eslint-disable-next-line react/prop-types
  isOpenEditModal,
  // eslint-disable-next-line react/prop-types
  handleCloseEditModal,
  // eslint-disable-next-line react/prop-types
  memberId,
}) => {
  const dispatch = useDispatch();

  const teamData = useSelector((state) => state.team.teamData);

  const [memberData, setMemberData] = useState({
    name: "",
    designation: "",
  });

  useEffect(() => {
    if (memberId) {
      const memberToEdit = teamData.find((member) => member._id === memberId);
      if (memberToEdit) {
        setMemberData({
          name: memberToEdit.name,
          designation: memberToEdit.designation,
        });
      }
    }
  }, [memberId, teamData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    dispatch(updateMember({ _id: memberId, updatedData: memberData }));
    handleCloseEditModal();
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
              name="name"
              value={memberData.name}
              onChange={handleInputChange}
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
              value={memberData.designation}
              onChange={handleInputChange}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button className="btn-close" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button className="btn-add-member" onClick={handleSubmitEdit}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditMemberModal;
