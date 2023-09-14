import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Navigate} from 'react-router-dom';



const theme = createTheme();


export default function Login({isAuthenticated, setIsAuthenticated}) {

  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);




  useEffect(() => {
    // Make an API call when the component mounts
    fetch('https://4b97-136-206-48-13.ngrok-free.app/check_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setUser(data);
        
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        
      });
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    const response = await fetch('https://4b97-136-206-48-13.ngrok-free.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "username": event.currentTarget.username.value, "password": event.currentTarget.password.value}),
    });

    const body = await response.json();
    if(body!=='False' || body!=='Invalid Request'){
      console.log('Logged in')
      setIsAuthenticated(true);
      setUser(body['username']);
      console.log(user, 'user' )
      console.log(isAuthenticated)
      navigate('/home');
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}