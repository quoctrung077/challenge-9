import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { DashboardMenu } from "../_mock/routers";
import images from "../assets/images";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ collapsed }) => {
  const [open, setOpen] = useState({});

  const handleClick = (menu) => {
    setOpen((prevOpen) => ({ ...prevOpen, [menu]: !prevOpen[menu] }));
  };

  const firstHalf = DashboardMenu.slice(0, 1);
  const secondtHalf = DashboardMenu.slice(1, 2);

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#3a4b7c",
      marginLeft: 0,
    },
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 70 : 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? 70 : 240,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#3a4b7c",
          color: "#fff",
        },
      }}
    >
      {!collapsed ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "70px",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <img src={images.logo} alt="logo" style={{ width: "100px" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "70px",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <img src={images.logoSm} alt="logo" style={{ width: "22px" }} />
        </Box>
      )}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Typography
          sx={{
            padding: "12px 20px",
            color: "#838fb9",
            fontSize: "11px",
            fontWeight: "700",
            display: collapsed ? "none" : "block",
          }}
        >
          MENU
        </Typography>

        {!collapsed ? (
          <List>
            {DashboardMenu.map((item, index) => (
              <div key={index}>
                <ListItem
                  button
                  onClick={() => (item.secondary ? handleClick(index) : null)}
                  component={item.secondary ? null : Link}
                  to={item.path || "#"}
                  sx={{
                    color: "#abb9e8",
                    "&:hover": {
                      color: "#fff",
                      "& .MuiListItemIcon-root": { color: "#fff" },
                      "& .MuiListItemText-root .MuiTypography-root": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "1.75rem", color: "#abb9e8" }}>
                    <i className={item.icon}></i>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px",
                        color: "#abb9e8",
                        display: collapsed ? "none" : "block",
                      },
                    }}
                  />
                  {item.secondary ? (
                    open[index] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </ListItem>

                {item.secondary && (
                  <Collapse in={open[index]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.secondary.map((subItem, subIndex) => (
                        <ListItem
                          button
                          key={subIndex}
                          component={Link}
                          to={subItem.path}
                          sx={{
                            pl: 2,
                            color: "#abb9e8",
                            "&:hover": {
                              color: "#fff",
                              "& .MuiListItemIcon-root": { color: "#fff" },
                              "& .MuiListItemText-root .MuiTypography-root": {
                                color: "#fff",
                              },
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{ minWidth: "1.75rem", color: "#abb9e8" }}
                          >
                            <i
                              className={subItem.icon}
                              style={{ width: "3px" }}
                            ></i>
                          </ListItemIcon>
                          <ListItemText
                            primary={subItem.title}
                            sx={{
                              ".MuiTypography-root": {
                                fontSize: "15px",
                                color: "#abb9e8",
                                display: collapsed ? "none" : "block",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
          </List>
        ) : (
          <List>
            {firstHalf.map((item, index) => (
              <div key={index}>
                <ListItem
                  button
                  component={item.secondary ? null : Link}
                  to={item.path || "#"}
                  sx={{
                    paddingLeft: "5px",
                    color: "#abb9e8",
                    "&:hover": {
                      color: "#fff",
                      "& .MuiListItemIcon-root": { color: "#fff" },
                      "& .MuiListItemText-root .MuiTypography-root": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <CustomTooltip
                    sx={{
                      backgroundColor: "#fff",
                    }}
                    title={
                      <List>
                        {firstHalf.map((item) => (
                          <div key={item.title}>
                            {" "}
                            {/* Giả sử title là duy nhất */}
                            <ListItem
                              button
                              component={item.secondary ? "div" : Link}
                              to={item.path || "#"}
                              sx={{
                                color: "#abb9e8",
                                "&:hover": {
                                  color: "#fff",
                                  "& .MuiListItemIcon-root": { color: "#fff" },
                                  "& .MuiListItemText-root .MuiTypography-root":
                                    { color: "#fff" },
                                },
                              }}
                            >
                              <ListItemText
                                primary={item.title}
                                sx={{
                                  ".MuiTypography-root": {
                                    fontSize: "15px",
                                    color: "#abb9e8",
                                  },
                                }}
                              />

                              {item.secondary && <ExpandMore />}
                            </ListItem>
                            {item.secondary && (
                              <List component="div" disablePadding>
                                {item.secondary.map((subItem) => (
                                  <ListItem
                                    button
                                    key={subItem.title}
                                    component={Link}
                                    to={subItem.path}
                                    sx={{
                                      pl: 2,
                                      color: "#abb9e8",
                                      "&:hover": {
                                        color: "#fff",
                                        "& .MuiListItemIcon-root": {
                                          color: "#fff",
                                        },
                                        "& .MuiListItemText-root .MuiTypography-root":
                                          {
                                            color: "#fff",
                                          },
                                      },
                                    }}
                                  >
                                    <ListItemIcon
                                      sx={{
                                        minWidth: "1.75rem",
                                        color: "#abb9e8",
                                      }}
                                    >
                                      <i
                                        className={subItem.icon}
                                        style={{ width: "3px" }}
                                      ></i>
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={subItem.title}
                                      sx={{
                                        ".MuiTypography-root": {
                                          fontSize: "15px",
                                          color: "#abb9e8",
                                        },
                                      }}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            )}
                          </div>
                        ))}
                      </List>
                    }
                    placement="right-end"
                  >
                    <ListItemIcon
                      sx={{
                        display: "flex",
                        justifyContent: "center  ",
                        color: "#abb9e8",
                        fontSize: "22px",
                      }}
                    >
                      <i className={item.icon}></i>
                    </ListItemIcon>
                  </CustomTooltip>
                </ListItem>
              </div>
            ))}
            {secondtHalf.map((item, index) => (
              <div key={index}>
                <ListItem
                  button
                  component={item.secondary ? null : Link}
                  to={item.path || "#"}
                  sx={{
                    paddingLeft: "5px",
                    color: "#abb9e8",
                    "&:hover": {
                      color: "#fff",
                      "& .MuiListItemIcon-root": { color: "#fff" },
                      "& .MuiListItemText-root .MuiTypography-root": {
                        color: "#fff",
                      },
                    },
                  }}
                >
                  <CustomTooltip
                    title={
                      <List>
                        {secondtHalf.map((item, index) => (
                          <div key={index}>
                            <Box>{item.title}</Box>
                          </div>
                        ))}
                      </List>
                    }
                    placement="right-end"
                  >
                    <ListItemIcon
                      sx={{
                        display: "flex",
                        justifyContent: "center  ",
                        color: "#abb9e8",
                        fontSize: "22px",
                      }}
                    >
                      <i className={item.icon}></i>
                    </ListItemIcon>
                  </CustomTooltip>
                </ListItem>
              </div>
            ))}
          </List>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
