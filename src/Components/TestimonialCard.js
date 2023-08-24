import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';

const TestimonialCard = (title, description,image,name,position) => {
  return (
    <Card>
      <CardContent>
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
  )
}

export default TestimonialCard