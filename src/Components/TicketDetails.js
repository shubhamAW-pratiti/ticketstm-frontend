import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

const TicketDetails = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [statusOptions, setStatusOptions] = useState(['pending','open', 'closed']); // Add status options here
    const [selectedStatus, setSelectedStatus] = useState('');
    const [statusUpdate, setStatusUpdate] = useState(false);

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
    },[ticketId , statusUpdate]);

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
            const comment ='hello'; //for now it  empty
            const agentId = localStorage.getItem('userId');

            const formData=new URLSearchParams();
            formData.append('ticketId',ticketId);
            formData.append('newStatus',newStatus);
            formData.append('comment',comment);
            formData.append('id',agentId);

            

            //culprit is here -formData is empty
            console.log('form data',formData);

            axios.put('http://localhost:3002/update-ticket', formData.toString(),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
            })
            .then((response) => {
                // Handle the response if needed
                alert('Ticket status updated successfully');
                setStatusUpdate(true);

            })
            .catch((error) => {
                console.log('Error updating ticket status', error);
            });
        }catch(error){
            console.log('Error updating ticket status', error);
        }
       
    };

    return (
        <div
            style={{
                width:'100%',
                height:'100%',
                borderRadius: '10px',
                padding: '5%',
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
                (selectedStatus === 'closed' || selectedStatus==='open' || selectedStatus ==='pending') && (
                    <button onClick={handleUpdateStatus}>
                        update
                    </button>
                )
            }
        </div>
    );
};

export default TicketDetails;


// Pending works : status changes is pending.. in Agent dashboard 