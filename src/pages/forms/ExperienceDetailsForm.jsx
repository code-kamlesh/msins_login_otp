import React, {useState,useEffect} from "react";
import Grid from "@mui/material/Grid";
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextFields from "../../components/shared/TextFields";
import DateOfBirthBox from "../../components/shared/DateOfBirthBox";
import { saveExpDetails,fetchExperienceDetails } from "./../../utility/Api";
import { Button } from "@mui/material";
import {validateTextInput1,validateDateDiff } from "./../../utility/Validation"
import useStyles  from '../../components/layout'
import {useNavigate } from 'react-router-dom'
import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function ExperienceDetails() {
  const history = useNavigate();
  const classes = useStyles();
  const [isDataPresent , setIsDataPresent] = useState("null")
  const [experienceData,setExperienceData] = useState({"dbUserId":window.dbUserId,"experienceFrom":'',"lastDesignation":'',"natureOfExperience":'',"employerName":'',"grossSalary":''|| 0,"postingLocation":'',"experienceTo":'',"employerAddress":'',"isExperience":"",
                                                          "isActive":"Y","createdBy":window.userId, "updatedBy":window.userId});
  const [errors,setErrors]= useState({})  
  useEffect(() => {
    if (window.jwtTokenResult === "") {
      history('/', { replace: true })
    }
    else if (window.loginType === "SignIn") {
      getExistingData();
    }
  }, []);

  const getExistingData = ()=>{
    fetchExperienceDetails(window.dbUserId, window.jwtTokenResult).then((jsondata)=>{
      if(jsondata.appError === null && jsondata.data !== "[]"){
        setIsDataPresent("not null")
        let res = JSON.parse(jsondata.data)
        setExperienceData(preValue =>({...preValue, "isExperience": res[0].isExperience, "experienceFrom":res[0].experienceFrom, "lastDesignation":res[0].lastDesignation, "natureOfExperience":res[0].natureOfExperience,
        "experienceTo":res[0].experienceTo,  "employerAddress":res[0].employerAddress,  "postingLocation":res[0].postingLocation,  "grossSalary":res[0].grossSalary, "employerName":res[0].employerName,
        "id":res[0].id,}))
      }
      else{
        setIsDataPresent("null")
      }
    })
  }
  const handleDate = (event)=>{
    if(event?.target?.value?.length>0){
      if(event?.target?.name === "experienceTo"){
        var fromDate = Date.parse(experienceData?.experienceFrom)
        var toDate= Date.parse(event?.target?.value)
        const error = validateDateDiff(event?.target?.name, fromDate, toDate,"lng");
        setErrors(error)
      }
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
    try{
    event.preventDefault();
    let action = ""
    isDataPresent == "null"  ? action = "captureExperience" : action = "updateExperience" 
    saveExpDetails(action,experienceData,window.jwtTokenResult).then((jsondata)=>{
      if(jsondata.appError==null){   
        alert("Data Saved Successfully")
        history('/Businessdetails' ,{replace:true})
      }
    })
    }
    catch (err) {
      alert(err.message)
    }
  }
 
  const handleBack = ()=>{
    history('/socioeconomicdetails' ,{replace:true})
  }

  // setting radio button for experience details
  const handleRadioButton = (event) => {
      setExperienceData(preValue=>({...preValue,  "experienceFrom":"", "lastDesignation":"", "natureOfExperience":"", "employerName":"",
      "grossSalary":0, "postingLocation":"", "experienceTo":"", "employerAddress":"","isExperience":event?.target?.value}))
  }
  return (
    <div className={classes.root} >
      <h3 style={{ textAlign: "center" }}>Experience Deatils</h3>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
    <React.Fragment className={classes.actionsContainer}>
      {
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
               value='Y'
               control={<Radio />}
               label='Yes'
               onChange={handleRadioButton}
             />
             <FormControlLabel
               value='N'
               control={<Radio />}
               label='No'
               onChange={handleRadioButton}
             />
           </RadioGroup>
       </FormControl>
      }
        {
        (experienceData.isExperience==="Y") &&
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
            value={experienceData?.experienceFrom}
            inputProps={{ min: "2010-01-01", max: new Date().toISOString().slice(0,10) }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <DateOfBirthBox
            name="experienceTo"
            variant="standard"
            label="Experience To"
            fullWidth="fullWidth"
            onChange={(e)=>handleDate(e)}
            value={experienceData?.experienceTo}
            inputProps={{ min: "2010-01-01", max: new Date().toISOString().slice(0,10) }}
          />
          {errors?.experienceTo ? (<div style={{ color: "red" }}>{errors.experienceTo}</div>) : null}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextFields
            type = "text"
            id="employerName"
            name="employerName"
            label="Employer Name"
            fullWidth="fullWidth"
            placeholder="Enter your employer's name"
            variant="standard"
            inputProps={{ maxLength: 50 }}
            onChange={(e)=>handleEmpName(e)}
            value={experienceData?.employerName}
          />
           {errors?.employerName ? (<div style={{ color: "red" }}>{errors.employerName}</div>) : null}
        </Grid>
       
        <Grid item xs={12} sm={6} md={6}>
          <TextFields
            
            id="empAddress"
            name="empAddress"
            label="Employer Address"
            fullWidth="fullWidth"
            autoComplete="employer-address"
            variant="standard"
            placeholder="Enter your employer's address"
            inputProps={{ maxLength: 50 }}
            value={experienceData?.employerAddress}
            onChange={(e)=>handleEmpAddress(e)}
          />
          {errors?.empAddress ? (<div style={{ color: "red" }}>{errors.empAddress}</div>) : null}
        </Grid>
        
        <Grid item xs={12} sm={6} md={6}>
          <TextFields
              type = "text"
            fullWidth="fullWidth"
            id="postingLocation"
            name="postingLocation"
            label="Location Of Posting"
            placeholder="Enter your job location"
            variant="standard"
            value={experienceData?.postingLocation}
            inputProps={{ maxLength: 50 }}
            onChange={(e)=>handlePostingLoaction(e)}
          />
           {errors?.postingLocation ? (<div style={{ color: "red" }}>{errors.postingLocation}</div>) : null}
        </Grid>
       
        <Grid item xs={12} sm={6} md={6}>
          <TextFields
              type = "text"
            fullWidth="fullWidth"
            id="lastDesignation"
            name="lastDesignation"
            label="Last Designation"
            variant="standard"
            value={experienceData?.lastDesignation}
            inputProps={{ maxLength: 40 }}
            placeholder="Enter your last designation"
            onChange={(e)=>handleLastDesignation(e)}
          />
           {errors?.lastDesignation ? (<div style={{ color: "red" }}>{errors.lastDesignation}</div>) : null}
        </Grid>
       
        <Grid item xs={12} sm={6} md={6}>
          <TextFields
            type = "text"
            id="natureOfExperience"
            name="natureOfExperience"
            label="Nature Of Experience"
            fullWidth="fullWidth"
            placeholder="Enter your job experience"
            variant="standard"
            value={experienceData?.natureOfExperience}
            inputProps={{ maxLength: 50 }}
            onChange={(e)=>handleExperience(e)}
          />
           {errors?.natureOfExperience ? (<div style={{ color: "red" }}>{errors.natureOfExperience}</div>) : null}
        </Grid>
       
        <Grid item xs={12} sm={6} md={6}>
          <TextFields
            type = "number"
            id="grossSalary"
            name="grossSalary"
            label="Gross Salary"
            fullWidth="fullWidth"
            variant="standard"
            placeholder="Enter your salary details(Annual)"
            value={experienceData?.grossSalary}
            inputProps={{ maxLength: 8 }}
            onChange={(e)=>handleSalary(e)}
          />
          {errors?.grossSalary ? (<div style={{ color: "red" }}>{errors.grossSalary}</div>) : null}
        </Grid>
        
      </Grid>{" "}
      <br />
      </form>
     }
      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="contained" color="primary" onClick={handleBack} >Back</Button>
        <Button type="submit" 
         disabled={(experienceData?.experienceTo !=="" &&experienceData?.experienceFrom !=="" &&experienceData?.lastDesignation !=="" && experienceData?.postingLocation!=="" && experienceData?.natureOfExperience!=="" && experienceData?.grossSalary!==""&&experienceData?.employerAddress!=="" && experienceData?.employerName!=="")||experienceData?.isExperience==="N"?false:true}
        variant="contained" color="primary" onClick={(e)=>handleExperienceData(e) }>Next </Button>
      </Stack>
      </React.Fragment>
      </Container>
    </div>
  );
}
