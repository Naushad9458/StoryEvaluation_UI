import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Edit?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are modifying the narrative by making a total of {props.editDistance} edits.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleConfirm} autoFocus>
            Confirm All Edits
          </Button>

          <Button onClick={props.handleCancel} autoFocus>
            Cancel All Edits
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}