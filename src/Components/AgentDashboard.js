import React from 'react'
import axios from 'axios';
import {useState , useEffect} from 'react';
import { Link, Navigate } from 'react-router-dom';
import {List , ListItem , Typography, dividerClasses} from '@mui/material';


const AgentDashboard = () => {
  const [agentId, setAgentId]=useState(null);
  const [assignedTickets,setAssignedTickets]=useState([]);


  // setAgentId(localStorage.getItem('userId'));
  // console.log(agentId);

  useEffect(()=>{
    axios.get(`http://localhost:3002/assignedTickets`,{
      params:{
        agentId:localStorage.getItem('userId')
      }
    })
    .then((response)=>{
      if(response.status===200){
        const fetchedTickets=response.data;
        setAssignedTickets(fetchedTickets);
        console.log('Tickets:',fetchedTickets);
      }else{
        console.log('Problem with fetching ticket details')
      }
    }).catch((error)=>{
      console.log('Error fetching ticket details',error);
    })

  },[]);

  return (
    <div
      style={{
        margin: '5%',
        borderRadius: '10px',
      }}
    >
      <h1>Assigned tickets: </h1>

      <List>
      {assignedTickets.map((ticket) => (
        <ListItem
          key={ticket._id}
          sx={{
            marginBottom: '16px',
            border: '1px solid #ccc',
            padding: '16px',
            borderRadius: '4px',
            backgroundColor: 'red',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              cursor: 'pointer',
              
            },
            onClick: () => {
              <Navigate to={`/ticket/${ticket._id}`} replace />
            },
          }}
        >
          <Link
            to={`/ticket/${ticket._id}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Typography variant="h6">{ticket.title} </Typography>
          </Link>
          <Typography
            sx={{
              marginTop: '8px',
            }}
          >
              Description: {ticket.description}
          </Typography>
        </ListItem>
      ))}
    </List>
    </div>
  )
}

export default AgentDashboard