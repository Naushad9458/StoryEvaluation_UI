import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import QuestionsStepper from './QuestionsStepper';


const StoryDispStepper = (props) => {

    const {story} = props;
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
    </Paper>
    <TextField 
    fullWidth
    disabled={true}
    multiline
    rows={12}
    value={story}
    InputProps={{ style: { fontSize: 18 } }}
    >
    </TextField>
  </Box>
  <QuestionsStepper questions={props.questions} sliderValues={props.sliderValues} setSliderValues={props.setSliderValues} />
  </div>
  );
};

export default StoryDispStepper;