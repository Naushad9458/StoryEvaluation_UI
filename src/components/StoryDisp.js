import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';
import Questions from './Questions';

const StoryDisp = (props) => {
    const theme = useTheme();
    var ed = require('edit-distance');


    const insert = function(node) { return 1; };
    const remove = function(node) { return 1; };
    const update = function(stringA, stringB) { return stringA !== stringB ? 1 : 0; };

    const [activeStep, setActiveStep] = React.useState(0);
    const [editDisabled, setEditDisabled] = React.useState(true);
    const [stories, setStories] = React.useState([])
    const [editedStories, setEditedStories] = React.useState([])
    const [editDistance, setEditDistance] = React.useState([0,0,0])


    useEffect(() => {

      console.log(editDisabled, 'editDisabled')

      setStories([
        "This is 1",
        "This is 2",
        "This is 3"
    ])

    setEditedStories([
      "This is 1",
      "This is 2",
      "This is 3"
    ])

    },[]);

    const {eventDate} = props;
    const {eventID} = props;
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const maxSteps = 3;

    const story_modify = (event) => {
      console.log(event.target.value)

      let stories_copy = [...editedStories]
      let item = [...stories_copy[activeStep]]
      item = event.target.value
      stories_copy[activeStep] = item
      setEditedStories(stories_copy)}

    const editStoryHandle = () => {
        console.log('edit story click!')
        setEditDisabled(false);
    };
    
    const confirmEditStory = () => {
      console.log(stories[activeStep], 'Edit Confirmed')
      var lev = ed.levenshtein(stories[activeStep], editedStories[activeStep] , insert, remove, update);
      console.log(lev.distance, 'Edit Confirmed')

      let editDistance_copy = [...editDistance]
      
      
      editDistance_copy[activeStep] = lev.distance
      
      setEditDistance(editDistance_copy)
      setEditDisabled(true);
      console.log(editDisabled, 'confirm edit story click')
      };

    
  

    return (
      <div>
        <Box sx={{  flexGrow: 1 }}>
        <Paper
        square
        elevation={0}
        sx={{
        display: 'flex',
        alignItems: 'center',
        height: 50,
        pl: 2,
        bgcolor: 'background.default',
      }}
    >
    <Typography>{activeStep+1}</Typography>
    </Paper>



    
    
    
    <TextField 
    fullWidth
    disabled={editDisabled}
    multiline
    rows={6}
    onChange={story_modify}
    value={editedStories[activeStep]}></TextField>

    
    
    <Button onClick={editStoryHandle}>Edit Story</Button>
    <Button onClick={confirmEditStory}>Confirm Edit</Button>
    
    <MobileStepper
      variant="text"
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
      
    /> 
  </Box>
  <Questions activeStep={activeStep} eventDate={eventDate} eventID={eventID} editDistance={editDistance[activeStep]} editedStory={editDistance[activeStep] > 0 ? editedStories[activeStep] : ''}/>
  </div>
  );
};

export default StoryDisp;