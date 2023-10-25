import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ImageDisplay from './ImageDisp';
import StoryDisp from './StoryDisp';
import { useNavigate ,Navigate , useParams} from 'react-router-dom';
import StepperTest from './StepperComponents/StepperTest';


export default function Eval(props) {

    const navigate = useNavigate();

    const { eventID } = useParams();
    const { eventDate } = useParams();

    const user = props.user;
    const isAuthenticated = props.isAuthenticated;
    const setUser = props.setUser;
    const setIsAuthenticated = props.setIsAuthenticated;

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        navigate('/');
    }

    
    

    return (
        <div>
            <Navbar handleLogout={handleLogout} user={props.user}/>
            <br></br>
            <StepperTest eventID={eventID} eventDate={eventDate} user={user} setUser={setUser} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            {/*<ImageDisplay eventID={eventID} eventDate={eventDate} user={user} setUser={setUser} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            <StoryDisp eventID={eventID} eventDate={eventDate} user={user} setUser={setUser} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>*/}            
        </div>
    );
}


