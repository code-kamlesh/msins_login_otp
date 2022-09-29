// 
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import "./../../css/Modal.css";
function DiipDailog({ setOpenModal1}) {
  return (
    <Dialog
        open={setOpenModal1}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal1(false);
            }}
          >
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontWeight:"bold"}}>
          Startups recognized by DIPP can avail Intellectual property Rights (IPR) related benefits 
          such as IPR fast-tracking and more without requiring any other license from the Inter-Ministerial Board.
          </DialogContentText>
        </DialogContent>
      </Dialog>
  );
}

export default DiipDailog;