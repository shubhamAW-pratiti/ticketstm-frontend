import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TicketDetails = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [statusOptions, setStatusOptions] = useState(['pending','open', 'closed']); // Add status options here
    const [selectedStatus, setSelectedStatus] = useState('');

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
    }, [ticketId]);

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus);

        
    };

    const handleUpdateStatus = () => {
        // Update the ticket status using axios or your preferred method


        const newStatus = selectedStatus;
        const comment =''; //for now it  empty
        const agentId = localStorage.getItem('userId');

        const formData=new FormData();
        formData.append('status',newStatus);
        formData.append('comment',comment);
        formData.append('agentId',agentId);

        axios.put(`http://localhost:3002/updateTicketStatus/${ticketId}`, formData,{
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
        })
        .then((response) => {
            // Handle the response if needed
            alert('Ticket status updated successfully');
        })
        .catch((error) => {
            console.log('Error updating ticket status', error);
        });
    };

    return (
        <div
            style={{
                margin: '10%',
                border: '1px solid #ccc',
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: '#f5f5f5',
            }}
        >
            <h1>Ticket Details</h1>
            <p>Ticket Id: {ticketId}</p>
            <p>Title: {ticket?.title}</p>
            <p>Description: {ticket?.description}</p>
            <p>Status: {ticket?.status}</p>
            {ticket?.agent && <p>Agent: {ticket.agent}</p>}
            <label>
                Status:
                <select value={selectedStatus} onChange={handleStatusChange}>
                    {statusOptions.map((status, index) => (
                        <option key={index} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </label>
            {
                (selectedStatus === 'closed' || selectedStatus==='open') && (
                    <button onClick={handleUpdateStatus}>
                        update
                    </button>
                )
            }
        </div>
    );
};

export default TicketDetails;



// import React ,{useEffect,useState}from 'react'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const TicketDetails = () => {
//     const {ticketId} = useParams();
//     const [ticket,setTicket] = useState(null);

//     useEffect(()=>{
//         //Fetch ticket Details based on ticketId
//         axios.get(`http://localhost:3002/ticketDetailsById/${ticketId}`)
//             .then( (response)=>{
//                 if(response.status ===200){
//                     const fetchedTicket = response.data;
//                     setTicket(fetchedTicket);
//                 }else{
//                     console.log('Problem with fetching ticket details')
//                 }
//             }

//             ).catch((error)=>{
//                 console.log('Error fetching ticket details',error);
//             })
//     },[ticketId]);

//   return (
//     <div
//         style={{
//             margin:'10%',
//             border: '1px solid #ccc',
//             padding: '16px',
//             borderRadius: '10px',
//             backgroundColor: '#f5f5f5',
//         }}
//     >
//         <h1>Ticket Details</h1>
//         <p>Ticket Id: {ticketId}</p>
//         <p>Title: {ticket?.title}</p>
//         <p>Descriptio: {ticket?.description}</p>
//         <p>status : {ticket?.status}</p>
//         {ticket?.agent && <p>{ticket.agent}</p>}
//     </div>
//   )
// }

// export default TicketDetails




// Pending works : status changes is pending.. in Agent dashboard 