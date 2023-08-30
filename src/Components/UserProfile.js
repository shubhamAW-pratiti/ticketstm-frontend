import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Typography,
  Paper,
  Avatar,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const userRole = localStorage.getItem("userRole");
  const [selectedRole, setSelectedRole] = useState("");
  const [useEffectCall, setUseEffectCall] = useState(true);

  const handleRoleChange = (event) => {
    const role = event.target.value;
    const token = localStorage.getItem("accessToken");
    const requestBody = new URLSearchParams();
    requestBody.append("role", role);
    axios
      .put(`${BASE_URL}/user/role/${userId}`, requestBody.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("userRole updated successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });

        setUseEffectCall(true);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  useEffect(() => {
    // Fetch user details
    if (useEffectCall) {
      axios
        .get(`${BASE_URL}/user/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            const fetchedUser = response.data.data;
            setUser(fetchedUser);
            setSelectedRole(fetchedUser.role);
          } 
        })
        .catch((error) => {
          console.error("Error fetching user details", error);
        });

      // Fetch tickets created by the user
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
          }
        })
        .catch((error) => {
          console.error("Error fetching tickets:", error);
        });
      setUseEffectCall(false);
      return;
    }
  }, [useEffectCall]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingTickets = filteredTickets.filter(
    (ticket) => ticket.status === "pending"
  );
  const openedTickets = filteredTickets.filter(
    (ticket) => ticket.status === "open"
  );
  const closedTickets = filteredTickets.filter(
    (ticket) => ticket.status === "closed"
  );

  return (
    <Grid container columnGap={2} rowGap={2} padding={4}>
      <Grid item xs={12}>
        <Paper
          elevation={3}
          style={{
            padding: "1rem",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {(user && user.firstname !== undefined) ||
            (user && user.lastname !== undefined)
              ? `${(user && user.firstname) || ""} ${
                  (user && user.lastname) || ""
                }`
              : "User Profile"}
          </Typography>
          {userRole === "admin" && (
            <Select value={selectedRole} onChange={handleRoleChange}>
              <MenuItem value="admin" disabled={selectedRole === "admin"}>
                admin
              </MenuItem>
              <MenuItem value="agent" disabled={selectedRole === "agent"}>
                agent
              </MenuItem>
              <MenuItem value="basic" disabled={selectedRole === "basic"}>
                basic
              </MenuItem>
            </Select>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        {/* ... user profile section ... */}
        <Paper
          elevation={3}
          style={{
            padding: "1rem",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Avatar"
            sx={{
              width: "60%",
              height: "auto",
              borderRadius: "50%",
              marginBottom: "1rem",
            }}
          />

          <Typography variant="h6" gutterBottom>
            {user && user.email}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ color: "grey" }}>
            {user && user.role}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Typography variant="h4">Tickets:</Typography>
        <Paper elevation={3} style={{ padding: "1rem", borderRadius: "10px" }}>
          <Grid container justifyContent="space-evenly" alignItems="center">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{tickets.length}</Typography>
              <Typography variant="subtitle2">Total Tickets</Typography>
            </div>
            <div>
              <Typography variant="h7">|</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{pendingTickets.length}</Typography>
              <Typography variant="subtitle2">Pending</Typography>
            </div>

            <div>
              <Typography variant="h7">|</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{openedTickets.length}</Typography>
              <Typography variant="subtitle2">In process</Typography>
            </div>

            <div>
              <Typography variant="h7">|</Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{closedTickets.length}</Typography>
              <Typography variant="subtitle2">Resolved</Typography>
            </div>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} marginTop={4}>
        <Typography
          variant="h5"
          gutterBottom
          style={{
            fontWeight: "bold",
          }}
        >
          Tickets Created by User
        </Typography>
        <Paper elevation={3} style={{ padding: "1rem", borderRadius: "10px" }}>
          <TextField
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "5px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span role="img" aria-label="search">
                    🔍
                  </span>
                </InputAdornment>
              ),
            }}
          />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Agent Assigned</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTickets
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((ticket) => (
                    <TableRow
                      key={ticket._id}
                      component={Link}
                      to={`/ticket/${ticket._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <TableCell>{ticket?.title}</TableCell>
                      <TableCell>
                        {ticket.status === "pending" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <PendingActionsOutlinedIcon
                              style={{ color: "orange" }}
                              textAnchor="pending"
                            />
                            <Typography>Pending</Typography>
                          </div>
                        ) : ticket.status === "open" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <MemoryOutlinedIcon style={{ color: "blue" }} />
                            <Typography>In process.</Typography>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <CheckOutlinedIcon style={{ color: "green" }} />
                            <Typography>Resolved</Typography>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{ticket.agentemail}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTickets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Paper>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default UserProfile;
