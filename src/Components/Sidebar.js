import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Typography,
  useTheme,
  ClickAwayListener,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  AddBox,
  ConfirmationNumber,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import axios from "axios";

const navItems = [
  {
    text: "DashBoard",
    component: "dashboard",
    icon: <ShoppingCartOutlined />,
    roles: ["admin", "agent"],
  },
  {
    text: "My Tickets",
    component: "userdashboard",
    icon: <ConfirmationNumber />,
    roles: ["basic", "agent"],
  },
  {
    text: "Create Ticket",
    component: "createticket",
    icon: <AddBox />,
    roles: ["basic", "agent"],
  },
  {
    text: "Users",
    component: "users1",
    icon: null,
    roles: ["admin"],
  },
  {
    text: "Users",
    component: "users",
    icon: <Groups2Outlined />,
    roles: ["admin"],
  },
  {
    text: "",
    component: "dummy",
    icon: null,
    roles: ["admin", "agent"],
  },
  {
    text: "Manage",
    component: "manage",
    icon: null,
    roles: ["admin", "agent"],
  },
  {
    text: "Daily",
    component: "daily",
    icon: <TodayOutlined />,
    roles: ["admin", "agent"],
  },
  {
    text: "Monthly",
    component: "monthly",
    icon: <CalendarMonthOutlined />,
    roles: ["admin", "agent"],
  },
  {
    text: "Breakdown",
    component: "breakdown",
    icon: <PieChartOutlined />,
    roles: ["admin", "agent"],
  },
  {
    text: "Management",
    component: "management",
    icon: null,
    roles: ["admin", "agent"],
  },
  {
    text: "Admin",
    component: "admin",
    icon: <AdminPanelSettingsOutlined />,
    roles: ["admin"],
  },
  {
    text: "Performance",
    component: "performance",
    icon: <TrendingUpOutlined />,
    roles: ["admin", "agent"],
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const userRole = localStorage.getItem("userRole");
  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole)
  );
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("userId");

  const handleCloseSidebar = () => {
    if (!isNonMobile) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          const fetchedUser = response.data.data;
          setUser(fetchedUser);
        } 
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [userId]);

  return (
    <Box>
      {isSidebarOpen && (
        <ClickAwayListener onClickAway={handleCloseSidebar}>
          <Drawer
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                color: theme.palette.secondary[200],
                boxSizing: "border-box",
                borderWidth: isNonMobile ? 0 : "2px",
                width: drawerWidth,
                borderRightWidth: "1px",
              },
            }}
          >
            <Box width="100%">
              <Box m="1.5rem 2rem 2rem 3rem">
                <FlexBetween color={theme.palette.secondary.main}>
                  <Box display="flex" alignItems="center" gap="0.5rem">
                    <Typography variant="h4" fontWeight="bold">
                      Ticketstm
                    </Typography>
                  </Box>
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                </FlexBetween>
              </Box>

              <List>
                {filteredNavItems.map(({ text, icon, component }) => {
                  if (!icon) {
                    return (
                      <Typography
                        key={component}
                        sx={{ m: "2.25rem 0 1rem 3rem" }}
                      >
                        {text}
                      </Typography>
                    );
                  }

                  const lcText = component.toLowerCase();

                  return (
                    <ListItem key={component} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                          handleCloseSidebar();
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText ? "#E4E5E3" : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Drawer>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default Sidebar;