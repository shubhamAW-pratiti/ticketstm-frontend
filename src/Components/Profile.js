import { Button, Grid, Typography ,TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Navigate ,Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'; //needed when you want to extract userId form accessToken(which is stored in local Storage)
import { useState } from 'react';
import axios from 'axios';

import CreateTicketForm from './CreateTicketForm';



const Profile = ({onLogout}) => {
  const [user, setUser] = useState(null);
  const [isFormOpen , setIsFormOpen] = useState(false);
  const [userId , setUserId] = useState(null);
  //array of tickets
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

      console.log(formData.toString());

      const response = await axios.post('http://localhost:3002/newticket', formData.toString(),{
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
  
      console.log(response.data); // Assuming your server sends back useful data upon successful creation
  
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Handle error, show a message to the user, etc.
    }
  };
  
  useEffect(()=>{
    axios.get('http://localhost:3002/allTicketsByUser', {
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
      console.log('Tickets:', tickets);
      setTickets(tickets);
      // Handle tickets data
    } else {
      console.log('Problem with fetching tickets');
    }
  })
  .catch((error) => {
    console.error('Error fetching tickets:', error);
  });
  
  },[isFormOpen]);

  //Ticket render when first time render

  useEffect(()=>{
    axios.get('http://localhost:3002/allTicketsByUser', {
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
      console.log('Tickets:', tickets);
      setTickets(tickets);
      // Handle tickets data
      console.log(userId);
      console.log('tickets in useeffect: ', tickets)
    } else {
      console.log('Problem with fetching tickets');
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

  //handleSearch 
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  //Fiter tickets by ticket name
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
        <Grid item key={ticket._id} xs={12} sm={6} md={4} lg={3}>
          <Link to={`/ticket/${ticket._id}`} style={{ textDecoration: 'none' }}>
            <div
              sx={{
                padding: 2,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: 4,
                minHeight: 150,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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


//Problem : everytime i have to fetch userId from localstorage and userid need to first fetch from localstorage when component render every time 
//Solution : use useEffect to fetch userId from localstorage and store it in state and then use that state to fetch tickets
//Problem : when i create new ticket then i have to fetch tickets again to show new ticket in list
//Solution : use useEffect to fetch tickets again when new ticket is created

