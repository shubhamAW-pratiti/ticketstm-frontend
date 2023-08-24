import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const FeatureCard = ({ logo, title, description }) => {
  return (
    <Card sx={{
        margin: '0.3rem',
        height: '200px',
        borderRadius: '1rem',
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        // backgroundColor:'red',
      }}>
      {/* You can place your logo here */}
      <CardContent >
        {/* LOGO */}
        <img src={logo} alt="logo" style={{ width: '50px', height: '50px' }} />
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
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
