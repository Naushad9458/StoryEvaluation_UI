import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  nativeSelectClasses
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate ,Navigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    marginTop: 20,
  },
}));

const Home = ({isAuthenticated, setIsAuthenticated}) => {
  // Sample data for pending and completed tasks

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  }

  useEffect(() => {
    // Make an API call when the component mounts
    fetch('https://4b97-136-206-48-13.ngrok-free.app/fetch_tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setTasks(data);
        
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        
      });
  }, []);

  
 
  

  const classes = useStyles();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
    <Navbar handleLogout={handleLogout}/>
    <Container>


      <Typography variant="h6" component="h2" gutterBottom>
        Pending Tasks
      </Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event ID</TableCell>
              <TableCell>Sub Event ID</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Event Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              .filter((task) => task.event_type === 'normal')
              .map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.event_id}</TableCell>
                  <TableCell>{task.subevent_id}</TableCell>
                  <TableCell>{task.event_type}</TableCell>
                  <TableCell>{task.event_date}</TableCell>
                  <TableCell>
                      <Button color="primary">
                        View Details
                      </Button>
                    </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
    </div>
  );
};

export default Home;
