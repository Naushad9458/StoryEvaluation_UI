import React, { useState } from 'react';
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

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  }

  
 
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskType: 'Pending',
      completionDate: null,
      description: 'Task 1 description',
    },
    {
      id: 2,
      taskType: 'Completed',
      completionDate: '2023-07-24', // Replace with an actual completion date
      description: 'Task 2 description',
    },
    // Add more tasks here...
  ]);

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
              <TableCell>Task ID</TableCell>
              <TableCell>Task Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              .filter((task) => task.taskType === 'Pending')
              .map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.taskType}</TableCell>
                  <TableCell>{task.description}</TableCell>
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

      <Typography variant="h6" component="h2" gutterBottom>
        Completed Tasks
      </Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task ID</TableCell>
              <TableCell>Task Type</TableCell>
              <TableCell>Completion Date</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              .filter((task) => task.taskType === 'Completed')
              .map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.taskType}</TableCell>
                  <TableCell>{task.completionDate}</TableCell>
                  <TableCell>{task.description}</TableCell>
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
