// import React, { useState, useEffect } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const Daily = () => {
//   const [data, setData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   useEffect(() => {
//     axios.get(`http://localhost:3002/tickets/by-date/${selectedDate.toISOString()}`)
//       .then(response => {
//         setData(response.data);
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching ticket data:', error);
//       });
//   }, [selectedDate]);

//   return (
//     <div>
//       <div style={{ marginBottom: '1rem' }}>
//         <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
//       </div>
//       <div style={{ width: '100%', height: '600px' }}>
//         {/* You can adjust the height value above as needed */}
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="hour" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Daily;


import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

const Daily = () => {
  const [data, setData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/tickets/today`)
      .then(response => {
        setData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching ticket data:', error);
      });
  }, []);

  return (
    <div style={{ width: '100%', height: '700px' }}>
      {/* You can adjust the height value above as needed */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Daily;
