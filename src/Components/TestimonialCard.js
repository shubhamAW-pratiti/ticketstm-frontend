import React from "react";
import { Card, Stack, Typography } from "@mui/material";

const TestimonialCard = ({ title, description, image, name, position }) => {
  return (
    <Card
      sx={{
        margin: "0.3rem",
        height: "300px",
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-start',
        padding:'1rem',
        borderRadius: "1rem",
        boxShadow: "0px 6 px 10px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
        {/* Title */}
        <div>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              fontSize: "1srem",
              paddingTop: "0.6rem",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.9rem",
              paddingTop: "0.6rem",
            }}
          >
            {description}
          </Typography>
        </div>
        {/* User Profile & Name , Position */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginTop: "1rem", alignItems: "center" }}
        >
          <img
            src={image}
            alt="Proimage"
            style={{ width: "50px", height: "50px" , borderRadius:'10px' }}
          />
          <Stack spacing={0} sx={{ marginLeft: "-1rem" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                fontSize: "1srem",
                paddingTop: "0.6rem",
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.9rem",
                paddingTop: "0.6rem",
              }}
            >
              {position}
            </Typography>
          </Stack>
        </Stack>
    </Card>
  );
};

export default TestimonialCard;
