import * as React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login_poc from "./Components/Login_poc";
import SignUp from "./Components/SignUp";
import ForgotPass from "./Components/ForgotPass";
import PrivateRoute from "./Components/PrivateRoute";
import About from "./Components/About";
import TicketDetails from "./Components/TicketDetails";
import Users from "./Components/Users";
import UserProfile from "./Components/UserProfile";
import Dashboard from "./Components/Dashboard";
import CreateNewTicket from "./Components/CreateNewTicket";
import UserDashboard from "./Components/UserDashboard";
import Home from "./Components/Home";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import HomeLayout from "./Components/Layout/HomeLayout";
import Daily from "./scenes/Daily";
import Monthly from "./scenes/Monthly";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
  };

  return (
    <div>
      <Routes>
        <Route element={<HomeLayout/>}>
          <Route path="/" element={ <Home/>} />
          <Route path="/login" element={<Login_poc onLogin={handleLogin} />} />
          <Route path="/create-new-ticket" element={<CreateNewTicket/>} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ForgotPass" element={<ForgotPass />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* user , agent & Admin */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute path='/dashboard' isLoggedIn={isLoggedIn}>
                <Dashboard/>
              </PrivateRoute>
            }
          />
          <Route
            path="/userdashboard"
            element={
              <PrivateRoute path='/userdashboard' isLoggedIn={isLoggedIn}>
                <UserDashboard/>
              </PrivateRoute>
            }
          />
          <Route
            path="ticket/:ticketId"
            element={
              <PrivateRoute path="ticket/:ticketId" isLoggedIn={isLoggedIn}>
                <TicketDetails onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          <Route
            path="user/:userId"
            element={
              <PrivateRoute path="user/:userId" isLoggedIn={isLoggedIn}>
                <UserProfile onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute path="/users" isLoggedIn={isLoggedIn}>
                <Users onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          <Route
            path="daily"
            element={
              <PrivateRoute path="/daily" isLoggedIn={isLoggedIn}>
                <Daily onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          <Route
            path="monthly"
            element={
              <PrivateRoute path="/monthly" isLoggedIn={isLoggedIn}>
                <Monthly onLogout={handleLogout} />
              </PrivateRoute>
            }
            />          
          <Route
            path="/createticket"
            element={
              <PrivateRoute path="/createticket" isLoggedIn={isLoggedIn}>
                <CreateNewTicket/>
              </PrivateRoute>
            }
          />
        </Route>        
      </Routes>
    </div>
  );
}
