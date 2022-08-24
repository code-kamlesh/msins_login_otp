import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SingleSelect } from "react-select-material-ui";

export default function SelectOption({
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
  // const options = { option1, option2, option3, option4, option5, option6 };
  // var optionsCollage = [];

  // options?.forEach((element) => {
  //   // console.log("<===========Value=========>", element);
  //   optionsCollage.push(element);
  // });

  // const [value, setValue] = React.useState("");

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  return (
    <Box>
      {/* <FormControl variant="standard" fullWidth={fullWidth} disabled={disabled}> */}
        <InputLabel htmlFor="uncontrolled-native">{label}</InputLabel>
        {/* <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name={name}
          value={value}
          onChange={onChange}
          label={label}
          required
          // onKeyDown={(e) => e.preventDefault()}
          //minWidth="12"
          autoFocus={autoFocus}
        > */}
          {/* <option value={10}>{option1}</option>
          <option value={20}>{option2}</option>
          <option value={30}>{option3}</option>
          <option value={40}>{option4}</option>
          <option value={40}>{}</option>
          <option value={40}>{}</option> */}
          {/* {optionsCollage?.map((element) => (
            <MenuItem value={element}>{element}</MenuItem> */}
           {/* ))} */}
        {/* </Select> */}
        <SingleSelect 
          name={name}
          options={options}
          onChange={onChange}
          error={error}
        />
      {/* </FormControl> */}
    </Box>
  );
}
