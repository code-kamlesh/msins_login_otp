import React, { useState , useEffect} from "react";
import Grid from "@mui/material/Grid";
import TextFields from "../../components/shared/TextFields";
// import {TextFields } from '@material-ui/core';
import DateOfBirthBox from "../../components/shared/DateOfBirthBox";
import { validateTextInput1,validateEmail, validateContact, isNotEmpty, validateAadharNumber, validatePincode, validateTextInput, validateSelectInput } from "./../../utility/Validation"
import { saveBasicData, fetchAddressDetailsBasedOnPincode, submitAddressData, captureStudentEngagementDetails } from "./../../utility/Api";
import { Button } from "@mui/material";
import underscore from 'underscore';
import SelectOption from "../../components/shared/SelectOption";

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
  const [selectVillageNameOptions, setSelectVillageNameOptions] = useState([]);
  const [selectCityNameOptions, setSelectCityNameOptions] = useState([])
  const [selectDistrictNameOptions, setSelectDistrictNameOptions] = useState([])
  const selectGenderOptions = ["Male", "Female", "Other"];
  const [aadharNumber, setAadharNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dob, setDob] = useState("");
  const [lastName, setLastName] = useState("");
  const [advertisment, setAdvertisment] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({aadharNumber:'', gender:'', dob:'', firstName:''});
  const [highestQualification, setHighestQualification] = useState("");
  const [religion, setReligion] = useState("");
  const [category, setCategory] = useState("");
  const [incomeStatus, setIncomeStatus] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [primaryContact, setPrimaryContact] = useState("");
  const [primaryEmailId, setPrimaryEmailId] = useState("");
  const [secondaryContactNo, setSecondaryContactNo] = useState("");
  const [secondaryEmailId, setSecondaryEmailId] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [cityName, setCityName] = useState("");
  const [villageName, setVillageName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [emptyState,setEmptyState]= useState("");

  const handleAadharNumber = (event) => {
    if (event?.target?.value || event?.target?.value?.length === 0) {
      const errors = validateAadharNumber(event?.target?.value, "lng")
      setErrors(errors)
      setAadharNumber(event?.target?.value)
      console.log(errors)
    }
  }
  const hanldeFirstName = (event) => {
    console.log(event?.target?.value)
    if (event?.target?.value || event?.target?.value.length === 0) {
      const errors = validateTextInput("firstName", event?.target?.value, "lng")
      setErrors(errors)
      setFirstName(event?.target?.value)
    }
  }
  const handleMiddleName = (event) => {
    console.log(window.name)
    window.name = "Kamlesh"
    console.log(window.name)
    if (event?.target?.value || event?.target?.value.length === 0) {
      const errors = validateTextInput("middleName", event?.target?.value, "lng")
      console.log(errors)
      setErrors(errors)
      setMiddleName(event?.target?.value)
      console.log(middleName)
    }
  }
  const handleLastName = (event) => {
    if (event?.target?.value || event?.target?.value.length === 0) {
      const errors = validateTextInput("lastName", event?.target?.value, "lng")
      console.log(errors)
      setErrors(errors)
      setLastName(event?.target?.value)
      console.log(lastName)
    }
  }
  const handleDob = (event) => {
    if (event?.target?.value || event?.length === 0) {
      const errors = validateSelectInput("dob",event?.target?.value)
      setErrors(errors);
      setDob(event?.target?.value)
    }
    
  }
  const hanldeGender = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("gender",event)
      setErrors(errors);
      setGender(event);
    }
  }
  const handleAdvertisment = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("advertisment",event)
      setErrors(errors);
      setAdvertisment(event)
    }
  }
  const hanldeQualification = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("highestQualification",event)
      setErrors(errors);
      setHighestQualification(event)
    }
  }
  // handle for religion changes
  const hanldeReligion = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("religion",event)
      setErrors(errors);
    setReligion(event)
    }

  }
  //  hanlde categeory changes
  const hanldeCategory = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("category",event)
      setErrors(errors);
    setCategory(event)
    }
  }
  const handleIncomeStatus = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("incomeStatus",event)
      setErrors(errors);
    setIncomeStatus(event)
    }
  }
  const hanldeBloodGroup = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("bloodGroup",event)
      setErrors(errors);
      setBloodGroup(event)
    }
  }
  const handlePrimaryContact = (event) => {
    if (event?.target?.value || event?.target?.value?.length === 0) {
      console.log("name>>", event?.target?.name)
      const errors = validateContact(event?.target?.name, event?.target?.value)
      console.log(errors)
      setErrors(errors)
      setPrimaryContact(event?.target?.value)
    }
  }

  const handleprimaryEmail = (event) => {
    if (event?.target?.value || event?.target?.value?.length === 0) {
      const errors = validateEmail(event?.target?.name, event?.target?.value)
      console.log(errors)
      setErrors(errors)
      setPrimaryEmailId(event?.target?.value)
    }
  }
  const hanldeSecondaryContact = (event) => {
    if (event?.target?.value || event?.target?.value?.length === 0) {
      console.log("name>>", event?.target?.name)
      const errors = validateContact(event?.target?.name, event?.target?.value)
      console.log(errors)
      setErrors(errors)
      setSecondaryContactNo(event?.target?.value)

    }
  }
  const hanldePinCode = (event) => {
    if (event || event?.target?.length === 0) {
      const errors = validatePincode(event?.target?.value, "lng");
      setErrors(errors)
      setPincode(event?.target?.value)
    }
    console.log(event?.target?.value.length)
    if (event?.target?.value.length < 6) {
      setSelectVillageNameOptions([])
      setSelectCityNameOptions([])
      setSelectDistrictNameOptions([])
      setCityName(""); setVillageName(""); setDistrict("")
    }
    if (event?.target?.value.length === 6) {
      fetchAddressDetailsBasedOnPincode(event?.target?.value).then((jsondata) => {

        let jsonObject = JSON.parse(jsondata.data)
        let city = []
        let villege = []
        let district = []
        jsonObject.map(item => { villege.push({ value: item.cityVillage, label: item.cityVillage }) })
        villege = underscore.uniq(villege, true, "label");
        jsonObject.map(item => { city.push({ value: item.taluk, label: (item.taluk) }) })
        city = underscore.uniq(city, true, "label");
        jsonObject.map(item => { district.push({ label: item.district, value: (item.district).toString() }) });
        district = underscore.uniq(district, true, "label");

        setSelectVillageNameOptions(villege)
        setSelectCityNameOptions(city)
        setSelectDistrictNameOptions(district)
      })
    }

  }
  const handleDistric = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("district",event)
      setErrors(errors);
    setDistrict(event)
    }
  }
  const handleCityName = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("cityName",event)
      setErrors(errors);
    setCityName(event)
    }
  }
  const handleVillegeName = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("villageName",event)
      setErrors(errors);
    setVillageName(event)
    }

  }
  const handleAddres1 = (event) => {
    if(event?.target?.value || event?.target?.value.length !==0){
      const errors = validateTextInput1(event?.target?.name,event?.target?.value,"lng")
      setErrors(errors);
      setAddress1(event?.target?.value)
    }
  }
  const hanldeAddress2 = (event) => {
    if(event?.target?.value || event?.target?.value.length !==0){
      setAddress2(event?.target?.value)
    }
  }
  const ValidateForm = (errors) => {
    Validate('aadharNumber', aadharNumber)
    Validate("dob", dob)
    Validate("firstName", firstName)
    Validate("middleName", middleName)
    Validate("lastName", lastName)
    Validate("advertisment", advertisment)
    Validate("villageName", villageName)
    Validate("gender", gender)
    Validate("highestQualification", highestQualification)
    Validate("religion", religion)
    Validate("incomeStatus", incomeStatus)
    Validate("category", category)
    Validate("bloodGroup", bloodGroup)
    Validate("religion", religion)
    Validate("primaryContact", primaryContact)
    Validate("primaryEmailId", primaryEmailId)
    Validate("address1", address1)
    Validate("pincode", pincode)
    Validate('cityName', cityName)
    Validate('district', district)
    let valid = true;
    Object?.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
 const Validate = async(name, value) => {
    let error = errors
      switch (name) {
        case 'aadharNumber': error = isNotEmpty(name, value)
        setErrors(error)
        setEmptyState("")
          break;
        case 'dob': error = isNotEmpty(name, value)
          setErrors(error)
          setEmptyState("")
          break;
        case 'firstName': error = isNotEmpty(name, value)
          setErrors(error)
          setEmptyState("")
          break;
        case 'middleName': error = isNotEmpty(name, value)
          setErrors(error)
          setEmptyState("")
          break;
        case 'lastName': error = isNotEmpty(name, value)
          setErrors(error)
          setEmptyState("")
          break;
        case 'gender': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'advertisment': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'category': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'bloodGroup': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'religion': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'highestQualification': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'religion': error = isNotEmpty(name, value)
          setErrors(error)
          break;
  
        case 'pincode': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'incomeStatus': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'primaryContact': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'primaryEmailId': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'address1': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'villageName': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'cityName': error = isNotEmpty(name, value)
          setErrors(error)
          break;
        case 'district': error = isNotEmpty(name, value)
          setErrors(error)
          setEmptyState("")
          break;
      }
      setEmptyState("")
  }

  // useEffect(()=>{},[])
  const handleFormData = (event) => {
    // useEffect(()=>{},[])
    event.preventDefault();
    // if (ValidateForm(errors)) 
    // {
      console.log(errors)
      const action = "captureBeneficiaryDetails"
      saveBasicData(action, aadharNumber, gender, firstName, middleName, lastName, dob, highestQualification, religion, bloodGroup, incomeStatus, category, "2018", primaryContact, secondaryContactNo, primaryEmailId, secondaryEmailId, "MSISM").then((jsondata) => {

        if (jsondata.appError == null) {
          let jsonObject = JSON.parse(jsondata.data)
          let student_db_Id = jsonObject[0].dbUserId // student db id
          submitAddress(student_db_Id);
          // capturing engagement details
          captureStudentEngagementDetails(student_db_Id, 20, 7000019).then((jsondata) => {
            let json = JSON.parse(jsondata.data);
            console.log(json)
            let eng_id = json[0].engagementId //setting engagementid 
            console.log(eng_id)
          })
          alert("Data Saved Successfully")
        }
      })
    // }
    document.getElementById("checkbox").click();
    console.log(errors)
  }
  const submitAddress = (student_db_Id) => {
    let action = "captureAddress"
    submitAddressData(action, student_db_Id, "S", address1, address2, pincode, villageName, cityName, district, 1, "P", "Y").then((jsondata) => {
      if (jsondata.appError == null) {
        let jsonobjects = JSON.parse(jsondata.data);

      } else {
        console.log("error");
      }
    })
  }
 const handleOnChange= (event)=>{
    setEmptyState(event)
  }
  return (
    <React.Fragment>
      <form method="POST" onSubmit={(e) => handleFormData(e)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextFields
              id="aadharNumber"
              name="aadharNumber"
              type="number"
              label="Aadhar Number"
              fullWidth="fullWidth"
              autoComplete="aadhar no."
              variant="standard"
              // error={(errors.aadharNumber?.length>0)?true:false}
              error={true}
              onChange={(e) => handleAadharNumber(e)}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 12);
              }}

            />
            {errors?.aadharNumber ? (<div style={{ color: "red" }}>{errors.aadharNumber}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DateOfBirthBox variant="standard" label="Date Of Birth"
              onChange={(e) => handleDob(e)}
              error={true}
            />
            {errors?.dob ? (<div style={{ color: "red" }}>{errors.dob}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFields

              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="first-name"
              variant="standard"
              onChange={(e) => { hanldeFirstName(e) }}
              inputProps={{ maxLength: 30 }}
              error={true}
            />
            {errors?.firstName ? (<div style={{ color: "red" }}>{errors.firstName}</div>) : null}
          </Grid>

          <Grid item   xs={12} sm={6} md={4}>
            <TextFields 
              id="middleName"
              name="middleName"
              label="Middle name"
              fullWidth
              autoComplete="midde-name"
              variant="standard"
              onChange={(e) => handleMiddleName(e)}
              inputProps={{ maxLength: 30 }}
              error={true}
            />
            {errors?.middleName ? (<div style={{ color: "red" }}>{errors.middleName}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFields
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(e) => handleLastName(e)}
              error={true}
            />
            {errors?.lastName ? (<div style={{ color: "red" }}>{errors.lastName}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            
            <SelectOption
            style={{borderColor:"red"}}
              label="Gender"
              id="gender  "
              name="gender"
              options={selectGenderOptions}
              variant="standard"
              onChange={(e) => hanldeGender(e)}
              error={true}
            />
            {errors?.gender ? (<div style={{ color: "red" }}>{errors.gender}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectOption 
            id = "advertisment"
              label="How did you hear about us?"
              name="advertisment"
              options={selectHearingOptions}
              variant="standard"
              onChange={(e) => handleAdvertisment(e)}
            />
            {errors?.advertisment ? (<div style={{ color: "red" }}>{errors.advertisment}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectOption
              id = "highestQualification"
              label="Highest Qualification"
              name="highestQualification"
              options={selectQualificationOptions}
              variant="standard"
              onChange={(e) => hanldeQualification(e)}
            />
            {errors?.highestQualification ? (<div style={{ color: "red" }}>{errors.highestQualification}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectOption
              id="religion"
              label="Religion"
              name="religion"
              options={selectReligionOptions}
              variant="standard"
              onChange={(e) => hanldeReligion(e)}
            />
            {errors?.religion ? (<div style={{ color: "red" }}>{errors.religion}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectOption
              id="Category"
              label="Category"
              name="category"
              options={selectCategoryOptions}
              variant="standard"
              onChange={(e) => hanldeCategory(e)}
            />
            {errors?.category ? (<div style={{ color: "red" }}>{errors.category}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectOption
              id = "incomeStatus"
              label="Income Status"
              name="incomeStatus"
              options={selectIncomeStatusOptions}
              variant="standard"
              onChange={(e) => handleIncomeStatus(e)}
            />
            {errors?.incomeStatus ? (<div style={{ color: "red" }}>{errors.incomeStatus}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectOption
              id = "bloodGroup"
              label="Blood Group"
              name="bloodGroup"
              options={selectBloodGroupOptions}
              variant="standard"
              onChange={(e) => hanldeBloodGroup(e)}
            />
            {errors?.bloodGroup ? (<div style={{ color: "red" }}>{errors.bloodGroup}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFields
              id="primaryContact"
              name="primaryContact"
              type="number"
              label="Primary Contact No."
              fullWidth="fullWidth"
              autoComplete="contact no."
              variant="standard"
              onChange={(e) => handlePrimaryContact(e)}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
            {errors?.primaryContact ? (<div style={{ color: "red" }}>{errors.primaryContact}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFields

              id="primaryEmailId"
              name="primaryEmailId"
              type="email"
              label="Primary Email Id."
              fullWidth="fullWidth"
              autoComplete="email id."
              variant="standard"
              onChange={(e) => handleprimaryEmail(e)}
            />
            {errors?.primaryEmailId ? (<div style={{ color: "red" }}>{errors.primaryEmailId}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFields
              id="secondaryContactNo"
              name="secondaryContactNo"
              type="number"
              label="Secondary Contact No."
              fullWidth="fullWidth"
              autoComplete="contact no."
              variant="standard"
              onChange={(e) => hanldeSecondaryContact(e)}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
            {errors?.secondaryContactNo ? (<div style={{ color: "red" }}>{errors.secondaryContactNo}</div>) : null}
          </Grid>
          {/* <Grid item xs={12} sm={6}>
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
        </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextFields

              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              variant="standard"
              onChange={(e) => handleAddres1(e)}
            />
            {errors?.address1 ? (<div style={{ color: "red" }}>{errors.address1}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFields
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              variant="standard"
              onChange={(e) => hanldeAddress2(e)}
            />
            {errors?.address2 ? (<div style={{ color: "red" }}>{errors.address2}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFields

              id="pincode"
              name="pincode"
              type="number"
              label="Pincode"
              fullWidth="fullWidth"
              autoComplete="pincode"
              variant="standard"
              value={pincode}
              onChange={(e) => hanldePinCode(e)}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6);
              }}
            />
            {errors?.pincode ? (<div style={{ color: "red" }}>{errors.pincode}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectOption

              label="District"
              id="district"
              name="district"
              options={selectDistrictNameOptions}
              variant="standard"
              onChange={(e) => handleDistric(e)}
            />
            {errors?.district ? (<div style={{ color: "red" }}>{errors.district}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectOption

              id="cityName"
              name="cityName"
              label="City"
              fullWidth="fullWidth"
              options={selectCityNameOptions}
              onChange={(e) => handleCityName(e)}
            />
            {errors?.cityName ? (<div style={{ color: "red" }}>{errors?.cityName}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectOption
              id="villageName"
              name="villageName"
              label="Village"
              fullWidth="fullWidth"
              options={selectVillageNameOptions}
              onChange={(e) => handleVillegeName(e)}
            />
            {errors?.villageName ? (<div style={{ color: "red" }} >{errors?.villageName}</div>) : null}
          </Grid>
        </Grid>
        <Grid>
        <input
          hidden={true}
          type="checkbox"
          id="checkbox"
          name="checkbox"
          value="checkbox"
          // checked={isChecked}
          onChange={handleOnChange}
        />
        </Grid>
        <br />
        <Grid container direction="row" justify="flex-end" alignItems="flex-end">
          <Button type="submit" variant="contained" color="primary" >Save</Button>
        </Grid>
      </form>
    </React.Fragment>
  );
}