import { Button, Typography } from '@mui/material'
import React from 'react'
import { Navigate } from 'react-router-dom';

const Profile = ({onLogout}) => {

  const getUserInfo=()=>{
    return JSON.parse(localStorage.getItem('user'));
  }

  const handleSignOUt=()=>{
    onLogout();
    <Navigate to='/' replace/>
  }

  return (
    <div
      style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:'80vh'
      }}
    >
      <Typography
        variant='h4'
      >
        welcome {getUserInfo().email}
      </Typography>
      {/* top right corner placement of signout */}
      <Button 
        onClick={handleSignOUt}
        variant='contained'
        sx={{
          position:'absolute',
          top:80,
          right:10
        }}
      >SignOut</Button>
    </div>
  )
}

export default Profile