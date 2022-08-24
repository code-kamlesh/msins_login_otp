import React from "react";
import Grid from "@mui/material/Grid";
import SelectOption from "./SelectOption";
import  TextField  from '@mui/material/TextField';

export default function AddressData({
  pincodeId,
  pincodeName,
  pincodeType,
  pincodeLabel,
  districtId,
  districtLabel,
  districtName,
  fullWidth,
  selectDistrictNameOptions,
  cityId,
  cityName,
  CityLabel,
  selectCityNameOptions,
  villageId,
  villageName,
  VillageLabel,
  selectVillageNameOptions,
  onChange,
  autoFocus,
  options
}) {
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          required
          id="pincode"
          name="pincode"
          type="number"
          label="Pincode"
          fullWidth="fullWidth"
          autoComplete="pincode"
          variant="standard"
          onChange={onChange}
          autoFocus={autoFocus}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 6);
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SelectOption
          label="District"
          id="district"
          name="district"
          options={options}
          variant="standard"
          onChange={onChange}
          fullWidth="fullWidth"
          autoFocus={autoFocus}
          //onKeyDown={(e) => e.preventDefault()}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SelectOption
          id="city"
          name="city"
          label="City"
          fullWidth="fullWidth"
          options={options}
          onChange={onChange}
          autoFocus={autoFocus}
          //onKeyDown={(e) => e.preventDefault()}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SelectOption
          id="village"
          name="village"
          label="Village"
          fullWidth="fullWidth"
          autoFocus={autoFocus}
          options={options}
          onChange={onChange}
          //onKeyDown={(e) => e.preventDefault()}
        />
      </Grid>
    </>
  );
}
