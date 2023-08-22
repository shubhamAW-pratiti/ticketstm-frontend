// import React from 'react'
// import axios from 'axios';
// import {useState , useEffect} from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import {List , ListItem , Typography, dividerClasses ,Grid} from '@mui/material';


// const AgentDashboard = () => {
//   const [agentId, setAgentId]=useState(null);
//   const [assignedTickets,setAssignedTickets]=useState([]);


//   // setAgentId(localStorage.getItem('userId'));
//   // console.log(agentId);

//   useEffect(()=>{
//     axios.get(`http://localhost:3002/assignedTickets`,{
//       params:{
//         agentId:localStorage.getItem('userId')
//       }
//     })
//     .then((response)=>{
//       if(response.status===200){
//         const fetchedTickets=response.data;
//         setAssignedTickets(fetchedTickets);
//         console.log('Tickets:',fetchedTickets);
//       }else{
//         console.log('Problem with fetching ticket details')
//       }
//     }).catch((error)=>{
//       console.log('Error fetching ticket details',error);
//     })

//   },[]);

//   const pendingTickets = assignedTickets.filter(ticket => ticket.status === 'pending');
//   const openTickets = assignedTickets.filter(ticket => ticket.status === 'open');
//   const closedTickets = assignedTickets.filter(ticket => ticket.status === 'closed');

//   return (
//     <Grid container spacing={2} sx={{ padding: 5 }}>
//       <Grid item xs={12}>
//         <Typography variant="h4" gutterBottom>
//           Welcome Agent
//         </Typography>
        
//       </Grid>
//       <Grid item xs={12}>
//         <Typography variant="h5" gutterBottom>
//           {openTickets.length > 0 ? 'Open Tickets:' : 'No Open Tickets'}
//         </Typography>
//       </Grid>
      
//       <Grid container sx={{
//         padding: 2, 
//       }}>
//       {openTickets.map((ticket) => (
//         <Grid item key={ticket._id}  xs={12} sm={6} md={4} lg={3} gap={2}>
//           <Link to={`/ticket/${ticket._id}`} style={{ textDecoration: 'none' }}>
//             <div
//               style={{
//                 backgroundColor: 'whitesmoke',
//                 border: '1px solid #ccc',
//                 borderRadius: 10,
//                 padding: 10,
//                 '&:hover': {
//                   backgroundColor: 'red',
//                 },
//               }}
//             >
//               <Typography variant="h6" gutterBottom>
//                 {ticket.title}
//               </Typography>
//               <Typography>{ticket.description}</Typography>
//               <Typography>Status: {ticket?.status}</Typography>
//             </div>
//           </Link>
//         </Grid>
//       ))}
//       </Grid>
      
//      <Grid container sx={{
//         padding: 2,
//      }}>
//         <Typography variant="h5" gutterBottom>
//           {pendingTickets.length> 0 ?'pending Tickets:' :'No Pending Tickets' }
//         </Typography>
//       </Grid>
     
//       <Grid container sx={{
//         padding: 2,
//       }}
//       >
//       {pendingTickets.map((ticket) => (
//         <Grid item key={ticket._id}  xs={12} sm={6} md={4} lg={3} gap={2}>
//           <Link to={`/ticket/${ticket._id}`} style={{ textDecoration: 'none' }}>
//             <div
//               style={{
//                 backgroundColor: 'whitesmoke',
//                 border: '1px solid #ccc',
//                 borderRadius: 10,
//                 padding: 10,
//                 '&:hover': {
//                   backgroundColor: 'red',
//                 },
//               }}
//             >
//               <Typography variant="h6" gutterBottom>
//                 {ticket.title}
//               </Typography>
//               <Typography>{ticket.description}</Typography>
//               <Typography>Status: {ticket?.status}</Typography>
//             </div>
//           </Link>
//         </Grid>
//       ))}
//       </Grid>

//       <Grid container sx={{
//         padding: 2,
//       }}>
//         <Typography variant="h5" gutterBottom>
//          {closedTickets.length > 0 ?'Closed Tickets':'No Closed Tickets'} 
//         </Typography>
//       </Grid>

//       <Grid container sx={{
//         padding: 2,
//       }} >
//       {closedTickets.map((ticket) => (
//         <Grid item key={ticket._id}  xs={12} sm={6} md={4} lg={3} gap={2}>
//           <Link to={`/ticket/${ticket._id}`} style={{ textDecoration: 'none' }}>
//             <div
//               style={{
//                 backgroundColor: 'whitesmoke',
//                 border: '1px solid #ccc',
//                 borderRadius: 10,
//                 padding: 10,
//                 '&:hover': {
//                   backgroundColor: 'red',
//                 },
//               }}
//             >
//               <Typography variant="h6" gutterBottom>
//                 {ticket.title}
//               </Typography>
//               <Typography>{ticket.description}</Typography>
//               <Typography>Status: {ticket?.status}</Typography>
//             </div>
//           </Link>
//         </Grid>
//       ))}
//       </Grid>
//     </Grid>
//   )
// }

// export default AgentDashboard