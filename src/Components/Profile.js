import { Button, Grid, Typography ,TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Navigate ,Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import CreateTicketForm from './CreateTicketForm';

const Profile = ({onLogout}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [user, setUser] = useState(null);
  const [isFormOpen , setIsFormOpen] = useState(false);
  const [userId , setUserId] = useState(null);
  const [tickets , setTickets] = useState([]);
  const [searchTerm , setSearchTerm] = useState('');

  const handleFormOpen = () => {
    setIsFormOpen(false);
  }

  const handleFormClose = () => {
    setIsFormOpen(false);
  }
  const handleFormSubmit = async (ticketData) => {
    try {
      const { title, description } = ticketData;
  
      const formData =new URLSearchParams();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('user', localStorage.getItem("userId"));

      const response = await axios.post(`${BASE_URL}/newticket`, formData.toString(),{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });

      if(response.status === 201){
        const data = response.data;
      }
      else{
        alert('problem with ticket creationg');
      }  
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(()=>{
    axios.get(`${BASE_URL}/allTicketsByUser`, {
  params: {
    userId: localStorage.getItem("userId")|| null,
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },

})
  .then((response) => {
    if (response.status === 200) {
      const tickets = response.data;
      setTickets(tickets);
    }
    
  })
  .catch((error) => {
    console.error('Error fetching tickets:', error);
  });
  
  },[isFormOpen]);

  useEffect(()=>{
    axios.get(`${BASE_URL}/allTicketsByUser`, {
  params: {
    userId: localStorage.getItem("userId"),
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },

})
  .then((response) => {
    if (response.status === 200) {
      const tickets = response.data;
      setTickets(tickets);
    }
  })
  .catch((error) => {
    console.error('Error fetching tickets:', error);
  });
  
  },[]);

  const handleSignOUt=()=>{
    onLogout();
    <Navigate to='/' replace/>
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Welcome {user?.email}
        </Typography>
        <Button onClick={() => setIsFormOpen(true)} variant="contained" color="primary">
          Create Ticket
        </Button>
        <CreateTicketForm isOpen={isFormOpen} onClose={handleFormClose} onSubmit={handleFormSubmit} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Ticket List
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          sx={{ marginBottom: 2 }}
        />
      </Grid>
      {filterTickets.map((ticket) => (
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
  );
}

export default Profile
