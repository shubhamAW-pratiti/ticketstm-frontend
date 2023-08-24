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
            variant="h2"
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            One Page BootStrap
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            Website Template
          </Typography>
          <Typography
            variant="h5"
            sx={{
              margin: "10px",
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
            marginY: "3rem",
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
            <Typography  variant="h6" sx={{
              fontWeight:'bold',

            }}>Why Build with Miui?</Typography>
            <Typography variant="h4" sx={{
              fontWeight:'bold',

            }}>
            A delightful Experience 
            </Typography>
            <Typography variant="h4" sx={{
              fontWeight:'bold',
              marginBottom:'2rem'
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
