import React, { useState, useEffect } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,

} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "../assets/profile.png";
import {
  AppBar,
  useTheme,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
  useMediaQuery,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useActiveLink } from './ActiveLinkContext';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, onLogout }) => {
  const API_URL = process.env.API_URL;
  const theme = useTheme();
  const navigate = useNavigate();

  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const isNotMobile = useMediaQuery("(min-width:600px)");
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateFirstName, setUpdateFirstName] = useState("");
  const [updateLastName, setUpdateLastName] = useState("");
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(true);

  const { setActiveLink } = useActiveLink();

  const handleGetStartedClick = () => {
    setActiveLink('');
  };


  //Handle Logout and navigate to / route.
  const handleLogout = () => {
    alert("Really Want to LoggedOut!!");
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("accessToken");
    handleGetStartedClick();
    navigate("/");
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setUpdateFirstName(user?.firstname || "");
    setUpdateLastName(user?.lastname || "");
    setIsUpdateButtonDisabled(true);
    
  };

  const handleFirstNameChange = (e) => {
    setUpdateFirstName(e.target.value);
    setIsUpdateButtonDisabled(false);
  };

  const handleLastNameChange = (e) => {
    setUpdateLastName(e.target.value);
    setIsUpdateButtonDisabled(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };



  const handleUpdateDetails = () => {
    const token = localStorage.getItem('accessToken')
    const requestBody = new URLSearchParams();
    requestBody.append('firstname', updateFirstName);
    requestBody.append('lastname', updateLastName);

    // Make the API request to update the specified field
    fetch(`http://localhost:3002/user/details/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`
      },
      body: requestBody.toString()
    })
      .then(response => response.json())
      .then(data => {
        toast.success("Information updated successfully!", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(error => {
        console.error("Error updating user:", error);

      });
  };

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3002/user/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            const fetchedUser = response.data.data;
            setUser(fetchedUser);
            console.log(fetchedUser);
          } else {
            console.log("Problem with fetching user details");
          }
        })
        .catch((error) => {
          console.log("Error fetching user details", error);
        });
    }
  }, [userId]);


  return (
    <Grid container  >


      <AppBar
        sx={{
          position: "static",
          background: "none",
          boxShadow: "none",
          // sticky at top
          top: "0",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* LEFT SIDE */}
          <FlexBetween>

            {!isSidebarOpen && (
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <MenuIcon />
              </IconButton>
            )}
            {/*             
            <Button variant="text" onClick={() => navigate(-1)}>
              Back
            </Button> */}

            {isNonMediumScreens && (
              <FlexBetween
                backgroundColor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                p="0.1rem 1.5rem"
              >

                <InputBase placeholder="Search..." />
                <IconButton>
                  <Search />
                </IconButton>
              </FlexBetween>
            )}
          </FlexBetween>
          {/* RIGHT SIDE */}

          <FlexBetween gap="1.5rem">
            <IconButton>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton onClick={handleOpenDialog}>
              <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>
            <FlexBetween>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />

                {isNotMobile && (
                  <Box textAlign="left">
                    <Typography
                      fontWeight="bold"
                      fontSize="0.85rem"
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      {user?.email}
                    </Typography>
                    <Typography
                      fontSize="0.75rem"
                      sx={{ color: theme.palette.secondary[200] }}
                    >
                      {user?.role}
                    </Typography>
                  </Box>
                )}

                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </FlexBetween>
          </FlexBetween>
        </Toolbar>

        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          PaperProps={{
            style: {
              widows: '100%',
              height: "70vh",
            },
          }}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <DialogTitle>Update User Details</DialogTitle>

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  value={updateFirstName}
                  onChange={handleFirstNameChange}
                  fullWidth
                  sx={{ mt: '10px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  value={updateLastName}
                  onChange={handleLastNameChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  value={user?.email}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Role"
                  variant="outlined"
                  value={user?.role}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="flex-end" spacing={2}>
                  <Grid item>
                    <Button variant="outlined" onClick={handleCloseDialog}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      disabled={isUpdateButtonDisabled}
                      onClick={handleUpdateDetails}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        <ToastContainer />
      </AppBar>
    </Grid>
  );
};

export default Navbar;
