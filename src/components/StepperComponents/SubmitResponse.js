import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import config from '../../config.json';
import SnackBar from '../Snackbar';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useNavigate ,Navigate} from 'react-router-dom';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from '@mui/material';

const SubmitResponse = (props) => {

    const navigate = useNavigate();

    const {taskID} = props;
    const {eventID} = props;
    const {eventDate} = props;
    const {user} = props;
    const {system_name} = props;
    const {stories} = props;
    const {editedStories} = props;
    const {editDistance} = props;
    const {editPercentage} = props;


    
    

    const {sliderValues1} = props;
    
    const [showToast, setShowToast] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submitButtonDisabled, setSubmitButtonDisable] = useState(false);

    //const [homeButtonDisabled, setHomeButtonDisable] = useState(true);


    const submit = () => {

        const requestData = {
          task_id: taskID,
          event_id: eventID,
          user: user,
          system_name: system_name,
          slider_q1: sliderValues1[1],
          slider_q2: sliderValues1[2],
          slider_q3: sliderValues1[3],
          original_story: stories['narrative_text'],
          editedStory: editDistance>0 ? editedStories['narrative_text'] : '',
          editDistance: editDistance>0 ? editDistance : 0,
          
          
        };
      //console.log('submitResponse')
      //console.log(requestData)
  
      fetch(config.SERVER_URL+"/submit_response",{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
      })
      .then((res) => res.json())
      .then((json) => {     
          if(json['status']==='Success'){
            setSubmissionMessage('Response Submitted Successfully')
            setSubmitButtonDisable(true);
            //setHomeButtonDisable(false);
            setShowToast(true);
          }
          else if (json['status']==='DB Error'){
            setSubmissionMessage('Database Error: Error while writing to DB')
            setShowToast(true)
          }
          else{
            setSubmissionMessage('Unexpected Error: Response Submission Failed')
            setShowToast(true)
          }
      })}

      const handleSnackBarClose = () => {
        setShowToast(false);
      };

      const backHome = () => {

        navigate('/home')

      }

    


return (
    <div>
        <br></br>
        <SnackBar open={showToast} close={handleSnackBarClose} message={submissionMessage}></SnackBar>
        <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              
              
              <TableCell><b>Score - Q1</b></TableCell>
              <TableCell><b>Score - Q2</b></TableCell>
              <TableCell><b>Score - Q3</b></TableCell>
              <TableCell><b>Narrative Edited?</b></TableCell>
              <TableCell><b>Total Characters Modified</b></TableCell>
              <TableCell><b>Modification Percentage</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            
            <TableRow>
                <TableCell>{sliderValues1[1]}</TableCell>
                <TableCell>{sliderValues1[2]}</TableCell>
                <TableCell>{sliderValues1[3]}</TableCell>
                <TableCell>{editDistance>0 ? 'Yes': 'No'}</TableCell>
                <TableCell>{editDistance}</TableCell>
                <TableCell>{editPercentage} %</TableCell>
            </TableRow>
          </TableBody>
          </Table>
      </TableContainer>
      <br></br>
        
        <Stack direction="row" spacing={5}>
        <Button variant="contained" onClick={submit} disabled={submitButtonDisabled} fullWidth='true'>Submit</Button>
        <Button variant="outlined" color='secondary' onClick={backHome} endIcon={<SendIcon />}>Back to Home</Button>
        </Stack>
    </div>

    );

};
export default SubmitResponse;


