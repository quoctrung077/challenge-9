import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  TextField,
  Chip,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../projectSlice.js";
import { Editor } from "@tinymce/tinymce-react";
import AddMemberProjectModal from "./AddMemberProjectModal";
import OverlayLoading from "../../../components/common/OverlayLoading.jsx";

const FileUpload = ({ files, handleFileChange, handleDelete }) => {
  return (
    <>
      <Typography className="create-project__form-title-add">
        Add Attached files here.
      </Typography>
      <Box
        sx={{
          border: "1px dashed grey",
          p: 3,
          mb: 2,
          textAlign: "center",
          cursor: "pointer",
          borderRadius: 2,
          backgroundColor: "#fff",
          minHeight: 150,
        }}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
          <i className="ri-upload-cloud-2-fill" data-metatip="true"></i>
          <Typography className="attached-file-text">
            Drop files here or click to upload.
          </Typography>
        </label>
      </Box>
      <Box>
        {files.map((file, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              p: 1,
              boxShadow: 2,
            }}
          >
            <CardMedia
              sx={{ width: 40, height: 40 }}
              image={file.url}
              alt={file.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="body1">{file.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {file.size} MB
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                sx={{ color: "#fff", backgroundColor: "#f44336" }}
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

const FormCreateProject = () => {
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teamLead, setTeamLead] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Inprogress");
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");
  const [privacy, setPrivacy] = useState("Private");
  const [categories, setCategories] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const allMembers = useSelector((state) => state.team.MemberData);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).map((file) => ({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1), // Convert to MB
      url: URL.createObjectURL(file), // Temporary URL for preview
      type: file.type,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate("/apps-projects-list");
      const newProject = {
        projectTitle,
        thumbnailImage: fileName,
        projectDescription,
        priority,
        status,
        deadline,
        startDate,
        isFavourite,
        attachedFiles: files.map((file) => file.name),
        privacy: { status: privacy },
        tags: {
          categories,
          skills,
        },
        members: {
          teamLead,
          teamMembers: selectedMembers.map((member) => member.name),
        },
      };

      dispatch(addProject(newProject));

      setProjectTitle("");
      setProjectDescription("");
      setPriority("Medium");
      setStatus("Inprogress");
      setDeadline("");
      setSkills([]);
      setTeamLead("");
      setSelectedMembers([]);
      setFileName("No file chosen");
      setPrivacy("Private");
      setCategories("");
      setIsFavourite(false);
      setFiles([]);
      setIsLoading(false);
    }, 2000);
  };

  const handleFileThumbnailChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "No file chosen");
  };

  const handleOpen = () => setIsOpenModal(true);
  const handleClose = () => setIsOpenModal(false);
  const handleAddSkill = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setSkills([...skills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleTeamLeadChange = (event) => {
    setTeamLead(event.target.value);
  };

  const handleDeleteSkillWithKey = (event) => {
    if (
      (event.key === "Backspace" || event.key === "Delete") &&
      inputValue === "" &&
      skills.length > 0
    ) {
      setSkills(skills.slice(0, -1));
    }
  };

  const handleInvite = (members) => {
    setSelectedMembers(members);
  };
  return (
    <form className="create-project__form" onSubmit={handleSubmit}>
      <Box className="create-project__form-left">
        <Box className="create-project__background">
          <Box className="create-project__wrapper" mb={2}>
            <Typography className="create-project__form-title">
              Project Title
            </Typography>
            <TextField
              className="create-project__form-input"
              name="title"
              placeholder=" Enter project title"
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: "white" }}
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              required
            />
          </Box>
          <Box className="create-project__wrapper" mb={2}>
            <Typography className="create-project__form-title">
              Thumbnail Image
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              border="1px solid #e0e0e0"
              borderRadius="4px"
              width="100%"
            >
              <Button
                variant="contained"
                component="label"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#f3f3f9 ",
                  color: "#000",
                  fontWeight: "normal",
                  padding: "8px 14.4px",
                  boxShadow: "none",
                  border: "1px solid #e0e0e0",
                  borderRadius: "4px",
                  fontSize: "13px",
                  width: "15%",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                  "@media (max-width: 600px)": {
                    width: "41%",
                  },
                }}
              >
                Choose File
                <input
                  type="file"
                  hidden
                  onChange={handleFileThumbnailChange}
                />
              </Button>
              <TextField
                variant="standard"
                value={fileName}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                  sx: { fontSize: "0.875rem", color: "#757575" },
                }}
                fullWidth
                required
              />
            </Box>
          </Box>
          <Box className="create-project__wrapper" mb={2}>
            <Typography className="create-project__form-title">
              Project Description
            </Typography>
            <Editor
              apiKey="gctgj2wo35qyyswgyqbfdgrl5h6nwflxgyrz8hvr4ci50wmc"
              initialValue="<p>Enter project details here...</p>"
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              }}
              value={projectDescription}
              onEditorChange={(newDescription) =>
                setProjectDescription(newDescription)
              }
            />
          </Box>
          <Grid className="create-project__wrapper" container spacing={2}>
            <Grid item xs={4}>
              <Typography className="create-project__form-title">
                Priority
              </Typography>
              <TextField
                className="create-project__form-input"
                select
                defaultValue="Medium"
                name="priority"
                fullWidth
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <Typography className="create-project__form-title">
                Status
              </Typography>
              <TextField
                className="create-project__form-input"
                select
                defaultValue="Inprogress"
                name="status"
                fullWidth
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <MenuItem value="Inprogress">Inprogress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <Typography className="create-project__form-title">
                Deadline
              </Typography>
              <TextField
                className="create-project__form-input"
                type="date"
                name="deadline"
                inputLabelProps={{ shrink: true }}
                inputProps={{ placeholder: "Enter due date" }}
                fullWidth
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </Grid>
          </Grid>
        </Box>
        <Box mt={3} className="create-project__background">
          <Typography className="create-project__form-text">
            Attached files
          </Typography>
          <FileUpload
            files={files}
            handleFileChange={handleFileChange}
            handleDelete={handleDelete}
          />
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
          className="btn-form-desktop__container"
        >
          <Button
            onClick={() => window.history.back()}
            className="btn-form__cancel"
          >
            Cancel
          </Button>
          <Button type="submit" className="btn__create">
            Create
          </Button>
        </Box>
      </Box>
      <Box className="create-project__form-right">
        <Box className="create-project__background">
          <Typography className="create-project__form-text">Privacy</Typography>
          <Box className="create-project__wrapper">
            <Typography className="create-project__form-title">
              Status
            </Typography>
            <TextField
              className="create-project__form-input"
              select
              defaultValue="Private"
              name="priority"
              fullWidth
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              required
            >
              <MenuItem value="Private">Private</MenuItem>
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Team">Team</MenuItem>
            </TextField>
          </Box>
        </Box>
        <Box mt={3} className="create-project__background">
          <Typography className="create-project__form-text">Tags</Typography>
          <Box className="create-project__wrapper">
            <Box mb={2}>
              <Typography className="create-project__form-title">
                Categories
              </Typography>
              <TextField
                className="create-project__form-input"
                select
                defaultValue="Development"
                name="categories"
                fullWidth
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                required
              >
                <MenuItem value="Designing">Designing</MenuItem>
                <MenuItem value="Development">Development</MenuItem>
              </TextField>
            </Box>
            <Box>
              <Typography className="create-project__form-title">
                Skills
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 0.5,
                  border: "1px solid #c4c4c4",
                  borderRadius: "4px",
                  padding: "6px 14.4px",
                  fontSize: "13px",
                }}
              >
                {skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    sx={{
                      backgroundColor: "#405189",
                      color: "white",
                      height: "23px",
                    }}
                  />
                ))}
                <TextField
                  variant="standard"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    handleAddSkill(e);
                    handleDeleteSkillWithKey(e);
                  }}
                  sx={{
                    flexGrow: 1,
                    ".MuiInputBase-input": { padding: "0" },
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt={3} className="create-project__background">
          <Typography className="create-project__form-text">Member</Typography>
          <Box className="create-project__wrapper">
            <Typography className="create-project__form-title">
              Team Lead
            </Typography>
            <TextField
              className="create-project__form-input"
              select
              required
              name="TeamLead"
              fullWidth
              value={teamLead}
              onChange={handleTeamLeadChange}
            >
              {allMembers.map((member) => (
                <MenuItem
                  sx={{ overflow: "scroll-hidden" }}
                  key={member._id}
                  value={member._id}
                >
                  {member.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box className="create-project__wrapper">
            <Typography className="create-project__form-title">
              Team Members
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

              <Tooltip title="Add member" arrow placement="top">
                <Box
                  onClick={handleOpen}
                  className="team-members__add"
                  sx={{ bgcolor: "primary.main" }}
                >
                  +
                </Box>
              </Tooltip>
              <AddMemberProjectModal
                open={isOpenModal}
                handleClose={handleClose}
                handleInvite={handleInvite}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            mb: 2,
            pl: 2,
            pr: 2,
            display: "none",
            justifyContent: "flex-end",
          }}
          className="btn-form-mobile__container"
        >
          <Button
            onClick={() => window.history.back()}
            className="btn-form__cancel"
          >
            Cancel
          </Button>
          <Button type="submit" className="btn__create">
            Create
          </Button>
        </Box>
      </Box>
      <OverlayLoading isLoading={isLoading} message={"Creating project..."} />
    </form>
  );
};

const CreateProject = () => {
  return (
    <Box className="create-project__container">
      {/* Breadcrumbs */}
      <Box className="breadcrumb__container">
        <Typography
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#495057",
          }}
        >
          Projects List
        </Typography>
        <Breadcrumbs separator=">" aria-label="breadcrumb">
          <Link underline="hover" color="#212529" href="#">
            Projects
          </Link>
          <Typography underline="hover" color="inherit">
            Projects List
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box p={3} className="create-project__body">
        <FormCreateProject />
      </Box>
    </Box>
  );
};

FileUpload.propTypes = {
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CreateProject;
