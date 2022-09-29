import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import useStyles from '../../components/layout'
import { useNavigate } from 'react-router-dom'
import Slider from '@mui/material/Slider';
import Container from "@mui/material/Container";
import SelectOption from "../../components/shared/SelectOption";
import AadharModal from "../../components/shared/AddharDailog";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import {validateTextInput1 } from "./../../utility/Validation"
import { fetchAllQestionSet,saveMsinsBusinessData,updateMsinsBuisnessDetails,fetchSavedQuestionAnswer } from './../../utility/Api'
//adding select box options

const savinglist = ["< Rs 500","Rs 501 -1000","Rs 1001 -1500","Rs 1501 - 2000","> Rs 2000"]
const LoanSourceList = [
  "Immidiate family","Friends and relatives","Moneylender","Bank","Microfinance",
  "Sell/mortgage family assets (cattle, land etc.)","Other sources"
]
const utilizationList = ["Buy/rent land, shop or working premisis","Buy machinery or other equipments","Pay salaries",
                          "Purchasing raw material inventory","Development product/service","Payment to vendor/supplier/service providers"]
const numberofpartners = ["Starting business on my own","Two","Three","More than three"]
const selectLevelOptions = [
  "Level 0: Idea - Unproven concept, no testing has been performed",
  "Level 1: Proof Of Concept - Basic Research, technology validation done",
  "Level 2: Minimum viable product, testing and certification done and first workable and saleable version ready",
  "Level 3: Prototype - build in a laboratory environment and tested or experienced by user",
  "Level 4: Full Commercial - Innovation(Product)  available for consumers",
];
const selectExistingBusinessOptions = [
  "Yes(Self Owned)",
  "Yes(Family Owned)",
  "No",
];
const selectBorrowedMoneyOptions = ["Yes", "No"];
const selectDepositMoneyOptions = ["Yes", "No"];
const selectudhyogAadharRegistrationOptions = ["Yes", "No"];
const selectgstRegistrationOptions = ["Yes", "No", "Don't know"];


export default function ExistingBusinessEntrepreneurshipForm() {
  const history = useNavigate();
  const classes = useStyles();
  const [errors,setErrors] = useState({})
  var businessData= [];
  const [modalOpen, setModalOpen] = useState(false); // dialog box for aadhar udyog

  const [questionAnswer7 , setQuestionAnswer7] = useState({"id":"","questionId":"37", "answer":"", "dbUserId":window.dbUserId,"businessType":"EB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer8 , setQuestionAnswer8] = useState({"id":"","questionId":"38", "answer":"", "dbUserId":window.dbUserId,"businessType":"EB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer1 , setQuestionAnswer1] = useState({"id":"","questionId":"3", "answer":"", "dbUserId":window.dbUserId,"businessType":"EB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer2 , setQuestionAnswer2] = useState({"id":"","questionId":"4", "answer":"", "dbUserId":window.dbUserId,"businessType":"EB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer3 , setQuestionAnswer3] = useState({"id":"","questionId":"5", "answer":"", "dbUserId":window.dbUserId,"businessType":"EB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer4 , setQuestionAnswer4] = useState({"id":"","questionId":"6", "answer":"", "dbUserId":window.dbUserId,"businessType":"EB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer5 , setQuestionAnswer5] = useState({"id":"","questionId":"7", "answer":"", "dbUserId":window.dbUserId,"businessType":"EB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer6 , setQuestionAnswer6] = useState({"id":"","questionId":"8", "answer":"", "dbUserId":window.dbUserId,"businessType":"EB","createdBy":window.userid,"updatedBy":window.userid});
  const [questionAnswer9 , setQuestionAnswer9] = useState({"id":"","questionId":"39", "answer":"", "dbUserId":window.dbUserId,"businessType":"EB","createdBy":window.userid,"updatedBy":window.userid});


  const [questionlist, setQuestionlist] = useState([]);
  // const [businessData, setBusinessData] = useState([])
  useEffect(() => {

    if (window.jwtTokenResult == "") {
      history('/', { replace: true })
    }
    else{
    fetchExistingData();
    fetchQuestionSet();
    }
  }, []);

  const fetchExistingData = ()=>{
    fetchSavedQuestionAnswer(window.dbUserId,window.refreshJwtToken).then((jsondata)=>{
      let res = jsondata
      for(var i=0;i<res.length;i++){
        if(res[i].questionId === "37"){
        questionAnswer7.answer = res[i]?.answer
        questionAnswer7.id = res[i]?.id
        }
        else if(res[i].questionId === "38"){
          questionAnswer8.answer = res[i]?.answer
          questionAnswer8.id = res[i]?.id
        }
        else if(res[i].questionId === "39"){
          questionAnswer9.answer = res[i]?.answer
          questionAnswer9.id = res[i]?.id
        }
         if(res[i].questionId === "3"){
          questionAnswer1.answer = res[i]?.answer
          questionAnswer1.id = res[i]?.id
        
        }
        else if(res[i].questionId === "4"){
          questionAnswer2.answer = res[i]?.answer
          questionAnswer2.id = res[i]?.id
          
        }
        else if(res[i].questionId === "5"){
          questionAnswer3.answer = res[i]?.answer
          questionAnswer3.id = res[i]?.id
       
        }
        else if(res[i].questionId === "6"){
          questionAnswer4.answer = res[i]?.answer
          questionAnswer4.id = res[i]?.id
      
        }
        else if(res[i].questionId === "7"){
          questionAnswer5.answer = res[i]?.answer
          questionAnswer5.id = res[i]?.id
       
        }
        else if(res[i].questionId === "8"){
        questionAnswer6.answer = res[i]?.answer
        questionAnswer6.id = res[i]?.id
        
        }
      }
    })
   
  }
  const fetchQuestionSet = () => {
    try{
      let arr = [];
      fetchAllQestionSet("all", window.refreshJwtToken).then((jsondata) => {
       
          console.log(jsondata)
        for (var i = 0; i < jsondata.length; i++) {
          if (jsondata[i].businessType === "EEB") {
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
  const submitData = async() => {
    businessData.push(questionAnswer1)
    businessData.push(questionAnswer2)
    businessData.push(questionAnswer3)
    businessData.push(questionAnswer4)
    businessData.push(questionAnswer5)
    businessData.push(questionAnswer6)
    businessData.push(questionAnswer7)
    businessData.push(questionAnswer8)
    businessData.push(questionAnswer9)
    console.log(businessData)
    try{
      for(var i=0; i<businessData.length;i++){
        if(businessData[i].id ===""){
          saveMsinsBusinessData(businessData[i],  window.refreshJwtToken).then((jsondata)=>{
          })
        }
        else{
          updateMsinsBuisnessDetails(businessData[i],  window.refreshJwtToken).then((jsondata)=>{
          })
        }
      }
      alert("Data Saved Successfully")
      businessData = []
      history('/businesscasebrief', { replace: true })
    }
    catch(err){
      alert(err.message)
    }
     
  }
  const handlefundutilization = (event) => {
    setQuestionAnswer7(preValue=>({...preValue,["answer"]: event}))
  }

  const handlepartner = (event) => {
    setQuestionAnswer8(preValue=>({...preValue,["answer"]: event}))
  }

  const handleDepositeMoney = (event) => {
    setQuestionAnswer1(preValue=>({...preValue,"answer": event}))
  }

  const handleLoanAmountDuration = (event) => {
    setQuestionAnswer2(preValue=>({...preValue,"answer": event?.target?.value}))
  }

  const handleBroowMoney = (event) => {
    setQuestionAnswer3(preValue=>({...preValue,"answer": event}))
  }

  const handleLoanSource = (event) => {
    setQuestionAnswer4(preValue=>({...preValue,"answer": event}))
  }

  const handleUdyogResigtration = (event) => {
    setQuestionAnswer5(preValue=>({...preValue,"answer": event}))
  }
  const handleGSTRegistration = (event) => {
    setQuestionAnswer6(preValue=>({...preValue,"answer": event}))
  }
  const handlesaving = (event) => {
    setQuestionAnswer9(preValue=>({...preValue,"answer": event}))
  }
  // 

  const handleBack = () => {
    
    history('/experiencedetails', { replace: true })
  }
  return (

    <div className={classes.root} >
      <h3 style={{ textAlign: "center" }}>Existing Business</h3>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <React.Fragment className={classes.actionsContainer}>
          <br/>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> Did you ever deposit your money in a bank or savings group??</p>
              <SelectOption
                //label="Do you have an existing business"
                id="1"
                name="deposite money"
                // label="Deposit Money"
                options={selectDepositMoneyOptions}
                variant="standard"
                minWidth="md"
                value={questionAnswer1?.answer || ""}
                fullWidth="fullWidth"
                onChange={(e) => { handleDepositeMoney(e) }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> If you had to obtain a loan for INR 2,00,000 within the next
                month, how confident are you of being able to arrange such a loan?
              </p>
              <Grid item xs={12} sm={6} md={6}>
                        <Slider
                          id="2"
                            aria-label="Temperature"
                            valueLabelDisplay="auto"
                            step={1}
                            value = {questionAnswer2?.answer }
                            marks
                            min={1}
                            max={10}
                            onChange={(e) => { handleLoanAmountDuration(e) }}
                          />
                   {errors?.durationAmount ? (<div style={{ color: "red" }}>{errors.durationAmount}</div>) : null}
                {/* </Box> */}
              </Grid>
             
            </Grid>
            {/* {" "} */}
            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> In the past 12 months have you borrowed any money from any source?</p>
              <SelectOption
                //label="Do you have an existing business"
                id="3"
                name="borrow money"
                options={selectBorrowedMoneyOptions}
                variant="standard"
                value={questionAnswer3?.answer || ""}
                fullWidth="fullWidth"
                onChange={(e) => { handleBroowMoney(e) }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> If need to arrange money for your business urgently from where will you arrange this money ?</p>
                <SelectOption
                id="4"
                name="loan source"
                
                options={LoanSourceList}
                variant="standard"
                value={questionAnswer4?.answer || ""}
                fullWidth="fullWidth"
                onChange={(e) => { handleLoanSource(e) }}
              />
      
            </Grid>
           
            <Grid item xs={12} sm={6} md={6}>
            <Grid container>
                <Grid item>
                <p><sup><font color="red" size="4px">*</font></sup> Do you have Udyog Aadhar registration?</p>
                </Grid>
                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                <Button color="primary" onClick={() => { setModalOpen(true) }} ><h3>🤔</h3></Button>
                </Grid>
               </Grid>
                <Grid>
              </Grid>
              {modalOpen && <AadharModal setOpenModal={setModalOpen}  />}
              <SelectOption
                id="5"
                name="Udyog Aadhar"
                // label="Aadhar Registration"
                options={selectudhyogAadharRegistrationOptions}
                variant="standard"
                value={questionAnswer5?.answer || ""}
                fullWidth="fullWidth"
                onChange={(e) => { handleUdyogResigtration(e) }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> 
              Do you have GST registration?</p>
              <SelectOption
                id="6"
                name="GST Registration"
                options={selectgstRegistrationOptions}
                variant="standard"
                value={questionAnswer6?.answer || ""}
                fullWidth="fullWidth"
                onChange={(e) => { handleGSTRegistration(e) }}
              />
            </Grid>



            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> 
              How will you utilise the refundable financial assistance received through this programme?</p>
              <SelectOption
                //label="Do you have an existing business"
                id="7"
                name="fund utilization"
                options={utilizationList}
                variant="standard"
                value={questionAnswer7?.answer || ""}
                fullWidth="fullWidth"
                onChange={(e) => { handlefundutilization(e) }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> 
              How many partners do you have in your proposed business?</p>
              <SelectOption
                id="8"
                name="number of partner"
                options={numberofpartners}
                variant="standard"
                value={questionAnswer8?.answer || ""}
                fullWidth="fullWidth"
                //minWidth= "10"
                onChange={(e) => { handlepartner(e) }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> 
              How much money do you and your immidiate family save in a month?</p>
              <SelectOption
                id="9"
                name="saving"
                options={savinglist}
                variant="standard"
                value={questionAnswer9?.answer || ""}
                fullWidth="fullWidth"
                //minWidth= "10"
                onChange={(e) => { handlesaving(e) }}
              />
            </Grid>
          </Grid>
          <br/>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="primary" onClick={handleBack} >Back</Button>
            <Button
            // questionAnswer1?.answer!=="" && questionAnswer2?.answer!=="" && 
            disabled={questionAnswer1?.answer!=="" && questionAnswer2?.answer!=="" && questionAnswer3?.answer!=="" &&questionAnswer4?.answer!=="" &&questionAnswer5?.answer!=="" 
            &&questionAnswer6?.answer!=="" &&questionAnswer7?.answer!=="" &&questionAnswer8?.answer!=="" ?false:true}
            type="submit" variant="contained" color="primary" onClick={submitData} >Next</Button>
          </Stack>
        </React.Fragment>
      </Container>
    </div>
  );
}
