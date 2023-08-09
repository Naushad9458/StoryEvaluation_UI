import React, { useState } from 'react';
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

const StoryDisp = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [editDisabled, setEditDisabled] = React.useState(true);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const maxSteps = 3;

    const editStoryHandle = () => {
        console.log('edit story click!')
        setEditDisabled(false);};
    
    const confirmEditStory = () => {
        console.log('Edit Confirmed')
        setEditDisabled(true);};

    const stories =[
        "This is 1",
        "This is 2",
        "This is 3"
    ]
  

    return (
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
    value={stories[activeStep]}></TextField>

    
    
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
  );
};

export default StoryDisp;