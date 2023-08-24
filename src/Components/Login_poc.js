import React, { useState } from 'react';
import { Button, Container, Paper, Stack, TextField, Typography, Divider, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Login_poc = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [openPopup, setOpenPopup] = useState(false);

  //ashish
  const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const isEmailValid = (email) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  };
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail === '') {
      setEmailError('');
    } else if (!isEmailValid(newEmail)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[a-zA-Z\d@#$!%*?&]{7,}$/g.test(password)) {
      setBtnDisabled(true);
      return;
    } else {
      setBtnDisabled(false);
      return;
    }
  };



  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === '') {
      setEmailError('Email Id can not be empty.');
      return;
    }
    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post('http://localhost:3002/login', formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('userRole', data.data.role);
        onLogin();
        //   if (data.data.role === 'admin')
        //     navigate('/dashboard');
        //   else if (data.data.role === 'basic')
        //     navigate('/dashboard');
        //   else
        //     navigate('/dashboard');
        // } else {
        //   const data = response.data;
        //   setMessage(data.message);

        if (data.data.role === 'basic')
          navigate('/userdashboard');
        else
          navigate('/dashboard');

      } else {
        const data = response.data;
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER
        });

      }

    } catch (error) {
      console.error('Error logging in:', error);

    }
  };


  // const handleClosePopup = () => {
  //   setOpenPopup(false);
  // };

  return (

    <Container component="main" maxWidth='sm'>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          maxWidth: 'md',
          marginTop: 5,
        }}
      >
        <Typography variant="h4" component="h4">
          Login
        </Typography>

        <TextField
          type='email'
          id="email-signin"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={handleEmailChange}
          error={emailError !== ''}
          helperText={emailError}

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
          onChange={handlePasswordChange}
        // error={passwordError !== ''}
        // helperText={passwordError}
        />

        {/* Login & Reset Buttons */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={btnDisabled}
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
              onClick={() => {
                setEmail('');
                setPassword('');
                setEmailError('');

              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>

        {/* signup & forgot password */}
        {/* <Stack spacing={0} direction="row" marginTop={2}>
          <ul> <Link to="/SignUp">Signup</Link> </ul>
          <ul>|</ul>
          <ul><Link to="/ForgotPass">Forgot Password</Link></ul>
        </Stack>
         */}
        {/* <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            margin: 'auto',
            marginTop: '10px',
          }}
        >
          <Link to="/SignUp" style={{ textDecoration: 'none', marginRight: '10px' }}>
            <Button variant="text" size="small" fullWidth sx={{ textTransform: 'capitalize', borderRight: '1px solid #ccc', paddingRight: '12px' }}>
              Sign Up
            </Button>
          </Link>

          <Link to="ForgotPass" style={{ width: '40%', marginRight: '10%', marginLeft: '-5%' }}>
            <Button variant="text" size="small" fullWidth sx={{ textTransform: 'capitalize', }}>
              Forgot Password
            </Button>
          </Link>
        </div> */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: 'auto',
            marginTop: '10px',
          }}
        >
          <Link to="/SignUp" style={{ textDecoration: 'none', marginRight: '10px' }}>
            <Typography variant="body1" sx={{ textTransform: 'capitalize', paddingRight: '12px', borderRight: '1px solid #ccc', color: '#1976d2' }}>
              Sign Up
            </Typography>
          </Link>

          <Link to="ForgotPass" style={{ textDecoration: 'none', width: '40%', marginRight: '5%', color: '#1976d2' }}>
            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
              Forgot Password
            </Typography>
          </Link>
        </div>



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
          onClick={() => navigate('/create-new-ticket')}
        >
          Continue As a Guest
        </Button>

        {/* Welcome Popup */}
        {/* <Dialog open={openPopup} onClose={handleClosePopup}>
          <DialogTitle>Welcome</DialogTitle>
          <DialogContent>
            <Typography variant='body1'>Welcome to our website!</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopup} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog> */}
      </Paper>
      <ToastContainer />
    </Container>

  );
};

export default Login_poc;