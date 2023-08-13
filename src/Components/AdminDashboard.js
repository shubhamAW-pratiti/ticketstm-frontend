import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListItem, Typography, List } from '@mui/material';

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
        <div
            style={{
                margin: '10%',
                border: '1px solid #ccc',
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: '#f5f5f5',
            }}
        >
            <h1>Admin Dashboard</h1>

            <p>All Tickets</p>

            <div>
                <h2>Pending Tickets</h2>
                <List>
                    {pendingTickets.map((ticket) => (
                        <ListItem key={ticket._id}>
                            <Link to={`/ticket/${ticket._id}`}>
                                <Typography>{ticket.title}</Typography>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </div>

            <div>
                <h2>Open Tickets</h2>
                <List>
                    {openTickets.map((ticket) => (
                        <ListItem key={ticket._id}>
                            <Link to={`/ticket/${ticket._id}`}>
                                <Typography>{ticket.title}</Typography>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </div>

            <div>
                <h2>Closed Tickets</h2>
                <List>
                    {closedTickets.map((ticket) => (
                        <ListItem key={ticket._id}>
                            <Link to={`/ticket/${ticket._id}`}>
                                <Typography>{ticket.title}</Typography>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default AdminDashboard;
