import { React, useState } from "react";
import TextField from "@mui/material/TextField";

export default function DateOfBirthBox({
  id,
  name,
  variant,
  label,
  autoComplete,
  helperText,
  error,
  onChange,
  margin,
  fullWidth,
  inputProps,
  autoFocus
}) {
  //removing dd-mm-yy of date
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <TextField
      margin={margin}
      fullWidth={fullWidth}
      name={name}
      label={label}
      //type="date"
      id={id}
      error={error}
      helperText={helperText}
      autoComplete={autoComplete}
      onFocus={onFocus}
      autoFocus={autoFocus}
      onBlur={onBlur}
      onChange={onChange}
      // onChange={(e) => {
      //   if (e.target.value) setHasValue(true);
      //   else setHasValue(false);
      // }}
      type={hasValue || focus ? "date" : "text"}
      variant={variant}
      inputProps={inputProps}
      onKeyDown={(e) => e.preventDefault()}
    />
  );
}
