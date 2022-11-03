import React ,{useState,useEffect}from "react";
import Grid from "@mui/material/Grid";
import SelectOption from "../../components/shared/SelectOption";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Input from "@mui/material/Input";
import { Button } from "@mui/material";
import useStyles  from '../../components/layout'
import {  useNavigate } from 'react-router-dom'
import Container from "@mui/material/Container";
import { saveSocioDetails,fetchSocioDetails } from "./../../utility/Api";
import { validateTextInput1 } from "./../../utility/Validation"

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

export default function SocioEconomicEntepreneurForm() {
  const history = useNavigate();
  const classes = useStyles();
  const [errors,setErrors] = useState({})
  const [isDataPresent , setIsDataPresent] = useState("")
  const [scoioEconomicData, setScoioEconomicData] = useState({"dbUserId":window.dbUserId,"mediumOfCooking":'',"housingUnit":'',"physicallyChallenged":'',"sourceOfWater":'',"maritalStatus":'',"isActive":"Y","membersInHousehold":'',"brothers":0,"sisters":0,"rooms":'',"ownership":'',"createdBy":window.userid, "updatedBy":window.userid});
 
  useEffect(() => {
    if (window.jwtTokenResult == "") {
      history('/', { replace: true })
    }
    else{
      getSocioEconomicData();
    }
  }, []);

  const getSocioEconomicData = async()=>{
    await fetchSocioDetails(window.dbUserId, window.jwtTokenResult).then((jsondata)=>{
      if(jsondata.appError === null && jsondata.data !== "[null]" ){
        let res = JSON.parse(jsondata.data)
        setScoioEconomicData(preValue => ({ ...preValue, "physicallyChallenged":res[0]?.physicallyChallenged|| "", "maritalStatus": res[0]?.maritalStatus, 
                                          "mediumOfCooking":res[0]?.mediumOfCooking,"housingUnit":res[0]?.housingUnit,"sourceOfWater":res[0]?.sourceOfWater,
                                            "membersInHousehold":res[0]?.membersInHousehold,"rooms":res[0]?.rooms,"ownership":res[0]?.ownership,"id":res[0]?.id}))
     
                                          }
      else{
        setIsDataPresent(null)
      }
    })

   
  }

  const onChangePhysicalChallenged = (event)=>{
    if(event?.length!==0){
    setScoioEconomicData(preValue=>({...preValue, "physicallyChallenged":event}))
    }
  }
  const onChangeMaritalStatus = (event)=>{
    if(event?.length!==0){
      setScoioEconomicData(preValue=>({...preValue, "maritalStatus":event}));
    }
  }
  const handleOwenerShip = (event)=>{
    if(event?.length!==0){
      setScoioEconomicData(preValue=>({...preValue, "ownership":event}));
    }
  }  
  const handleWaterSource = (event)=>{
    if(event?.length!==0){
      setScoioEconomicData(preValue=>({...preValue, "sourceOfWater":event}));
    }
  }
  const handleHousingUnit = (event)=>{
    if(event?.length!==0){
      setScoioEconomicData(preValue=>({...preValue, "housingUnit":event}));
    }
  }
  const handleFuelSource = (event)=>{
    if(event?.length!==0){
      setScoioEconomicData(preValue=>({...preValue, "mediumOfCooking":event}));
    }
  }
const hanldeBrotherSister = (event)=>{
  // if(event?.target?.value.length===0){
    const errors = validateTextInput1(event?.target?.name, event?.target?.value, "lng")
    setErrors(errors);
    
    setScoioEconomicData(preValue=>({...preValue, [event?.target?.name]:event?.target?.value}));
  // }
}
const hanldeUnitOfNumber = (event)=>{
  // if(event?.target?.value.length===0){
    const errors = validateTextInput1(event?.target?.name, event?.target?.value, "lng")
    setErrors(errors);
    setScoioEconomicData(preValue=>({...preValue, [event?.target?.name]:event?.target?.value}));
  // }
}


  // socio economic data saving
  const handleSocioEconomicData=(event)=>{
    event.preventDefault();
    let action =""
    isDataPresent === null ? action = "captureSocioEconomic" : action = "updateSocioEconomic" 
    try{
      saveSocioDetails(action,scoioEconomicData,window.jwtTokenResult).then((jsondata)=>{
        if(jsondata.appError === null){
          alert("Data Saved Successfully");
          history('/familydetails' ,{replace:true})
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
       <h3 style={{ textAlign: "center" }}>Socio Economic-Entepreneur</h3>
       <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
    <React.Fragment className={classes.actionsContainer}>
       <form method="post" onSubmit={(e)=>handleSocioEconomicData(e)}>
      <Box mt={4}>
        <Grid container spacing={1.5}>
        <Grid item xs={12} md={4}>
            <p>Are you Divyayang?</p>
          </Grid>
          <Grid item xs={12} md={2} mb={2}>
          <SelectOption
            // onClick={{e}=>handlePhysicallltchanges(e)}
            name="physicallyChallenged"
            options={selectPhysicalChallengedButton}
            variant="standard"
            fullWidth="fullWidth"
            autoFocus={true}
            value={scoioEconomicData?.physicallyChallenged || ""}
            onChange={(e)=>onChangePhysicalChallenged(e)}
          />
          </Grid>
          <Grid item xs={12} md={4}>
            <p>Are you Married?</p>
          </Grid>
          <Grid item xs={12} md={2} mb={2}>
          <SelectOption
            // label="Marital Status"
            name="maritalStatus"
            options={selectMaritalStatusButton}
            variant="standard"
            fullWidth="fullWidth"
            value={scoioEconomicData?.maritalStatus ||""}
            onChange={(e)=>onChangeMaritalStatus(e)}
          />
          </Grid>




          <Grid item xs={12} md={4}>
            <p>How many Brothers and Sisters do you have?</p>
          </Grid>
          <Grid item xs={12} md={2} mb={2}>
            <Input
              placeholder="e.g 2"
              name= "membersInHousehold"
              inputProps={{ maxLength: 1 }}
              value={scoioEconomicData?.membersInHousehold}
              onChange={(e)=>hanldeBrotherSister(e)}
            />
          </Grid>
          {errors?.membersInHousehold ? (<div style={{ color: "red" }}>{errors.membersInHousehold}</div>) : null}
          <Grid item xs={12} md={4}>
            <p>How many Rooms does this Housing unit has?</p>
          </Grid>
          <Grid item xs={12} md={2}>
            <Input
              placeholder="e.g 2"
              name= "rooms"
              inputProps={{ maxLength: 1 }}
              value={scoioEconomicData?.rooms}
              onChange={(e)=>hanldeUnitOfNumber(e)}
            />
          </Grid>
          {errors?.rooms ? (<div style={{ color: "red" }}>{errors?.rooms}</div>) : null}
          <Grid item xs={12} md={4}>
            <p>What is the Ownership status of your Household?</p>
          </Grid>
          <Grid item xs={12} md={2}>
            <SelectOption
              // label="Ownership"
              name="ownershipStatus"
              options={selectOwnershipStatusButton}
              variant="standard"
              fullWidth="fullWidth"
              value={scoioEconomicData?.ownership|| ""}
              onChange={(e)=>handleOwenerShip(e)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <p>
              What is the Household's main source for fuel or energy for
              lighting?
            </p>
          </Grid>
          <Grid item xs={12} md={2}>
            <SelectOption
              // label="Fuel Source"
              id="fuelSource"
              name="fuelSource"
              options={selectFuelSourceButton}
              variant="standard"
              fullWidth="fullWidth"
              value={scoioEconomicData?.mediumOfCooking || ""}
              onChange={(e)=>handleFuelSource(e)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <p>
              What Type of Housing unit does you and your family lives in?
            </p>
          </Grid>
          <Grid item xs={12} md={2}>
            <SelectOption
              // label="Housing Unit"
              name="housingUnit"
              options={selectHousingUnitButton}
              variant="standard"
              fullWidth="fullWidth"
              value={scoioEconomicData?.housingUnit || ""}
              
              onChange={(e)=>handleHousingUnit(e)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <p>What is the source of Drinking water in your house-hold?</p>
          </Grid>
          <Grid item xs={12} md={2}>
            <SelectOption
              // label="Water Source"
              id="waterSource"
              name="waterSource"
              options={selectwaterSourceButton}
              variant="standard"
              value={scoioEconomicData?.sourceOfWater||""}
              fullWidth="fullWidth"
              
              onChange={(e)=>handleWaterSource(e)}
            />
          </Grid>
        </Grid>
      </Box>
      <br />
        <Stack direction="row" spacing={2}>
        <Button  variant="contained" color="primary" onClick={handleBack} >Back</Button>
        <Button 
        // (scoioEconomicData?.rooms?.length>0) && (scoioEconomicData?.membersInHousehold?.length>0)&&
        disabled={(scoioEconomicData?.physicallyChallenged?.length >0) &&(scoioEconomicData?.maritalStatus?.length >0) && (scoioEconomicData?.ownership?.length >0) &&
           (scoioEconomicData?.mediumOfCooking?.length >0)&&(scoioEconomicData?.housingUnit?.length >0)&&(scoioEconomicData?.sourceOfWater?.length >0)?false:true}
        type="submit" variant="contained" color="primary"  >Next</Button>
      </Stack>
      </form>
      </React.Fragment>
      </Container>
    </div>
  );
}
