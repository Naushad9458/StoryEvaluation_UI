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
import AlertDialog from './AlertDialog';

const StoryDisp = (props) => {
    const theme = useTheme();
    var ed = require('edit-distance');


    const insert = function(node) { return 1; };
    const remove = function(node) { return 1; };
    const update = function(stringA, stringB) { return stringA !== stringB ? 1 : 0; };

    const [activeStep, setActiveStep] = React.useState(0);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [editDisabled, setEditDisabled] = React.useState(true);
    const [stories, setStories] = React.useState([])
    const [editedStories, setEditedStories] = React.useState([])
    const [editDistance, setEditDistance] = React.useState([0,0,0])
    const [displayOrder, setDisplayOrder] = React.useState({})


    useEffect(() => {

      fetchStoryData()

      

      //setStories([
      //  "This is 1",
      //  "This is 2",
      //  "This is 3"
      //])

      //setEditedStories([
      //"This is 1",
      //"This is 2",
      //"This is 3"
      //])

    },[]);

    const fetchStoryData = () => {
      fetch("https://4b97-136-206-48-13.ngrok-free.app/fetch_stories", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({eventID: eventID, eventDate: eventDate})
        
      })
      .then((res) => res.json())
      .then((json) => {
          //console.log(json[0])
          //console.log(Object.keys(json[0]).length)
          //console.log(Object.keys(json[0])[0])

          const keys = Object.keys(json[0]);
          const dict_temp = {}

          const originalArray = new Array(keys.length)

          for (let i = 0; i < keys.length; i++) {
            originalArray[i] = i
          }

          const randomizedArray = shuffleArray([...originalArray]);

          //console.log(originalArray,'originalArray')
          //console.log(randomizedArray,'randomizedArray')

          for (let i = 0; i < keys.length; i++) {
            dict_temp[i] = keys[randomizedArray[i]]
          }
          //console.log(dict_temp)
          setDisplayOrder(dict_temp)
          setStories(json[0])
          setEditedStories(json[0])

          console.log('split')
          //console.log(editedStories[displayOrder[activeStep]].split('.').map((line, index) => ( <p key={index}>{line}</p>)))
          
          
          
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
      //console.log(event.target.value)
      //console.log(editedStories)
      //console.log(displayOrder[activeStep])
      // Create a copy of editedStories
      let editedStoriesCopy = { ...editedStories };
      // Get the key/index to update based on displayOrder and activeStep
      let keyToUpdate = displayOrder[activeStep];
      // Update the value of the key with the new value from event.target.value
      editedStoriesCopy[keyToUpdate] = event.target.value;
      setEditedStories(editedStoriesCopy)
    }

    const editStoryHandle = () => {
        console.log('edit story click!')
        setEditDisabled(false);
    };

    const alerthandleClickOpen = () => {
      var lev = ed.levenshtein(stories[displayOrder[activeStep]], editedStories[displayOrder[activeStep]] , insert, remove, update);
      setEditDistance(lev.distance)
      setAlertOpen(true);
    };

    const alerthandleClose = () => {
      setAlertOpen(false);

      let editedStoriesCopy = { ...editedStories };
      let keyToUpdate = displayOrder[activeStep];
      editedStoriesCopy[keyToUpdate] = editedStories[keyToUpdate]
      setEditedStories(editedStoriesCopy)
      setEditDisabled(true);
      console.log(editedStories[displayOrder[activeStep]], 'confirm edit story click')
      console.log(editDisabled, 'confirm edit story click')

    };
    
    
    
  

    return (
      <div>
        <AlertDialog open={alertOpen} handleClose={alerthandleClose} handleClickOpen={alerthandleClickOpen} editDistance={editDistance}/>
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
    
    </Paper>



    
    
    
    <TextField 
    fullWidth
    disabled={editDisabled}
    multiline
    rows={12}
    onChange={story_modify}
    value={editedStories[displayOrder[activeStep]]}
    InputProps={{ style: { fontSize: 18 } }}
    //value={editedStories[displayOrder[activeStep]].split('.').map((line, index) => ( <p key={index}>{line['props']}</p>))}
    >
    
    
    

    </TextField>

    
    
    <Button onClick={editStoryHandle}>Edit Narrative</Button>
    <Button onClick={alerthandleClickOpen}>Confirm Edit</Button>
    
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
  <Questions activeStep={activeStep} displayOrder={displayOrder} eventDate={eventDate} user={props.user} eventID={eventID} editDistance={editDistance[activeStep]} editedStory={editDistance[activeStep] > 0 ? editedStories[activeStep] : 'No Edit'}/>
  </div>
  );
};

export default StoryDisp;