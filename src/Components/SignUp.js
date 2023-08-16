import React, { useState } from 'react';
import { Button, Container, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Stack, TextField, Typography } from '@mui/material';
import bcrypt from 'bcryptjs'; // Import the bcrypt library
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer , toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordStrong, setIsPasswordStrong] = useState(true);
  const [openPopup , setOpenPopup]=useState(false);
  const [popupContent, setPopupContent]=useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('basic');

  const handleEmailChange = (value) => {
    setEmail(value);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(value));
  };

  const handlePasswordChange = (value) => {
    setPassword(value);

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    setIsPasswordStrong(passwordPattern.test(value));
  };

  const handleSignUp = async (e) => {

    if (isEmailValid && isPasswordStrong && email && password) {
        e.preventDefault();
          try {
            const formData = new URLSearchParams();
            formData.append('role', role);
            formData.append('email', email);
            formData.append('password', password);
        
            const response = await axios.post('http://localhost:3002/signup', formData.toString(), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            });
        
            if (response.status === 200) {
              const data = response.data;
              // Store accessToken in localStorage
              localStorage.setItem('accessToken', data.data.accessToken);
              //Toast message for success
              toast.success("Sign Up successfully !", {
                position: toast.POSITION.TOP_RIGHT
              });
              setMessage(data.message);
              window.location.href = '/';
            } else {
              const data = response.data;
              //toast message for warn
              toast.warn("user already exists,Please login !", {
                position: toast.POSITION.TOP_RIGHT
              });
              alert('User already exists, Please Login');
              setMessage(data.message);

              

            }
          } catch (error) {
            toast.error("Error signing up !", {
              position: toast.POSITION.TOP_RIGHT
            });
            console.error('Error signing up:', error);
          }
        };
          
    

    if(!email || !password){
        setPopupContent('Please enter email and password');
        setOpenPopup(true);
    }
  

     
  };

  return (
    <Container component='main' maxWidth='md'>
      <Paper
        sx={{
          margin: 8,
          padding: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          alignItems: 'center',
          backgroundColor: 'whitesmoke',
        }}
      >
        <Typography variant='h4' component={'h4'}>
          Sign Up
        </Typography>

        <Stack
          width={'100%'}
          sx={{
            gap: 5,
          }}
        >
          <TextField
            type='email'
            required
            fullWidth
            label='Email'
            id='email'
            value={email}
            error={!isEmailValid}
            helperText={isEmailValid ? '' : 'Invalid email format'}
            onChange={(e) => handleEmailChange(e.target.value)}
          />

          <TextField
            type='password'
            required
            fullWidth
            label='Password'
            id='password'
            value={password}
            error={!isPasswordStrong}
            helperText={(!isPasswordStrong) ?'password must contain letter, alphabet and special character':''}

            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </Stack>

        {/* Sign Up Button & Reset*/}
        <Stack direction={'row'} gap={2} width={'100%'}>
          <Button variant='contained' size='large' fullWidth onClick={handleSignUp}>
            Sign Up
          </Button>


          <Button
            variant="outlined"
            size='large'
            fullWidth
            type="reset"
            onClick={() => {
              setEmail('');
              setPassword('');
            }}
          >
            Reset
          </Button>
        </Stack>

          {/* Diaglog Box */}

          <Dialog open={openPopup}>
            <DialogTitle>Alert</DialogTitle>

            <DialogContent>{popupContent}</DialogContent>

            <DialogActions>
                <Button onClick={() => setOpenPopup(false)}>Close</Button>
            </DialogActions>
          </Dialog>


      </Paper>
      <ToastContainer />

    </Container>
  );
};

export default SignUp;
