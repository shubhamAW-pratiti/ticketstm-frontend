import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Typography,
  Grid,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  Card,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const UserDashboard = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortingOption, setSortingOption] = useState("newest");
  const userId = localStorage.getItem("userId");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSortingOption(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/allTicketsByUser`, {
        params: {
          userId: userId,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const tickets = response.data;
          setTickets(tickets);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, [userId]);

  // Sorted Tickets based on sortingOption
  const sortedTickets =
    sortingOption === "newest"
      ? tickets.sort((a, b) => new Date(b.date) - new Date(a.date))
      : tickets.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Filtered and sorted tickets based on selectedCategory
  const categoryTickets = sortedTickets.filter((ticket) =>
    selectedCategory === "all" ? true : ticket.status === selectedCategory
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <Grid container spacing={2}>
            {/* Menu Bar */}
            <Grid
              container
              spacing={2}
              sx={{ display: "flex", flexDirection: "row", paddingX: "1rem" }}
            >
              <Grid item>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="pending">Pending Tickets</MenuItem>
                  <MenuItem value="open">Open Tickets</MenuItem>
                  <MenuItem value="closed">Closed Tickets</MenuItem>
                  <MenuItem value="all">All Tickets</MenuItem>
                </Select>
              </Grid>

              {/* Filter Tickets Newest & Oldest First */}
              <Grid item>
                <Select value={sortingOption} onChange={handleFilterChange}>
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                </Select>
              </Grid>
            </Grid>

            <Grid container sx={{ padding: 2 }} gap={2}>
              {categoryTickets.map((ticket) => (
                <Grid item key={ticket._id} xs={12} sm={6} md={3} gap={2}>
                  <Link
                    to={`/ticket/${ticket._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      sx={{
                        height: "150px",
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        padding: "1rem",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                        "&:hover": {
                          boxShadow: "0 0 5px 1px rgba(4, 4, 3, 0.3)",
                          cursor: "pointer",
                        },
                      }}
                    >
                      {/* Title & status & Description */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          title={ticket.title}
                        >
                          {ticket.title.length > 22
                            ? `${ticket.title.substring(0, 20)}..`
                            : ticket.title}
                        </Typography>

                        <div
                          style={{
                            color:
                              ticket?.status === "pending"
                                ? "orange"
                                : ticket?.status === "open"
                                ? "green"
                                : "red",
                            textTransform: "capitalize",
                            paddingRight: "10px",
                            position: "absolute",
                            top: "1.5rem",
                            right: "1.5rem",
                          }}
                        >
                          {ticket?.status}
                        </div>

                        <Typography
                          title={ticket.description}
                          sx={{
                            fontSize: "1rem",
                            color: "gray",
                          }}
                        >
                          {ticket.description.length > 70
                            ? `${ticket.description.substring(0, 70)}..`
                            : ticket.description}
                        </Typography>
                      </div>

                      {/* Date  & Time*/}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          borderTop: "1px solid #ccc",
                          paddingTop: "10px",
                        }}
                      >
                        <AccessTimeIcon sx={{ marginRight: 1 }} />
                        {new Date(ticket.date).toLocaleDateString()} -{" "}
                        {new Date(ticket.date).toLocaleTimeString()}
                      </div>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default UserDashboard;
