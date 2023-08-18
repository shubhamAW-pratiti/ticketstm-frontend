//Dashboard.js

import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
  Button,
  Toolbar,
  useMediaQuery,
  Grid,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  const role = localStorage.getItem("userRole");

  useEffect(() => {
    // Fetch all tickets format : x-www-form-urlencoded

    axios
      .get("http://localhost:3002/tickets", {
        params: {
          userId: localStorage.getItem("userId"),
          role,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const allTickets = response.data.map((ticket) => ({
            ...ticket,
            id: ticket._id,
          }));

          setTickets(allTickets);

          // console.log('all tickets', allTickets);
        } else {
          console.log("Problem with fetching tickets");
        }
      }).catch((error) => {
        console.log("Error fetching tickets", error);
      });
  }, []);

  //sort tickets by time in desc

  const sortedallTickets = tickets.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Filter tickets based on status

  const pendingTickets = sortedallTickets.filter(
    (ticket) => ticket.status === "pending"
  );

  const openTickets = sortedallTickets.filter(
    (ticket) => ticket.status === "open"
  );

  const closedTickets = sortedallTickets.filter(
    (ticket) => ticket.status === "closed"
  );

  const allTickets = pendingTickets.concat(openTickets, closedTickets);

  // Categorize the sorted tickets

  const [selectedCategory, setSelectedCategory] = useState("all");

  const categorizedTickets = {
    all: allTickets,

    pending: pendingTickets,

    open: openTickets,

    closed: closedTickets,
  };

  // Update dataForDataGridWithIndex with categorized and sorted tickets

  const dataForDataGridWithIndex = categorizedTickets[selectedCategory].map(
    (row, index) => {
      return { ...row, id: row._id, index: index + 1 };
    }
  );

  // Define the columns for the DataGrid

  let columns = [];

  if (role === "admin") {
    columns = [
      { field: "index", headerName: "Sr.No.", width: 100 },

      { field: "title", headerName: "Title", width: 200 },

      { field: "description", headerName: "Description", width: 200 },

      { field: "user", headerName: "ReporterId", width: 200 },

      { field: "agent", headerName: "AssingedAgentId", widht: 200 },

      {
        field: "date",

        headerName: "Time",

        type: "dateTime",

        width: 300,

        valueFormatter: (params) => {
          const date = new Date(params.value);

          return date.toLocaleString();
        },
      },

      { field: "status", headerName: "Status", width: 150 },
    ];
  } else if (role === "agent") {
    columns = [
      { field: "index", headerName: "Sr.No.", width: 100 },

      { field: "title", headerName: "Title", width: 200 },

      { field: "description", headerName: "Description", width: 200 },

      { field: "user", headerName: "ReporterId", width: 200 },

      {
        field: "date",

        headerName: "Time",

        type: "dateTime",

        width: 300,

        valueFormatter: (params) => {
          const date = new Date(params.value);

          return date.toLocaleString();
        },
      },

      { field: "status", headerName: "Status", width: 150 },
    ];
  } else {
    columns = [
      { field: "index", headerName: "Sr.No.", width: 100 },

      { field: "title", headerName: "Title", width: 200 },

      { field: "description", headerName: "Description", width: 200 },

      {
        field: "date",

        headerName: "Time",

        type: "dateTime",

        width: 300,

        valueFormatter: (params) => {
          const date = new Date(params.value);

          return date.toLocaleString();
        },
      },

      { field: "status", headerName: "Status", width: 150 },
    ];
  }

  const navigate = useNavigate();

  const handleCellClick = (params) => {
    // Get the ticketId from the row data

    const ticketId = params.row._id;

    navigate(`/ticket/${ticketId}`);
  };

  //cards height

  const cardHeight = "10em";

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, position: "static" }}>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Grid>
          </Grid>
          <Card
            sx={{
              height: cardHeight,

              backgroundColor: "#fafafa",

              display: "flex",

              justifyContent: "center",

              cursor: "pointer",

              transition: "background-color 0.3s",

              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            onClick={() => setSelectedCategory("all")}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                sx={{ fontSize: "2rem", textAlign: "center", marginTop: "0px" }}
              >
                Total Tickets
              </Typography>

              <Typography
                variant="h2"
                color="text.secondary"
                sx={{ fontSize: "3rem", textAlign: "center" }}
              >
                {allTickets.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: cardHeight,

              backgroundColor: "#fafafa",

              display: "flex",

              justifyContent: "center",

              cursor: "pointer",

              transition: "background-color 0.3s",

              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            onClick={() => setSelectedCategory("pending")}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                sx={{ fontSize: "2rem", textAlign: "center" }}
              >
                Pending Tickets
              </Typography>

              <Typography
                variant="h2"
                color="text.secondary"
                sx={{ fontSize: "3rem", textAlign: "center" }}
              >
                {pendingTickets.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: cardHeight,

              backgroundColor: "#fafafa",

              display: "flex",

              justifyContent: "center",

              cursor: "pointer",

              transition: "background-color 0.3s",

              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            onClick={() => setSelectedCategory("open")}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                sx={{ fontSize: "2rem", textAlign: "center" }}
              >
                Open Tickets
              </Typography>

              <Typography
                variant="h2"
                color="text.secondary"
                sx={{ fontSize: "3rem", textAlign: "center" }}
              >
                {openTickets.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: cardHeight,

              backgroundColor: "#fafafa",

              display: "flex",

              justifyContent: "center",

              cursor: "pointer",

              transition: "background-color 0.3s",

              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            onClick={() => setSelectedCategory("closed")}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                sx={{ fontSize: "2rem", textAlign: "center" }}
              >
                Closed Tickets
              </Typography>

              <Typography
                variant="h2"
                color="text.secondary"
                sx={{ fontSize: "3rem", textAlign: "center" }}
              >
                {closedTickets.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Toolbar />

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={dataForDataGridWithIndex}
          columns={columns}
          onCellClick={handleCellClick}
          sx={{
            display: "flex",

            justifyContent: "center",
          }}
        />
      </div>
    </Box>
  );
};

export default Dashboard;
