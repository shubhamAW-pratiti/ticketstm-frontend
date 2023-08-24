import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  Drawer,
  ListItem,
  ListItemText,
  Box,
  Button,
  Divider
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import { ChevronLeft } from '@mui/icons-material';
import './HomeNavbar.css';


export default function HomeNavbar() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const drawer = (
    <Box width="100%">
      <Box m="1rem 1rem 1rem 1rem">
        <FlexBetween color={theme.palette.secondary.main}>
          <Box display="flex" alignItems="center" gap="0.5rem">
            <Typography variant="h4" fontWeight="bold">
              Ticketstm
            </Typography>
          </Box>
          <IconButton onClick={handleCloseDrawer}>
            <ChevronLeft />
          </IconButton>
        </FlexBetween>
      </Box>
      <Divider />
      <Box m="1rem 1rem 1rem 4rem">
        <List>
          <ListItem onClick={handleCloseDrawer}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <ListItemText primary="Home" />
            </Link>
          </ListItem>
          <ListItem onClick={handleCloseDrawer}>
            <Link to="/loginform" style={{ textDecoration: 'none' }}>
              <ListItemText primary="Login" />
            </Link>
          </ListItem>
          <ListItem onClick={handleCloseDrawer}>
            <Link to="/signupform" style={{ textDecoration: 'none' }}>
              <ListItemText primary="SignUp" />
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <React.Fragment>
      {isMobile ? (
        <AppBar position="static" >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h4" fontWeight="bold">
                Ticketstm
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static">
          <Toolbar>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant="h4" component="div" fontWeight="bold">
                Ticketstm
              </Typography>
            </Link>
            <div style={{ marginLeft: 'auto' }}>
              <Link to="/" className='nav-links'>
                Home
              </Link>
              <Link to="/about" className='nav-links'>
                About Us
              </Link>
              <Link to="/create-new-ticket" className='nav-links'>
                Create Ticket
              </Link>

              <Link to="/loginform" className='nav-links'>
                Login
              </Link>

              <Link to="/SignUp" className='nav-links'>
                SignUp
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      )}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </React.Fragment>
  );
}