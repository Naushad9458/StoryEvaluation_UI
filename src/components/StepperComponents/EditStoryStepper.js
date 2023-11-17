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
    const {editedStory} = props;
    const {setEditedStory} = props;
    const {setEditDistance} = props;
    const {editDistance} = props;
    const {setEditPercentage} = props;

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [editDisabled, setEditDisabled] = React.useState(true);
    const [confirmEditDisabled, setConfirmEditDisabled] = React.useState(true);
    const [cancelEditDisabled, setCancelEditDisabled] = React.useState(true);
    
    const editedStoryCopy = { ...editedStory };

    const story_modify = (event) => {
      setConfirmEditDisabled(false);
      setCancelEditDisabled(false);
      editedStoryCopy['narrative_text'] = event.target.value;
      setEditedStory(editedStoryCopy);
    }


    const editStoryHandle = () => {
        setEditDisabled(false);
    };

    const handleTextFieldClick = () => {
      console.log('handleTextFieldClick')
      setEditDisabled(false);
    };

    const cancelStoryEdit = () => {
      setAlertOpen(false);
      setEditDistance(0);
      setEditPercentage(0);
      setEditedStory(story)
      setEditDisabled(true);
      setConfirmEditDisabled(true);
      setCancelEditDisabled(true);
    };

    const cancelAllEdit = () => {
      setEditedStory(story)
      setEditDisabled(true);
      setConfirmEditDisabled(true);
      setCancelEditDisabled(true);
      setEditDistance(0);
      setEditPercentage(0);
    }

    const alerthandleClickOpen = () => {
        var lev = ed.levenshtein(story['narrative_text'], editedStory['narrative_text'] , insert, remove, update);
        setEditDistance(lev.distance)
        var len_story = story['narrative_text'].length
        var len_editedStory = editedStory['narrative_text'].length
        var max_len = Math.max(len_story, len_editedStory)
        var normalized_edit_distance = (max_len - lev.distance) / max_len;
        var edit_percentage = ((1- normalized_edit_distance) * 100).toFixed(1);;

        console.log(normalized_edit_distance, 'normalized_edit_distance')
        console.log(edit_percentage, 'edit_percentage')
        setEditPercentage(edit_percentage)
        setAlertOpen(true);
    };

    const alerthandleClose = () => {
        setAlertOpen(false);
        setEditedStory(editedStoryCopy)
        setEditDisabled(true);
        setConfirmEditDisabled(true);
        setCancelEditDisabled(true);
        //console.log(editedStories[displayOrder[activeStep]], 'confirm edit story click')
        //console.log(editDisabled, 'confirm edit story click')
  
    };

    return (
    <div>

        {questions.map((tile) => (
        <div key={tile.ques_id}>
        <Box>
          <p key={tile.ques_id} style={{fontSize: '18px'}}>
            {tile.ques_text}
          </p>
          <div >
          <p>Score: <b>{sliderValues[tile.ques_id]}</b></p>
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
    value={story['narrative_text']}
    InputProps={{ style: { fontSize: 18} }}>
    </TextField>
    <AlertDialog open={alertOpen} handleConfirm={alerthandleClose} handleCancel={cancelStoryEdit} handleClickOpen={alerthandleClickOpen} editDistance={editDistance}/>
    <p><b>Edited Narrative</b></p>
    <Button onClick={editStoryHandle}>Edit Narrative</Button>
    <Button disabled={confirmEditDisabled} onClick={alerthandleClickOpen}>Confirm All Edits</Button>
    <Button onClick={cancelAllEdit}>Cancel All Edits</Button>
    <TextField 
    fullWidth
    disabled={editDisabled}
    multiline
    rows={8}
    value={editedStory['narrative_text']}
    onChange={story_modify}
    InputProps={{style:{fontSize: 18}
  }
    }>
    </TextField>
    </div>          
    );
};
export default EditStoryStepper;