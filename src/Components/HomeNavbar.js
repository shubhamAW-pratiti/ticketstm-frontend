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
  const [activeLink, setActiveLink] = React.useState('');
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
      <Box m="1rem 1rem 1rem 3rem">
        <List>
          <ListItem onClick={handleCloseDrawer}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <ListItemText primary="Home" />
            </Link>
          </ListItem>
          <ListItem onClick={handleCloseDrawer}>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <ListItemText primary="About Us" />
            </Link>
          </ListItem>
          <ListItem onClick={handleCloseDrawer}>
            <Link to="/create-new-ticket" style={{ textDecoration: 'none' }}>
              <ListItemText primary="Create Ticket" />
            </Link>
          </ListItem>
          <ListItem onClick={handleCloseDrawer}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <ListItemText primary="Login" />
            </Link>
          </ListItem>
          <ListItem onClick={handleCloseDrawer}>
            <Link to="/SignUp" style={{ textDecoration: 'none' }}>
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
        <AppBar sx={{ position: "static", backgroundColor: 'white', boxShadow: 'none' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="black"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }} >
              <Typography variant="h4" fontWeight="bold" sx={{ color: theme.palette.secondary.main }}>
                Ticketstm
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static" sx={{ backgroundColor: '#FFFAFA', boxShadow: 'none' }} >
          <Toolbar>
            <Link to="/" style={{ textDecoration: 'none', color: theme.palette.secondary.main }}>
              <Typography variant="h4" component="div" fontWeight="bold">
                Ticketstm
              </Typography>
            </Link>
            <div style={{ marginLeft: 'auto' }}>
              <Link to="/"
                className={`nav-links ${activeLink === '' ? 'active' : ''}`}
                onClick={() => setActiveLink('')}>
                Home
              </Link>
              <Link
                to="/about"
                className={`nav-links ${activeLink === '/about' ? 'active' : ''}`}
                onClick={() => setActiveLink('/about')}
              >
                About Us
              </Link>
              <Link to="/create-new-ticket"
                className={`nav-links ${activeLink === '/create-new-ticket' ? 'active' : ''}`}
                onClick={() => setActiveLink('/create-new-ticket')}
              >
                Create Ticket
              </Link>

              <Link to="/login"
                className={`nav-links ${activeLink === '/login' ? 'active' : ''}`}
                onClick={() => setActiveLink('/login')}
              >
                Login
              </Link>

              <Link to="/SignUp" className={`nav-links ${activeLink === '/SignUp' ? 'active' : ''}`}
                onClick={() => setActiveLink('/SignUp')}
              >
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