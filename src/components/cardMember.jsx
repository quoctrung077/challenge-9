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
  Divider,
} from "@mui/material";

const MemberCard = ({ member }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          borderRadius: 1,
          overflow: "hidden",
          position: "relative",
          boxShadow: 2,
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
              top: 24,
              left: 24,
              backgroundColor: "white",
              width: 25,
              height: 25,
              cursor: "pointer",
            }}
          >
            <i
              className="ri-star-fill"
              style={{ fontSize: 14, color: "#878a99" }}
            ></i>
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              top: 18,
              right: 24,
              width: 25,
              height: 25,
              cursor: "pointer",
            }}
          >
            <i className="ri-more-fill"></i>
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
        <CardContent sx={{ textAlign: "center", pt: 6, pr: 3, pl: 3 }}>
          <Typography variant="h6">{member.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {member.designation}
          </Typography>
          <Box display="flex" justifyContent="space-around" mt={2} mb={2}>
            <Box textAlign="center">
              <Typography variant="body1" fontWeight="600">
                {member.projects}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Projects
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: "#ddd", borderStyle: "dashed" }}
            />
            <Box textAlign="center">
              <Typography variant="body1" fontWeight="600">
                {member.tasks}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Tasks
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              textTransform: "none",
              backgroundColor: "#f3f6f9",
              borderColor: "#f3f6f9",
              color: "black",
              "&:hover": {
                backgroundColor: "#e9ebec",
                borderColor: "#e9ebec",
              },
            }}
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
