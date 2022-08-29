import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import TypographyText from "../../components/shared/TypographyText";
import TextFields from "../../components/shared/TextFields";
import DateOfBirthBox from "../../components/shared/DateOfBirthBox";
import { Box } from "@mui/material";
import { saveExpDetails,fetchExperienceDetails } from "./../../utility/Api";
import { Button } from "@mui/material";
import {validateTextInput1 } from "./../../utility/Validation"
// validateTextInput1
const dbUserId=1000011;
export default function ExperienceDetails() {
  const experienceTypeRadioBtn = ["Fresher", "Experience"];
  const [experienceData,setExperienceData] = useState({"dbUserId":dbUserId,"experienceFrom":'',"lastDesignation":'',"natureOfExperience":'',"employerName":'',"grossSalary":'',"postingLocation":'',"experienceTo":'',"employerAddress":'',"createdBy":7000019});
  const [errors,setErrors]= useState({})

  const handleDate = (event)=>{
    if(event?.target?.value?.length>0){
      setExperienceData(preValue=>({...preValue, [event?.target?.name]:event?.target?.value}))
    }
  }
  const handleSalary = (event)=>{
    if (event?.target?.value || event?.target?.value.length === 0) {
      
      const error = validateTextInput1(event?.target.name, event?.target?.value,"lng")
     
      setErrors(error)
      setExperienceData(preValue=>({...preValue, "grossSalary":event?.target?.value}))
    }
  }
  
  const handleEmpName = (event)=>{
    if (event?.target?.value || event?.target?.value.length === 0) {
      const error = validateTextInput1(event?.target.name, event?.target?.value,"lng")
      setErrors(error)
      setExperienceData(preValue=>({...preValue, "employerName":event?.target?.value}))
    }
  }
  const handleExperience = (event)=>{
    if (event?.target?.value || event?.target?.value.length === 0) {
     
      const error = validateTextInput1(event?.target.name, event?.target?.value,"lng")
      
      setErrors(error)
      setExperienceData(preValue=>({...preValue, "natureOfExperience":event?.target?.value}))
    }
    console.log(errors)
  }
  const handleEmpAddress = (event)=>{
    if (event?.target?.value || event?.target?.value.length === 0) {
      const error = validateTextInput1(event?.target.name, event?.target?.value,"lng")
      setErrors(error)
      setExperienceData(preValue=>({...preValue, "employerAddress":event?.target?.value}))
    }
  }
  const handlePostingLoaction = (event)=>{
    if (event?.target?.value || event?.target?.value.length === 0) {
      console.log(event?.target.name)
      const error = validateTextInput1(event?.target.name, event?.target?.value,"lng")
      
      setErrors(error)
      setExperienceData(preValue=>({...preValue, "postingLocation":event?.target?.value}))
    }
  }
  const handleLastDesignation = (event)=>{
    if (event?.target?.value || event?.target?.value.length === 0) {
      const error = validateTextInput1(event?.target.name, event?.target?.value,"lng")
     
      setErrors(error)
      setExperienceData(preValue=>({...preValue, "lastDesignation":event?.target?.value}))
    }
  }
  
  const  handleExperienceData = (event)=>{
    event.preventDefault();
    let action = ""
    // console.log(scoioEconomicData);
    // if (dbUserId) {
      action =  "captureExperience";
    // } else {
    //   action =  "updateExperience";
    // }
    console.log(JSON.stringify(experienceData))
    saveExpDetails(action,experienceData).then((jsondata)=>{
      if(jsondata.appError==null){   
        let jsonobjects = JSON.parse(jsondata.data); 
        alert("Data Saved Successfully")
      }
    })
  }
 

  return (
    <React.Fragment>
      <form method="post" onSubmit={(e)=>handleExperienceData(e)}>
      <Grid container spacing={3}>
        <Grid></Grid>
        <Grid item xs={12} sm={6} md={6}>
          <DateOfBirthBox
            name="experienceFrom"
            variant="standard"
            label="Experience From"
            fullWidth="fullWidth"
            autoFocus={true}
            onChange={(e)=>handleDate(e)}
            error={(experienceData.experienceFrom ==='')?true:false}
            // helperText={(experienceData.experienceFrom ==='')?<div style={{color:"red"}}>* MandatoryField</div>:false}
          />
          {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <DateOfBirthBox
            name="experienceTo"
            variant="standard"
            label="Experience To"
            fullWidth="fullWidth"
            onChange={(e)=>handleDate(e)}
            error={(experienceData.experienceTo=='')?true:false}
          />
          {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextFields
            id="employerName"
            name="employerName"
            label="Employer Name"
            fullWidth="fullWidth"
            placeholder="Enter your employer's name"
            variant="standard"
            inputProps={{ maxLength: 50 }}
            onChange={(e)=>handleEmpName(e)}
            error={(experienceData.employerName=='')?true:false}
            helperText={errors?.employerName}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextFields
            required
            id="empAddress"
            name="empAddress"
            label="Employer Address"
            fullWidth="fullWidth"
            autoComplete="employer-address"
            variant="standard"
            placeholder="Enter your employer's address"
            inputProps={{ maxLength: 50 }}
            onChange={(e)=>handleEmpAddress(e)}
            error={(experienceData.employerAddress=='')?true:false}
            helperText={errors?.empAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextFields
            required
            fullWidth="fullWidth"
            id="postingLocation"
            name="postingLocation"
            label="Location Of Posting"
            placeholder="Enter your job location"
            variant="standard"
            inputProps={{ maxLength: 50 }}
            onChange={(e)=>handlePostingLoaction(e)}
            error={(experienceData.postingLocation=='')?true:false}
            helperText={errors?.postingLocation}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextFields
            required
            fullWidth="fullWidth"
            id="lastDesignation"
            name="lastDesignation"
            label="Last Designation"
            variant="standard"
            inputProps={{ maxLength: 40 }}
            placeholder="Enter your last designation"
            onChange={(e)=>handleLastDesignation(e)}
            error={(experienceData.lastDesignation=='')?true:false}
            helperText={errors?.lastDesignation}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextFields
            required
            id="natureOfExperience"
            name="natureOfExperience"
            label="Nature Of Experience"
            fullWidth="fullWidth"
            placeholder="Enter your job experience"
            variant="standard"
            inputProps={{ maxLength: 50 }}
            onChange={(e)=>handleExperience(e)}
            error={(experienceData.natureOfExperience=='')?true:false}
            helperText={errors?.natureOfExperience}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextFields
            required
            id="grossSalary"
            name="grossSalary"
            label="Gross Salary"
            fullWidth="fullWidth"
            variant="standard"
            placeholder="Enter your salary details(Annual)"
            inputProps={{ maxLength: 8 }}
            onChange={(e)=>handleSalary(e)}
            error={(experienceData.grossSalary=='')?true:false}
            helperText={errors?.grossSalary}
          />
        </Grid>
      </Grid>{" "}
      <br />
        <Grid container direction="row" justify="flex-end" alignItems="flex-end">
          <Button type="submit" variant="contained" color="primary" >Save</Button>
        </Grid>
      </form>
    </React.Fragment>
  );
}
