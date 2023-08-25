import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

const SnackBar = (props) => {
  
  return (  
      <Snackbar open={props.open} autoHideDuration={1500}
      message={props.message} onClose={props.close}>
        
      </Snackbar>
    );
}

export default SnackBar;