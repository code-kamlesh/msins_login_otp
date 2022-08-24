import React,{useState} from "react";
import Grid from "@mui/material/Grid";
import TextFields from "../../components/shared/TextFields";
import DateOfBirthBox from "../../components/shared/DateOfBirthBox";
import {validateAadharNumber ,validatePincode,validateTextInput,validateSelectInput}from "./../../utility/Validation"
import {saveBasicData,fetchAddressDetailsBasedOnPincode,submitAddressData,captureStudentEngagementDetails} from "./../../utility/Api";
import { Button } from "@mui/material";
import { SingleSelect } from "react-select-material-ui";
import underscore from 'underscore';
import Select from '@mui/material/Select';
import { use } from "i18next";
//adding select box options

const selectHearingOptions = [
  "Social Media",
  "Newspaper",
  "Reference(Friends/ relatives)",
  "School/ College",
  "Job fairs/ Gathering",
  "Others",
];

const selectQualificationOptions = ["PhD", "Masters", "Bachelors", "ITI"];
const selectReligionOptions = ["Hindu", "Muslim", "Sikh", "Others"];
const selectCategoryOptions = ["General", "O.B.C", "S.C", "Others"];
const selectIncomeStatusOptions = ["BPL", "APL", "Antyodaya"];
const selectBloodGroupOptions = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "Other",
];

export default function BasicDetailsForm() {
  const[selectVillageNameOptions,setSelectVillageNameOptions] = useState([]);
  const [selectCityNameOptions,setSelectCityNameOptions] = useState([])
  const[selectDistrictNameOptions,setSelectDistrictNameOptions] = useState([])
  const selectGenderOptions = ["Male","Female","Other"];
  const [aadharNumber,setAadharNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dob,setDob] = useState(null);
  const[lastName,setLastName] = useState("");
  const [advertisment, setAdvertisment] = useState("");
  const[gender, setGender]= useState("");
  const [errors, setErrors] = useState({});
  const [highestQualification, setHighestQualification] = useState("");
  const[religion, setReligion] = useState("");
  const[category,setCategory] = useState("");
  const[incomeStatus,setIncomeStatus] = useState("");
  const[bloodGroup,setBloodGroup] = useState("");
  const[primaryContact,setPrimaryContact] = useState("");
  const[primaryEmailId,setPrimaryEmailId] = useState("");
  const[secondaryContactNo,setSecondaryContactNo] = useState("");
  const[secondaryEmailId, setSecondaryEmailId] = useState("");
  const[pincode,setPincode] = useState("");
  const[district, setDistrict] = useState("");
  const[cityName,setCityName] = useState("");
  const[villageName,setVillageName] = useState("");
  const[address1,setAddress1] = useState("");
  const[address2,setAddress2] = useState("");

  const handleAadharNumber= (event)=>{
    if(event?.target?.value || event?.target?.value?.length === 0){
   const errors = validateAadharNumber(event?.target?.value, "lng")
   console.log(errors)
   setErrors(errors)
   setAadharNumber(event?.target?.value)
 }
}
const hanldeFirstName=(event)=>{
 console.log(event?.target?.value)
 if(event?.target?.value|| event?.target?.value.length===0){
   const errors = validateTextInput("firstName", event?.target?.value,"lng")
     setErrors(errors)
     setFirstName(event?.target?.value)
     console.log(firstName)
 }
}
const handleMiddleName = (event)=>{
 if(event?.target?.value|| event?.target?.value.length===0){
   const errors = validateTextInput("middleName",event?.target?.value,"lng")
   console.log(errors)
   setErrors(errors)
   setMiddleName(event?.target?.value)
   console.log(middleName)
 }
}
const handleLastName =(event)=>{
  if(event?.target?.value || event?.target?.value.length === 0){
    const errors = validateTextInput("lastName", event?.target?.value,"lng")
    setErrors(errors)
    setLastName(event?.target?.value)
    console.log(lastName)
  }
}
const handleDob = (event)=>{
  
  console.log(event?.target?.value)
  let newDate = new Date(event?.target?.value);
  setDob(newDate)
  console.log(typeof dob)
}
const hanldeGender=(event)=>{
  console.log(event)
  if (event || event?.length === 0) {
    const errors = validateSelectInput("gender",event);
    setErrors(errors);
    setGender(event);
  }
}
const handleAdvertisment = (event)=>{
  console.log(event)
  setAdvertisment(event)
  console.log(advertisment)
}
const hanldeQualification = (event)=>{
  console.log(event)
  setHighestQualification(event)
  console.log(highestQualification)
}
// handle for religion changes
const hanldeReligion=(event)=>{
  setReligion(event) 
  console.log(religion)
}
//  hanlde categeory changes
const hanldeCategory=(event)=>{
  setCategory(event)
  console.log(category)
}
const handleIncomeStatus=(event)=>{
  setIncomeStatus(event)
  console.log(incomeStatus)
}
const hanldeBloodGroup=(event)=>{
  setBloodGroup(event)
  console.log(bloodGroup)
}
const handlePrimaryContact=(event)=>{
  setPrimaryContact(event?.target?.value)
  console.log(primaryContact)
}
const handleprimaryEmail = (event)=>{
  setPrimaryEmailId(event?.target?.value)
  console.log(primaryEmailId)
}
const hanldeSecondaryContact=(event)=>{
  setSecondaryContactNo(event?.target?.value)
  console.log(secondaryContactNo)
}
const handleSecondaryEmail = (event)=>{
  setSecondaryEmailId(event?.target?.value)
  console.log(secondaryEmailId)
}
const hanldePinCode=(event)=>{
  console.log(event?.target?.value)
  if (event || event?.target?.length === 0) {
    const errors = validatePincode(event?.target?.value, "lng");
    setErrors(errors)
    setPincode(event?.target?.value)
  }
  console.log(event?.target?.value.length)
  if(event?.target?.value.length < 6){
    setSelectVillageNameOptions([])
      setSelectCityNameOptions([])
      setSelectDistrictNameOptions([])
      setCityName("") ;setVillageName(""); setDistrict("")
  }
  if(event?.target?.value.length === 6){
    fetchAddressDetailsBasedOnPincode(event?.target?.value).then((jsondata)=>{
      console.log(">>>>>>>>",jsondata)
      let jsonObject = JSON.parse(jsondata.data)
      let city=[]
      let villege=[]
      let district=[]
      jsonObject.map(item=>{villege.push({value:item.cityVillage, label:item.cityVillage})})
      villege=underscore.uniq(villege,true,"label");
      jsonObject.map(item=>{city.push({value:item.taluk, label:(item.taluk)})})
      city=underscore.uniq(city,true,"label");
      jsonObject.map(item => {district.push({label: item.district, value: (item.district).toString()})});          
      district=underscore.uniq(district,true,"label");
      console.log(villege)
      setSelectVillageNameOptions(villege)
      setSelectCityNameOptions(city)
      setSelectDistrictNameOptions(district)
    })
  }
  // if(pincode.length!==5){
  //   setCityName("") 
  //   setVillageName("")
  //   setDistrict("")
  // }
  // if(pincode.length=== 5){
  //   fetchPincodeData(pincode).then((jsondata)=>{
  //     console.log(">>>>>>>>",jsondata)
  //   })
  // }
}
const handleDistric=(event)=>{
 
  // console.log(pincode)
  // console.log(pincode.length)
  setDistrict(event)
  console.log(district)
}
const handleCityName=(event)=>{
  setCityName(event)
  console.log(cityName)
}
const handleVillegeName=(event)=>{
  setVillageName(event)
  console.log(villageName)
}
const handleAddres1 = (event)=>{
  setAddress1(event?.target?.value)
  console.log(address1)
}
const hanldeAddress2 = (event)=>{
  setAddress2(event?.target?.value)
  console.log(address2)
}
const handleFormData=(event)=>{
  event.preventDefault();
  const action = "captureBeneficiaryDetails"
  saveBasicData(action,aadharNumber,gender,firstName,middleName,lastName,dob,highestQualification,religion,bloodGroup,"2018",primaryContact,secondaryContactNo,primaryEmailId,secondaryEmailId,"MSISM").then((jsondata)=>{
    console.log(jsondata)
    if(jsondata.appError==null){
    let jsonObject = JSON.parse(jsondata.data)
    let student_db_Id = jsonObject[0].dbUserId // student db id
    submitAddress(student_db_Id);
    // capturing engagement details
    captureStudentEngagementDetails(student_db_Id,20,7000019).then((jsondata) => { 
      let json = JSON.parse(jsondata.data);
      console.log(json)
      let eng_id = json[0].engagementId //setting engagementid 
      console.log(eng_id)
    })
    }
  })
}
const submitAddress=(student_db_Id)=>{
  let action="captureAddress"
  submitAddressData(action,student_db_Id,"S",address1,address2,pincode,villageName,cityName,district,1,"P","Y").then((jsondata)=>{
    if(jsondata.appError==null){      
        let jsonobjects = JSON.parse(jsondata.data);
       
    }  else{
        console.log("error");
    } 
 })
}
  return (
    <React.Fragment>
       <form method= "POST" onSubmit={(e)=>handleFormData(e)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            required
            id="aadharNumber"
            name="aadharNumber"
            type="number"
            label="Aadhar Number"
            fullWidth="fullWidth"
            autoComplete="aadhar no."
            variant="standard"
            onChange={(e)=>handleAadharNumber(e)}
            onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 12);
              }}
          />
          {errors?.aadharnumber ? ( <div class="basic-input-error">{errors.aadharnumber}</div> ) : null} 
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DateOfBirthBox variant="standard" label="Date Of Birth" 
          onChange={(e)=>handleDob(e)}
          />
          {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="first-name"
            variant="standard"
            onChange={(e)=>{hanldeFirstName(e)}}
            inputProps={{ maxLength: 30 }}
            />
             {errors?.firstName ? ( <div class="basic-input-error">{errors.firstName}</div> ) : null} 
          </Grid>
         
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            required
            id="middleName"
            name="middleName"
            label="Middle name"
            fullWidth
            autoComplete="midde-name"
            variant="standard"
            onChange={(e)=>handleMiddleName(e)}
            inputProps={{ maxLength: 30 }}
            />
             {errors?.middleName ? ( <div class="basic-input-error">{errors.middleName}</div> ) : null} 
          </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e)=>handleLastName(e)}
            />
             {errors?.lastName ? ( <div class="basic-input-error">{errors.lastName}</div> ) : null} 
          </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SingleSelect
            label="Gender"
            id="gender  "
            name="gender"
            options={selectGenderOptions}
            required="required"
            variant="standard"
            onChange={(e)=>hanldeGender(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SingleSelect
            label="How did you hear about us?"
            name="advertisment"
            options={selectHearingOptions}
            variant="standard"
            onChange={(e)=>handleAdvertisment(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SingleSelect
            label="Highest Qualification"
            name="highestQualification"
            options={selectQualificationOptions}
            variant="standard"
            onChange={(e)=>hanldeQualification(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SingleSelect
            label="Religion"
            name="religion"
            options={selectReligionOptions}
            variant="standard"
            onChange={(e)=>hanldeReligion(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SingleSelect
            label="Category"
            name="category"
            options={selectCategoryOptions}
            variant="standard"
            onChange={(e)=>hanldeCategory(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SingleSelect
            label="Income Status"
            name="incomeStatus"
            options={selectIncomeStatusOptions}
            variant="standard"
            onChange={(e)=>handleIncomeStatus(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SingleSelect
            label="Blood Group"
            name="bloodGroup"
            options={selectBloodGroupOptions}
            variant="standard"
            onChange={(e)=>hanldeBloodGroup(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFields
            required
            id="primaryContactNo"
            name="primaryContactNo"
            type="number"
            label="Primary Contact No."
            fullWidth="fullWidth"
            autoComplete="contact no."
            variant="standard"
            onChange={(e)=>handlePrimaryContact(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFields
            required
            id="primaryEmailId"
            name="primaryEmailId"
            type="email"
            label="Primary Email Id."
            fullWidth="fullWidth"
            autoComplete="email id."
            variant="standard"
            onChange={(e)=>handleprimaryEmail(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFields
            id="secondaryContactNo"
            name="secondaryContactNo"
            type="number"
            label="Secondary Contact No."
            fullWidth="fullWidth"
            autoComplete="contact no."
            variant="standard"
            onChange={(e)=>hanldeSecondaryContact(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFields
            id="secondaryEmailId"
            name="secondaryEmailId"
            type="email"
            label="Secondary Email Id."
            fullWidth="fullWidth"
            autoComplete="email id."
            variant="standard"
            onChange={(e)=>handleSecondaryEmail(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFields
            required
            id="pincode"
            name="pincode"
            type="text"
            label="Pincode"
            fullWidth="fullWidth"
            autoComplete="pincode"
            variant="standard"
            value={pincode}
            onChange={(e)=>hanldePinCode(e)}
          />
          {errors?.pincode ? ( <div class="basic-input-error">{errors.pincode}</div> ) : null}
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelect
            label="District"
            name="districtName"
            options={selectDistrictNameOptions}
            variant="standard"
            onChange={(e)=>handleDistric(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelect
            id="cityName"
            name="cityName"
            label="City"
            fullWidth="fullWidth"
            options={selectCityNameOptions}
            onChange={(e)=>handleCityName(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelect
            id="villageName"
            name="villageName"
            label="Village"
            fullWidth="fullWidth"
            options={selectVillageNameOptions}
            onChange={(e)=>handleVillegeName(e)}
          />
        </Grid>
      </Grid>
      <br />
      <Grid item xs={12}>
        <TextFields
          required
          id="address1"
          name="address1"
          label="Address line 1"
          fullWidth
          variant="standard"
          onChange={(e)=>handleAddres1(e)}
        />
      </Grid>
      <br />
      <Grid item xs={12}>
        <TextFields
          id="address2"
          name="address2"
          label="Address line 2"
          fullWidth
          variant="standard"
          onChange={(e)=>hanldeAddress2(e)}
        />
      </Grid>{" "}
      <br/>
      <Grid container direction="row" justify="flex-end" alignItems="flex-end">
          <Button type="submit"  variant="contained" color="primary" >Next</Button>
      </Grid>
      </form>
    </React.Fragment>
  );
}