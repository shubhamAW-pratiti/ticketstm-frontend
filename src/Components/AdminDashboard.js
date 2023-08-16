import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListItem, Typography, List ,Grid} from '@mui/material';

const AdminDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [adminId, setAdminId] = useState(null);

    useEffect(() => {
        // Fetch all tickets format : x-www-form-urlencoded
        axios.get('http://localhost:3002/allTickets', {
            params: {
                userId: localStorage.getItem('userId'),
            },
        })
        .then((response) => {
            if (response.status === 200) {
                const allTickets = response.data;
                setTickets(allTickets);
                console.log('all tickets', allTickets);
            } else {
                console.log('Problem with fetching tickets');
            }
        })
        .catch((error) => {
            console.log('Error fetching tickets', error);
        });
    }, []);

    useEffect(() => {
        const adminId = localStorage.getItem('userId');
        console.log('admin id', adminId);
        setAdminId(adminId);
    }, []);

    // Filter tickets based on status
    const pendingTickets = tickets.filter(ticket => ticket.status === 'pending');
    const openTickets = tickets.filter(ticket => ticket.status === 'open');
    const closedTickets = tickets.filter(ticket => ticket.status === 'closed');

    return (
        <Grid container spacing={2} sx={{ padding: 5 }}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Welcome Agent
            </Typography>
            
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              {openTickets.length > 0 ? 'Open Tickets:' : 'No Open Tickets'}
            </Typography>
          </Grid>
          
          <Grid container sx={{
            padding: 2, 
          }} gap={2}>
          {openTickets.map((ticket) => (
            <Grid item key={ticket._id}  xs={12} sm={6} md={4} lg={3} gap={2}>
              <Link to={`/ticket/${ticket._id}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    backgroundColor: 'whitesmoke',
                    border: '1px solid #ccc',
                    borderRadius: 10,
                    padding: 10,
                    '&:hover': {
                      backgroundColor: 'red',
                    },
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {ticket.title}
                  </Typography>
                  <Typography>{ticket.description}</Typography>
                  <Typography>Status: {ticket?.status}</Typography>
                </div>
              </Link>
            </Grid>
          ))}
          </Grid>
          
         <Grid container sx={{
            padding: 2,
         }} gap={2}>
            <Typography variant="h5" gutterBottom>
              {pendingTickets.length> 0 ?'pending Tickets:' :'No Pending Tickets' }
            </Typography>
          </Grid>
         
          <Grid container sx={{
            padding: 2,
          }} gap={2}
          >
          {pendingTickets.map((ticket) => (
            <Grid item key={ticket._id}  xs={12} sm={6} md={4} lg={3} gap={2}>
              <Link to={`/ticket/${ticket._id}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    backgroundColor: 'whitesmoke',
                    border: '1px solid #ccc',
                    borderRadius: 10,
                    padding: 10,
                    '&:hover': {
                      backgroundColor: 'red',
                    },
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {ticket.title}
                  </Typography>
                  <Typography>{ticket.description}</Typography>
                  <Typography>Status: {ticket?.status}</Typography>
                </div>
              </Link>
            </Grid>
          ))}
          </Grid>
    
          <Grid container sx={{
            padding: 2,
          }}>
            <Typography variant="h5" gutterBottom>
             {closedTickets.length > 0 ?'Closed Tickets':'No Closed Tickets'} 
            </Typography>
          </Grid>
    
          <Grid container sx={{
            padding: 2,
          }} gap={2}>
          {closedTickets.map((ticket) => (
            <Grid item key={ticket._id}  xs={12} sm={6} md={4} lg={3} gap={2}>
              <Link to={`/ticket/${ticket._id}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    backgroundColor: 'whitesmoke',
                    border: '1px solid #ccc',
                    borderRadius: 10,
                    padding: 10,
                    '&:hover': {
                      backgroundColor: 'red',
                    },
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {ticket.title}
                  </Typography>
                  <Typography>{ticket.description}</Typography>
                  <Typography>Status: {ticket?.status}</Typography>
                </div>
              </Link>
            </Grid>
          ))}
          </Grid>
        </Grid>
      );
};

export default AdminDashboard;
