import React from 'react';
import Navbar from './Navbar';
import { useNavigate , useLocation} from 'react-router-dom';
import StepperTest from './StepperComponents/StepperTest';


export default function Eval(props) {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location


    //console.log(state.eventID);
    //console.log(state.eventDate);
    //console.log(state.system_name);


    //const { eventID } = useParams();
    //const { eventDate } = useParams();
    //const { system_name } = useParams();

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
            <StepperTest eventID={state.eventID} eventDate={state.eventDate} system_name={state.system_name} user={user} setUser={setUser} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            {/*<ImageDisplay eventID={eventID} eventDate={eventDate} user={user} setUser={setUser} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            <StoryDisp eventID={eventID} eventDate={eventDate} user={user} setUser={setUser} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>*/}            
        </div>
    );
}