import { Modal, Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const DeleteMemberModal = ({
  isOpenModalDelete,
  handleCloseModalDelete,
  handleDeleteMember,
}) => {
  return (
    <Modal open={isOpenModalDelete} onClose={handleCloseModalDelete}>
      <Box className="delete-member-modal__container">
        <Box className="delete-member-modal__header">
          <IconButton onClick={handleCloseModalDelete}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className="delete-member-modal__body">
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#f7b84b,secondary:#f06548"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
          <Box className="delete-member-modal__body-text">
            <Typography className="delete-member-modal__body-text-title">
              Are You sure ?
            </Typography>
            <Typography className="delete-member-modal__body-text-description">
              Are you sure you want to remove this member?
            </Typography>
          </Box>
        </Box>
        <Box sx={{ p: 3 }}>
          <Box display="flex" justifyContent="center" gap={1}>
            <Button className="btn-close" onClick={handleCloseModalDelete}>
              Close
            </Button>
            <Button className="btn-delete-member" onClick={handleDeleteMember}>
              Yes, Delete It!
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

DeleteMemberModal.propTypes = {
  isOpenModalDelete: PropTypes.bool.isRequired,
  handleCloseModalDelete: PropTypes.func,
  handleDeleteMember: PropTypes.func,
};

export default DeleteMemberModal;
