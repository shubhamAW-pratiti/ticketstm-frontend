import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Users = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    axios
      .get(`${BASE_URL}/users`)
      .then((response) => {
        if (response.status === 200) {
          const fetchedUsers = response.data.data;
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

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchValue.toLowerCase()) &&
      (filterRole === 'all' || user.role === filterRole)
  );

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };

  return (
    <div style={{ padding: isMdScreen ? '20px' : '0' }}>
      <h2>Users</h2>

      {/* Search Bar */}
      <TextField
        label="Search by Email"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <span role="img" aria-label="search">
                🔍
              </span>
            </InputAdornment>
          ),
        }}
        fullWidth
        margin="normal"
      />

      {/* Filter by Role */}
      <FormControl>
        <Select
          value={filterRole}
          onChange={handleFilterRole}
          variant="outlined"
          margin="normal"
        >
          <MenuItem value="all">All Roles</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="agent">Agent</MenuItem>
          <MenuItem value="basic">User</MenuItem>
        </Select>
      </FormControl>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead >
            <TableRow  >
            <TableCell
                  style={{
                    fontSize: '1.2rem',
                    backgroundColor:'#f5f5f5'
                  }}
    
              >
                User Name
              </TableCell>
              <TableCell
                  style={{
                    fontSize: '1.2rem',
                    backgroundColor:'#f5f5f5'
                  }}
    
              >
                Email
              </TableCell>
              <TableCell
                  style={{
                    fontSize: '1.2rem',
                    backgroundColor:'#f5f5f5'
                  }}
    
              >
                Role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2}>Loading...</TableCell>
              </TableRow>
            ) : (
              filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    key={user._id}
                    component={Link}
                    to={`/user/${user._id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      transition: 'background-color 0.2s',
                     
                    }}
                  >
                    <TableCell>{user.firstname+' '+user.lastname}</TableCell>
                    <TableCell
                      style={{
                        // hover 
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        }
                      }}
                    >{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Users;
