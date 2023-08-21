import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login_poc from "./Components/Login_poc";
import SignUp from "./Components/SignUp";
import ForgotPass from "./Components/ForgotPass";
import PrivateRoute from "./Components/PrivateRoute";
import About from "./Components/About";
import TicketDetails from "./Components/TicketDetails";
import Users from "./Components/Users";
import UserProfile from "./Components/UserProfile";
import Daily from "./scenes/Daily";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import Dashboard from "./Components/Dashboard";
import Monthly from "./scenes/Monthly";
import Profile from './Components/Profile'
import CreateTicketForm from "./Components/CreateTicketForm";
import CreateNewTicket from "./Components/CreateNewTicket";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  localStorage.setItem("mode", "dark");
  const [mode, setMode] = useState(localStorage.getItem("mode"));
  let theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
  };

  return (
    //  <ThemeProvider theme={theme}>
    //  <CssBaseline />
    <div>
      <Routes>

        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute path='/dashboard' isLoggedIn={isLoggedIn}>
                {/* Dashboard */}
                <Dashboard/>
              </PrivateRoute>
            }
          />

          {/* ticket Details */}
          <Route
            path="ticket/:ticketId"
            element={
              <PrivateRoute path="ticket/:ticketId" isLoggedIn={isLoggedIn}>
                <TicketDetails onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* users details */}
          <Route
            path="user/:userId"
            element={
              <PrivateRoute path="user/:userId" isLoggedIn={isLoggedIn}>
                <UserProfile onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Users */}
          <Route
            path="users"
            element={
              <PrivateRoute path="/users" isLoggedIn={isLoggedIn}>
                <Users onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Daily */}

          <Route
            path="daily"
            element={
              <PrivateRoute path="/daily" isLoggedIn={isLoggedIn}>
                <Daily onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Monthly */}

          <Route
            path="monthly"
            element={
              <PrivateRoute path="/monthly" isLoggedIn={isLoggedIn}>
                <Monthly onLogout={handleLogout} />
              </PrivateRoute>
            }
            />
          
          {/* User create Ticket */}
          <Route
            path="/createticket"
            element={
              <PrivateRoute path="/createticket" isLoggedIn={isLoggedIn}>
                <CreateNewTicket/>
              </PrivateRoute>
            }
          />
          
        </Route>

        {/* <Route element={<AdminLayout onLogout={handleLogout} />}>
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <AdminDashboard onLogout={handleLogout} />
              </PrivateRoute>
            }
          /> */}

          {/* ticket Details */}
          {/* <Route
            path="ticket/:ticketId"
            element={
              <PrivateRoute path="ticket/:ticketId" isLoggedIn={isLoggedIn}>
                <TicketDetails onLogout={handleLogout} />
              </PrivateRoute>
            }
          /> */}
          {/* users details */}
          {/* <Route
            path="user/:userId"
            element={
              <PrivateRoute path="user/:userId" isLoggedIn={isLoggedIn}>
                <UserProfile onLogout={handleLogout} />
              </PrivateRoute>
            }
          /> */}

          {/* Users */}
          {/* <Route
            path="users"
            element={
              <PrivateRoute path="/users" isLoggedIn={isLoggedIn}>
                <Users onLogout={handleLogout} />
              </PrivateRoute>
            }
          /> */}
           {/* <Route
            path="/profile"
            element={
              <PrivateRoute path="/profile" isLoggedIn={isLoggedIn}>
                <Profile onLogout={handleLogout} />
              </PrivateRoute>
            }
          /> */}

          {/* Daily */}

          {/* <Route
            path="daily"
            element={
              <PrivateRoute path="/daily" isLoggedIn={isLoggedIn}>
                <Daily onLogout={handleLogout} />
              </PrivateRoute>
            }
          /> */}

        {/* User Layout */}
        {/* <Route element={<UserLayout />}> */}
          {/* <Route
            path="/profile"
            element={
              <PrivateRoute path="/profile" isLoggedIn={isLoggedIn}>
                <Profile onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          <Route
            path="/ticket/:ticketId"
            element={
              <PrivateRoute path="/ticket/:ticketId" isLoggedIn={isLoggedIn}>
                <TicketDetails onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
        </Route> */}

        {/* Agent Layout */}
        {/* <Route element={<AgentLayout />}>
          <Route
            path="/agent-dashboard"
            element={
              <PrivateRoute path="/agent-dashboard" isLoggedIn={isLoggedIn}>
                <AgentDashboard onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          <Route
            path="/ticket/:ticketId"
            element={
              <PrivateRoute path="/ticket/:ticketId" isLoggedIn={isLoggedIn}>
                <TicketDetails onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
        </Route> */}

        <Route path="/" element={<Login_poc onLogin={handleLogin} />} />
        <Route path="/create-new-ticket" element={<CreateNewTicket/>} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPass" element={<ForgotPass />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* <Footer/> */}
    </div>
    // </ThemeProvider>
  );
}
