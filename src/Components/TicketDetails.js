import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TicketDetails = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [statusOptions, setStatusOptions] = useState([
    "pending",
    "open",
    "closed",
  ]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [commentuser, setCommentUser] = useState("");
  const [comments, setComments] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [agentemail, setAgentEmail] = useState(null);
  const [useremail, setUserEmail] = useState(null);

  const userId = localStorage.getItem("userId");

  const handleAgentChange = (event) => {
    const newAgentId = event.target.value;
    setSelectedAgent(newAgentId);
    const newAgent = agents.find((agent) => agent._id === newAgentId);
    if (newAgent) {
      setAgentEmail(newAgent.email);
    }
  };

  const handleAssignAgent = () => {
    try {
      const formData = new URLSearchParams();
      formData.append("agentId", selectedAgent);
      formData.append("ticketId", ticketId);
      formData.append("id", userId);
      formData.append("agentemail", agentemail);

      axios
        .post(`${BASE_URL}/assignTicketToAgent`, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          toast.success("Agent Assigned for Ticket successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setRefresh(!refresh);
        })
        .catch((error) => {
          console.error('Error assigning agent for ticket', error);
        });
    } catch (error) {
      console.error('Error assigning agent for ticket', error);
    }
    setSelectedAgent("");
    setAgentEmail("");
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/ticketDetailsById/${ticketId}`)
      .then((response) => {
        if (response.status === 200) {
          const fetchedTicket = response.data;
          setTicket(fetchedTicket);
          setSelectedStatus(fetchedTicket.status); // Set the initial status
        }
      })
      .catch((error) => {
        console.error("Error fetching ticket details:", error);
      });
  }, [ticketId, refresh]);

  // Fetch comments for the ticket
  useEffect(() => {
    axios
      .get(`${BASE_URL}/ticketDetailsById/${ticketId}`)
      .then((response) => {
        if (response.status === 200) {
          const fetchedTicket = response.data;
          setTicket(fetchedTicket);
          setSelectedStatus(fetchedTicket.status); // Set the initial status
        }
      })
      .catch((error) => {
        console.error("Error fetching ticket details:", error);
      });

    // Fetch comments for the ticket
    axios
      .get(`${BASE_URL}/commentsInTicket/${ticketId}`)
      .then((response) => {
        if (response.status === 200) {
          setComments(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });

    //Fetch Agents
    axios
      .get(`${BASE_URL}/getAgents`)
      .then((response) => {
        if (response.status === 200) {
          const fetchedAgents = response.data.data;
          setAgents(fetchedAgents);
        }
      })
      .catch((error) => {
        console.error("Error fetching agents", error);
      });
  }, [ticketId, statusUpdate, selectedAgent]);

  //get user from userId
  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          const fetchedUser = response.data.data;
          setUserEmail(fetchedUser.email);
          localStorage.setItem("userEmail", fetchedUser.email);
        }
      })
      .catch((error) => {
        console.error("Error fetching user details", error);
      });
  }, [ticketId]);

  // Handle status change
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
  };

  // Handle update status
  const handleUpdateStatus = () => {
    try {
      const newStatus = selectedStatus;
      const comment = commentuser;
      const agentId = localStorage.getItem("userId");

      const formData = new URLSearchParams();
      formData.append("ticketId", ticketId);
      formData.append("newStatus", newStatus);
      formData.append("comment", comment);
      formData.append("id", agentId);

      axios
        .put(`${BASE_URL}/update-ticket`, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          toast.success("Ticket status updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setStatusUpdate(!statusUpdate);
        })
        .catch((error) => {
          console.error("Error updating ticket status", error);
        });
    } catch (error) {
      console.error("Error updating ticket status", error);
    }
  };

  return (
    <Grid
      container
      gap={5}
      sx={{
        padding: {
          xs: "0",
          sm: "1rem",
          md: "1.5rem",
        },
      }}
    >
      {/* LEFT PANEL -TICKET DETAILS */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            padding: "2rem",
          }}
        >
          <h1
            style={{
              fontFamily: "sans-serif",
              backgroundColor: "whitesmoke",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Ticket Details:
          </h1>

          <Typography variant="h6" gutterBottom component="div">
            <span
              style={{
                color: "gray",
              }}
            >
              TicketId:{" "}
            </span>
            {ticket?.ticketId}
          </Typography>

          <Typography variant="h6" gutterBottom component="div">
            <span style={{ color: "gray" }}>Title:</span> {ticket?.title}
          </Typography>

          {localStorage.getItem("userRole") !== "basic" && (
            <Typography variant="h6" gutterBottom component="div">
              <span style={{ color: "gray" }}>Created By:</span>{" "}
              {ticket?.useremail}
            </Typography>
          )}

          <Typography variant="h6" gutterBottom component="div">
            <span style={{ color: "gray" }}>Description:</span>{" "}
            {ticket?.description}
          </Typography>

          <Typography variant="h6" gutterBottom component="div">
            <span style={{ color: "gray" }}>Status:</span> {ticket?.status}
          </Typography>

          <Typography variant="h6" gutterBottom component="div">
            <span style={{ color: "gray" }}>Category:</span> {ticket?.category}
          </Typography>

          {ticket?.agent ? (
            <Typography variant="h6" gutterBottom component="div">
              <span style={{ color: "gray" }}>Agent:</span> {ticket.agentemail}
              {userId === ticket.agent && <span> (you)</span>}
            </Typography>
          ) : (
            <Typography variant="h6" gutterBottom component="div">
              <span style={{ color: "gray" }}>Agent:</span> Not Assigned
            </Typography>
          )}

          <Typography variant="h6" gutterBottom component="div">
            <span style={{ color: "gray" }}>Comment:</span>
          </Typography>

          <TextField
            id="outlined-multiline-static"
            label="Comment"
            fullWidth
            multiline
            onChange={(e) => setCommentUser(e.target.value)}
          >
            Comment
          </TextField>

          <FormControl style={{ width: "100%", marginTop: "10px" }}>
            <Typography variant="h6" gutterBottom component="div">
              <span style={{ color: "gray" }}>Status:</span>
            </Typography>
            <Select value={selectedStatus} onChange={handleStatusChange}>
              {statusOptions.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleUpdateStatus}
            style={{
              marginTop: "30px",
            }}
          >
            Update
          </Button>

          {localStorage.getItem("userRole") === "admin" && (
            <FormControl style={{ width: "100%", marginTop: "10px" }}>
              <Typography variant="h6" gutterBottom component="div">
                <span style={{ color: "gray" }}>Assign Agent:</span>
              </Typography>
              <Select value={selectedAgent} onChange={handleAgentChange}>
                {agents.map((agent) => (
                  <MenuItem key={agent._id} value={agent._id}>
                    ({agent._id}) - {agent.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {selectedAgent && (
            <Button
              variant="contained"
              onClick={handleAssignAgent}
              style={{
                marginTop: "30px",
              }}
            >
              Assign
            </Button>
          )}
        </Paper>
      </Grid>

      {/* COMMENT GRID */}
      <Grid item xs={12} md={5}>
        <Paper
          elevation={3}
          sx={{
            padding: "2rem",
          }}
        >
          <h1
            style={{
              fontFamily: "sans-serif",
              backgroundColor: "whitesmoke",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Comments:{" "}
          </h1>

          <Typography variant="h6">
            Total Comments: {comments.length}
          </Typography>
          {comments.length > 0 ? (
            <List>
              {comments.map((comment) => (
                <ListItem
                  key={comment._id}
                  sx={{
                    borderBottom: "1px solid gray",
                    borderRadius: "5px",
                    marginTop: "10px",
                    padding: "10px",
                  }}
                >
                  <ListItemText
                    primary={comment.comment}
                    secondary={`By ${localStorage.getItem(
                      "userEmail"
                    )} on ${new Date(comment.date).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <p>No comments available for this ticket.</p>
          )}
        </Paper>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default TicketDetails;
