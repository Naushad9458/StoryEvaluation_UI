import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AlertDialog from './../AlertDialog';

const EditStoryStepper = (props) => {
    const theme = useTheme();
    var ed = require('edit-distance');

    const insert = function(node) { return 1; };
    const remove = function(node) { return 1; };
    const update = function(stringA, stringB) { return stringA !== stringB ? 1 : 0; };

    const {questions} = props;
    const {sliderValues} = props;
    const {story} = props;
    const {editedStories} = props;
    const {editedStoryKey} = props;
    const {setEditedStories} = props;
    const {setEditDistance} = props;
    const {editDistance} = props;

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [editDisabled, setEditDisabled] = React.useState(true);

    const [confirmEditDisabled, setConfirmEditDisabled] = React.useState(true);
    const [cancelEditDisabled, setCancelEditDisabled] = React.useState(true);
    

    const editedStoriesCopy = { ...editedStories };


    const story_modify = (event) => {
      setConfirmEditDisabled(false);
      setCancelEditDisabled(false);
      editedStoriesCopy[editedStoryKey] = event.target.value;
      setEditedStories(editedStoriesCopy);
    }


    const editStoryHandle = () => {
        setEditDisabled(false);
    };

    const cancelStoryEdit = () => {
      setAlertOpen(false);
      editedStoriesCopy[editedStoryKey] = story
      setEditedStories(editedStoriesCopy)
      setEditDisabled(true);
      setConfirmEditDisabled(true);
      setCancelEditDisabled(true);
    }

    const alerthandleClickOpen = () => {
        var lev = ed.levenshtein(story, editedStories[editedStoryKey] , insert, remove, update);
        let EditDistanceCopy = [ ...editDistance ];
        EditDistanceCopy[editedStoryKey] = lev.distance
        setEditDistance(EditDistanceCopy)
        setAlertOpen(true);
      };

      const alerthandleClose = () => {
        setAlertOpen(false);
        setEditedStories(editedStoriesCopy)
        setEditDisabled(true);
        setConfirmEditDisabled(true);
        setCancelEditDisabled(true);
        //console.log(editedStories[displayOrder[activeStep]], 'confirm edit story click')
        //console.log(editDisabled, 'confirm edit story click')
  
      };

    return (
    <div>

        {questions.map((tile) => (
        <div key={tile.question_id}>
        <Box>
          <p key={tile.ques_id} style={{fontSize: '18px'}}>
            {tile.ques_text}
          </p>
          <div >
            
            <Slider
              defaultValue={sliderValues[tile.ques_id]}
              aria-label="Default"
              disabled={true}
              valueLabelDisplay="on"
            />
          </div>
        </Box>
      </div>
        ))}

    
    <p><b>Original Narrative</b></p>

    <TextField 
    fullWidth
    disabled={true}
    multiline
    rows={8}
    value={story}
    InputProps={{ style: { fontSize: 18 } }}>
    </TextField>
    <AlertDialog open={alertOpen} handleConfirm={alerthandleClose} handleCancel={cancelStoryEdit} handleClickOpen={alerthandleClickOpen} editDistance={editDistance[editedStoryKey]}/>
    <p><b>Edited Narrative</b></p>
    <Button onClick={editStoryHandle}>Edit Narrative</Button>
    <Button disabled={confirmEditDisabled} onClick={alerthandleClickOpen}>Confirm Edit</Button>
    <Button disabled={cancelEditDisabled} onClick={cancelStoryEdit}>Cancel Edit</Button>
    <TextField 
    fullWidth
    disabled={editDisabled}
    multiline
    rows={8}
    value={editedStories[editedStoryKey]}
    onChange={story_modify}
    InputProps={{style:{fontSize: 18}}}>
    </TextField>
    </div>          
    );
};
export default EditStoryStepper;