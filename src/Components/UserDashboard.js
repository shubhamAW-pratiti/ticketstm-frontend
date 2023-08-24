import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Grid, Box, CircularProgress, Select, MenuItem, Card, CardContent} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const UserDashboard = ({ onLogout }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('pending');
  const userId = localStorage.getItem('userId');
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    // Fetch all tickets format : x-www-form-urlencoded

    axios
      .get('http://localhost:3002/allTicketsByUser', {
        params: {
          userId: userId,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const tickets = response.data;
          setTickets(tickets);
          setLoading(false);
        } else {
          console.log('Problem with fetching tickets');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error);
      });
  }, [userId]);


  // Filter tickets based on status
  const allTickets = tickets.sort((a, b) => new Date(b.date) - new Date(a.date));
  const pendingTickets = allTickets.filter(ticket => ticket.status === 'pending');
  const openTickets = allTickets.filter(ticket => ticket.status === 'open');
  const closedTickets = allTickets.filter(ticket => ticket.status === 'closed');

  const getCategoryTickets = () => {
    switch (selectedCategory) {
      case 'pending':
        return pendingTickets;
      case 'open':
        return openTickets;
      case 'closed':
        return closedTickets;
      case 'all':
        return allTickets;
      default:
        return [];
    }
  };

  const categoryTickets = getCategoryTickets();

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 4, }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select value={selectedCategory} onChange={handleCategoryChange}>
                <MenuItem value="pending">Pending Tickets</MenuItem>
                <MenuItem value="open">Open Tickets</MenuItem>
                <MenuItem value="closed">Closed Tickets</MenuItem>
                <MenuItem value="all">All Tickets</MenuItem>
              </Select>
            </Grid>

            <Grid container sx={{ padding: 2}} gap={2}>
              {categoryTickets.map((ticket) => (
                <Grid item key={ticket._id} xs={12} sm={6} md={4} lg={3} gap={2}>
                  <Link to={`/ticket/${ticket._id}`} style={{ textDecoration: 'none' }}>

                    <Card
                      sx={{
                        backgroundColor: 'whitesmoke',
                        border: '1px solid #ccc',
                        borderRadius: 2,

                        '&:hover': {
                          backgroundColor: '#84ffff',
                        },
                      }}
                    >
                      <CardContent>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="h6" gutterBottom>
                            {ticket.title}
                          </Typography>
                          <div
                            style={{
                              // border: "1px",
                              // borderStyle: 'solid',
                              // borderColor: ticket?.status === 'pending' ? 'orange' : ticket?.status === 'open' ? 'green' : 'red',
                              color: ticket?.status === 'pending' ? 'orange' : ticket?.status === 'open' ? 'green' : 'red',
                              textTransform: 'capitalize',
                              paddingRight: '10px',
                            }}
                          >
                            {ticket?.status}
                          </div>
                        </div>
                        <Typography>{ticket.description}</Typography>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderTop: '1px solid #ccc',
                            paddingTop: '10px',
                          }}
                        >
                          <AccessTimeIcon sx={{ marginRight: 1 }} />
                          {new Date(ticket.date).toLocaleDateString()} - {new Date(ticket.date).toLocaleTimeString()}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>

        </>
      )
      }

    </Box >
  );
};

export default UserDashboard;
