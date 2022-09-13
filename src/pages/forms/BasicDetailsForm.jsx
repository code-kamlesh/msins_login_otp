import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextFields from "../../components/shared/TextFields";
import { useNavigate } from 'react-router-dom'
import DateOfBirthBox from "../../components/shared/DateOfBirthBox";
import { validateTextInput1, validateEmail, validateContact, isNotEmpty, validateAadharNumber, validatePincode, validateTextInput, validateSelectInput } from "./../../utility/Validation"
import { fetchStduentDataBaisedOnContactNumber, saveBasicData, fetchAddressDetailsBasedOnPincode, fetchExistingAddress, submitAddressData, captureStudentEngagementDetails } from "./../../utility/Api";
import { Button } from "@mui/material";
import underscore from 'underscore';
import SelectOption from "../../components/shared/SelectOption";
import Container from "@mui/material/Container";
import useStyles from '../../components/layout'
import { SingleSelect } from "react-select-material-ui";
const selectHearingOptions = [
  {value:'Social Media' , label:'Social Media'},
  {value:'Newspaper 1' , label:'Newspaper'},
  {value:'Reference(Friends/ relatives)' , label:'Reference(Friends/ relatives)'},
  {value:'School/ College' , label:'School/ College'},
  {value:'Job fairs/ Gathering' , label:'Job fairs/ Gathering'},
  {value:'Others' , label:'Others'}
];

const selectQualificationOptions = ["PhD", "Masters", "Bachelors", "ITI"];
const selectReligionOptions = ["Hindu", "Muslim", "Sikh", "Others"];
const selectCategoryOptions = ["General", "O.B.C", "S.C", "Others"];
const selectIncomeStatusOptions = ["BPL", "APL", "Antyodaya"];
const selectBloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Other"];

export default function BasicDetailsForm() {
  const history = useNavigate();
  const classes = useStyles();
  const [isDataPresent,setIsDataPresent] = useState("");
  const[update,setUpdate] = useState("")
  // const[advertisment,setAdvertisment] = useState("")
  const [selectVillageNameOptions, setSelectVillageNameOptions] = useState([]);
  const [selectCityNameOptions, setSelectCityNameOptions] = useState([])
  const [selectDistrictNameOptions, setSelectDistrictNameOptions] = useState([])
  const selectGenderOptions = ["Male", "Female", "Other"];
  const [errors, setErrors] = useState({"advertisment":""});
  const [emptyState, setEmptyState] = useState("");

  const [stduentBasicData, setStduentBasicData] = useState({
    "dbUserId": window.dbUserId, "aadharNo": "", "dob": "", "firstName": "", "lastName": "", "middleName": "", "advertisment": "", "gender": "", "highestQualification": "", "religion": "", "category": "", "bplStatus": "", "bloodGroup": "",
    "passingYear":"", "primaryContactNumber": "", "primaryEmailId": "", "secondaryContactNo": "", "createdBy": window?.userId, "updatedBy": window?.userId});
    // "id": "",
  const [basicAddressData, setBasicAddressData] = useState({
    "entityId": "", "entityType": "S", "pincode": "", "district": "",
    "cityName": "", "villageName": "", "addressLine1": "", "addressLine2": "", "state": "Maharashtra", "isActive": "Y", "createdBy": window?.userId, "updatedBy": window?.userId
  })
  useEffect(() => {
    console.log(window)
    if (window.jwtTokenResult == "") {
      history('/', { replace: true })
    }
    else if (window.loginType === "SignIn") {
      getStudentData();
      getAddressData();
    }
    else{
      getStudentData();
      setBasicAddressData(preValue => ({ ...preValue, ["pincode"]: window.pincode }))
      fetchCityVillegeDistrictList(window.pincode);
    }

  },[]);

  // [""]:res[0].
  const getStudentData = async () => {
    await fetchStduentDataBaisedOnContactNumber(window.primaryContactNumber, window.jwtTokenResult).then(async (jsondata) => {
      let res = JSON.parse(jsondata.data)
      setStduentBasicData(preValue => ({ ...preValue, ["aadharNo"]:res[0]?.aadharNo|| "" , ["bplStatus"]:res[0]?.bplStatus||"",
      ["dob"]:res[0]?.dob, ["firstName"]:res[0].firstName||"",["lastName"]:res[0].lastName||"",["middleName"]:res[0]?.middleName ||"",
        ["passingYear"]:res[0].passingYear,["primaryContactNumber"]:res[0]?.primaryContactNumber||"", ["primaryEmailId"] :res[0]?.primaryEmailId|| "",
        ["primaryEmailId"]:res[0]?.primaryEmailId || "",["advertisment"]:res[0]?.advertisment || "",["category"]:res[0]?.category || "",["bloodGroup"]:res[0]?.bloodGroup || "",
        ["gender"]:res[0]?.gender||"",["highestQualification"]:res[0]?.highestQualification || "",
        // [""]:res[0].,[""]:res[0].
    }))
    })
  }
  const getAddressData = async () => {
    await fetchExistingAddress(window?.dbUserId, "S", window.jwtTokenResult).then(async (jsondata) => {
      if(jsondata.appError === null && jsondata.data !== "[]" ){
        let res = JSON.parse(jsondata.data)
        console.log(res)
        setBasicAddressData(res[0])
        if (res[0] !== null) {
        setBasicAddressData(preValue => ({ ...preValue, ["id"]: res[0].id }))
        fetchCityVillegeDistrictList(res[0]?.pincode);
      }
      }
      else if(jsondata.appError === null && jsondata.data === "[]"){
        setIsDataPresent(null)
      }
    })
  };


 
  const handleAadharNumber = (event) => {
    if (event?.target?.value || event?.target?.value?.length === 0) {
      const errors = validateAadharNumber(event?.target?.value, "lng")
      setErrors(errors)
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
      const errors = validateSelectInput("dob", event?.target?.value)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["dob"]: event?.target?.value }))
    }
  }
  const hanldeGender = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("gender", event?.target?.value)
      console.log(errors)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["gender"]: event }))
    }
   }
  const handleAdvertisment = (event) => {
    console.log(event)
    if (event || event?.length === 0) {
      const errors = validateSelectInput("advertisment", event)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["advertisment"]: event }))
    }
  }
  const hanldeQualification = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("highestQualification", event)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["highestQualification"]: event }))
    }
  }
  // handle for religion changes
  const hanldeReligion = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("religion", event)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["religion"]: event }))
    }

  }
  //  hanlde categeory changes
  const hanldeCategory = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("category", event)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["category"]: event }))
    }
  }
  const handleIncomeStatus = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("incomeStatus", event)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["bplStatus"]: event }))
    }
  }
  const hanldeBloodGroup = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("bloodGroup", event)
      console.log(errors)
      setErrors(errors);
      setStduentBasicData(preValue => ({ ...preValue, ["bloodGroup"]: event }))
    }
  }
  const handlePrimaryContact = (event) => {
    if (event?.target?.value || event?.target?.value?.length === 0) {
      const errors = validateContact(event?.target?.name, event?.target?.value)
      setErrors(errors)
      setStduentBasicData(preValue => ({ ...preValue, ["primaryContactNumber"]: event?.target?.value }))
    }
  }

  const handleprimaryEmail = (event) => {
    if (event?.target?.value || event?.target?.value?.length === 0) {
      const errors = validateEmail(event?.target?.name, event?.target?.value)
      setErrors(errors)
      setStduentBasicData(preValue => ({ ...preValue, ["primaryEmailId"]: event?.target?.value }))
    }
  }
  const hanldePinCode = (event) => {
    if (event || event?.target?.length === 0) {
      const errors = validatePincode("pincode",event?.target?.value, "lng");
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
      fetchCityVillegeDistrictList(event?.target?.value);
    }
  }
  const fetchCityVillegeDistrictList = (value) => {
    fetchAddressDetailsBasedOnPincode(value).then((jsondata) => {
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
  const handleDistric = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("district", event)
      setErrors(errors);
      setBasicAddressData(preValue => ({ ...preValue, ["district"]: event }))
    }
  }
  const handleCityName = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("cityName", event)
      setErrors(errors);
      setBasicAddressData(preValue => ({ ...preValue, ["cityName"]: event }))
    }
  }
  const handleVillegeName = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("villageName", event)
      setErrors(errors);
      setBasicAddressData(preValue => ({ ...preValue, ["villageName"]: event }))
    }

  }
  const handleAddres1 = (event) => {
    if (event?.target?.value || event?.target?.value.length === 0) {
      const errors = validateTextInput1(event?.target?.name, event?.target?.value, "lng")
      setErrors(errors);
      setBasicAddressData(preValue => ({ ...preValue, ["addressLine1"]: event?.target?.value }))
    }
  }
  const hanldeAddress2 = (event) => {
    if (event?.target?.value || event?.target?.value.length === 0) {
      setBasicAddressData(preValue => ({ ...preValue, ["addressLine2"]: event?.target?.value }))
    }
  }
  const ValidateForm =  (errors) => {
    Validate("advertisment", stduentBasicData?.advertisment)
    Validate("gender", stduentBasicData?.gender)
    Validate("highestQualification", stduentBasicData?.highestQualification)
    Validate("religion", stduentBasicData?.religion)
    Validate("incomeStatus", stduentBasicData?.bplStatus)
    Validate("category", stduentBasicData?.category)
    Validate("bloodGroup", stduentBasicData?.bloodGroup)
    Validate("religion", stduentBasicData?.religion)
    Validate("primaryEmailId", stduentBasicData?.primaryEmailId)
    Validate("pincode", basicAddressData?.pincode)
    Validate('cityName', basicAddressData?.cityName)
    Validate('district', basicAddressData?.district)
    Validate("villageName", basicAddressData?.villageName)
    let valid = true;
    console.log("last stage>>>",errors)
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  const Validate = (name, value) => {
    console.log("before validation>>>",errors)
    switch (name) {
      case 'gender': setErrors(errors["gender"] = isNotEmpty(value))
        break;
      case 'advertisment': setErrors(errors["advertisment"] = isNotEmpty(value))  
        break;
      case 'category': errors["category"] = isNotEmpty(value)
        break;
      case 'bloodGroup':errors["bloodGroup"] = isNotEmpty(value)
        break;
      case 'religion': errors["religion"] = isNotEmpty(value)
        break;
      case 'highestQualification': errors["highestQualification"] = isNotEmpty(value)
       
        break;
      case 'religion': errors["religion"] = isNotEmpty(value)
        break;
      case 'incomeStatus': errors["incomeStatus"] = isNotEmpty(value)
        break;
      case 'primaryEmailId': errors["primaryEmailId"] = isNotEmpty(value)
        break;
      case 'address1': errors["address1"] = isNotEmpty(value)
        break;
      case 'villageName': errors["villageName"] = isNotEmpty(value)
        break;
      case 'cityName': errors["cityName"] = isNotEmpty(value)
        break;
      case 'district':errors["district"] = isNotEmpty(value)
        break;
    }
    setErrors(errors)
  }

  const handleFormData =async (event) => {
    event.preventDefault();
    console.log(stduentBasicData)
    console.log(errors)
    if(ValidateForm(errors)){
      console.log("i am here>>>>",errors)
      try{
        const action = "updateBeneficiaryDetails";
        await saveBasicData(action, stduentBasicData, window.jwtTokenResult).then((jsondata) => {
          if (jsondata.appError == null) {
            let jsonObject = JSON.parse(jsondata.data)
            basicAddressData["entityId"] = jsonObject[0].dbUserId 
            setBasicAddressData(preValue => ({ ...preValue, "entityId": jsonObject[0].dbUserId }))
            // setUpdate("")
            let student_db_Id = jsonObject[0].dbUserId // student db id
            // ()=>{setAddress(addressValue)}
             submitAddress(student_db_Id);
            // capturing engagement details
            if (window.loginType === "SignUp") {
              captureStudentEngagementDetails(student_db_Id, 20, window.userId, window.studentType, window.jwtTokenResult).then((jsondata) => {
                let json = JSON.parse(jsondata.data);
                let eng_id = json[0].engagementId //setting engagementid 
                window.engagementId = eng_id
              })
            }
          }
        })
      }
      catch(err){
        alert(err.message)
      }
    }
    else{
      alert("All field are Maindatory")
    }
  }
  const submitAddress = async (student_db_Id) => {
    try {
      console.log(student_db_Id)
      console.log(basicAddressData)
      let action = "";
      isDataPresent === null ? action = "captureAddress" : action = "updateAddress"
      console.log("data>>>", basicAddressData)
      await submitAddressData(action, basicAddressData, window.jwtTokenResult).then((jsondata) => {
        if (jsondata.appError == null) {
          alert("Data Saved Successfully")
          // history('/socioeconomicdetails', { replace: true })

        } else {
          console.log("error");
        }
      })
    }
    catch (err) {
      alert(err.message)
    }
  }
  return (
    <div className={classes.root} >
      <h3 style={{ textAlign: "center" }}>Basic Details</h3>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <React.Fragment className={classes.actionsContainer}>
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
                  value={stduentBasicData?.aadharNo || ""}
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
                  value={stduentBasicData?.dob || ""}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextFields
                  id="firstName"
                  name="firstName"
                  label="First name"
                  autoComplete="first-name"
                  variant="standard"
                  value={stduentBasicData?.firstName}
                  onChange={(e) => { hanldeFirstName(e) }}
                  inputProps={{ maxLength: 30 }}
                />
                {errors?.firstName ? (<div style={{ color: "red" }}>{errors.firstName}</div>) : null}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextFields
                  id="middleName"
                  name="middleName"
                  label="Middle name"
                  fullWidth
                  value={stduentBasicData?.middleName}
                  autoComplete="midde-name"
                  variant="standard"
                  onChange={(e) => handleMiddleName(e)}
                  inputProps={{ maxLength: 30 }}
                />
                {errors?.middleName ? (<div style={{ color: "red" }}>{errors.middleName}</div>) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextFields
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  value={stduentBasicData?.lastName || ""}
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(e) => handleLastName(e)}
                />
                {errors?.lastName ? (<div style={{ color: "red" }}>{errors.lastName}</div>) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextFields
                  style={{ borderColor: "red" }}
                  label="Gender"
                  id="gender  "
                  name="gender"
                  options={selectGenderOptions}
                  variant="standard"
                  onChange={hanldeGender}
                  value={stduentBasicData?.gender || ""}
                />
                {errors?.gender ? (<div style={{ color: "red" }}>{errors.gender}</div>) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SelectOption
                  id="advertisment"
                  label="How did you hear about us?"
                  name="advertisment"
                  options={selectHearingOptions}
                  value={stduentBasicData?.advertisment || ""}
                  variant="standard"
                  onChange={(e) => handleAdvertisment(e)}
                />
                {errors?.advertisment ? (<div style={{ color: "red" }}>{errors.advertisment}</div>) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SelectOption
                  id="highestQualification"
                  label="Highest Qualification"
                  name="highestQualification"
                  options={selectQualificationOptions}
                  value={stduentBasicData?.highestQualification || ""}
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
                  value={stduentBasicData?.religion || ""}
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
                  value={stduentBasicData?.category || ""}
                  onChange={(e) => hanldeCategory(e)}
                />
                {errors?.category ? (<div style={{ color: "red" }}>{errors.category}</div>) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SelectOption
                  id="incomeStatus"
                  label="Income Status"
                  name="incomeStatus"
                  options={selectIncomeStatusOptions}
                  variant="standard"
                  value={stduentBasicData?.bplStatus || ""}
                  onChange={(e) => handleIncomeStatus(e)}
                />
                {errors?.incomeStatus ? (<div style={{ color: "red" }}>{errors.incomeStatus}</div>) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SelectOption
                  id="bloodGroup"
                  label="Blood Group"
                  name="bloodGroup"
                  options={selectBloodGroupOptions}
                  value={stduentBasicData?.bloodGroup || ""}
                  variant="standard"
                  onChange={(e) => hanldeBloodGroup(e)}
                />
                {errors?.bloodGroup ? (<div style={{ color: "red" }}>{errors.bloodGroup}</div>) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextFields
                  // disabled={true}
                  id="primaryContact"
                  name="primaryContact"
                  type="number"
                  label="Primary Contact No."
                  fullWidth="fullWidth"
                  autoComplete="contact no."
                  value={stduentBasicData?.primaryContactNumber || ""}
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
                  value={stduentBasicData?.primaryEmailId || ""}
                  variant="standard"
                  onChange={(e) => handleprimaryEmail(e)}
                />
                {errors?.primaryEmailId ? (<div style={{ color: "red" }}>{errors.primaryEmailId}</div>) : null}
              </Grid>
              {/* <Grid item xs={12} sm={6} md={4}>
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
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextFields
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  variant="standard"
                  value={basicAddressData?.addressLine1 || ""}
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
                  value={basicAddressData?.addressLine2 || ""}
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
                  value={basicAddressData?.pincode || ""}
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
                  value={basicAddressData?.district || ""}
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
                  value={basicAddressData?.cityName || ""}
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
                  value={basicAddressData?.villageName || ""}
                  options={selectVillageNameOptions}
                  onChange={(e) => handleVillegeName(e)}
                />
                {errors?.villageName ? (<div style={{ color: "red" }} >{errors?.villageName}</div>) : null}
              </Grid>
            </Grid>
            <Grid>
            </Grid>
            <br />
            <Grid container direction="row" justify="flex-end" alignItems="flex-end">
           {/* stduentBasicData?.advertisment?.length === 0 */}
              <Button
              // stduentBasicData?.gender?.length ===0
                // disabled={stduentBasicData?.gender?.length ===0 ? true: false  } && stduentBasicData?.highestQualification?.length ===0)
               disabled={stduentBasicData?.aadharNo?.length<12 ? true:stduentBasicData?.firstName!=="" && stduentBasicData?.middleName!=="" && stduentBasicData?.lastName!==""&& stduentBasicData?.primaryEmailId !== ""&& basicAddressData?.addressLine1!== "" && basicAddressData?.pincode?.length >5 ? false:true  } 
              type="submit" variant="contained" color="primary" >Save</Button>
            </Grid>
          </form>
        </React.Fragment>
      </Container>
    </div>
  );
}