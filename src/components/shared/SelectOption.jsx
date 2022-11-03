import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SingleSelect } from "react-select-material-ui";

export default function SelectOption({
  key,
  name,
  label,
  options,
  disabled,
  variant,
  error,
  minWidth,
  onChange,
  value,
  fullWidth,
  autoFocus,
}) {
  return (
    <Box>
        <SingleSelect 
        key={key}
          label={label}
          disabled={disabled}
          name={name}
          options={options}
          onChange={onChange}
          error={error}
          value={value}
        />
      {/* </FormControl> */}
    </Box>
  );
}
