import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import FeatureCard from "./FeatureCard";
import featureData from "../data";

const Home = () => {
  return (
    <Container>
      <Grid container>
        {/* FIRST-SLOGAN & ACTION BUTTON */}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingY: "100px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize:'3.5rem',
            }}
          >
            One Page BootStrap
          </Typography>
          <Typography
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
              fontSize:'3.5rem',
            }}
          >
            Website Template
          </Typography>
          <Typography
            sx={{
              margin: "10px",
              fontSize:'1.5rem',
              color:'gray'
            }}
          >
            Sub Slogan Of our Website..
          </Typography>
          <Button
            variant="contained"
            sx={{
              margin: "40px",
              paddingX: "30px",
              paddingY: "10px",
            }}
          >
            Get Started
          </Button>
        </Grid>

        {/* SECOND - FEATURE COMPONENT (LOGO , TITLE , DESCRIPTION) */}
        <Grid
          container
          sx={{
            marginY: "4rem",
            padding: "1.5rem",
            background: "linear-gradient(to bottom, #f0f2f5, #d9e2ec)", // Gradient background color
            borderRadius: "0.5rem",

          }}
        >
          <Grid
            item
            sx={{
              display: "block",
            }}
          >
            <Typography color='primary' variant="h6" sx={{
              fontWeight:'bold',
              fontSize:'0.9rem',
            }}>
              Features of our Website..
            </Typography>
            <Typography sx={{
              fontWeight:'bold',  
              fontSize:'2rem',
            }}>
            A delightful Experience 
            </Typography>
            <Typography  sx={{

              fontWeight:'bold',
              marginBottom:'2rem',
              fontSize:'2.5rem',
              marginTop:'-1rem'
            }}>
            For you and Your Users.
            </Typography>
          </Grid>

          {/* FEATURES - COMPONENT */}
          {/* Feature component has a LOGO , Title & Description make a array of that and create a separate card component to rendered and it should be responsive design */}

          <Grid container>
            {featureData.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureCard
                  logo={feature.logo}
                  title={feature.title}
                  description={feature.description}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
