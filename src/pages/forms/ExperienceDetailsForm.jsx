import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextFields from "../../components/shared/TextFields";
import DateOfBirthBox from "../../components/shared/DateOfBirthBox";
import { saveExpDetails,fetchExperienceDetails } from "./../../utility/Api";
import { Button } from "@mui/material";
import {validateTextInput1 } from "./../../utility/Validation"
import useStyles  from '../../components/layout'
import {useNavigate } from 'react-router-dom'
import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
// validateTextInput1
const dbUserId=1000011;
export default function ExperienceDetails() {
  const history = useNavigate();
  const classes = useStyles();
  
  const [experience, setExperience] = useState("")
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
    alert("Hello")
    event.preventDefault();
    let action = ""
    // console.log(scoioEconomicData);
    // if (dbUserId) {
      action =  "captureExperience";
    // } else {
    //   action =  "updateExperience";
    // }
    console.log(JSON.stringify(experienceData))
    // saveExpDetails(action,experienceData).then((jsondata)=>{
    //   if(jsondata.appError==null){   
    //     let jsonobjects = JSON.parse(jsondata.data); 
    //     alert("Data Saved Successfully")
       
    //   // }
    // })
    history('/Businessdetails' ,{replace:true})
  }
 
  const handleBack = ()=>{
    history('/socioeconomicdetails' ,{replace:true})
  }

  // setting radio button for experience details
  const handleRadioButton = (e) => { 
    setExperience(e.target.value) // saving in local
    console.log(e.target.value)
  }
  return (
    <div className={classes.root} >
      <h3 style={{ textAlign: "center" }}>Experience Deatils</h3>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
    <React.Fragment className={classes.actionsContainer}>
      <FormControl style={{ marginTop: '20px', marginBottom: '10px' }}>
            <FormLabel id='demo-row-radio-buttons-group-label'>
            Do You Have any Business Experience.
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
            >
              <FormControlLabel
                value='Yes'
                control={<Radio />}
                label='Yes'
                onChange={handleRadioButton}
              />
              <FormControlLabel
                value='No'
                control={<Radio />}
                label='No'
                onChange={handleRadioButton}
              />
            </RadioGroup>
        </FormControl>
        {
          experience === "Yes" &&

          <form>
      <Grid container spacing={3}>
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
      </form>
     }
      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="contained" color="primary" onClick={handleBack} >Back</Button>
        <Button type="submit" variant="contained" color="primary" onClick={(e)=>handleExperienceData(e) }>Next </Button>
      </Stack>
      </React.Fragment>
      </Container>
    </div>
  );
}
