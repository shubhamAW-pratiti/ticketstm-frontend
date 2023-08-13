import React, { useState } from 'react';
import { Button, Container, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Stack, TextField, Typography } from '@mui/material';
import bcrypt from 'bcryptjs'; // Import the bcrypt library
import { Link } from 'react-router-dom';
import axios from 'axios';

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

        // //checked if user already exist
        // const storedUser=JSON.parse(localStorage.getItem('user'));

        // if(storedUser && storedUser.email===email){
        //     const isValidPassword = await bcrypt.compare(password, storedUser.password);

        //     if(email===storedUser.email && isValidPassword){
        //         setPopupContent('User already exist, Please Login');
        //         setOpenPopup(true);
        //     }
        // }
        // else {

        //         // Hash the password
        //         const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        //         const user = {
        //             email: email,
        //             password: hashedPassword, // Store the hashed password
        //         };
        //         localStorage.setItem('user', JSON.stringify(user));
        //         setEmail('');
        //         setPassword('');
        //         alert('User created successfully');
        // }

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
              alert('User created successfully');
              setMessage(data.message);
            } else {
              const data = response.data;
              alert('User already exists, Please Login');
              setMessage(data.message);
            }
          } catch (error) {
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
    </Container>
  );
};

export default SignUp;
