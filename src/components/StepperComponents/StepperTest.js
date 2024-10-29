import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageDispStepper from './ImageDispStepper';
import StoryDispStepper from './StoryDispStepper';
import { useEffect } from 'react';
import EditStoryStepper from './EditStoryStepper';
import TextBoxStory from './TextBoxStory';
import config from '../../config.json';
import SubmitResponse from './SubmitResponse';
import {useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const steps = ['View Images and Imagine a Narrative', 'Read Narrative and Evaluate', 'Edit Narrative','Submit'];

export default function StepperTest(props) {

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [displayOrder, setDisplayOrder] = React.useState({})
  const [story, setStory] = React.useState([])
  const [editedStory, setEditedStory] = React.useState([])
  const [questions, setQuestions] = React.useState([])
  const [userStory, setUserStory] = React.useState('')
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);

  const [sliderValues1, setSliderValues1] = React.useState({
    1: 50, // Initial values for sliders
    2: 50,
    3: 50,
  });

  const [editDistance, setEditDistance] = React.useState(0)
  const [editPercentage, setEditPercentage] = React.useState(0)


  useEffect(() => {
    fetchStoryData_new()
    fetchQuestions()

  },[]);


  const fetchQuestions = () => {
    fetch(config.SERVER_URL+"/fetch_questions",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    .then((json) => {
        setQuestions(json)
        //console.log(json)
})}


const fetchStoryData_new = () => {
  console.log(props.system_name,'system_name')
  fetch(config.SERVER_URL+"/fetch_stories", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({eventID: props.eventID, system_name: props.system_name})
    
  })
  .then((res) => res.json())
  .then((json) => {

    //console.log(json[0])
    setStory(json[0])
    setEditedStory(json[0])
      

})}

  const fetchStoryData = () => {
    fetch(config.SERVER_URL+"/fetch_stories", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({eventID: props.eventID, eventDate: props.eventDate})
      
    })
    .then((res) => res.json())
    .then((json) => {
        
        const keys = Object.keys(json[0]);
        const dict_temp = {}
        const originalArray = new Array(keys.length)
        for (let i = 0; i < keys.length; i++) {
          originalArray[i] = i
        }
        const randomizedArray = shuffleArray([...originalArray]);

        for (let i = 0; i < keys.length; i++) {
            dict_temp[i] = keys[randomizedArray[i]]
        }
          
        setDisplayOrder(dict_temp)
        setStory(json[0])
        setEditedStory(json[0])
        //console.log(displayOrder)
        //console.log(story[displayOrder[1]])
        //console.log(story)
  })}

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i (inclusive)
      const j = Math.floor(Math.random() * (i + 1));
  
      // Swap array[i] and array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };


  const isStepOptional = (step) => {
    return step === 20;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    /*if(activeStep===0){
      
      //console.log(userStory)
      if (userStory===''){

        setSnackBarOpen(true);
        return
      }
      
    }*/
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const backHome = () => {
    navigate('/home')
  }
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>

    <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackBarClose}>
    <Alert onClose={handleSnackBarClose} severity="error" sx={{ width: '100%' }}>
          Please write a story before proceeding to the next step.
    </Alert>
    </Snackbar>

    
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          
          

                
          {activeStep === 0 ? <div><ImageDispStepper eventID={props.eventID} eventDate={props.eventDate} system_name={props.system_name}/> 
          </div>
           : ''}

          {activeStep === 1 ?
          <div> 
          <ImageDispStepper eventID={props.eventID} eventDate={props.eventDate} system_name={props.system_name}/>
          <StoryDispStepper eventID={props.eventID} eventDate={props.eventDate} system_name={props.system_name} story={story['narrative_text']} questions={questions} sliderValues ={sliderValues1} setSliderValues ={setSliderValues1}/> 
          </div>
          : ''}

          {activeStep === 2 ?
          <div>
            <ImageDispStepper eventID={props.eventID} eventDate={props.eventDate} system_name={props.system_name}/>
            <EditStoryStepper questions={questions} sliderValues ={sliderValues1} story={story} editedStory={editedStory} setEditedStory={setEditedStory} editDistance={editDistance} setEditDistance={setEditDistance} setEditPercentage={setEditPercentage}/>
          </div> 
           : ''}
          {activeStep === 3 ? <SubmitResponse taskID={props.taskID} eventID={props.eventID} eventDate={props.eventDate} system_name={props.system_name} user={props.user} sliderValues1 ={sliderValues1} stories={story} editedStories={editedStory} editDistance={editDistance} editPercentage={editPercentage}/> : ''}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              onClick={activeStep === 0? backHome : handleBack}
              sx={{ mr: 1 }}
            >
            Back
            </Button>
            <Box sx={{flex: '1 1 auto'}} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? '' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
    </div>
  );
}
