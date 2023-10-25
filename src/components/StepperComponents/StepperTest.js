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
import config from '../../config.json';
import SubmitResponse from './SubmitResponse';
import {useNavigate} from 'react-router-dom';

const steps = ['View Images', 'Read Narrative 1 and Evaluate', 'Edit Narrative 1', 'Read Narrative 2 and Evaluate', 
'Edit Narrative 2', 'Read Narrative 3 and Evaluate', 'Edit Narrative 3', 'Read Narrative 4 and Evaluate', 'Edit Narrative 4','Submit'];

export default function StepperTest(props) {

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [displayOrder, setDisplayOrder] = React.useState({})
  const [stories, setStories] = React.useState([])
  const [editedStories, setEditedStories] = React.useState([])

  const [questions, setQuestions] = React.useState([])

  const [sliderValues1, setSliderValues1] = React.useState({
    1: 50, // Initial values for sliders
    2: 50,
    3: 50,
  });

  const [sliderValues2, setSliderValues2] = React.useState({
    1: 50, // Initial values for sliders
    2: 50,
    3: 50,
  });

  const [sliderValues3, setSliderValues3] = React.useState({
    1: 50, // Initial values for sliders
    2: 50,
    3: 50,
  });

  const [sliderValues4, setSliderValues4] = React.useState({
    1: 50, // Initial values for sliders
    2: 50,
    3: 50,
  });

  const [editDistance, setEditDistance] = React.useState([])


  useEffect(() => {
    fetchStoryData()
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
        setStories(json[0])
        setEditedStories(json[0])
        console.log(displayOrder)
        console.log(stories[displayOrder[1]])
        console.log(stories)
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
          
          

                
          {activeStep === 0 ? <ImageDispStepper eventID={props.eventID} eventDate={props.eventDate}/> : ''}

          {activeStep === 1 ?
          <div> 
          <ImageDispStepper eventID={props.eventID} eventDate={props.eventDate}/>
          <StoryDispStepper eventID={props.eventID} eventDate={props.eventDate} story={stories[displayOrder[0]]} questions={questions} sliderValues ={sliderValues1} setSliderValues ={setSliderValues1}/> 
          </div>
          : ''}

          {activeStep === 2 ? <EditStoryStepper questions={questions} sliderValues ={sliderValues1} story={stories[displayOrder[0]]} editedStories={editedStories} editedStoryKey={displayOrder[0]} setEditedStories={setEditedStories} editDistance={editDistance} setEditDistance={setEditDistance}/> : ''}


          {activeStep === 3 ?
          <div> 
          <ImageDispStepper eventID={props.eventID} eventDate={props.eventDate}/>
          <StoryDispStepper eventID={props.eventID} eventDate={props.eventDate} story={stories[displayOrder[1]]} questions={questions} sliderValues ={sliderValues2} setSliderValues ={setSliderValues2}/> 
          </div>
          : ''}

          {activeStep === 4 ? <EditStoryStepper questions={questions} sliderValues ={sliderValues2} story={stories[displayOrder[1]]} editedStories={editedStories} editedStoryKey={displayOrder[1]} setEditedStories={setEditedStories} editDistance={editDistance} setEditDistance={setEditDistance}/> : ''}

          {activeStep === 5 ?
          <div> 
          <ImageDispStepper eventID={props.eventID} eventDate={props.eventDate}/>
          <StoryDispStepper eventID={props.eventID} eventDate={props.eventDate} story={stories[displayOrder[2]]} questions={questions} sliderValues ={sliderValues3} setSliderValues ={setSliderValues3}/> 
          </div>
          : ''}

          {activeStep === 6 ? <EditStoryStepper questions={questions} sliderValues ={sliderValues3} story={stories[displayOrder[2]]} editedStories={editedStories} editedStoryKey={displayOrder[2]} setEditedStories={setEditedStories} editDistance={editDistance} setEditDistance={setEditDistance}/> : ''}

          {activeStep === 7 ?
          <div> 
          <ImageDispStepper eventID={props.eventID} eventDate={props.eventDate}/>
          <StoryDispStepper eventID={props.eventID} eventDate={props.eventDate} story={stories[displayOrder[3]]} questions={questions} sliderValues ={sliderValues4} setSliderValues ={setSliderValues4}/> 
          </div>
          : ''}

          {activeStep === 8 ? <EditStoryStepper questions={questions} sliderValues ={sliderValues4} story={stories[displayOrder[3]]} editedStories={editedStories} editedStoryKey={displayOrder[3]} setEditedStories={setEditedStories} editDistance={editDistance} setEditDistance={setEditDistance}/> : ''}

          {activeStep === 9 ? <SubmitResponse eventID={props.eventID} eventDate={props.eventDate} user={props.user} sliderValues1 ={sliderValues1} sliderValues2 ={sliderValues2} sliderValues3={sliderValues3} sliderValues4={sliderValues4} stories={stories} editedStories={editedStories} displayOrder={displayOrder} editDistance={editDistance}/> : ''}


          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              onClick={activeStep === 0? backHome : handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
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
  );
}
