import React, { useState } from "react";
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
import { AppBar, useTheme, Toolbar, IconButton, InputBase, Button,Box, Typography, Menu, MenuItem, useMediaQuery,
} from "@mui/material";
import axios from 'axios';

const Navbar = ({
    isSidebarOpen,
    setIsSidebarOpen,
    onLogout
    }) => {
    const API_URL = 'http://localhost:3002';
    const theme = useTheme()
    const navigate = useNavigate();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const [user ,setUser]=useState(null);
    const userId=localStorage.getItem('userId');

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null)
    const handleLogout = () => {
        alert('Really Want to LoggedOut!!');
        localStorage.setItem('isLoggedIn',false);
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    axios.get(`http://localhost:3002/user/${userId}`)
    .then((response) => {
        if (response.status === 200) {
            const fetchedUser = response.data.data;
            setUser(fetchedUser);
        } else {
            console.log('Problem with fetching user details');
        }
    })
    .catch((error) => {
        console.log('Error fetching user details', error);
    });

    
    return (
    <AppBar sx = {{ 
        position:"static",
        background:"none",
        boxShadow:"none",
        // sticky at top
        top:'0',
        
    }}>
        <Toolbar sx={{ justifyContent:"space-between"}}>
            {/* LEFT SIDE */}
            <FlexBetween>
                <IconButton onClick = {() => setIsSidebarOpen(!isSidebarOpen)} >
                    <MenuIcon />
                </IconButton>
                {isNonMediumScreens && <FlexBetween backgroundColor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                p="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search..." />
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>}
            </FlexBetween>
            {/* RIGHT SIDE */}

            <FlexBetween gap="1.5rem">
                <IconButton >
                    {theme.palette.mode == "dark" ? (
                        <DarkModeOutlined sx={{ fontSize: "25px"}} />
                    ) : (
                        <LightModeOutlined sx={{ fontSize: "25px"}} />
                    )
                }
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{ fontSize: "25px"}} />
                </IconButton>
                <FlexBetween>
                    <Button onClick = {handleClick} 
                    sx={{ 
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textTransform: "none",
                        gap: "1rem",
                    }}>
                        <Box 
                        component="img"
                        alt="profile"
                        src={profileImage}
                        height="32px"
                        width="32px"
                        borderRadius="50%"
                        sx={{objectFit: "cover"}}
                        />
                        <Box textAlign="left">
                            <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[100]}}>
                                {user?.email}
                            </Typography>
                            <Typography  fontSize="0.75rem" sx={{ color: theme.palette.secondary[200]}}>
                                {user?.role}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined
                         sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                        />
                    </Button>
                    <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center"}} >
                        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>

        </Toolbar>

    </AppBar>
    )
}


export default Navbar;



// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// function Navbar({ onLogout}) {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>

              
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default Navbar;


// // import React from 'react'

// // const Navbar = () => {
// //   return (
// //     <div
// //         style={{
// //             width: '100%',
// //             height: '10%',
// //             border: '1px solid #ccc',
// //             borderRadius: '10px',
// //             backgroundColor: 'yellow',
// //         }}
// //     >Navbar</div>
// //   )
// // }

// // export default Navbar