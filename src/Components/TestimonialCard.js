import React from 'react'
import { Card, CardContent, Stack, Typography } from '@mui/material';

const TestimonialCard = ({title, description,image,name,position}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" sx={{
          fontWeight:'bold',
          fontSize:'1srem',
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
        <Stack direction="row" spacing={2} sx={{marginTop:'1rem', alignItems:'center'}}>
          <img src={image} alt="Proimage" style={{ width: '50px', height: '50px' }} />
          <Stack spacing={0} sx={{marginLeft:'-1rem'}}>
            <Typography variant="h6" component="div" sx={{
              fontWeight:'bold',
              fontSize:'1srem',
              paddingTop:'0.6rem'
            }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
              fontSize:'0.9rem',
              paddingTop:'0.6rem'

            }}>
              {position}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard