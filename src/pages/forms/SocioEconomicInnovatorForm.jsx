import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import SelectOption from "../../components/shared/SelectOption";
import { Button } from "@mui/material";
import { saveSocioDetails,fetchSocioDetails } from "./../../utility/Api";


const dbUserId = 1000011
export default function SocioEconomicInnovatorForm() {
  const selectPhysicalChallengedButton = ["Yes", "No"];
  const [scoioEconomicData, setScoioEconomicData] = useState({"dbUserId":dbUserId,"physicallyChallenged":'',"maritalStatus":'',"isActive":"Y","membersInHousehold":0,"brothers":0,"sisters":0,"rooms":0,"createdBy":7000019,
  "updatedBy":7000019});
  const selectMaritalStatusButton = [
    "Married",
    "Unmarried",
    "Divorced/ Separated",
  ];
const onChangePhysicalChallenged = (event)=>{
  if(event?.length!==0){
  setScoioEconomicData(preValue=>({...preValue, ["physicallyChallenged"]:event}))
  }
}
const onChangeMaritalStatus = (event)=>{
  if(event?.length!==0){
   
    setScoioEconomicData(preValue=>({...preValue, ["maritalStatus"]:event}));
  }
}
 const handleSocioEconomicData=(event)=>{
    event.preventDefault();
    console.log(scoioEconomicData);
    console.log(JSON.stringify(scoioEconomicData))
    let action =""
    // if (dbUserId) {
      action =  "captureSocioEconomic";
    // } else {
    //   action =  "updateSocioEconomic";
    // }
    // 7000019 is created by 
    saveSocioDetails(action,scoioEconomicData).then((jsondata)=>{
      console.log(jsondata)
      if(jsondata.appError === null){
        alert("Data Saved Successfully");
      }
    })
  }
  return (
    <React.Fragment>
      <form method="post" onSubmit={(e)=>handleSocioEconomicData(e)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SelectOption
            label="Physical Challenged"
            name="physicallyChallenged"
            options={selectPhysicalChallengedButton}
            variant="standard"
            fullWidth="fullWidth"
            error={true}
            onChange={(e)=>onChangePhysicalChallenged(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectOption
            label="Marital Status"
            name="maritalStatus"
            options={selectMaritalStatusButton}
            variant="standard"
            fullWidth="fullWidth"
            error={true}
            onChange={(e)=>onChangeMaritalStatus(e)}
          />
        </Grid>
      </Grid>
      <br />
        <Grid container direction="row" justify="flex-end" alignItems="flex-end">
          <Button type="submit" variant="contained" color="primary" >Save</Button>
        </Grid>
      </form>
    </React.Fragment>
  );
}
