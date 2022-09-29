import  React,{useState,useEffect} from "react";
import Grid from "@mui/material/Grid";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import SelectOption from "../../components/shared/SelectOption";
import useStyles  from '../../components/layout'
import {  useNavigate } from 'react-router-dom'
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import underscore from 'underscore';
import  TextField  from '@mui/material/TextField';
import { validateTextInput1,validatePincode, validateSelectInput } from "./../../utility/Validation"
import {fetchAllQestionSet,saveMsinsBusinessData,updateMsinsBuisnessDetails,fetchSavedQuestionAnswer, fetchExistingAddress, submitAddressData,fetchAddressDetailsBasedOnPincode } from "./../../utility/Api";


export default function BusinessCaseEntrepreneurForm() {
  const history = useNavigate();
  const classes = useStyles();
  const [answerFromDb,setAnswerFromDb] = useState([])
  const domainList = ["Electrical", "Mechanical", "Fitter", "Welder", "Farm"];
  const [questionlist, setQuestionlist] = useState([]);
  const [selectVillageNameOptions, setSelectVillageNameOptions] = useState([]);
  const [selectCityNameOptions, setSelectCityNameOptions] = useState([])
  const [selectDistrictNameOptions, setSelectDistrictNameOptions] = useState([])
  const [errors, setErrors] = useState({});
  const [isDataPresent,setIsDataPresent] = useState()
  const [questionAnswer1 , setQuestionAnswer1] = useState({"id":"","questionId":"", "answer":"", "dbUserId":window.dbUserId,"businessType":"BCB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer2 , setQuestionAnswer2] = useState({"id":"","questionId":"", "answer":"", "dbUserId":window.dbUserId,"businessType":"BCB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer3 , setQuestionAnswer3] = useState({"id":"","questionId":"", "answer":"", "dbUserId":window.dbUserId,"businessType":"BCB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer4 , setQuestionAnswer4] = useState({"id":"","questionId":"", "answer":"", "dbUserId":window.dbUserId,"businessType":"BCB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer5 , setQuestionAnswer5] = useState({"id":"","questionId":"", "answer":"", "dbUserId":window.dbUserId,"businessType":"BCB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer6 , setQuestionAnswer6] = useState({"id":"","questionId":"", "answer":"", "dbUserId":window.dbUserId,"businessType":"BCB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer7 , setQuestionAnswer7] = useState({"id":"","questionId":"", "answer":"", "dbUserId":window.dbUserId,"businessType":"BCB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer8 , setQuestionAnswer8] = useState({"id":"","questionId":"", "answer":"", "dbUserId":window.dbUserId,"businessType":"BCB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer9 , setQuestionAnswer9] = useState({"id":"","questionId":"19", "answer":"", "dbUserId":window.dbUserId,"businessType":"BCB","createdBy":window.userid,"updatedBy":window.userid});
  const [businessAddressDetails, setBusinessAddressDetails] = useState({
    "entityId": window.dbUserId, "entityType": "EB", "pincode": "", "district": "",
    "cityName": "", "villageName": "", "state": "Maharashtra", "isActive": "Y", "createdBy": window?.userid, "updatedBy": window?.userid
  })
  
  useEffect(() => {
    if (window.jwtTokenResult === "") {
      history('/', { replace: true })
    }
    else{
      getAddressData();
      fetchQuestionSet();
      fetchExistingData();
    } 
  },[]);

  // Fetching existing Saved Data
  const fetchExistingData = ()=>{
    fetchSavedQuestionAnswer(window.dbUserId,window.refreshJwtToken).then((jsondata)=>{
      let res = jsondata.filter(val=>(val.businessType === "BCB"))
      setAnswerFromDb(res)
      for(var i=0;i<res.length;i++){
        if(res[i]?.questionId === "10"){
        questionAnswer1.answer = res[i]?.answer
        questionAnswer1.id = res[i]?.id
        }
        else if(res[i]?.questionId === "11"){
          questionAnswer2.answer = res[i]?.answer
          questionAnswer2.id = res[i]?.id
        }
        else if(res[i]?.questionId === "12"){
          questionAnswer3.answer = res[i]?.answer
          questionAnswer3.id = res[i]?.id
        }
        else if(res[i]?.questionId === "13"){
          questionAnswer4.answer = res[i]?.answer
          questionAnswer4.id = res[i]?.id
        }
        else if(res[i]?.questionId === "14"){
          questionAnswer5.answer = res[i]?.answer
          questionAnswer5.id = res[i]?.id
        }
        else if(res[i].questionId === "15"){
          questionAnswer6.answer = res[i]?.answer
          questionAnswer6.id = res[i]?.id
        }
        else if(res[i]?.questionId === "16"){
          questionAnswer7.answer = res[i]?.answer
          questionAnswer7.id = res[i]?.id
        }
        else if(res[i]?.questionId === "17"){
        questionAnswer8.answer = res[i]?.answer
        questionAnswer8.id = res[i]?.id
        }
        else if(res[i]?.questionId === "19"){
          questionAnswer9.answer = res[i]?.answer
          questionAnswer9.id = res[i]?.id
          }
      }
    })
  }
  // show saved answer
  const getBusinessCaseAnswer = (id)=>{
    let ans = answerFromDb;
    const totalCharacters = 1000;
    for(var i =0;i<ans.length;i++){
        var singalAnswer = ans[i];
        if(singalAnswer?.questionId == id){
          // document.getElementById("leftCharacters" +singalAnswer?.questionId ).innerHTML = "Number of characters left " + (totalCharacters - singalAnswer?.answer?.length);
          return singalAnswer.answer
        }
    }
  }
  //fetching QUestion set
  const fetchQuestionSet = () => {
    try{
      let arr = [];
      fetchAllQestionSet("all", window.refreshJwtToken).then((jsondata) => {
        for (var i = 0; i < jsondata.length; i++) {
          if (jsondata[i].businessType === "BCB" && jsondata[i].isActive === "Y") {
            arr[i] = (jsondata[i])
          }
        }
        setQuestionlist(arr)
      })
    }
    catch(err){
      alert(err.message)
    }
  }
  // fetching existing address details for BCB
  const getAddressData = async () => {
    await fetchExistingAddress(window?.dbUserId, "EB", window.jwtTokenResult).then(async (jsondata) => {
      if(jsondata.appError === null && jsondata.data !== "[]" ){
        let res = JSON.parse(jsondata.data)
        setBusinessAddressDetails(res[0])
        if (res[0] !== null) {
        setBusinessAddressDetails(preValue => ({ ...preValue, ["id"]: res[0].id }))
        fetchCityVillegeDistrictList(res[0]?.pincode);
      }
      }
      else if(jsondata.appError === null && jsondata.data === "[]"){
        setIsDataPresent(null)
      }
    })
  };

  // fetching city villege district list
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


  // handle pincode
  const handlePinCode = (event) => {
    if (event || event?.target?.length === 0) {
      const errors = validatePincode("pincode",event?.target?.value, "lng");
      setErrors(errors)
      setBusinessAddressDetails(preValue => ({ ...preValue, ["pincode"]: event?.target?.value }))
    }
    if (event?.target?.value.length < 6) {
      setSelectVillageNameOptions([])
      setSelectCityNameOptions([])
      setSelectDistrictNameOptions([])
      setBusinessAddressDetails(preValue => ({ ...preValue, ["cityName"]: "" }))
      setBusinessAddressDetails(preValue => ({ ...preValue, ["villageName"]: "" }))
      setBusinessAddressDetails(preValue => ({ ...preValue, ["district"]: "" }))
    }
    if (event?.target?.value.length === 6) {
      fetchCityVillegeDistrictList(event?.target?.value);
    }
  }
  const handleDistric = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("district", event)
      setErrors(errors);
      setBusinessAddressDetails(preValue => ({ ...preValue, ["district"]: event }))
    }
  }
  const handleCityName = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("cityName", event)
      setErrors(errors);
      setBusinessAddressDetails(preValue => ({ ...preValue, ["cityName"]: event }))
    }
  }
  const handleVillegeName = (event) => {
    if (event || event?.length === 0) {
      const errors = validateSelectInput("villageName", event)
      setErrors(errors);
      setBusinessAddressDetails(preValue => ({ ...preValue, ["villageName"]: event }))
    }
  }
  const handleDomain = (event)=>{
    setQuestionAnswer9(preValue=>({...preValue,["answer"]: event}))
  }
  const submitData = ()=>{
    var bsuinesscasebriefdata= []
    bsuinesscasebriefdata.push(questionAnswer1)
    bsuinesscasebriefdata.push(questionAnswer2)
    bsuinesscasebriefdata.push(questionAnswer3)
    bsuinesscasebriefdata.push(questionAnswer4)
    bsuinesscasebriefdata.push(questionAnswer5)
    bsuinesscasebriefdata.push(questionAnswer6)
    bsuinesscasebriefdata.push(questionAnswer7)
    bsuinesscasebriefdata.push(questionAnswer8)
    bsuinesscasebriefdata.push(questionAnswer9)

    try{
        bsuinesscasebriefdata.map((item,key)=>{
          if(item.id ===""){
              saveMsinsBusinessData(item,  window.refreshJwtToken).then((jsondata)=>{
            })
          }
          else{
              updateMsinsBuisnessDetails(item,  window.refreshJwtToken).then((jsondata)=>{
            })
          }
        })
      submitAddress();
      bsuinesscasebriefdata = []
    }
    catch(err){
      alert(err.message)
    } 
  }
  const handleBack = ()=>{
    history('/Businessdetails' ,{replace:true})
  }

  //handle all quaetion answer
  const handleInputChange = (event)=>{
    let useranswer = answerFromDb
    const totalCharacters = 1000;
    document.getElementById("leftCharacters" + event?.target?.name).innerHTML = "Number of characters left " + (totalCharacters - event?.target?.value.length);
  
    if(event?.target?.name === "10"){
      setQuestionAnswer1(preValue=>({...preValue,["answer"]: event?.target?.value,["questionId"]: event?.target?.name}))
      useranswer?.map((item)=>{
       if(item.questionId == "10")
        setAnswerFromDb(preValue=>({...preValue,["answer"]: event?.target?.value}))
      })
    }
    if(event?.target?.name === "11"){
      setQuestionAnswer2(preValue=>({...preValue,["answer"]: event?.target?.value,["questionId"]: event?.target?.name}))
      useranswer?.map((item)=>{
        if(item.questionId == "11")
         setAnswerFromDb(preValue=>({...preValue,["answer"]: event?.target?.value}))
       })
    }
    if(event?.target?.name === "12"){
      setQuestionAnswer3(preValue=>({...preValue,["answer"]: event?.target?.value,["questionId"]: event?.target?.name}))
      useranswer?.map((item)=>{
        if(item.questionId == "12")
         setAnswerFromDb(preValue=>({...preValue,["answer"]: event?.target?.value}))
       })
    }
    if(event?.target?.name === "13"){
      setQuestionAnswer4(preValue=>({...preValue,["answer"]: event?.target?.value,["questionId"]: event?.target?.name}))
      useranswer?.map((item)=>{
        if(item.questionId == "13")
         setAnswerFromDb(preValue=>({...preValue,["answer"]: event?.target?.value}))
       })
    }
    if(event?.target?.name === "14"){
      setQuestionAnswer5(preValue=>({...preValue,["answer"]: event?.target?.value,["questionId"]: event?.target?.name}))
      useranswer?.map((item)=>{
        if(item.questionId == "14")
         setAnswerFromDb(preValue=>({...preValue,["answer"]: event?.target?.value}))
       })
    }
    if(event?.target?.name === "15"){
      setQuestionAnswer6(preValue=>({...preValue,["answer"]: event?.target?.value,["questionId"]: event?.target?.name}))
      useranswer?.map((item)=>{
        if(item.questionId == "15")
         setAnswerFromDb(preValue=>({...preValue,["answer"]: event?.target?.value}))
       })
    }
    if(event?.target?.name === "16"){
      setQuestionAnswer7(preValue=>({...preValue,["answer"]: event?.target?.value,["questionId"]: event?.target?.name}))
      useranswer?.map((item)=>{
        if(item.questionId == "16")
         setAnswerFromDb(preValue=>({...preValue,["answer"]: event?.target?.value}))
       })
    }
    if(event?.target?.name === "17"){
      setQuestionAnswer8(preValue=>({...preValue,["answer"]: event?.target?.value,["questionId"]: event?.target?.name}))
      useranswer?.map((item)=>{
        if(item.questionId == "17")
         setAnswerFromDb(preValue=>({...preValue,["answer"]: event?.target?.value}))
       })
    }
  }

  // Submit address Details
  const submitAddress = async () => {
    try {
      let action = "";
      isDataPresent === null ? action = "captureAddress" : action = "updateAddress"
      await submitAddressData(action, businessAddressDetails, window.jwtTokenResult).then((jsondata) => {
        if (jsondata.appError == null) {
          alert("Data Saved Successfully")
          history('/uploadDocuments' ,{replace:true})
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
       <h3 style={{ textAlign: "center" }}>Business Case Entepreneur</h3>
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
    <React.Fragment className={classes.actionsContainer}>   
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <p>
            Where do you Intend to setup your business(include village,
            block, district)?
          </p>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
        <TextField
          id="pincode"
          name="pincode"
          type="number"
          label="Pincode"
          fullWidth="fullWidth"
          autoComplete="pincode"
          variant="standard"
          value={businessAddressDetails?.pincode || ""}
          onChange={handlePinCode}
          // autoFocus={autoFocus}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 6);
          }}
        />
        {errors?.pincode ? (<div style={{ color: "red" }}>{errors.pincode}</div>) : null}
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <SelectOption
          label="District"
          id="district"
          name="district"
          options={selectDistrictNameOptions}
          variant="standard"
          value={businessAddressDetails?.district || ""}
          onChange={(e) => handleDistric(e)}
        />
        {errors?.district ? (<div style={{ color: "red" }}>{errors.district}</div>) : null}
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <SelectOption
         id="cityName"
         name="cityName"
         label="City"
         fullWidth="fullWidth"
         value={businessAddressDetails?.cityName || ""}
         options={selectCityNameOptions}
         onChange={(e) => handleCityName(e)}
       />
       {errors?.cityName ? (<div style={{ color: "red" }}>{errors?.cityName}</div>) : null}
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <SelectOption
          id="villageName"
          name="villageName"
          label="Village"
          fullWidth="fullWidth"
          value={businessAddressDetails?.villageName || ""}
          options={selectVillageNameOptions}
          onChange={(e) => handleVillegeName(e)}
        />
        {errors?.villageName ? (<div style={{ color: "red" }} >{errors?.villageName}</div>) : null}
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> What is your Business Domain?</p>
              <SelectOption
                id="domain"
                name="domain"
                value={questionAnswer9.answer || ""}
                options={domainList}
                fullWidth="fullWidth"
                variant="standard"
                onChange={(e)=>handleDomain(e)}
              //minWidth= "10"
              />
            </Grid>
      </Grid>
      <br/>

      <Grid>
      <Table aria-label="simple table">
      <TableBody>
                {questionlist?.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" style={{ width: 100 }}>
                      <sup><font color="red" size="4px">*</font></sup>  {row.question}
                      <TextareaAutosize aria-label="empty textarea" style={{ width: "100%", height: "100px" }}
                        name={row.id} id={row.id}
                        value={getBusinessCaseAnswer(row.id)}
                        // 
                        onChange={handleInputChange}
                        required
                        maxLength="100"
                        // readOnly={UserContext.roleid == 3 ? true : false}
                      />
                      <div name={"leftCharacters" + row.id} id={"leftCharacters" + row.id} >Number of characters left 1000</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

      </Table>
      </Grid>
       
       <br/>
      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="contained" color="primary" onClick={handleBack} >Back</Button>
        <Button type="submit" variant="contained" color="primary" onClick={submitData} >Next</Button>
      </Stack>
      </React.Fragment>
      </Container>
    </div>
  );
}
