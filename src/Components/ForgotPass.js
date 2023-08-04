import React from 'react'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'

const ForgotPass = () => {
  return (
    <Container component='main' maxWidth='md'>
        <Paper
            sx={{
                margin: 8,
                padding: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                alignItems:'center',
            }}
        >
            <Typography variant='h4' component={'h4'}>Forgot Password</Typography>

            
                <TextField
                    type='email'
                    required
                    fullWidth
                    label='Email'
                />
            

            {/* Send OTP */}

            <Button fullWidth variant='contained' onClick={()=>"OTP sent to Your email"}>Send OTP</Button>
        </Paper>

    </Container>
  )
}

export default ForgotPass