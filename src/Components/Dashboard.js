// //Dashboard.js


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Box, Button, Toolbar, Grid, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'

const Dashboard = () => {
    const [useEffectCall, setUseEffectCall] = useState(true);
    const [loading, setLoading] = useState(true);

    const [selectedRows, setSelectedRows] = useState([]);
    const [tickets, setTickets] = useState([]);
    const role = localStorage.getItem('userRole');
    const [isStatusDialogOpen, setStatusDialogOpen] = useState(false);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const openStatusDialog = () => {
        setStatusDialogOpen(true);
    };

    const closeStatusDialog = () => {
        setStatusDialogOpen(false);
    };
    const clearSelectedRows = () => {
        setSelectedRows([]);
        closeStatusDialog();
    };

    useEffect(() => {
        if (useEffectCall) {
          axios.get('http://localhost:3002/tickets', {
            params: {
              userId: localStorage.getItem('userId'),
              role: localStorage.getItem('userRole'),
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const allTickets = response.data.map(ticket => ({ ...ticket, id: ticket._id }));
              setTickets(allTickets);
              setLoading(false);
     
            } else {
              console.log('Problem with fetching tickets');
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log('Error fetching tickets', error);
          });
          setUseEffectCall(false);
        }
      }, [useEffectCall]);
      


    const handleStatusChange = async (newStatus) => {
        try {
            const response = await axios.put(`${BASE_URL}/tickets/status`, null, {
                params: {
                    ticketIds: selectedRows.join(','),
                    newStatus: newStatus,
                },
            });
            setUseEffectCall(true);
            console.log(response.data.message);
            clearSelectedRows();

        } catch (error) {
            console.error('Error changing ticket statuses:', error);
        }
    };


    //sort tickets by time in desc
    const sortedallTickets = tickets.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Filter tickets based on status
    const pendingTickets = sortedallTickets.filter(ticket => ticket.status === 'pending');
    const openTickets = sortedallTickets.filter(ticket => ticket.status === 'open');
    const closedTickets = sortedallTickets.filter(ticket => ticket.status === 'closed');
    const allTickets = pendingTickets.concat(openTickets, closedTickets);

    // Categorize the sorted tickets
    const [selectedCategory, setSelectedCategory] = useState('all');
    const categorizedTickets = {
        all: allTickets,
        pending: pendingTickets,
        open: openTickets,
        closed: closedTickets
    };

    // Update dataForDataGridWithIndex with categorized and sorted tickets
    const dataForDataGridWithIndex = categorizedTickets[selectedCategory].map((row, index) => {
        return { ...row, id: row._id, index: index + 1 };
    });


    //change status handler event
    const handleRowCheckboxChange = (event, id) => {
        if (event.target.checked) {
            setSelectedRows([...selectedRows, id]);
        } else {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        }
    };

    //call userprofile
    const navigate = useNavigate();
    const handleReporterIdClick = (userId) => {

        navigate(`/user/${userId}`);
    };

    const handleCellClick = (params, event) => {


        if (role === 'admin' && params.value !== undefined && (params.field === 'user' || params.field === 'agent')) {
            event.preventDefault();
            handleReporterIdClick(params.value);
        } else {

            const ticketId = params.row._id;
            navigate(`/ticket/${ticketId}`);
        }
    };


    // Define the columns for the DataGrid
    let columns = [];
    if (role === 'admin') {
        columns = [
            {
                field: 'checkbox',
                headerName: 'Select',
                flex: 1,
                width: 100,
                headerClassName: 'custom-header-cell',

                renderCell: (params) => {
                    return (
                        <Checkbox
                            checked={selectedRows.includes(params.id)}
                            onChange={(event) => handleRowCheckboxChange(event, params.id)}
                            onClick={(event) => event.stopPropagation()}

                        />
                    );
                },
            },
            { field: 'index', headerName: 'Sr.No.', flex: 1, width: 70, headerClassName: 'custom-header-cell', },
            { field: 'ticketId', headerName: 'Ticket ID', flex: 2, width: 200, headerClassName: 'custom-header-cell', },
            { field: 'title', headerName: 'Title', width: 200, flex: 2, headerClassName: 'custom-header-cell', },
            { field: 'useremail', headerName: 'UserEmail', width: 200, flex: 2, headerClassName: 'custom-header-cell', },

            // { field: 'user', headerName: 'ReporterId', flex: 3, width: 200, headerClassName: 'custom-header-cell', },
            { field: 'agent', headerName: 'AssingedAgentId', width: 270, flex: 3, headerClassName: 'custom-header-cell', },
            //{ field: 'username', headerName: 'Reporter', flex: 3, width: 200, headerClassName: 'custom-header-cell' },
            //{ field: 'agentname', headerName: 'Assigned Agent', width: 270, flex: 3, headerClassName: 'custom-header-cell' },
            {
                field: 'date',
                headerName: 'Time',
                type: 'dateTime',
                flex: 2,
                width: 250,
                valueFormatter: (params) => {
                    const date = new Date(params.value);
                    return date.toLocaleString();
                },
                headerClassName: 'custom-header-cell',
            },
            { field: 'status', headerName: 'Status', width: 150, flex: 1, headerClassName: 'custom-header-cell', checkboxSelection: true, },
        ];
    } else if (role === 'agent') {
        columns = [
            {
                field: 'checkbox',
                headerName: 'Select',
                flex: 1,
                width: 100,
                headerClassName: 'custom-header-cell',

                renderCell: (params) => {
                    return (
                        <Checkbox
                            checked={selectedRows.includes(params.id)}
                            onChange={(event) => handleRowCheckboxChange(event, params.id)}
                            onClick={(event) => event.stopPropagation()}

                        />
                    );
                },
            },
            { field: 'index', headerName: 'Sr.No.', width: 100, flex: 1, headerClassName: 'custom-header-cell', },
            { field: 'title', headerName: 'Title', flex: 2, width: 200, headerClassName: 'custom-header-cell', },
            { field: 'useremail', headerName: 'UserEmail', flex: 2, width: 200, headerClassName: 'custom-header-cell', },
            //{ field: 'username', headerName: 'Reporter Name', flex: 3, width: 200, headerClassName: 'custom-header-cell', },
            {
                field: 'date',
                headerName: 'Time',
                type: 'dateTime',
                flex: 3,
                width: 300,
                valueFormatter: (params) => {
                    const date = new Date(params.value);
                    return date.toLocaleString();
                },
                headerClassName: 'custom-header-cell',
            },
            { field: 'status', headerName: 'Status', flex: 1, width: 150, headerClassName: 'custom-header-cell', checkboxSelection: true, },
        ];
    }

    //cards height
    const cardHeight = '10em';

    return (


        <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress color="inherit" />
                </div>
            ) : (
                <>
                    <Grid
                        container
                        justifyContent="center"
                        spacing={3}


                    >
                        <Grid item xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    height: cardHeight,
                                    backgroundColor: '#fafafa',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                                onClick={() => setSelectedCategory('all')}
                            >
                                <CardContent>

                                    {role === 'admin' ? (
                                        <Typography gutterBottom variant="h3" component="div" sx={{ fontSize: '2rem', textAlign: 'center', marginTop: '0px' }}>
                                            Total Tickets
                                        </Typography>
                                    ) : (
                                        <Typography gutterBottom variant="h3" component="div" sx={{ fontSize: '1.9rem', textAlign: 'center', marginTop: '0px' }}>
                                            Assigned Tickets
                                        </Typography>
                                    )}

                                    <Typography variant="h2" color="text.secondary" sx={{ fontSize: '3rem', textAlign: 'center' }}>
                                        {allTickets.length}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    height: cardHeight,
                                    backgroundColor: '#fafafa',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                                onClick={() => setSelectedCategory('pending')}
                            >
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div" sx={{ fontSize: '2rem', textAlign: 'center' }}>
                                        Pending Tickets
                                    </Typography>
                                    <Typography variant="h2" color="text.secondary" sx={{ fontSize: '3rem', textAlign: 'center' }}>
                                        {pendingTickets.length}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    height: cardHeight,
                                    backgroundColor: '#fafafa',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                                onClick={() => setSelectedCategory('open')}
                            >
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div" sx={{ fontSize: '2rem', textAlign: 'center' }}>
                                        Open Tickets
                                    </Typography>
                                    <Typography variant="h2" color="text.secondary" sx={{ fontSize: '3rem', textAlign: 'center' }}>
                                        {openTickets.length}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    height: cardHeight,
                                    backgroundColor: '#fafafa',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                                onClick={() => setSelectedCategory('closed')}
                            >
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div" sx={{ fontSize: '2rem', textAlign: 'center' }}>
                                        Closed Tickets
                                    </Typography>
                                    <Typography variant="h2" color="text.secondary" sx={{ fontSize: '3rem', textAlign: 'center' }}>
                                        {closedTickets.length}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Toolbar sx={{ justifyContent: 'flex-end' }}>
                        {selectedRows.length > 0 && (
                            <>
                                <Button variant="contained" color="primary" onClick={openStatusDialog}>
                                    Change Status
                                </Button>
                                <Dialog open={isStatusDialogOpen} onClose={closeStatusDialog}>
                                    <DialogTitle>Select Status</DialogTitle>
                                    <DialogContent>
                                        <List>
                                            {role === 'basic' && (
                                                <>
                                                    <ListItem>
                                                        <Button onClick={() => handleStatusChange('closed')} sx={{ color: 'red' }}>
                                                            Closed
                                                        </Button>
                                                    </ListItem>
                                                </>
                                            )}
                                            {(role === 'admin' || role === 'agent') && (
                                                <>
                                                    <ListItem>
                                                        <Button onClick={() => handleStatusChange('pending')}>
                                                            Pending
                                                        </Button>
                                                    </ListItem>
                                                    <ListItem>
                                                        <Button onClick={() => handleStatusChange('open')} sx={{ color: 'green' }}>
                                                            Open
                                                        </Button>
                                                    </ListItem>
                                                    <ListItem>
                                                        <Button onClick={() => handleStatusChange('closed')} sx={{ color: 'red' }}>
                                                            Closed
                                                        </Button>
                                                    </ListItem>
                                                </>
                                            )}
                                        </List>

                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={clearSelectedRows} color="primary" >
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        )}
                    </Toolbar>



                    <div style={{ height: 600, width: '100%' }}>

                        <DataGrid
                            rows={dataForDataGridWithIndex}
                            columns={columns}
                            onCellClick={handleCellClick}
                        />


                    </div>

                </>
            )}

        </Box>
    );
};

export default Dashboard;
