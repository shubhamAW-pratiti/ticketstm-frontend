import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Grid ,
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,

} from '@mui/material'



// toast
import { toast ,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { List, ListItem, ListItemText } from '@mui/material';
import { LineAxisOutlined } from '@mui/icons-material';



const TicketDetails = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [statusOptions, setStatusOptions] = useState(['pending','open', 'closed']); // Add status options here
    const [selectedStatus, setSelectedStatus] = useState('');
    const [statusUpdate, setStatusUpdate] = useState(false);
    const [commentuser, setCommentUser] = useState('');
    const [comments, setComments] = useState([]);//comments array
    const [agents , setAgents] = useState([]);//agents array
    const userId = localStorage.getItem('userId');

    const [selectedAgent, setSelectedAgent] = useState('');
    const [refresh, setRefresh] = useState(false);

    // Handle agent change
    const handleAgentChange = (event) => {
        const newAgent = event.target.value;
        setSelectedAgent(newAgent);

    };

    const handleAssignAgent = () => {

        try{

            // Format the data using qs library for x-www-form-urlencoded format
        // const formData = qs.stringify({
        //     agentId: newAgent,
        //     ticketId: ticketId,
        //     userId: userId,
        // });
        const formData=new URLSearchParams();
        formData.append('agentId',selectedAgent);
        formData.append('ticketId',ticketId);
        formData.append('id',userId);


        // Make API request to assign the ticket to the selected agent
        axios.post('http://localhost:3002/assignTicketToAgent', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((response) => {
            // Handle the response if needed
            toast.success('Agent Assigned for Ticket successfully',{
                position:toast.POSITION.TOP_RIGHT}
            );
            setRefresh(!refresh);//refresh the page
        })
        .catch((error) => {
            console.error('Error assigning ticket:', error);
        });
    }catch(error){
        console.log('Error updating ticket status', error);
    }

    setSelectedAgent('');//reset the selected agent
   
    }


    useEffect(()=>{
        axios.get(`http://localhost:3002/ticketDetailsById/${ticketId}`)
        .then((response) => {
            if (response.status === 200) {
                const fetchedTicket = response.data;
                setTicket(fetchedTicket);
                setSelectedStatus(fetchedTicket.status); // Set the initial status
            } else {
                console.log('Problem with fetching ticket details');
            }
        })
        .catch((error) => {
            console.log('Error fetching ticket details', error);
        });
    },[refresh]);

    // Fetch ticket details when the component mounts
    useEffect(() => {
        // Fetch ticket Details based on ticketId
        axios.get(`http://localhost:3002/ticketDetailsById/${ticketId}`)
            .then((response) => {
                if (response.status === 200) {
                    const fetchedTicket = response.data;
                    setTicket(fetchedTicket);
                    setSelectedStatus(fetchedTicket.status); // Set the initial status
                } else {
                    console.log('Problem with fetching ticket details');
                }
            })
            .catch((error) => {
                console.log('Error fetching ticket details', error);
            });

            // Fetch comments for the ticket
        axios.get(`http://localhost:3002/commentsInTicket/${ticketId}`)
                .then((response) => {
            if (response.status === 200) {
                setComments(response.data);
                console.log('comments',response.data);
            } else {
                console.log('Problem with fetching comments');
            }
        })
        .catch((error) => {
            console.error('Error fetching comments:', error);
        });

        //Fetch Agents

        axios.get('http://localhost:3002/getAgents')
        .then((response) => {
            if(response.status===200){
                const fetchedAgents = response.data.data;
                console.log('agents',fetchedAgents);
                setAgents(fetchedAgents);
            }
        }
        ).catch((error)=>{
            console.log('Error fetching agents',error);
        })


    },[ticketId , statusUpdate , selectedAgent]);

    // Handle status change
    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus); 
    };

    // Handle update status
    const handleUpdateStatus = () => {

        try{
                // Update the ticket status using axios or your preferred method


            const newStatus = selectedStatus;
            const comment = commentuser;
            const agentId = localStorage.getItem('userId');

            const formData=new URLSearchParams();
            formData.append('ticketId',ticketId);
            formData.append('newStatus',newStatus);
            formData.append('comment',comment);
            formData.append('id',agentId);

            
            axios.put('http://localhost:3002/update-ticket', formData,{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
            })
            .then((response) => {
                // Handle the response if needed
                toast.success('Ticket status updated successfully',{
                    position:toast.POSITION.TOP_RIGHT,
                });
                setStatusUpdate(!statusUpdate);

            })
            .catch((error) => {
                console.log('Error updating ticket status', error);
            });
        }catch(error){
            console.log('Error updating ticket status', error);
        }
       
        // Reset the status update state
    };

    return (

     <Grid container gap={5}>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{
                    padding:'2rem',
                }}>
                    <h1 style={{
                        fontFamily:'sans-serif',
                    }}>
                        Ticket Details:
                    </h1>

                    <Typography variant="h6" gutterBottom component="div">
                        {/* gray colored ticketId */}
                        <span style={{
                            color:'gray',
                        }}>TicketId: </span>
                         {ticketId}
                    </Typography>

                    <Typography variant="h6" gutterBottom component="div">
                        <span style={{color:'gray'}}>Title:</span> {ticket?.title}
                    </Typography>

                    <Typography variant="h6" gutterBottom component="div">
                        <span style={{color:'gray'}}>Description:</span> {ticket?.description}
                    </Typography>

                    <Typography variant="h6" gutterBottom component="div">
                        <span style={{color:'gray'}}>Status:</span> {ticket?.status}
                    </Typography>

                    {ticket?.agent ? (
                        <Typography variant="h6" gutterBottom component="div">
                            <span style={{color:'gray'}}>Agent:</span> {ticket.agent}
                        </Typography>
                    ):(<Typography variant="h6" gutterBottom component="div">
                        <span style={{color:'gray'}}>Agent:</span> Not Assigned
                        </Typography>
                    )}

                    <Typography variant='h6' gutterBottom component='div'>
                        <span style={{color:'gray'}}>Comment:</span>
                    </Typography>

                    <TextField
                        id="outlined-multiline-static"
                        label="Comment"
                        fullWidth
                        multiline
                        onChange={(e) => setCommentUser(e.target.value)}
                    >
                        Comment
                    </TextField>

                <FormControl style={{ width: '100%',marginTop:'10px' }}>

                    <Typography variant='h6' gutterBottom component='div'>
                        <span style={{color:'gray'}}>Status:</span>
                    </Typography>
                    <Select value={selectedStatus} onChange={handleStatusChange}>
                        {statusOptions.map((status, index) => (
                            <MenuItem key={index} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                    <Button variant="contained" onClick={handleUpdateStatus} style={{
                        marginTop:'30px',
                    }}>
                        Update
                    </Button>

                {/* only visiable to Admin */}

                {
                    localStorage.getItem('userRole')==='admin' && (
                        <FormControl style={{ width: '100%', marginTop: '10px' }}>
                        <Typography variant='h6' gutterBottom component='div'>
                            <span style={{ color: 'gray' }}>Assign Agent:</span>
                        </Typography>
                        <Select value={selectedAgent} onChange={handleAgentChange}>
                            {agents.map((agent) => (
                                <MenuItem key={agent._id} value={agent._id}>
                                    ({agent._id}) - {agent.email}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    )
                }
               
            
              {
                selectedAgent && (
                    <Button variant="contained" onClick={handleAssignAgent} style={{
                        marginTop:'30px',
                    }}>
                        Assign
                    </Button>
                )
                
              }


                </Paper>
            </Grid>

            {/* COMMENT GRID */}
            <Grid item xs={12} md={5} >
                <Paper elevation={3} sx={{
                    padding:'2rem',
                }}>
                    <h1 style={{fontFamily:'sans-serif'}}>Comments: </h1>

                    <Typography variant='h6'>Total Comments: {comments.length}</Typography>
                    {comments.length > 0 ? (
                        <List>
                            {comments.map((comment) => (
                                <ListItem key={comment._id} sx={{
                                    borderBottom:'1px solid gray',
                                    borderRadius:'5px',
                                    marginTop:'10px',
                                    padding:'10px',
                                }}>
                                    <ListItemText
                                        primary={comment.comment}
                                        secondary={`By ${comment.userId} on ${new Date(comment.date).toLocaleString()}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <p>No comments available for this ticket.</p>
                    )}


                </Paper>
            </Grid>
            <ToastContainer/>
        </Grid>



        );
    };
    
    export default TicketDetails;
    
    
    //    <div
    //     style={{
    //         width:'100%',
    //         height:'100%',
    //         borderRadius: '10px',
    //         padding: '5%',
    //     }}
    // >
    //     <h1>Ticket Details</h1>
    //     <p>Ticket Id: {ticketId}</p>
    //     <p>Title: {ticket?.title}</p>
    //     <p>Description: {ticket?.description}</p>
    //     <p>Status: {ticket?.status}</p>
    //     {ticket?.agent && <p>Agent: {ticket.agent}</p>}
    //     <label>
    //         Status:
    //         <select value={selectedStatus} onChange={handleStatusChange}>
    //             {statusOptions.map((status, index) => (
    //                 <option key={index} value={status}>
    //                     {status}
    //                 </option>
    //             ))}
    //         </select>
    //     </label>
    //     {
    //         (selectedStatus === 'closed' || selectedStatus==='open' || selectedStatus ==='pending') && (
    //             <button onClick={handleUpdateStatus}>
    //                 update
    //             </button>
    //         )
    //     }
    // </div>


/*
     <Grid container>
            <Grid item xs={12} sm={6} >
                <Paper elevation={3} sx={{
                    padding:'2rem',
                }}>
                    <h1 style={{
                        fontFamily:'sans-serif',
                    }}>
                        Ticket Details:
                    </h1>

                    <Typography variant="h6" gutterBottom component="div">
                        Ticket Id: {ticketId}
                    </Typography>

                    <Typography variant="h6" gutterBottom component="div">
                        Title: {ticket?.title}
                    </Typography>

                    <Typography variant="h6" gutterBottom component="div">
                        Description: {ticket?.description}
                    </Typography>

                    <Typography variant="h6" gutterBottom component="div">
                        Status: {ticket?.status}
                    </Typography>

                    {ticket?.agent ? (
                        <Typography variant="h6" gutterBottom component="div">
                            Agent: {ticket.agent}
                        </Typography>
                    ):(<Typography variant="h6" gutterBottom component="div">
                        Agent: Not Assigned
                        </Typography>
                    )}
                <FormControl style={{ width: '100%' }}>
                    <InputLabel>Status</InputLabel>
                    <Select value={selectedStatus} onChange={handleStatusChange}>
                        {statusOptions.map((status, index) => (
                            <MenuItem key={index} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {(selectedStatus === 'closed' || selectedStatus === 'open' || selectedStatus === 'pending') && (
                    <Button variant="contained" onClick={handleUpdateStatus}>
                        Update
                    </Button>
                )}




                </Paper>
            </Grid>
        </Grid>
*/

    // Pending works : status changes is pending.. in Agent dashboard 


    