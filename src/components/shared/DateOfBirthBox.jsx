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
  autoFocus,
  value,
  disabled
}) {
  //removing dd-mm-yy of date
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <TextField
    disabled={disabled}
      fullWidth={fullWidth}
      name={name}
      label={label}
      value={value}
      id={id}
      error={error}
      helperText={helperText}
      autoComplete={autoComplete}
      onFocus={onFocus}
      autoFocus={autoFocus}
      onBlur={onBlur}
      onChange={onChange}
      type={hasValue || focus ? "date" : "text"}
      variant={variant}
      inputProps={inputProps}
      onKeyDown={(e) => e.preventDefault()}
    />
  );
}
