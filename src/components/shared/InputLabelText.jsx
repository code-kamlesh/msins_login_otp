import InputLabel from "@mui/material/InputLabel";

function InputLabelText({ label, variant, htmlFor }) {
  return (
    <InputLabel variant={variant} htmlFor={htmlFor}>
      {label}
    </InputLabel>
  );
}

export default InputLabelText;
