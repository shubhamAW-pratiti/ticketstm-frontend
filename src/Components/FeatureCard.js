import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const FeatureCard = ({ logo, title, description }) => {
  return (
    <Card sx={{
        margin: '1rem',
        height: '200px',
        borderRadius: '1rem',
        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
        borderColor:'black',
        borderWidth:'1px'
      }}>
      {/* You can place your logo here */}
      <CardContent >
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
