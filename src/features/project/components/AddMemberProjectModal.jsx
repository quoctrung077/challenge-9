import { useSelector } from "react-redux";
import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Button,
  InputBase,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  "@media (max-width: 600px)": {
    width: "380px",
  },
};
import PropTypes from "prop-types";

const AddMemberProjectModal = ({ open, handleClose, handleInvite }) => {
  const MemberData = useSelector((state) => state.team.MemberData);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = MemberData.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = (member) => {
    const isMemberSelected = selectedMembers.some((m) => m._id === member._id);
    if (isMemberSelected) {
      setSelectedMembers(selectedMembers.filter((m) => m._id !== member._id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleModalClose = () => {
    // setSelectedMembers([]);
    handleClose();
  };

  const handleInviteClick = () => {
    handleInvite(selectedMembers);
    handleModalClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box sx={style}>
        <Box className="add-member-modal__header">
          <Typography className="add-member-modal__header-title">
            Members
          </Typography>
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box p={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #DDD",
              width: "100%",
              borderRadius: "0.25rem",
              padding: "0.25rem",
              backgroundColor: "#f3f6f9",
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
              width="100%"
              placeholder="Search here ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography className="create-project__form-title">
              Members
            </Typography>
            <Box sx={{ display: "flex", ml: 2 }}>
              {selectedMembers.map((member) => (
                <Tooltip
                  key={member._id}
                  title={member.name}
                  arrow
                  placement="top"
                >
                  <Avatar
                    sx={{ width: "32px", height: "32px" }}
                    src={member.profileImage}
                    alt={member.name}
                    className="team-members__avatar"
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
          <List sx={{ overflow: "auto", maxHeight: "300px" }}>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <ListItem key={member._id} sx={{ mb: 1 }}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ width: "32px", height: "32px" }}
                      src={member.profileImage}
                      alt={member.name}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ fontSize: "13px", fontWeight: "500" }}
                    primary={member.name}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      sx={{
                        fontSize: "11px",
                        color: "black",
                        backgroundColor: selectedMembers.find(
                          (m) => m._id === member._id
                        )
                          ? "#9e9e9e"
                          : "#e0e0e0",
                      }}
                      onClick={() => handleAddMember(member)}
                    >
                      {selectedMembers.find((m) => m._id === member._id)
                        ? "Added"
                        : "Add"}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <Typography
                sx={{ textAlign: "center", width: "100%", color: "#878a99" }}
              >
                No members found.
              </Typography>
            )}
          </List>
        </Box>

        <Box
          sx={{
            mt: 2,
            mb: 2,
            pl: 2,
            pr: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button className={"btn__cancel"} onClick={handleModalClose}>
            Cancel
          </Button>
          <Button className="btn__invite" onClick={handleInviteClick}>
            Invite
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

AddMemberProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleInvite: PropTypes.func.isRequired,
};

export default AddMemberProjectModal;
