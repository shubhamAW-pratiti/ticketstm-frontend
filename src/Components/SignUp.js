import { Button, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useActiveLink } from './ActiveLinkContext';

function Signup() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [repass, setRepass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const role = 'basic';
  const { setActiveLink } = useActiveLink();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
    const newPass = e.target.value;
    setPass(newPass);
    setPasswordError('');
    if (newPass === '') {
      setPasswordError('');

    }
    // Password format validation
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[a-zA-Z\d@#$!%*?&]{8,}$/.test(
        newPass
      )
    ) {
      setPasswordError('Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@, #, $, !, %, *, ?, &).');
    } else {
      setPasswordError('');
    }
  };

  const handleRePasswordChange = (e) => {
    setRepass(e.target.value);

    if (e.target.value === '') {
      setRePasswordError('');
    }
    else if (e.target.value !== pass) {
      setRePasswordError('Passwords do not match');
    } else {
      setRePasswordError('');
    }
  };


  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    
    if (e.target.value !== '') {
      setFirstNameError('');
    }

  };

  const handleReset = () => {
    setEmail('');
    setPass('');
    setRepass('');
    setFirstName('');
    setLastName('');
    setEmailError('');
    setPasswordError('');
    setRePasswordError('');
    setFirstNameError('');

  };





  const handleSingUp = async (event) => {
    event.preventDefault();
    if (email && pass && repass && firstName && emailError==='' && passwordError==='') {
      try {
        const formData = new URLSearchParams();
        formData.append('role', role);
        formData.append('email', email);
        formData.append('password', pass);
        formData.append('firstname', firstName);
        formData.append('lastname', lastName);

        const response = await axios.post(`${BASE_URL}/signup`, formData.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        if (response) {
          if (response.status === 200) {
            const data = response.data;
            // Store accessToken in localStorage
            localStorage.setItem('accessToken', data.data.accessToken);
            //Toast message for success
            toast.success("Sign Up successfully !", {
              position: toast.POSITION.TOP_CENTER
            });

            setTimeout(() => {
              setActiveLink('/login');
              navigate('/login');
            }, 3000);
          } else {
            //toast message for warn

            toast.warn("user already exists,Please login !", {
              position: toast.POSITION.TOP_CENTER
            });


          }
        }

      } catch (error) {
        toast.error('Error in signing up:', {
          position: toast.POSITION.TOP_CENTER
        });

      }
    } else {
      toast.warn("It is mandotory to fill all required fields", {
        position: toast.POSITION.TOP_CENTER
      });
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
          SignUp
        </Typography>

        <form>
          <TextField
            label={
              <span>
                Email Id <span style={{ color: 'red' }}>*</span>
              </span>
            }
            variant="outlined"
            placeholder="Enter email address"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={emailError !== ''}
            helperText={emailError}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label={
                  <span>
                    Password <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                variant="outlined"
                placeholder="Enter password"
                type="password"
                fullWidth
                margin="normal"
                value={pass}
                onChange={handlePasswordChange}
                error={passwordError !== ''}
                helperText={passwordError}

              />

              {/* Re-enter Password field */}

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={
                  <span>
                    Confirm Password <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                variant="outlined"
                placeholder="Enter password again"
                type="password"
                fullWidth
                margin="normal"
                value={repass}
                onChange={handleRePasswordChange}
                error={rePasswordError !== ''}
                helperText={rePasswordError}
              />
            </Grid>
          </Grid>


          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label={
                  <span>
                    First Name <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                variant="outlined"
                placeholder="Enter first name"
                type="text"
                fullWidth
                margin="normal"
                value={firstName}
                onChange={handleFirstNameChange}
                error={firstNameError !== ''}
                helperText={firstNameError}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                placeholder="Enter last name"
                type="text"
                fullWidth
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={handleSingUp}
                fullWidth
                sx={{ textTransform: 'capitalize' }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                onClick={handleReset}
                fullWidth
                sx={{ textTransform: 'capitalize' }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Divider */}
        <Divider flexItem sx={{ marginTop: 2 }}>
          OR
        </Divider>


        <Button
          variant="contained"
          fullWidth
          style={{ textTransform: 'capitalize', marginBottom: '20px' }}
          onClick={() => {
            setActiveLink('/create-new-ticket');
            navigate('/create-new-ticket');
          }}          >
          CONTINUE AS GUEST
        </Button>


        <Typography align="center">
          Already signed up?{' '}

          <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}
            onClick={() => setActiveLink('/login')}
          >

            Login
          </Link>
        </Typography>
      </Paper>
      <ToastContainer />
    </Container >

  );
}

export default Signup;
