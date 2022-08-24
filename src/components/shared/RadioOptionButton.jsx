import * as React from "react";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioOptionButton({ labelName, options, value }) {
  var optionsCollage = [];

  options?.forEach((element) => {
    // console.log("<===========Value=========>", element);
    optionsCollage.push(element);
  });
  const [defaultBtnValue, setDefaultBtnValue] = useState(30);

  return (
    <FormControl>
      <FormLabel
        sx={{ mb: 0.3, mt: 0.8, ml: 1 }}
        id="demo-row-radio-buttons-group-label"
        style={{ color: "inherit" }}
      >
        {labelName}
      </FormLabel>
      <RadioGroup
        sx={{ m: 1, mt: 0 }}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {optionsCollage?.map((element) => (
          <option value={element}>{element}</option>
        ))}
        <FormControlLabel
          value="30"
          //defaultValue="30"
          control={<Radio />}
          label="30"
          checked={defaultBtnValue === 30}
          onClick={() => setDefaultBtnValue(30)}
        />
        <FormControlLabel
          value="90"
          control={<Radio />}
          label="90"
          checked={defaultBtnValue === 90}
          onClick={() => setDefaultBtnValue(90)}
        />

        {/* <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        /> */}
      </RadioGroup>
    </FormControl>
  );
}
