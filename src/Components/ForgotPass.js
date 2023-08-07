import React ,{useState} from 'react'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'

const ForgotPass = () => {

    const[email , setEmail]=useState('');
    const[showOTPfield, setShowOTPField]=useState(false);
    const[sendedOTP,setSendedOTP]=useState('');
    const[otp , setOtp]=useState('');
    const[submitOTPButton, setSubmitOTPButton]=useState(false);

    const sendOTP=(value)=>{
        setOtp(value);
        alert("OTP is "+value);
        setShowOTPField(true);
        setSubmitOTPButton(true);
    }

    const handleEmailChange=(value)=>{
        setEmail(value);
        
    }

    const handleOTPChange=(value)=>{
        setOtp(value);
    }

    const hanldePasswordReset=()=>{
        const storedUser=JSON.parse(localStorage.getItem('user'));

        if(storedUser && email===storedUser.email){
            //OTP set
           const generatedOTP= Math.floor(10000+Math.random()*900000);
           console.log("Generated OTP",generatedOTP);
           setSendedOTP(generatedOTP);

           sendOTP(generatedOTP.toString());
        }
        else{
            alert("Email does not Exist!");
        }
        
    }

    //handle submit otp
    const handleSubmitOTP=()=>{
        if(otp==sendedOTP){
            alert("OTP validated successfully");
        }
        else{
            alert("Wrong OTP entered!");
        }
    }
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
                    onChange={(e)=>handleEmailChange(e.target.value)}
                    disabled={showOTPfield}

                />

               {showOTPfield&&(
                    <TextField
                    type='number'
                    required
                    fullWidth
                    label='OTP'
                    onChange={(e)=>handleOTPChange(e.target.value)}
                />
               )} 
            

            {/* Send OTP */}

            {!submitOTPButton && (
                <Button fullWidth variant='contained' onClick={hanldePasswordReset}>Send OTP</Button>
            )}

            {submitOTPButton &&(
                <Button fullWidth variant='contained'onClick={handleSubmitOTP}>Submit OTP</Button>
            )}
            
        </Paper>

    </Container>
  )
}

export default ForgotPass