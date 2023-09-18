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
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate ,Navigate} from 'react-router-dom';
import Chip from '@mui/material/Chip';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    marginTop: 20,
  },
}));

const Home = (props) => {
  // Sample data for pending and completed tasks

  const navigate = useNavigate();
  

  

  //const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  

  const viewTask = (event_id, event_date) => {
    console.log(event_date);
    console.log(event_id);
    
    navigate(`/eval/${event_date}/${event_id}`);
    //navigate(`/eval`);
  }

  useEffect(() => {
    // Make an API call when the component mounts
    fetch('https://4b97-136-206-48-13.ngrok-free.app/fetch_tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "username": props.user}),
      
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

  const handleLogout = () => {
    props.setIsAuthenticated(false);
    localStorage.removeItem('user');
    navigate('/');
  }

  const getColor = (status) => {
    switch (status) {
      case 'Unattempted':
        return 'error'; 
      case 'Partially Completed':
        return 'warning'; 
      case 'Completed':
        return 'success'; 
      default:
        return 'default'; 
    }
  }

  
 
  

  const classes = useStyles();

  if (!props.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
    <Navbar handleLogout={handleLogout} user={props.user}/>
    <Container>


      <Typography variant="h6" component="h2" gutterBottom>
        Pending Tasks
      </Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell><b>Task ID</b></TableCell>
              <TableCell><b>Event Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              .filter(task => task.status === 'Unattempted' || task.status === 'Partially Completed')
              .map((task) => (
                <TableRow key={task.event_id+'_'+task.event_date}>
                  <TableCell>{task.event_id+'_'+task.event_date}</TableCell>
                  <TableCell>{task.event_date}</TableCell>
                  <TableCell><Chip 
                  label={task.status} 
                  color={getColor(task.status)} />
                  </TableCell>
                  <TableCell>
                      <Button color="primary" onClick={() => viewTask(task.event_id, task.event_date)}>
                        View Task
                      </Button>
                    </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <hr></hr>
      <br></br>

      <Typography variant="h6" component="h2" gutterBottom>
        Completed Tasks
      </Typography>

      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell><b>Task ID</b></TableCell>
              <TableCell><b>Event Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              .filter(task => task.status === 'Completed')
              .map((task) => (
                <TableRow key={task.event_id+'_'+task.event_date}>
                  <TableCell>{task.event_id+'_'+task.event_date}</TableCell>
                  <TableCell>{task.event_date}</TableCell>
                  <TableCell><Chip 
                  label={task.status} 
                  color={getColor(task.status)} />
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
