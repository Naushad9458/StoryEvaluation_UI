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
import { useNavigate ,Navigate, useHistory} from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Config from '../config.json';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    marginTop: 20,
  },
}));

const Home = (props) => {
  // Sample data for pending and completed tasks

  const navigate = useNavigate();
  //const history = useHistory();
  

  

  //const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  

  const viewTask = (event_id, event_date, system_name) => { 
    //navigate(`/eval/${event_date}/${event_id}/${system_name}` , { state: { key: "value" } });

    navigate(`/eval` , { 
      state: { 
        eventID: event_id,
        eventDate: event_date,
        system_name: system_name,
      }});
    };
    

  useEffect(() => {
    // Make an API call when the component mounts
    fetch(Config.SERVER_URL+'/fetch_tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "username": props.user}),
      
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log('Success:', data);
        setTasks(data);
        
      })
      .catch((error) => {
        //console.error('Error fetching data: ', error);
        
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
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              .filter(task => task.status === 'Unattempted' || task.status === 'Partially Completed')
              .map((task) => (
                <TableRow key={task.task_id}>
                  <TableCell>{task.task_id}</TableCell>
                  <TableCell><Chip 
                  label={task.status} 
                  color={getColor(task.status)}/>
                  </TableCell>
                  <TableCell>
                      <Button color="primary" onClick={() => viewTask(task.event_id, task.system_name)}>
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
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              .filter(task => task.status === 'Completed')
              .map((task) => (
                <TableRow key={task.task_id}>
                  <TableCell>{task.task_id}</TableCell>
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
