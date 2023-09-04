import * as React from 'react';
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
import Navbar from './Navbar';



const theme = createTheme();


export default function Admin() {

    const start_data_processing = async (event) => {
        event.preventDefault();
        const response = await fetch('https://4b97-136-206-48-13.ngrok-free.app/run_dataprocessing_scripts', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
    });
    const body = await response.text();
    console.log(body)
    }

    return (
        <div>

        <Navbar/>
        <Button onClick={start_data_processing}>Data Processing</Button>

        </div>

    );
}
