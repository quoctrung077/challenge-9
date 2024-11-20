import { memo } from "react";
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
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const MemberCard = ({ member }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
          boxShadow: 3,
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
              top: 8,
              left: 8,
              backgroundColor: "white",
              width: 30,
              height: 30,
            }}
          >
            <StarIcon color="warning" />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "white",
              width: 30,
              height: 30,
            }}
          >
            <MoreVertIcon />
          </IconButton>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              position: "absolute",
              bottom: -30,
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
        <CardContent sx={{ textAlign: "center", pt: 5 }}>
          <Typography variant="h6">{member.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {member.designation}
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={2} mb={2}>
            <Typography variant="body2">{member.projects} Projects</Typography>
            <Typography variant="body2">{member.tasks} Tasks</Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            sx={{ textTransform: "none" }}
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
    name: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    profileImage: PropTypes.string,
    backgroundImage: PropTypes.string.isRequired,
    projects: PropTypes.number.isRequired,
    tasks: PropTypes.number.isRequired,
  }).isRequired,
};
export default memo(MemberCard);
