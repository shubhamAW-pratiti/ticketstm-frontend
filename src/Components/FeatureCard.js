import React from 'react';
import { Card, Typography } from '@mui/material';

const FeatureCard = ({ logo, title, description }) => {
  return (
    <Card sx={{
        margin: '0.3rem',
        height: '250px',
        borderRadius: '1rem',
        boxShadow: '0px 6 px 10px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        padding:'1rem',
        //onHover
        "&:hover": {
          boxShadow: "0 0 5px 1px rgba(4, 4, 3, 0.3)",
        },
      }}>
      {/* You can place your logo here */}
        {/* LOGO */}
        <img src={logo} alt="logo" style={{ width: '50px', height: '50px' , borderRadius:'13px' }} />
        <Typography variant="h5" component="div" sx={{
          fontWeight:'bold',
          fontSize:'1.3srem',
          paddingTop:'0.6rem'
        }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
          fontSize:'0.9rem',
          paddingTop:'0.6rem'

        }}>
          {description}
        </Typography>
    </Card>
  );
};

export default FeatureCard;
