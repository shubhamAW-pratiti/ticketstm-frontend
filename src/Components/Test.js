import { Grid } from "@mui/material";

<Container maxWidth='md'>
    <Paper
        sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            maxWidth: 'md',
            backgroundColor: 'whitesmoke',
        }}
    >
        <Typography variant="h4" component="h4">
            Login
        </Typography>

        <Grid container spacing={2}>
            <Grid item xs={12} >
                <TextField
                          type='email'
                                id="email-signin"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                value={email}
                                error={!isEmailValid}
                                helperText={isEmailValid ? '' : 'Invalid email format'}
                                onChange={(e) => handleEmailChange(e.target.value)}
                />
                <TextField
                 type='password'
                       id="password-signin"
                       label="Password"
                       variant="outlined"
                       fullWidth
                       margin="normal"
                       required
                       value={password}
                       error={!isPasswordStrong}
                       helperText={(!isPasswordStrong) ?'password must contain letter, alphabet and special character':''}
                       onChange={(e) => handlePasswordChange(e.target.value)}
                     />
            </Grid>
        </Grid>

        {/* login & reset */}
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Button
                    variant='contained'
                    size='large'
                    fullWidth
                    onClick={handleLogin}
                >

                    Login
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                    variant="outlined"
                    size='large'
                    fullWidth
                    type="reset"

                >
                    Reset
                </Button>
            </Grid>
        </Grid>

        {/* signup & forgot pass */}

        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Link to='/Signup'>Signup </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Link to='/ForgotPass'>Forgot Password </Link>
            </Grid>
        </Grid>



    </Paper>

</Container>









import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
    Grid,
    Typography,
    Paper,
    Avatar,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch user details
        axios
            .get(`http://localhost:3002/user/${userId}`)
            .then((response) => {
                if (response.status === 200) {
                    const fetchedUser = response.data.data;
                    setUser(fetchedUser);
                } else {
                    console.log('Problem with fetching user details');
                }
            })
            .catch((error) => {
                console.log('Error fetching user details', error);
            });

        // Fetch tickets created by the user
        axios
            .get('http://localhost:3002/allTicketsByUser', {
                params: {
                    userId: userId,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    const tickets = response.data;
                    setTickets(tickets);
                } else {
                    console.log('Problem with fetching tickets');
                }
            })
            .catch((error) => {
                console.error('Error fetching tickets:', error);
            });
    }, [userId]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredTickets = tickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pendingTickets = filteredTickets.filter((ticket) => ticket.status === 'pending');
    const openedTickets = filteredTickets.filter((ticket) => ticket.status === 'opened');
    const closedTickets = filteredTickets.filter((ticket) => ticket.status === 'closed');

    return (
        <Grid container columnGap={2} rowGap={2}>
            <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: '1rem', borderRadius: '10px' }}>
                    <Typography variant="h4" gutterBottom>
                        User Profile
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
                {/* ... user profile section ... */}
                <Paper elevation={3} style={{ padding: '1rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="Avatar"
                        sx={{ width: '60%', height: 'auto', borderRadius: '50%', marginBottom: '1rem' }}
                    />

                    <Typography variant="h6" gutterBottom>
                        {user && user.email}
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ color: 'grey' }}>
                        {user && user.role}
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={3} md={3} lg={3}>
                {/* ... ticket statistics section ... */}
                <Typography variant='h4'>
                    Tickets:
                </Typography>
                <Paper elevation={3} style={{ padding: '1rem', borderRadius: '10px' }}>
                    <Grid container justifyContent="space-evenly" alignItems="center">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6">{TotalTickets}</Typography>
                            <Typography variant="subtitle2">Total Tickets</Typography>
                        </div>
                        <div>
                            <Typography variant="h7" >|</Typography>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6">{pendingTickets.length}</Typography>
                            <Typography variant="subtitle2">Pending</Typography>
                        </div>
                        
                        <div>
                            <Typography variant="h7" >|</Typography>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6">{openedTickets.length}</Typography>
                            <Typography variant="subtitle2">Opened</Typography>
                        </div>

                        <div>
                            <Typography variant="h7" >|</Typography>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6">{closedTickets.length}</Typography>
                            <Typography variant="subtitle2">Closed</Typography>
                        </div>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12} marginTop={4}>
                <Typography variant="h5" gutterBottom>
                    Tickets Created by User
                </Typography>
                <Paper elevation={3} style={{ padding: '1rem', borderRadius: '10px' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Agent Assigned</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredTickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ticket) => (
                                    <TableRow
                                        key={ticket._id}
                                        component={Link}
                                        to={`/ticket/${ticket._id}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <TableCell>{ticket?.title}</TableCell>
                                        <TableCell>
                                            {ticket.status === 'pending' ? (
                                                <HelpOutlineIcon style={{ color: 'orange' }} />
                                            ) : ticket.status === 'opened' ? (
                                                <CheckCircleOutlineIcon style={{ color: 'green' }} />
                                            ) : (
                                                <CloseIcon style={{ color: 'red' }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{ticket.agent}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredTickets.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UserProfile;



