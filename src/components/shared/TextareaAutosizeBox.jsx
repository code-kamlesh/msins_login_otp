import React from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  textarea: {
    resize: "both",
  },
}));

export default function TextareaAutosizeBox({
  id,
  name,
  label,
  placeholder,
  fullWidth,
  required,
  onChange,
  autoFocus,
  inputProps,
}) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Box>
        <TextField
          id={id}
          label={label}
          name={name}
          placeholder={placeholder}
          minRows={1}
          fullWidth={fullWidth}
          multiline
          variant="outlined"
          // inputProps={inputProps}
          required={required}
          onChange={onChange}
          autoFocus={autoFocus}
          inputProps={{ maxLength: 100 }}
        />
      </Box>
    </form>
  );
}
