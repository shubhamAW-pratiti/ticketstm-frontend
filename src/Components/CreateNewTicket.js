import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';
// toast
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categories = ['Software', 'Hardware', 'HR'];

const CreateNewTicket = () => {
    const userId = localStorage.getItem('userId');
    const [email, setEmail] = useState(null);
    const [title, setTitle] = useState('');
    const [useremail, setUserEmail] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        // Fetch user details
        if (userId) {
            // Fetch user details
            axios
                .get(`${BASE_URL}/user/${userId}`)
                .then((response) => {
                    if (response.status === 200) {
                        const fetchedEmail = response.data.data.email;
                        setEmail(fetchedEmail);
                        if (fetchedEmail) {
                            setUserEmail(fetchedEmail);
                        }
                    } else {
                        console.log('Problem with fetching user details');
                    }
                })
                .catch((error) => {
                    console.log('Error fetching user details', error);
                });
        }

    }, [userId]);



    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = {
            title,
            category,
            description,
            useremail,
        };

        // Add the user field only if userId is not empty
        if (userId) {
            formData.user = userId;
        }
        try {
            const response = await axios.post(`${BASE_URL}/newticket`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            console.log('Data saved:', response.data);

            // Clear form fields after successful submission
            setTitle('');

            setCategory('');
            setDescription('');

            // Show success alert
            toast.success('Ticket Created successfully', {
                position: toast.POSITION.TOP_CENTER,
            });
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                maxWidth: 'md',
                marginTop: 5,
            }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Create New Ticket
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label={
                                    <span>
                                        Title<span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                fullWidth
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={
                                    <span>
                                        Email Id<span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                fullWidth
                                type="email"
                                value={useremail}
                                onChange={(event) => setUserEmail(event.target.value)}
                                disabled={email !== null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel sx={{ backgroundColor: 'white' }}>Category<span style={{ color: 'red' }}>*</span></InputLabel>
                                <Select value={category} onChange={(event) => setCategory(event.target.value)}>
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label={
                                    <span>
                                        Description<span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                        
                    </Grid>
                </form>
                <ToastContainer />
            </Paper>
        </Container>
    );
};

export default CreateNewTicket;