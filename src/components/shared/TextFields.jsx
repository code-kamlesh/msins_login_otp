import TextField from '@mui/material/TextField'
import { React } from 'react'

export default function TextFields({
  id,
  label,
  name,
  type,
  fullWidth,
  autoComplete,
  autoFocus,
  required,
  onFocus,
  onBlur,
  onChange,
  variant,
  disabled,
  placeholder,
  margin,
  helperText,
  inputProps,
  onInput,
  error,
  value
}) {
  return (
    <>
      <TextField
        margin={margin}
        fullWidth={fullWidth}
        id={id}
        label={label}
        name={name}
        value={value}
        type={type}
        inputProps={inputProps}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        autoComplete={autoComplete}
        variant={variant}
        autoFocus={autoFocus}
        disabled={disabled}
        placeholder={placeholder}
        helperText={helperText}
        onInput={onInput}
        error={error}
      >{}</TextField>
    </>
  )
}
