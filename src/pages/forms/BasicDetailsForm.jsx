import React, { useState , useEffect} from "react";
import Grid from "@mui/material/Grid";
import TextFields from "../../components/shared/TextFields";
// import {TextFields } from '@material-ui/core';
import { useLocation } from "react-router-dom";
import DateOfBirthBox from "../../components/shared/DateOfBirthBox";
import { validateTextInput1,validateEmail, validateContact, isNotEmpty, validateAadharNumber, validatePincode, validateTextInput, validateSelectInput } from "./../../utility/Validation"
import { saveBasicData, fetchAddressDetailsBasedOnPincode,fetchExistingAddress, submitAddressData, captureStudentEngagementDetails } from "./../../utility/Api";
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
  const location = useLocation();
  if( location?.state !== null){
    var data = location?.state[0]
  }
 const [addressData,setaddressData] = useState({});
//  var addressData
  useEffect(async () => {
   getUsers(); // run it, run it
  }, []);
  
  const getUsers = async () => {
   await fetchExistingAddress(window?.dbUserId,"S").then(async (jsondata)=>{
    let res = JSON.parse(jsondata.data)
    setaddressData(res[0])
  })
  };

  console.log(addressData)
  const [stduentBasicData, setStduentBasicData] = useState({"dbUserId":1000067935,"aadharNo":data?.aadharNo || "","dob":data?.dob||"","firstName":data?.firstName||"","lastName":"","middleName":data?.middleName||"","advertisment":data?.advertisment||"","gender":data?.gender||"","highestQualification":data?.highestQualification||"","religion":data?.religion||"","category":data?.category||"","bplStatus":data?.bplStatus||"","bloodGroup":data?.bloodGroup||"",
  "passingYear":data?.passingYear|| 2019,"primaryContactNumber":data?.primaryContactNumber||"","primaryEmailId":data?.primaryEmailId||"","secondaryContactNo":data?.secondaryContactNo||"","createdBy":window?.userId, "updatedBy":window?.userId});
  // // student_db_Id, "S", address1, address2, pincode, villageName, cityName, district, 1, "P", "Y"
  const [basicAddressData,setBasicAddressData]= useState({"entityId":"","entityType":"S","pincode":addressData?.pincode||"","district":addressData?.district||"",
  "cityName":addressData?.cityName|| "","villageName":addressData?.villageName||"","addressLine1":addressData?.addressLine1,"addressLine2":addressData?.addressLine2||"","state":"Maharashtra","isActive":"Y","createdBy":window?.userId, "updatedBy":window?.userId})
 
  const [selectVillageNameOptions, setSelectVillageNameOptions] = useState([]);
  const [selectCityNameOptions, setSelectCityNameOptions] = useState([])
  const [selectDistrictNameOptions, setSelectDistrictNameOptions] = useState([])
  const selectGenderOptions = ["Male", "Female", "Other"];
  const [errors, setErrors] = useState({aadharNumber:'', gender:'', dob:'', firstName:''});
  
  const [emptyState,setEmptyState]= useState("");

  // (action,aadharNo, gender, firstName, middleName, lastName,dob,highestQualification,religion, bloodGroup,incomeStatus,category,passingYear, primaryContactNumber, secondaryContactNumber,primaryEmailId, secondaryEmailId,remarks)

  
  const handleAadharNumber = (event) => {
    console.log(addressData)
    if (event?.target?.value || event?.target?.value?.length === 0) {
      const errors = validateAadharNumber(event?.target?.value, "lng")
      setErrors(errors)
      // setAadharNumber(event?.target?.value)
      setStduentBasicData(preValue => ({ ...preValue, ["aadharNo"]: event?.target?.value }))
    }
  }
  const hanldeFirstName = (event) => {
    console.log(event?.target?.value)
    if (event?.target?.value || event?.target?.value.length === 0) {
      const errors = validateTextInput("firstName", event?.target?.value, "lng")
      setErrors(errors)
     
      setStduentBasicData(preValue => ({ ...preValue, ["firstName"]: event?.target?.value }))
    }
  }
  const handleMiddleName = (event) => {
    if (event?.target?.value || event?.target?.value.length === 0) {
      const errors = validateTextInput("middleName", event?.target?.value, "lng")
      setErrors(errors)
      setStduentBasicData(preValue => ({ ...preValue, ["middleName"]: event?.target?.value }))
    }
  }
  const handleLastName = (event) => {
    if (event?.target?.value || event?.target?.value.length === 0) {
      const errors = validateTextInput("lastName", event?.target?.value, "lng")
      setErrors(errors)
      setStduentBasicData(preValue => ({ ...preValue, ["lastName"]: event?.target?.value }))
    }
  }
  const handleDob = (event) => {
    if (event?.target?.value || event?.length === 0) {
      const errors = validateSelectInput("dob",event?.target?.value)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["dob"]: event?.target?.value }))
    }
  }
  const hanldeGender = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("gender",event)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["gender"]: event }))
    }
  }
  const handleAdvertisment = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("advertisment",event)
      setErrors(errors);
     
      setStduentBasicData(preValue => ({ ...preValue, ["advertisment"]: event }))
    }
  }
  const hanldeQualification = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("highestQualification",event)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["highestQualification"]: event }))
    }
  }
  // handle for religion changes
  const hanldeReligion = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("religion",event)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["religion"]: event }))
    }

  }
  //  hanlde categeory changes
  const hanldeCategory = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("category",event)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["category"]: event}))
    }
  }
  const handleIncomeStatus = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("incomeStatus",event)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["bplStatus"]: event }))
    }
  }
  const hanldeBloodGroup = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("bloodGroup",event)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["bloodGroup"]: event }))
    }
  }
  const handlePrimaryContact = (event) => {
    if (event?.target?.value || event?.target?.value?.length === 0) {
      console.log("name>>", event?.target?.name)
      const errors = validateContact(event?.target?.name, event?.target?.value)
      console.log(errors)
      setErrors(errors)
      setStduentBasicData(preValue => ({ ...preValue, ["primaryContactNumber"]: event?.target?.value }))
    }
  }

  const handleprimaryEmail = (event) => {
    if (event?.target?.value || event?.target?.value?.length === 0) {
      const errors = validateEmail(event?.target?.name, event?.target?.value)
      console.log(errors)
      setErrors(errors)
      setStduentBasicData(preValue => ({ ...preValue, ["primaryEmailId"]: event?.target?.value }))
    }
  }
  const hanldeSecondaryContact = (event) => {
    if (event?.target?.value || event?.target?.value?.length === 0) {
      console.log("name>>", event?.target?.name)
      const errors = validateContact(event?.target?.name, event?.target?.value)
      console.log(errors)
      setErrors(errors)
      setStduentBasicData(preValue => ({ ...preValue, ["secondaryContactNo"]: event?.target?.value }))
    }
  }
  const hanldePinCode = (event) => {
    if (event || event?.target?.length === 0) {
      const errors = validatePincode(event?.target?.value, "lng");
      setErrors(errors)
      setBasicAddressData(preValue => ({ ...preValue, ["pincode"]: event?.target?.value }))
    }
    console.log(event?.target?.value.length)
    if (event?.target?.value.length < 6) {
      setSelectVillageNameOptions([])
      setSelectCityNameOptions([])
      setSelectDistrictNameOptions([])
      setBasicAddressData(preValue => ({ ...preValue, ["cityName"]: "" }))
      setBasicAddressData(preValue => ({ ...preValue, ["villageName"]: "" }))
      setBasicAddressData(preValue => ({ ...preValue, ["district"]: "" }))
      // setBasicAddressData.cityName(""); setBasicAddressData.villageName(""); setBasicAddressData.district("")
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
    
      setBasicAddressData(preValue => ({ ...preValue, ["district"]: event }))
    }
  }
  const handleCityName = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("cityName",event)
      setErrors(errors);
      setBasicAddressData(preValue => ({ ...preValue, ["cityName"]: event}))
    }
  }
  const handleVillegeName = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("villageName",event)
      setErrors(errors);
      setBasicAddressData(preValue => ({ ...preValue, ["villageName"]: event }))
    }

  }
  const handleAddres1 = (event) => {
    if(event?.target?.value || event?.target?.value.length !==0){
      const errors = validateTextInput1(event?.target?.name,event?.target?.value,"lng")
      setErrors(errors);
      setBasicAddressData(preValue => ({ ...preValue, ["addressLine1"]: event?.target?.value }))
    }
  }
  const hanldeAddress2 = (event) => {
    if(event?.target?.value || event?.target?.value.length !==0){
      setBasicAddressData(preValue => ({ ...preValue, ["addressLine2"]: event?.target?.value }))
    }
  }
  const ValidateForm = (errors) => {
    Validate('aadharNumber', stduentBasicData.aadharNumber)
    Validate("dob", stduentBasicData.dob)
    Validate("firstName", stduentBasicData.firstName)
    Validate("middleName", stduentBasicData.middleName)
    Validate("lastName", stduentBasicData.lastName)
    Validate("advertisment", stduentBasicData.advertisment)
    Validate("villageName", stduentBasicData.villageName)
    Validate("gender", stduentBasicData.gender)
    Validate("highestQualification", stduentBasicData.highestQualification)
    Validate("religion", stduentBasicData.religion)
    Validate("incomeStatus", stduentBasicData.incomeStatus)
    Validate("category", stduentBasicData.category)
    Validate("bloodGroup", stduentBasicData.bloodGroup)
    Validate("religion", stduentBasicData.religion)
    Validate("primaryContact", stduentBasicData.primaryContact)
    Validate("primaryEmailId", stduentBasicData.primaryEmailId)
    Validate("address1", basicAddressData.address1)
    Validate("pincode", basicAddressData.pincode)
    Validate('cityName', basicAddressData.cityName)
    Validate('district', basicAddressData.district)
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
      const action = "updateBeneficiaryDetails";
      saveBasicData(action, stduentBasicData).then(async (jsondata) => {
        if (jsondata.appError == null) {
          let jsonObject = JSON.parse(jsondata.data)
          let student_db_Id = jsonObject[0].dbUserId // student db id
          setBasicAddressData(preValue => ({ ...preValue, ["entityId"]: student_db_Id }))
            submitAddress(student_db_Id);
          // capturing engagement details
          // captureStudentEngagementDetails(student_db_Id, 20, 7000019,"Innovator").then((jsondata) => {
          //   let json = JSON.parse(jsondata.data);
          //   console.log(json)
          //   let eng_id = json[0].engagementId //setting engagementid 
          //   console.log(eng_id)
          // })
        }
      })
    // }
    // document.getElementById("checkbox").click();
    console.log(errors)
  }
  const submitAddress =async (dbUserId) => {
    try{
      let action ="";
      await fetchExistingAddress(dbUserId,"S").then(async (jsondata)=>{
        let res = JSON.parse(jsondata.data)
        console.log(res)
        console.log(typeof res)
        if(res == null){
           action = "captureAddress"
        }
        else{
          action = "updateAddress"
        }
        console.log("data>>>", basicAddressData)
        await submitAddressData(action, basicAddressData).then((jsondata) => {
          if (jsondata.appError == null) {
            // let jsonobjects = JSON.parse(jsondata);
            // if(jsonobjects.appError === null){
              alert("Data Saved Successfully")
            
          } else {
            console.log("error");
          }
        })
      })
    }
    catch(err){
      alert(err.message)
    } 
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
              value={stduentBasicData.aadharNo}
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
            <div>Date of Birth</div>
            <DateOfBirthBox variant="standard" 
              disabled={true}
              onChange={(e) => handleDob(e)}
              value={stduentBasicData.dob}
            />
            {errors?.dob ? (<div style={{ color: "red" }}>{errors.dob}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextFields

              id="firstName"
              name="firstName"
              label="First name"
              autoComplete="first-name"
              variant="standard"
              value={stduentBasicData.firstName}
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
              value={stduentBasicData.middleName}
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
              value={stduentBasicData.lastName || ""}
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
              value={stduentBasicData.gender || ""}
            />
            {errors?.gender ? (<div style={{ color: "red" }}>{errors.gender}</div>) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectOption 
            id = "advertisment"
              label="How did you hear about us?"
              name="advertisment"
              options={selectHearingOptions}
              value={stduentBasicData.advertisment || ""}
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
              value={stduentBasicData.highestQualification || ""}
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
              value={stduentBasicData.religion || ""}
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
              value={stduentBasicData.category || ""}
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
              value={stduentBasicData.bplStatus || ""}
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
              value={stduentBasicData.bloodGroup || ""}
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
              value={stduentBasicData.primaryContactNumber || ""}
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
              value={stduentBasicData.primaryEmailId || ""}
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
              value={addressData.addressLine1}
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
              value={addressData.addressLine2}
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
              
              value={addressData.pincode}
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
              
              value={addressData.district}
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
              
              value={addressData.cityName}
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
              value={addressData.villageName}
              options={selectVillageNameOptions}
              onChange={(e) => handleVillegeName(e)}
            />
            {errors?.villageName ? (<div style={{ color: "red" }} >{errors?.villageName}</div>) : null}
          </Grid>
        </Grid>
        <Grid>
        {/* <input
          hidden={true}
          type="checkbox"
          id="checkbox"
          name="checkbox"
          value="checkbox"
          // checked={isChecked}
          onChange={handleOnChange}
        /> */}
        </Grid>
        <br />
        <Grid container direction="row" justify="flex-end" alignItems="flex-end">
          <Button type="submit" variant="contained" color="primary" >Save</Button>
        </Grid>
      </form>
    </React.Fragment>
  );
}