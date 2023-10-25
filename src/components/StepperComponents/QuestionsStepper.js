import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { fontSize } from '@mui/system';
import SnackBar from '../Snackbar';

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



function QuestionsStepper(props) {

    const classes = useStyles();
    const {questions} = props;
    const {sliderValues} = props;
    const {setSliderValues} = props;

    const handleOnChange = (e) => {
        setSliderValues({
            ...sliderValues,
            [e.target.name]: e.target.value,
          });
  }

  return (
    <div>
    {questions.map((tile) => (
      <div key={tile.question_id}>
        <Box>
          <p key={tile.ques_id} className={classes.QuestionText} style={{ fontSize: '18px' }}>
            {tile.ques_text} 
          </p>
          <div className={classes.ResponseSider}>
            <p className={classes.Labels}>Strongly Disagree</p>
            <Slider
              value={sliderValues[tile.ques_id]}
              aria-label="Default"
              className={classes.Slider}
              name={tile.ques_id}
              onChange={(e) => handleOnChange(e)}
            />
            <p className={classes.Labels}>Strongly Agree</p>
          </div>
        </Box>
      </div>
    ))}
    
  </div>

);

    
}
export default QuestionsStepper;
