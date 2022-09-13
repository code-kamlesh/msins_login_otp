import React, {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import SelectOption from "../../components/shared/SelectOption";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { saveSocioDetails,fetchSocioDetails } from "./../../utility/Api";
import {useNavigate } from 'react-router-dom'
import Container from "@mui/material/Container";
import useStyles  from '../../components/layout'

const selectMaritalStatusButton = [
  "Married",
  "Unmarried",
  "Divorced/ Separated",
];
export default function SocioEconomicInnovatorForm() {
  const history = useNavigate();
  const classes = useStyles();
  const [isDataPresent , setIsDataPresent] = useState("")
  const selectPhysicalChallengedButton = ["Yes", "No"];
  const [scoioEconomicData, setScoioEconomicData] = useState({"dbUserId":window.dbUserId,"physicallyChallenged":'',"maritalStatus":'',"isActive":"Y","membersInHousehold":0,"brothers":0,"sisters":0,"rooms":0,"createdBy":window.userId,
  "updatedBy":window.userId});

  useEffect(() => {
    if (window.jwtTokenResult == "") {
      history('/', { replace: true })
    }
    else if (window.loginType === "SignIn") {
      getSocioEconomicData();
    }
  }, []);

  const getSocioEconomicData = ()=>{
    fetchSocioDetails(window.dbUserId, window.jwtTokenResult).then((jsondata)=>{
      if(jsondata.appError === null && jsondata.data !== "[]" ){
        let res = JSON.parse(jsondata.data)
        setScoioEconomicData(res[0])
      }
      else if(jsondata.appError === null && jsondata.data === "[]"){
        setIsDataPresent(null)
      }
    })
  }
  
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
    let action =""
     isDataPresent === null ? action = "captureSocioEconomic" : action = "updateSocioEconomic" 
     try{
      saveSocioDetails(action,scoioEconomicData, window.jwtTokenResult).then((jsondata)=>{
        console.log(jsondata)
        if(jsondata.appError === null){
          alert("Data Saved Successfully");
          history('/experiencedetails' ,{replace:true})
        }
      })
    }catch(err){
      alert(err.message)
    }
    
  }

  const handleBack = ()=>{
    history('/basicdetails' ,{replace:true})
  }
  return (
    <div className={classes.root} >
       <h3 style={{ textAlign: "center" }}>Socio Economic</h3>
       <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <React.Fragment className={classes.actionsContainer}>
      <form method="post" onSubmit={(e)=>handleSocioEconomicData(e)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SelectOption
            label="Physical Challenged"
            name="physicallyChallenged"
            options={selectPhysicalChallengedButton}
            variant="standard"
            fullWidth="fullWidth"
            value={scoioEconomicData?.physicallyChallenged}
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
            value={scoioEconomicData?.maritalStatus}
            error={true}
            onChange={(e)=>onChangeMaritalStatus(e)}
          />
        </Grid>
      </Grid>
      <br />
        
        <Stack direction="row" spacing={2}>
        <Button  variant="contained" color="primary" onClick={handleBack} >Back</Button>
        <Button type="submit" variant="contained" color="primary"  >Next</Button>
      </Stack>
      </form>
      </React.Fragment>
      </Container>
    
    </div>
  );
}
