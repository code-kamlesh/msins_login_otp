import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import "./../../css/Modal.css";
function AadharModal({ setOpenModal,value}) {
  return (
    <Dialog
        open={setOpenModal}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontWeight:"bold"}}>
          Udyog Aadhaar Memorandum (UAM) is a single-page registration form under which, 
          as an MSME registration, you can self-certify your entity's existence, 
          bank details, promoter/ owner's Aadhaar details and other needed details
          </DialogContentText>
        </DialogContent>
      </Dialog>
  );
}

export default AadharModal;