import { Modal, Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DeleteProjectModal = ({
  // eslint-disable-next-line react/prop-types
  isOpenModalDelete,
  // eslint-disable-next-line react/prop-types
  handleCloseModalDelete,
  // eslint-disable-next-line react/prop-types
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
              Are you sure you want to remove this project?
            </Typography>
          </Box>
        </Box>
        <Box sx={{ p: 3 }}>
          <Box display="flex" justifyContent="center" gap={1}>
            <Button className="btn-close" onClick={handleCloseModalDelete}>
              Close
            </Button>
            <Button className="btn-add-member" onClick={handleDeleteMember}>
              Yes, Delete It!
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteProjectModal;
