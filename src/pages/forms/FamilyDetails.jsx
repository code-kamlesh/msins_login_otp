import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Grid, TextField, } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useStyles from '../../components/layout'
import TextFields from "../../components/shared/TextFields";
import SelectOption from "../../components/shared/SelectOption";
import MUIDataTable from "mui-datatables";
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";
import {fetchFamilyDetails,saveFamilyDetails} from "./../../utility/Api";
import { validateContact,validateTextInput, validateSelectInput } from "./../../utility/Validation"

const qualification = [
    { value: 'Uneducated', label: 'No Formal Education' },
    { value: 'Below 5th Standard', label: 'Below 5th Standard' },
    { value: '5th Standard Passed', label: '5th Standard Passed' },
    { value: '7th Standard Passed', label: '7th Standard Passed' },
    { value: '8th Standard Failed', label: '8th Standard Failed' },
    { value: '8th Standard Passed', label: '8th Standard Passed' },
    { value: '9th Standard Passed', label: '9th Standard Passed' },
    { value: '10th Standard Passed', label: '10th Standard Passed' },
    { value: '12th Standard', label: '12th Standard' },
    { value: 'Below 12th Standard', label: 'Below 12th Standard' },
    { value: '12th Passed - science', label: '12th Passed - science' },
    { value: '12th Passed - Non-science', label: '12th Passed - Non-science' },
    { value: '12th Standard Passed', label: '12th Standard Passed' },
    { value: 'CSTI Certified', label: 'CSTI Certified' },
    { value: 'Diploma', label: 'Diploma' },
    { value: 'ITI', label: 'ITI' },
    { value: 'Professional', label: 'Professional' },
    { value: 'Degree', label: 'Degree' },
    { value: 'BSC - science', label: 'BSC - science' },
    { value: 'BSC - Non-science', label: 'BSC - Non-science' },
    { value: '2 Years Diploma', label: '2 Years Diploma' },
    { value: 'Bachelors Degree 2nd Year', label: 'Bachelors Degree 2nd Year' },
    { value: 'Bachelors Degree 3rd Year', label: 'Bachelors Degree 3rd Year' },
    { value: 'Bachelors Degree 4th Year', label: 'Bachelors Degree 4th Year' },
    { value: 'Bachelors Degree 5th Year', label: 'Bachelors Degree 5th Year' },
    { value: 'Graduate', label: 'Graduate' },
    { value: 'Masters Degree 1st Year', label: 'Masters Degree 1st Year' },
    { value: 'Masters Degree 2nd Year', label: 'Masters Degree 2nd Year' },
    { value: 'Post Graduate', label: 'Post Graduate' }
    ]
        const occup = [
            { value: 'SelfEmployed-Agriculture', label: 'SelfEmployed-Agriculture' },
            { value: 'SelfEmployed-NonAgriculture', label: 'SelfEmployed-NonAgriculture' },
            { value: 'Employed-Agriculture', label: 'Employed-Agriculture' },
            { value: 'Employed-NonAgriculture', label: 'Employed-NonAgriculture' },
            { value: 'Unemployed', label: 'Unemployed' },
            { value: 'Student', label: 'Student' },
            { value: 'NotWorking', label: 'NotWorking' },
            { value: 'NA', label: 'NA' }
            ]
         const  relation=[
            { value: 'Father', label: 'Father' },
            { value: 'Mother', label: 'Mother' },
            { value: 'Brother', label: 'Brother' },
            { value: 'Sister', label: 'Sister' },
            { value: 'Guardian', label: 'Guardian' },
            { value: 'Son', label: 'Son' },
            { value: 'Daughter', label: 'Daughter' },
            { value: 'Spouse', label: 'Spouse' },
            { value: 'GrandMother', label: 'GrandMother' },
            { value: 'GrandFather', label: 'GrandFather' },
            { value: 'Mother-In-Law', label: 'Mother-In-Law' },
            { value: 'Father-In-Law', label: 'Father-In-Law' },
            { value: 'Sister-In-Law', label: 'Sister-In-Law' },
            { value: 'Father Guardian', label: 'Father Guardian' },
            { value: 'Other', label: 'Other' },
            { value: 'Relative in Mumbai', label: 'Relative in Mumbai' }]

export default function FamilyDetails() {
    const history = useNavigate();
    const classes = useStyles();
    const [errors,setErrors] = useState({})
    const [familyInfo,setFamilyInfo] = useState([])
    const [familydetails, setFamilydetails] = useState({
        "dbUserId": window.dbUserId, "name": "", "qualId": "", "relationshipId": "", "occupation": "", "contactNumber": "","isActive":"Y"
           ,"headOfFamily":"N" , "primaryBreadWinner":"N","createdBy": window?.userid, "updatedBy": window?.userid});
// checking for token id valid or not
useEffect(() => {
    if (window.jwtTokenResult === ""){
      history('/', { replace: true })
    }else 
        fetchExistingData();
  },[]);
  // handle name of guradian
    const handlechangeName =(event)=>{
        if (event?.target?.value || event?.target?.value.length === 0) {
            const errors = validateTextInput("name", event?.target?.value, "lng")
            setErrors(errors)
            setFamilydetails(preValue => ({ ...preValue, "name": event?.target?.value }))
          }
    }
// handle Realtionship dropdown
    const handleChangeRelatioship =(event)=>{
        if (event || event?.length === 0) {
            const errors = validateSelectInput("relationship", event)
            setErrors(errors);
            setFamilydetails(preValue => ({ ...preValue, "relationshipId": event }))
          }
    }
// handle qualification dropdown
    const handleChangeQual =(event)=>{
        if (event || event?.length === 0) {
            const errors = validateSelectInput("qualId", event)
            setErrors(errors);
            setFamilydetails(preValue => ({ ...preValue, "qualId": event}))
          }
    }
// handle occupation dropdown
    const handleChangeOccupation =(event)=>{
        if (event || event?.length === 0) {
            const errors = validateSelectInput("occupation", event)
            setErrors(errors);
            setFamilydetails(preValue => ({ ...preValue, "occupation": event }))
          }
    }
//handle contact number
    const handleChangeNumber =(event)=>{
        if (event?.target?.value || event?.target?.value?.length === 0) {
            const errors = validateContact(event?.target?.name, event?.target?.value)
            setErrors(errors)
            setFamilydetails(preValue => ({ ...preValue, "contactNumber": event?.target?.value }))
          }
    }
// reset form
const resetForm = ()=>{
  if(familydetails?.id !== ""){
    setFamilydetails(preValue => ({ ...preValue, "id": ""}))
  }
  setFamilydetails(preValue => ({ ...preValue, "occupation": "", "name":"", "contactNumber":"", "qualId":"", "relationshipId":""}))
 }

// handle Edit existing data
const handleEdit = (data)=>{
  setFamilydetails(preValue=>({...preValue, "name":data?.rowData[0],"relationshipId": data?.rowData[1], "qualId":data?.rowData[2] ,
  "occupation":data?.rowData[3],"contactNumber":data?.rowData[4], "id":data?.rowData[5]}))
  window.scrollTo(0, 0)
}
// Fetch Existing saved data
const fetchExistingData = ()=>{
    let info=[];
    try{
      fetchFamilyDetails(window.dbUserId, window.jwtTokenResult).then((jsondata)=>{
        let  familyDetails = JSON.parse(jsondata.data);
        for(var i=0;i<familyDetails.length;i++){
            var details = {
            'name':  familyDetails[i].name,
            'relationshipId': familyDetails[i].relationshipId,
            'occupation':familyDetails[i].occupation,
            'qualId': familyDetails[i].qualId,
            'contactNumber': familyDetails[i].contactNumber,
            'Id': familyDetails[i].id,
            }
        info.push(details)
        }
        setFamilyInfo(info)
    })
    }
    catch(err){
      alert(err.message)
    }
}
  const chekingDuplicatentry = (relationship)=>{
    var flag = true
    for(var i=0;i<familyInfo.length;i++){
      if(familyInfo[i]?.relationshipId === relationship){
        // const errors = validateContact(event?.target?.name, event?.target?.value)
        setErrors(preValue=>({...preValue, "duplicate":"Found Duplicate Entry for "+relationship+" Details."}))
        flag = false
        break;
      }
    }
    return flag
  }
// saving form data
    const handleFormData = (event)=>{
        event.preventDefault();
         let action="captureAllFamilyDetails"
        // CHecking for dbuserId for saving data
        familydetails?.id == ""  || familydetails?.id == undefined? action = "captureAllFamilyDetails" : action = "updateAllFamilyDetails"
        // If id is blank then deleting from data 
        if( familydetails?.id == "" ){
          delete familydetails?.id
        }
        if(action === "updateAllFamilyDetails"){
          savingFamilyDetails(action) 
        }
        else{
        // Checking for Father mother or any guardian details does not repeat twice
        if(chekingDuplicatentry(familydetails?.relationshipId)){
          // If no duplicate entry found save the data
          savingFamilyDetails(action)
        };
      }
    }
  // Saving family details data
  const savingFamilyDetails = (action)=>{
    try{
      saveFamilyDetails(action,familydetails,window.jwtTokenResult).then((jsondata)=>{
        if(jsondata.appError === null)
        alert("Data Saved Succesfully.")
        resetForm();
        fetchExistingData();
    })
    }
    catch(err){
      alert(err.message)
    }
  }
// push previous form
    const handleSave = ()=>{
        history('/experiencedetails', { replace: true })
    }
// push forward form    
    const handleBack=()=>{
        history('/socioeconomicdetails', { replace: true })
    } 

// for MUI data table configuration
const columns = [
  { label: 'Name', name: 'name', options:{sort: true}, headerStyle: { color: '#FF9800' } },
  { label: 'Relationship', name: 'relationshipId',  options:{sort: true},headerStyle: { color: '#FF9800' } },
  { label: 'Qualification', name: 'qualId', options:{sort: true}, headerStyle: { color: '#FF9800' } },
  { label: 'Occupation', name: 'occupation', options:{sort: true}, headerStyle: { color: '#FF9800' } },
  { label: 'Contact Number', name: 'contactNumber', options:{sort: true}, headerStyle: { color: '#FF9800' } },
  {label: 'Db Id', name: 'Id',options:{display: false}, headerStyle: {color:'#FF9800'}},
  {name: "Action",
  options: {
    filter: false,
    sort: false,
    empty: true,
    customBodyRender: (value, tableMeta, updateValue) => {
      return (
        <>
          <Button onClick={(e) => {
              e.stopPropagation();
              handleEdit(tableMeta) }} >
            Edit
          </Button>
        </>
      );
    }
  }}
]

const options = {
      selectableRows : 'single',
      filterType: "dropdown",
      responsive: "vertical",
      sortDirection: "desc",
      selectToolbarPlacement:"none",
      rowsPerPage:10,
      selectableRowsOnClick: true,
};
    return(
        <div className={classes.root} >
        <h3 style={{ textAlign: "center" }}>Family Details</h3>
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          {/* <React.Fragment className={classes.actionsContainer}> */}
          <form method="POST"  onSubmit={(e) => handleFormData(e)}>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextFields
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  variant="standard"
                  value={familydetails?.name}
                  onChange={(e) => { handlechangeName(e) }}
                  inputProps={{ maxLength: 50 }}
                />
                {errors?.name ? (<div style={{ color: "red" }}>{errors.name}</div>) : null}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <SelectOption
                key={familydetails?.relationshipId}
                  id="relationshipId"
                  name="relationshipId"
                  label="Relationship"
                  fullWidth
                  variant="standard"
                  value={familydetails?.relationshipId}
                  options={relation}
                  onChange={(e) => { handleChangeRelatioship(e) }}
                  inputProps={{ maxLength: 30 }}
                />
              </Grid>

              {/* <SelectOption
                  id="headoffamily"
                  name="headoffamily"
                  label="Head Of family"
                  fullWidth
                  variant="standard"
                  value={familydetails?.headOfFamily}
                  options={hod}
                  onChange={(e) => { handleChangehod(e) }}
                  inputProps={{ maxLength: 30 }}
                />
                {errors?.relationship ? (<div style={{ color: "red" }}>{errors.relationship}</div>) : null} */}
              <Grid item xs={12} sm={6} md={4}>
              <SelectOption
               key={familydetails?.qualId}
                  id="qualId"
                  name="qualId"
                  label="Qualification"
                  fullWidth
                  variant="standard"
                  value={familydetails?.qualId}
                  options={qualification}
                  onChange={(e) => { handleChangeQual(e) }}
                  inputProps={{ maxLength: 30 }}
                />

              </Grid>
              <Grid item xs={12} sm={6} md={4}>
              <SelectOption
               key={familydetails?.occupation}
                  id="occupation"
                  name="occupation"
                  label="Occupation"
                  fullWidth
                  variant="standard"
                  value={familydetails?.occupation}
                  options={occup}
                  onChange={(e) => { handleChangeOccupation(e) }}
                  inputProps={{ maxLength: 30 }}
                />
              </Grid>
            
              <Grid item xs={12} sm={6} md={4}>
              <TextField
                  type = "number"
                  id="primaryContact"
                  name="primaryContact"
                  label="Contact No."
                  fullWidth="fullWidth"
                  value={familydetails?.contactNumber || ""}
                  variant="standard"
                  onChange={(e) => handleChangeNumber(e)}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                />
                {errors?.primaryContact ? (<div style={{ color: "red" }}>{errors.primaryContact}</div>) : null}

              </Grid>
            </Grid>
            <br/>
            <Grid>
              <div>{errors?.duplicate ? (<div style={{ color: "red" }}>{errors.duplicate}</div>) : null}</div>
              </Grid>
            
            <Grid container>
              <Grid item xs={12} sm={2} md={1} >
              <Button
                disabled={(familydetails?.name === "" || errors?.name !== "" )? true:familydetails?.contactNumber.length !== 10 ?true :familydetails?.qualId===""?true:familydetails?.relationshipId===""?true : familydetails?.occupation===""?true:false } 
                type="submit" variant="contained" color="primary" >Add</Button>
              </Grid>
              <Grid item xs={12} sm={2} md={1}>
              <Button
                onClick={()=>resetForm()} variant="contained" color="primary" >Reset</Button>
              </Grid>
                  
              </Grid>
            </form>
{/* Data table who conatain details of save family detaails */}
        <div style={{color:"red"}}>Note: Atleast one Guardian details is mandatory.</div>
        <MUIDataTable
        title={"Family Details"}
        data={familyInfo} 
        columns={columns} 
        options={options} 
        /> 

        <br/> 
        <Stack direction="row" spacing={2}>
        <Button  variant="contained" color="primary" onClick={handleBack} >Back</Button>
        <Button 
        disabled={familyInfo?.length ===0}
        onClick={handleSave} variant="contained" color="primary"  >Next</Button>
        </Stack>
          {/* </React.Fragment> */}
      </Container>
    </div>

    )
}