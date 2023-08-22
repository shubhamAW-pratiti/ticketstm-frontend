import React from 'react';
import { Box, 
    // Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    Typography,
    useTheme,
    // useMediaQuery
} from '@mui/material';
import { 
    // SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    // HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    // ReceiptLongOutlined,
    // PublicOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined, 
    AirplaneTicket}
from '@mui/icons-material';
import { useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import axios from 'axios';
// import profile from '../assets/profile.png'

const navItems = [
//   {
//       text: "Dashboard",
//       icon: <HomeOutlined />,
//       roles: ['admin', 'agent', 'basic']
//   },
  {
      text: "DashBoard",
      component:'dashboard',
      icon: <ShoppingCartOutlined />,
      roles: ['admin','basic','agent']
  },

//   {
//     text:'DashBoard',
//     component:'profile',
//     icon:<ShoppingCartOutlined/>,
//     roles:['basic']
//   },
//   {
//     text:'DashBoard',
//     component:'agent-dashboard',
//     icon:<ShoppingCartOutlined/>,
//     roles:['agent']
//   },
  {
    text:'Users',
    component:'users1',
    icon:null,
    roles:['admin']
  },
  {
      text: "Users",
      component:'users',
      icon: <Groups2Outlined />,
      roles: ['admin']
  },
  {
      text: "",
      component:'dummy',
      icon: null,
      roles: ['admin', 'agent']
  },
  {
      text: "Manage",
      component:'manage',
      icon: null,
      roles: ['admin', 'agent']
  },
  {
      text: "Daily",
      component:'daily',
      icon: <TodayOutlined />,
      roles: ['admin', 'agent']
  },
  {
      text: "Monthly",
      component:'monthly',
      icon: <CalendarMonthOutlined />,
      roles: ['admin', 'agent']
  },
  {
      text: "Breakdown",
      component:'breakdown',
      icon: <PieChartOutlined />,
      roles: ['admin', 'agent']
  },
  {
      text: "Management",
      component:'management',
      icon: null,
      roles: ['admin', 'agent']
  },
  {
      text: "Admin",
      component:'admin',
      icon: <AdminPanelSettingsOutlined />,
      roles: ['admin']
  },
  {
      text: "Performance",
      component:'performance',
      icon: <TrendingUpOutlined />,
      roles: ['admin', 'agent']
  },
  {
    text:"Create Ticket",
    component:'createticket',
    icon:<AirplaneTicket/>,
    roles:['basic']

  },

];


const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) =>  {
    const userRole = localStorage.getItem('userRole');
    const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));
    const { pathname } = useLocation();
    const [active, setActive ] = useState("");
    const navigate = useNavigate()
    const theme = useTheme()
    //const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const [user ,setUser]=useState(null);
    
    const userId=localStorage.getItem('userId');

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname])

    useEffect(()=>{
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
    },[userId]);


  return (
    <Box >
        {isSidebarOpen && (
            <Drawer 
            open={isSidebarOpen} 
            onClose = {() => setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
                width:drawerWidth,
                "& .MuiDrawer-paper": {
                    color: theme.palette.secondary[200],
                    // backgroundColor: '#1f1f1f',
                    boxSizing: "border-box",
                    borderWidth: isNonMobile ? 0 : "2px",
                    width: drawerWidth,
                    borderRightWidth: '1px',
                }
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
                         {!isNonMobile && (
                             <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                 <ChevronLeft />
                             </IconButton>
                         )}
                     </FlexBetween>
                 </Box>

                 <List>
                    {filteredNavItems.map(({ text, icon ,component }) => {
                        if (!icon) {
                            return (
                                <Typography key={component} sx={{ m: "2.25rem 0 1rem 3rem"}} >
                                    { text }
                                </Typography>
                            );
                        }

                        const lcText = component.toLowerCase();

                        return (
                            <ListItem key={component} disablePadding>
                                <ListItemButton onClick={() => {
                                            navigate(`/${lcText}`);
                                            setActive(lcText);
                                    }}
                                            sx={{backgroundColor: active === lcText ? '#E4E5E3' : "transparent",
                                            color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100]}}>
                                        <ListItemIcon sx={{ ml: "2rem",
                                            color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200]
                                            }}>
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                            {active === lcText && (
                                            <ChevronRightOutlined sx={{ml: "auto" }} />
                                            )}
                                        </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>

             </Box>
             {/* {isNonMediumScreens && <Box position="absolute" bottom="2rem">
                <Divider />
                <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                    <Box
                    component="img"
                    alt="profile"
                    height="40px"
                    width="40px"
                    borderRadius="50%"
                    src={profile}
                    sx={{ objectFit: "Cover"}} 
                   />
                   <Box textAlign="left">
                        <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100]}}>
                            {user?.email}
                        </Typography>
                        <Typography  fontSize="0.8rem" sx={{ color: theme.palette.secondary[200]}}>
                            {user?.role}
                        </Typography>
                    </Box>
                    <SettingsOutlined sx={{color: theme.palette.secondary[300], fontSize: "25px"}} />
                </FlexBetween>
            </Box>} */}
            </Drawer>
        )} 
    </Box>
  )
}

export default Sidebar