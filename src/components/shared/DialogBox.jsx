import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TermsAndConditions from "../../pages/TermsAndConditions";

export default function DialogBox({ onClick }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TermsAndConditions />
      <div>
        {/* <FormControlLabel
        control={<Checkbox name="tnc" />}
        label="I agree that my data is true and correct, However If I found guilty I will be responsible and organizations can take strict actions if required."
      /> */}
        <br />
        <Button variant="contained" onClick={handleClickOpen}>
          Submit
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to Submit Form?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Note: Once Submitted you cannot Edit the Form!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onClick} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    </>
     );
}
