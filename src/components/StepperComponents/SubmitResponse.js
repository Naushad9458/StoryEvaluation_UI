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

    const {eventID} = props;
    const {eventDate} = props;
    const {user} = props;
    //const {stories} = props;
    const {editedStories} = props;
    const {editDistance} = props;
    const {displayOrder} = props;

    const {sliderValues1} = props;
    const {sliderValues2} = props;
    const {sliderValues3} = props;
    const {sliderValues4} = props;

    const [showToast, setShowToast] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submitButtonDisabled, setSubmitButtonDisable] = useState(false);

    //const [homeButtonDisabled, setHomeButtonDisable] = useState(true);


    const submit = () => {

        const requestData = {
          event_id: eventID,
          event_date: eventDate,
          user: user,

          system_name_1: displayOrder[0],
          slider1_1: sliderValues1[1],
          slider2_1: sliderValues1[2],
          slider3_1: sliderValues1[3],
          editedStory_1: editDistance[displayOrder[0]]>0 ? editedStories[displayOrder[0]] : '',
          editDistance_1: editDistance[displayOrder[0]]>0 ? editDistance[displayOrder[0]] : 0,
          
          system_name_2: displayOrder[1],
            slider1_2: sliderValues2[1],
            slider2_2: sliderValues2[2],
            slider3_2: sliderValues2[3],
            editedStory_2: editDistance[displayOrder[1]]>0? editedStories[displayOrder[1]] : '',      
            editDistance_2: editDistance[displayOrder[1]]>0? editDistance[displayOrder[1]] : 0,
            
            system_name_3: displayOrder[2],
            slider1_3: sliderValues3[1],
            slider2_3: sliderValues3[2],
            slider3_3: sliderValues3[3],
            editedStory_3: editDistance[displayOrder[2]]>0 ? editedStories[displayOrder[2]] : '',
            editDistance_3: editDistance[displayOrder[2]]>0? editDistance[displayOrder[2]] : 0,

            system_name_4: displayOrder[3],
            slider1_4: sliderValues4[1],
            slider2_4: sliderValues4[2],
            slider3_4: sliderValues4[3],
            editedStory_4: editDistance[displayOrder[3]]>0 ? editedStories[displayOrder[3]] : '',
            editDistance_4: editDistance[displayOrder[3]]>0 ? editDistance[displayOrder[3]] : 0,
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
              
              <TableCell><b>Narrative ID</b></TableCell>
              <TableCell><b>Score - Q1</b></TableCell>
              <TableCell><b>Score - Q2</b></TableCell>
              <TableCell><b>Score - Q3</b></TableCell>
              <TableCell><b>Edited Narrative</b></TableCell>
              <TableCell><b>Edit Distance</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>{sliderValues1[1]}</TableCell>
                <TableCell>{sliderValues1[2]}</TableCell>
                <TableCell>{sliderValues1[3]}</TableCell>
                <TableCell>{editDistance[displayOrder[0]]>0 ? 'Yes': 'No'}</TableCell>
                <TableCell>{editDistance[displayOrder[0]]}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell>2</TableCell>
                <TableCell>{sliderValues2[1]}</TableCell>
                <TableCell>{sliderValues2[2]}</TableCell>
                <TableCell>{sliderValues2[3]}</TableCell>
                <TableCell>{editDistance[displayOrder[1]]>0 ? 'Yes': 'No'}</TableCell>
                <TableCell>{editDistance[displayOrder[1]]}</TableCell>
            </TableRow>
            
            <TableRow>
                <TableCell>3</TableCell>
                <TableCell>{sliderValues3[1]}</TableCell>
                <TableCell>{sliderValues3[2]}</TableCell>
                <TableCell>{sliderValues3[3]}</TableCell>
                <TableCell>{editDistance[displayOrder[2]]>0 ? 'Yes': 'No'}</TableCell>
                <TableCell>{editDistance[displayOrder[2]]}</TableCell>
            </TableRow>
            
            <TableRow>
                <TableCell>4</TableCell>
                <TableCell>{sliderValues4[1]}</TableCell>
                <TableCell>{sliderValues4[2]}</TableCell>
                <TableCell>{sliderValues4[3]}</TableCell>
                <TableCell>{editDistance[displayOrder[3]]>0 ? 'Yes': 'No'}</TableCell>
                <TableCell>{editDistance[displayOrder[3]]}</TableCell>
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


