import React, { useState } from 'react';
import { Button, Container, Paper, Stack, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import bcrypt from 'bcryptjs'; 
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';

const Login_poc = ({onLogin}) => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [isEmailValid , setIsEmailValid]=useState(true);
  const [isPasswordStrong , setIsPasswordStrong]=useState(true);

  const handleEmailChange=(value)=>{
    setEmail(value);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(value));
  }

  const handlePasswordChange=(value)=>{
    setPassword(value);

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    setIsPasswordStrong(passwordPattern.test(value));
  }


  const handleLogin = async () => {
    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      // Compare hashed password using bcrypt
      const isValidPassword = await bcrypt.compare(password, storedUser.password);

      if (email === storedUser.email && isValidPassword) {
        // Show the welcome popup

        onLogin();
        navigate('/profile');

        setOpenPopup(true);
      } else {
        // Show an error message or perform other actions
        alert('Invalid credentials');
      }
    } else {
      alert('User not found');
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <Container component="main" maxWidth='md'>
      <Paper
        sx={{
          margin: 8,
          padding: 5,
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

        <TextField
          type='email'
          id="outlined-basic"
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
          id="outlined-basic"
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

        {/* Login & Reset Buttons */}
        <Stack direction={'row'} spacing={1} width={'100%'}>
          <Button
            variant='contained'
            size='large'
            fullWidth
            onClick={handleLogin}
          >
            Login
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

        {/* signup & forgot password */}
        <Stack spacing={0} direction='row' marginTop={2}>
          <ul> <Link to="/SignUp">Signup</Link> </ul>
          <ul>|</ul>
          <ul><Link to="/ForgotPass">Forgot Password</Link></ul>
        </Stack>
  


        {/* Divider */}
        <Divider flexItem sx={{ marginTop: 2 }}>
          OR
        </Divider>

        {/* Continue as a guest */}
        <Button
          fullWidth
          type='button'
          size='large'
          variant='contained'
          onClick={() => setOpenPopup(true)}
        >
          Continue As a Guest
        </Button>

        {/* Welcome Popup */}
        <Dialog open={openPopup} onClose={handleClosePopup}>
          <DialogTitle>Welcome</DialogTitle>
          <DialogContent>
            <Typography variant='body1'>Welcome to our website!</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopup} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </Paper>
    </Container>
  );
};

export default Login_poc;
