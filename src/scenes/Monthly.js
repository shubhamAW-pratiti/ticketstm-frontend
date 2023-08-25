import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const Monthly = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Month is 0-indexed

    axios
      .get(`${BASE_URL}/tickets/by-month`, {
        params: {
          year,
          month,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedDate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "800px",
        padding:'24px'
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h2>Select a Month and Year</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showMonthYearPicker
          dateFormat="MM/yyyy"
          
        />
      </div>

      <div style={{ width: "100%", height: "500px" }}>
        {/* You can adjust the height value above as needed */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day">
              <Label value="Days" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="count">
              <Label value="Tickets" offset={1} position="insideLeft" />
            </YAxis>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Monthly;
