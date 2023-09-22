import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { fontSize } from '@mui/system';
import SnackBar from './Snackbar';

const useStyles = makeStyles((theme) => ({

    ResponseSider:
    {
        display: "flex",
        

    },

    Labels : {
        margin:"2%"
    },

    Slider:{
        margin:"2%"
    },

    QuestionText:{

        margin:"2%",
        fontSize:"130%"
        
    }
    

}));



function Questions(props) {

    const classes = useStyles();
    const [questions, setQuestions] = useState([])

    const {eventDate} = props;
    const {eventID} = props;
    const {editDistance} = props;
    const {editedStory} = props;
    const {displayOrder} = props;

    const [showToast, setShowToast] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    //const [submitButtonDisable, setSubmitButtonDisable] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisable] = useState([false, false, false]);
    

    const [sliderValues, setSliderValues] = useState({
        1: 50, // Initial values for sliders
        2: 50,
        3: 50,
      });

    const { activeStep } = props;

    useEffect(() => {
        
        
        
        fetchQuestions();

        check_submitted_responses()

      }, [displayOrder]);


    const check_submitted_responses = async () =>  {
      console.log('check_submitted_responses')
      await fetch("https://4b97-136-206-48-13.ngrok-free.app/check_submitted_response",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({eventID: eventID, eventDate: eventDate})
        })
        .then((res) => res.json())
        .then((json) => {

          console.log(json['response'])

          if (Array.isArray(json['response'])) {
            console.log('Array')
            let submitButtonDisabled_copy = [...submitButtonDisabled]

            console.log(displayOrder, 'displayOrder')

            json['response'].forEach((item) => {
            let idx = Object.values(displayOrder).indexOf(item)
            console.log(idx, 'idx')
            if(idx> -1){
            submitButtonDisabled_copy[idx] = true}
            });
            setSubmitButtonDisable(submitButtonDisabled_copy)
            console.log(submitButtonDisabled, 'submitButtonDisabled')
          }
          else{
            console.log('Not Array')
          }
            
    })}
    

    const fetchQuestions = () => {
        fetch("https://4b97-136-206-48-13.ngrok-free.app/fetch_questions",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((json) => {
            setQuestions(json)
            console.log(json)
    })}

    const handleOnChange = (e) => {
        //sliderStates[props.sysID]['name'] = e.target.name
        //sliderStates[props.sysID]['value'] = e.target.value

        console.log(e.target.name)
        console.log(e.target.value)
        setSliderValues({
            ...sliderValues,
            [e.target.name]: e.target.value,
          });

    }

    const handleSnackBarClose = () => {
      setShowToast(false);
    };

    const submitResponse = () => {

      const requestData = {
        event_id: eventID,
        event_date: eventDate,
        editDistance: editDistance,
        editedStory: editedStory,
        system_name: displayOrder[activeStep],
        slider1: sliderValues[1],
        slider2: sliderValues[2],
        slider3: sliderValues[3],
        user: props.user
      };
    console.log(requestData)

    fetch("https://4b97-136-206-48-13.ngrok-free.app/submit_response",{
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

          let submitButtonDisabled_copy = [...submitButtonDisabled]
          //submitButtonDisabled_copy.append(requestData.system_name)
          console.log(displayOrder, 'displayOrder')
          submitButtonDisabled_copy[Object.values(displayOrder).indexOf(requestData.system_name)] = true
          setSubmitButtonDisable(submitButtonDisabled_copy)
          //console.log(submitButtonDisabled, 'submitButtonDisabled - on submit')
          setShowToast(true)
        }
        else{
          setSubmissionMessage('Response Submission Failed')
          setShowToast(true)
        }
    })}


    
    


  return (
    <div>
    <SnackBar open={showToast} close={handleSnackBarClose} message={submissionMessage}></SnackBar>
    {questions.map((tile) => (
      <div key={tile.question_id}>
        <Box>
          <p key={tile.ques_id} className={classes.QuestionText} style={{ fontSize: '18px' }}>
            {tile.ques_text} 
          </p>
          <div className={classes.ResponseSider}>
            <p className={classes.Labels}>Strongly Disagree</p>
            <Slider
              defaultValue={50}
              aria-label="Default"
              className={classes.Slider}
              name={tile.ques_id}
              onChange={(e) => handleOnChange(e)}
            />
            <p className={classes.Labels}>Strongly Agree</p>
          </div>
          <p>{props.sysID}</p>
        </Box>
      </div>
    ))}
    <Button variant='contained' fullWidth='true' onClick={submitResponse} disabled={submitButtonDisabled[activeStep]}>Submit</Button>
  </div>

);

    
}
export default Questions;
