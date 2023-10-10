import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { colors } from '@mui/material';

export default function AlertInstructions(props) {
  

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {<h3>Instructions (Please read carefully)</h3>}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>1. Go through all the images first (You might need to <b>scroll down a bit</b> to see all the images). <br/></p>
            <p>2. Then <b>form a narrative in your mind</b> based the images.<br/></p>
            <p>3. Go through the narrative <b>answer the 3 questions first.</b><br/></p>
            <p>4. We also ask you to provide a correct narrative if you think the narrative is wrong by making minimal changes and keeping the fluency and coherency of the narrative intact. <br/></p>
            <p style={{color:'red'}}>5. Always answer the questions first based on the original narratives and then proceed to editing if need be and finally click 'Submit'</p>
            <p><b>6. There are multiple narratives for each set of images. Repeat steps 1-4 for each of narratives displayed</b> <br/></p>
            <p>7. The scores you assign to narratives (for the 3 questions) are relative. A strong analogy could be when you are marking student's answer sheets in a class <br/></p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={props.handleClose} autoFocus>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}