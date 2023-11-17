import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function TextBoxStory(props) {



    const {userStory} = props;
    const {setUserStory} = props;

    const setStory = (event) => {
        setUserStory(event.target.value);
    }


  return (
    <TextField 
    fullWidth
    label="Imagine a narrative for the above images. Write your narrative here."
    multiline
    rows={8}
    value={userStory}
    variant="outlined"
    onChange={setStory}
    InputProps={{ style: { fontSize: 18 } }}>
    </TextField>
  );
}