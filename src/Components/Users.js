import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3002/users') // Assuming your API endpoint is '/getUsers'
      .then((response) => {
        if (response.status === 200) {
          const fetchedUsers = response.data.data; // Assuming the response structure has a 'data' field containing users
          setUsers(fetchedUsers);
          setLoading(false);
        } else {
          console.log('Problem with fetching users');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log('Error fetching users', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h4>Users</h4>
      {console.log('users', users)}
      {loading ? (
        <p>Loading...</p>
      ) : (
        users.map((user) => (
         <ListItem key={user._id}>
            <Link to={`/user/${user._id}`}
            style={{
              textDecoration: 'none',
              color: 'black',
              width: '100%',
              height:'40px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ccc',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '16px',
            }}
            >
              {/* here the box of user goes like photo , total ticket . */}
              {user?.email}
            </Link>
          </ListItem>
        ))
      )}
    </div>
  );
};

export default Users;
