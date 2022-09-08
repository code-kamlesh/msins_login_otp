import React ,{useState}from "react";
import Grid from "@mui/material/Grid";
import TypographyText from "../../components/shared/TypographyText";
import SelectOption from "../../components/shared/SelectOption";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Input from "@mui/material/Input";
import { Button } from "@mui/material";
import useStyles  from '../../components/layout'
import { Link, useNavigate } from 'react-router-dom'
import Container from "@mui/material/Container";
import { saveSocioDetails,fetchSocioDetails } from "./../../utility/Api";

const dbUserId = 1000012
export default function SocioEconomicEntepreneurForm() {
  const history = useNavigate();
  const classes = useStyles();
  const selectPhysicalChallengedButton = ["Yes", "No"];
  const selectMaritalStatusButton = [
    "Married",
    "Unmarried",
    "Divorced/ Separated",
  ];
  const selectOwnershipStatusButton = ["Owned", "Rented", "Leased/ Others"];
  const selectFuelSourceButton = ["Electricity", "Cow Dung/ Manure", " Others"];
  const selectHousingUnitButton = ["Kaccha", "Pakka", "Semi-Pakka", "Others"];
  const selectwaterSourceButton = [
    "Well/ Bore-Well",
    "Government/ Muncipality/Co-op",
    "River/ Lake etc",
    "Others",
  ];

  const [scoioEconomicData, setScoioEconomicData] = useState({"dbUserId":dbUserId,"mediumOfLight":'',"housingUnit":'',"physicallyChallenged":'',"sourceOfWater":'',"maritalStatus":'',"isActive":"Y","membersInHousehold":'',"brothers":0,"sisters":0,"rooms":'',"ownership":'',"createdBy":7000019, "updatedBy":7000019});
 
  const onChangePhysicalChallenged = (event)=>{
    if(event?.length!==0){
      console.log(event)
    setScoioEconomicData(preValue=>({...preValue, ["physicallyChallenged"]:event}))
    }
  }
  const onChangeMaritalStatus = (event)=>{
    if(event?.length!==0){
      setScoioEconomicData(preValue=>({...preValue, ["maritalStatus"]:event}));
    }
  }
  const handleOwenerShip = (event)=>{
    if(event?.length!==0){
      setScoioEconomicData(preValue=>({...preValue, ["ownership"]:event}));
    }
  }  
  const handleWaterSource = (event)=>{
    if(event?.length!==0){
      setScoioEconomicData(preValue=>({...preValue, ["sourceOfWater"]:event}));
    }
  }
  const handleHousingUnit = (event)=>{
    if(event?.length!==0){
      setScoioEconomicData(preValue=>({...preValue, ["housingUnit"]:event}));
    }
  }
  const handleFuelSource = (event)=>{
    if(event?.length!==0){
      setScoioEconomicData(preValue=>({...preValue, ["mediumOfLight"]:event}));
    }
  }
const hanldeBrotherSister = (event)=>{
  if(event?.target?.value.length>0){
    setScoioEconomicData(preValue=>({...preValue, [event?.target?.name]:event?.target?.value}));
  }
}
const hanldeUnitOfNumber = (event)=>{
  setScoioEconomicData(preValue=>({...preValue, [event?.target?.name]:event?.target?.value}));
}


  // socio economic data saving
  const handleSocioEconomicData=(event)=>{
    event.preventDefault();
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
        history('/experiencedetails' ,{replace:true})
      }
    })
  }
  const handleBack = ()=>{
    history('/basicdetails' ,{replace:true})
  }
  return (
    <div className={classes.root} >
       <h3 style={{ textAlign: "center" }}>Socio Economic-Entepreneur</h3>
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
            autoFocus={true}
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
            onChange={(e)=>onChangeMaritalStatus(e)}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Grid container spacing={1.5}>
          <Grid item xs={12} md={4}>
            <p>1. How many Brothers and Sisters do you have?</p>
          </Grid>
          <Grid item xs={12} md={2} mb={2}>
            <Input
              placeholder="e.g 2"
              name= "membersInHousehold"
              inputProps={{ maxLength: 1 }}
              error={(scoioEconomicData.membersInHousehold.length>0)?false:true}
              onChange={(e)=>hanldeBrotherSister(e)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <p>2. How many Rooms does this Housing unit has?</p>
          </Grid>
          <Grid item xs={12} md={2}>
            <Input
              placeholder="e.g 2"
              name= "rooms"
              //onChange=""
              inputProps={{ maxLength: 1 }}
              error={(scoioEconomicData.rooms.length>0)?false:true}
              onChange={(e)=>hanldeUnitOfNumber(e)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <p>3. What is the Ownership status of your Household?</p>
          </Grid>
          <Grid item xs={12} md={2}>
            <SelectOption
              label="Ownership"
              name="ownershipStatus"
              options={selectOwnershipStatusButton}
              variant="standard"
              fullWidth="fullWidth"
              error={true}
              onChange={(e)=>handleOwenerShip(e)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <p>
              4. What is the Household's main source for fuel or energy for
              lighting?
            </p>
          </Grid>
          <Grid item xs={12} md={2}>
            <SelectOption
              label="Fuel Source"
              id="fuelSource"
              name="fuelSource"
              options={selectFuelSourceButton}
              variant="standard"
              fullWidth="fullWidth"
              error={true}
              onChange={(e)=>handleFuelSource(e)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <p>
              5. What Type of Housing unit does you and your family lives in?
            </p>
          </Grid>
          <Grid item xs={12} md={2}>
            <SelectOption
              label="Housing Unit"
              name="housingUnit"
              options={selectHousingUnitButton}
              variant="standard"
              fullWidth="fullWidth"
              error={true}
              onChange={(e)=>handleHousingUnit(e)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <p>6. What is the source of Drinking water in your house-hold?</p>
          </Grid>
          <Grid item xs={12} md={2}>
            <SelectOption
              label="Water Source"
              id="waterSource"
              name="waterSource"
              options={selectwaterSourceButton}
              variant="standard"
              fullWidth="fullWidth"
              error={true}
              onChange={(e)=>handleWaterSource(e)}
            />
          </Grid>
        </Grid>
      </Box>
      <br />
        <Grid container direction="row" justify="flex-end" alignItems="flex-end">
          <Button type="submit" variant="contained" color="primary" >Save</Button>
        </Grid>

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
