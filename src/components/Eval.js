import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ImageDisplay from './ImageDisp';
import StoryDisp from './StoryDisp';
import { useNavigate ,Navigate , useParams} from 'react-router-dom';


export default function Eval() {

    const { eventID } = useParams();
    const { eventDate } = useParams();
    

    return (
        <div>
            <Navbar />

            <ImageDisplay eventID={eventID} eventDate={eventDate} />
            
            <StoryDisp eventID={eventID} eventDate={eventDate}/>
            
        </div>
    );




}


