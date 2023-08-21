import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';
import { useActionData, useParams } from 'react-router-dom';
import axios from 'axios';

const categories = ['Software', 'Hardware', 'HR'];

const CreateNewTicket = () => {
    const userId = localStorage.getItem('userId');
    const [email, setEmail] = useState(null);
    const [title, setTitle] = useState('');
    const [useremail, setUserEmail] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        // Fetch user details
        if (userId) {
            // Fetch user details
            axios
                .get(`http://localhost:3002/user/${userId}`)
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
            const response = await axios.post('http://localhost:3002/newticket', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            console.log('Data saved:', response.data);

            // Clear form fields after successful submission
            setTitle('');
            setUserEmail('');
            setCategory('');
            setDescription('');

            // Show success alert
            window.alert('Ticket created successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
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
        </Box>
    );
};

export default CreateNewTicket;