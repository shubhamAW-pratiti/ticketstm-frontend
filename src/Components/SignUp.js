import React, { useState } from 'react';
import { Button, Container, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Stack, TextField, Typography } from '@mui/material';
import bcrypt from 'bcryptjs'; // Import the bcrypt library
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordStrong, setIsPasswordStrong] = useState(true);
  const [openPopup , setOpenPopup]=useState(false);
  const [popupContent, setPopupContent]=useState('');

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

  const handleSignUp = async () => {

    if (isEmailValid && isPasswordStrong && email && password) {

        //checked if user already exist
        const storedUser=JSON.parse(localStorage.getItem('user'));

        if(storedUser && storedUser.email===email){
            const isValidPassword = await bcrypt.compare(password, storedUser.password);

            if(email===storedUser.email && isValidPassword){
                setPopupContent('User already exist, Please Login');
                setOpenPopup(true);
            }
        }
        else {

                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

                const user = {
                    email: email,
                    password: hashedPassword, // Store the hashed password
                };
                localStorage.setItem('user', JSON.stringify(user));
                setEmail('');
                setPassword('');
                alert('User created successfully');
        }
          
    }

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
