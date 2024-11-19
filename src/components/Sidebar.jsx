import { useState, useMemo } from "react";
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
const Sidebar = ({ isSidebarCollapsed }) => {
  const [open, setOpen] = useState({});

  const handleClick = (menu) => {
    setOpen((prevOpen) => ({ ...prevOpen, [menu]: !prevOpen[menu] }));
  };

  const DrawerList = useMemo(() => {
    const firstHalf = DashboardMenu.slice(0, 1);
    const secondHalf = DashboardMenu.slice(1, 2);

    const CustomTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} classes={{ popper: className }} />
    ))({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#3a4b7c",
        marginLeft: 0,
      },
    });

    return (
      <>
        {!isSidebarCollapsed ? (
          <Box className="sidebar__logo">
            <img src={images.logo} alt="logo" style={{ width: "100px" }} />
          </Box>
        ) : (
          <Box className="sidebar__logo">
            <img src={images.logoSm} alt="logo" style={{ width: "22px" }} />
          </Box>
        )}
        <Box className="sidebar-menu__container">
          <Typography
            className="sidebar__title"
            sx={{
              display: isSidebarCollapsed ? "none" : "block",
            }}
          >
            MENU
          </Typography>

          {!isSidebarCollapsed ? (
            <List>
              {DashboardMenu.map((item, index) => (
                <div key={index}>
                  <ListItem
                    className="sidebar__item"
                    button
                    onClick={() => (item.secondary ? handleClick(index) : null)}
                    component={item.secondary ? null : Link}
                    to={item.path || "#"}
                  >
                    <ListItemIcon
                      sx={{ minWidth: "1.75rem", color: "#abb9e8" }}
                    >
                      <i className={item.icon}></i>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      className="MuiTypography-root "
                      sx={{
                        ".MuiTypography-root": {
                          display: isSidebarCollapsed ? "none" : "block",
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
                            className="sidebar__item"
                            button
                            key={subIndex}
                            component={Link}
                            to={subItem.path}
                            sx={{
                              pl: 2,
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
                              className="MuiTypography-root "
                              sx={{
                                ".MuiTypography-root": {
                                  display: isSidebarCollapsed
                                    ? "none"
                                    : "block",
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
                    className="sidebar__item"
                    button
                    component={item.secondary ? null : Link}
                    to={item.path || "#"}
                    sx={{
                      paddingLeft: "5px",
                    }}
                  >
                    <CustomTooltip
                      title={
                        <List>
                          {firstHalf.map((item) => (
                            <div key={item.title}>
                              <ListItem
                                className="sidebar__item"
                                button
                                component={item.secondary ? "div" : Link}
                                to={item.path || "#"}
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
                                      className="sidebar__item2"
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
                          justifyContent: "center",
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
              {secondHalf.map((item, index) => (
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
                          {secondHalf.map((item, index) => (
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
                          justifyContent: "center",
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
      </>
    );
  }, [isSidebarCollapsed, open]); // Recalculate only when 'isSidebarCollapsed' or 'open' changes

  return (
    <Drawer
      className="sidebar__container"
      variant="permanent"
      sx={{
        width: isSidebarCollapsed ? 70 : 240,
        "& .MuiDrawer-paper": {
          width: isSidebarCollapsed ? 70 : 240,
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
};

export default Sidebar;
