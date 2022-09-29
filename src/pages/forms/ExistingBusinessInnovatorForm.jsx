import Grid from "@mui/material/Grid";
import DIIPModel from "../../components/shared/DippDailog";
// AadharModal
import AadharModal from "../../components/shared/AddharDailog";
import React, { useState, useEffect } from "react";
import SelectOption from "../../components/shared/SelectOption";
import useStyles from '../../components/layout'
import { useNavigate } from 'react-router-dom'
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { saveMsinsBusinessData, updateMsinsBuisnessDetails, fetchSavedQuestionAnswer } from "./../../utility/Api";
const selectExistingIdeaButton = ["Yes(Self Owned)", "Yes(Family Owned)", "No",];
const selectRaisedMoneyButton = ["Yes", "No"];
const selectAadharRegistrationButton = ["Yes", "No"];
const selectGSTRegistrationButton = ["Yes", "No"];
const domainList = ["Electrical", "Mechanical", "Fitter", "Welder", "Farm"];
// const selectDIPPRegistrationButton = ["Yes", "No"];
const selectDIPPRegistrationButton = [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }];
const selectLevelOptions = [
  "Level 0: Idea - Unproven concept, no testing has been performed",
  "Level 1: Proof Of Concept - Basic Research, technology validation done",
  "Level 2: Minimum viable product, testing and certification done and first workable and saleable version ready",
  "Level 3: Prototype - build in a laboratory environment and tested or experienced by user",
  "Level 4: Full Commercial - Innovation(Product)  available for consumers",
];



export default function ExistingBusinessInnovator() {
  const [modalOpen, setModalOpen] = useState(false); // dialog box for aadhar udyog
  const [modalOpen1, setModalOpen1] = useState(false); // dailog box for DIPP
  const history = useNavigate();
  const classes = useStyles();
  const [isDataPresent, setIsDataPresent] = useState([])
  const [questionAnswer1, setQuestionAnswer1] = useState({ "id": "", "questionId": "18", "answer": "", "dbUserId": window.dbUserId, "businessType": "EB", "createdBy": window.userid, "updatedBy": window.userid });
  const [questionAnswer2, setQuestionAnswer2] = useState({ "id": "", "questionId": "20", "answer": "", "dbUserId": window.dbUserId, "businessType": "EB", "createdBy": window.userid, "updatedBy": window.userid });
  const [questionAnswer3, setQuestionAnswer3] = useState({ "id": "", "questionId": "21", "answer": "", "dbUserId": window.dbUserId, "businessType": "EB", "createdBy": window.userid, "updatedBy": window.userid });
  const [questionAnswer4, setQuestionAnswer4] = useState({ "id": "", "questionId": "22", "answer": "", "dbUserId": window.dbUserId, "businessType": "EB", "createdBy": window.userid, "updatedBy": window.userid });
  const [questionAnswer5, setQuestionAnswer5] = useState({ "id": "", "questionId": "23", "answer": "", "dbUserId": window.dbUserId, "businessType": "EB", "createdBy": window.userid, "updatedBy": window.userid });
  const [questionAnswer6, setQuestionAnswer6] = useState({ "id": "", "questionId": "19", "answer": "", "dbUserId": window.dbUserId, "businessType": "EB", "createdBy": window.userid, "updatedBy": window.userid });
  const [questionAnswer7, setQuestionAnswer7] = useState({ "id": "", "questionId": "1", "answer": "", "dbUserId": window.dbUserId, "businessType": "EB", "createdBy": window.userid, "updatedBy": window.userid });


  useEffect(() => {
    if (window.jwtTokenResult === "") {
      history('/', { replace: true })
    }
    else {
      fetchExistingData();
    }
  }, []);

  const fetchExistingData = () => {
    fetchSavedQuestionAnswer(window.dbUserId, window.refreshJwtToken).then((jsondata) => {
      let res = jsondata
      setIsDataPresent([]); // for state updation
      console.log(res)
      for (var i = 0; i < res.length; i++) {
        if (res[i]?.questionId === "18") {
          questionAnswer1.answer = res[i]?.answer
          questionAnswer1.id = res[i]?.id
        }
        else if (res[i]?.questionId === "20") {
          questionAnswer2.answer = res[i]?.answer
          questionAnswer2.id = res[i]?.id
        }
        else if (res[i]?.questionId === "21") {
          questionAnswer3.answer = res[i]?.answer
          questionAnswer3.id = res[i]?.id
        }
        else if (res[i]?.questionId === "22") {
          questionAnswer4.answer = res[i]?.answer
          questionAnswer4.id = res[i]?.id
        }
        else if (res[i]?.questionId === "23") {
          questionAnswer5.answer = res[i]?.answer
          questionAnswer5.id = res[i]?.id
        }
        else if (res[i]?.questionId === "19") {
          questionAnswer6.answer = res[i]?.answer
          questionAnswer6.id = res[i]?.id
        }
        else if (res[i]?.questionId === "1") {
          questionAnswer7.answer = res[i]?.answer
          questionAnswer7.id = res[i]?.id
        }

      }
    })
  }


  const handleLevel = (event) => {
    setQuestionAnswer7(preValue => ({ ...preValue, ["answer"]: event }))
  }
  const handleRaisedMoney = (event) => {
    setQuestionAnswer2(preValue => ({ ...preValue, ["answer"]: event }))
  }
  const handleExistingIdea = (event) => {
    setQuestionAnswer1(preValue => ({ ...preValue, ["answer"]: event }))
  }
  const handleUdyogAadhar = (event) => {
    setQuestionAnswer3(preValue => ({ ...preValue, ["answer"]: event }))
  }
  const handleDIPPRegistration = (event) => {
    setQuestionAnswer4(preValue => ({ ...preValue, ["answer"]: event }))
  }
  const handleGstRegistration = (event) => {
    setQuestionAnswer5(preValue => ({ ...preValue, ["answer"]: event }))
  }
  const handleDomain = (event) => {
    setQuestionAnswer6(preValue => ({ ...preValue, ["answer"]: event }))
  }


  const submitData = () => {
    var bsuinesscasebriefdata = []
    bsuinesscasebriefdata.push(questionAnswer1)
    bsuinesscasebriefdata.push(questionAnswer2)
    bsuinesscasebriefdata.push(questionAnswer3)
    bsuinesscasebriefdata.push(questionAnswer4)
    bsuinesscasebriefdata.push(questionAnswer5)
    bsuinesscasebriefdata.push(questionAnswer6)
    bsuinesscasebriefdata.push(questionAnswer7)
    try {
      bsuinesscasebriefdata.map((item, key) => {
        if (item.id == "") {
          saveMsinsBusinessData(item, window.refreshJwtToken).then((jsondata) => {
          })
        }
        else {
          updateMsinsBuisnessDetails(item, window.refreshJwtToken).then((jsondata) => {

          })
        }
      })
      bsuinesscasebriefdata = []
      history('/businesscasebrief', { replace: true })
      alert("Data saved Suceesfully")
    }
    catch (err) {
      alert(err.message)
    }

  }
  const handleBack = () => {
    history('/experiencedetails', { replace: true })
  }

  return (
    <div className={classes.root} >
      <h3 style={{ textAlign: "center" }}>Existing Business</h3>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <React.Fragment className={classes.actionsContainer}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> Do you have an existing Innovative idea/ startup</p>
              <SelectOption
                onChange={(e) => handleExistingIdea(e)}
                id="existingIdea"
                name="existingIdea"
                options={selectExistingIdeaButton}
                fullWidth="fullWidth"
                autoFocus={true}
                value={questionAnswer1.answer || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> Domain of Business?</p>
              <SelectOption
                id="domain"
                name="domain"
                value={questionAnswer6.answer || ""}
                options={domainList}
                fullWidth="fullWidth"
                variant="standard"
                onChange={(e) => handleDomain(e)}
              //minWidth= "10"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> Select your level</p>
              <SelectOption
                // label="Select Level"
                id="1"
                name="1"
                options={selectLevelOptions}
                value={questionAnswer7?.answer || ""}
                onChange={(e) => handleLevel(e)}
                fullWidth="fullWidth"
                autoFocus={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> In the past 12 months have you raised any money from any source?
              </p>
              <Grid item>
                <SelectOption
                  onChange={(e) => handleRaisedMoney(e)}
                  id="raisedMoney"
                  name="raisedMoney"
                  options={selectRaisedMoneyButton}
                  variant="standard"
                  fullWidth="fullWidth"
                  value={questionAnswer2.answer || ""}
                />
              </Grid>
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
                //label="Do you have an existing business"
                id="udhyogAadharRegistration"
                name="udhyogAadharRegistration"
                onChange={(e) => handleUdyogAadhar(e)}
                options={selectAadharRegistrationButton}
                fullWidth="fullWidth"
                variant="standard"
                value={questionAnswer3.answer || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <Grid container>
                <Grid item>
                <p><sup><font color="red" size="4px">*</font></sup> Do you have DIPP registration?</p>
                </Grid>
                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                <Button color="primary" onClick={() => { setModalOpen1(true) }} ><h3>🤔</h3></Button>
                </Grid>
               </Grid>
                <Grid>
              </Grid>
              {modalOpen1 && <DIIPModel setOpenModal1={setModalOpen1} value={"DIPP"} />}

              <SelectOption
                id="dippRegistration"
                name="dippRegistration"
                onChange={(e) => handleDIPPRegistration(e)}
                options={selectDIPPRegistrationButton}
                fullWidth="fullWidth"
                variant="standard"
                value={questionAnswer4.answer || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p><sup><font color="red" size="4px">*</font></sup> Do you have GST registration?</p>
              <SelectOption
                //label="Do you have an existing business"
                id="gstRegistration"
                name="gstRegistration"
                onChange={(e) => handleGstRegistration(e)}
                options={selectGSTRegistrationButton}
                fullWidth="fullWidth"
                variant="standard"
                value={questionAnswer5.answer || ""}
                minWidth="10"
              />
            </Grid>
          </Grid>
          <br />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="primary" onClick={handleBack} >Back</Button>
            <Button type="submit" variant="contained" color="primary" onClick={submitData} >Next</Button>
          </Stack>

        </React.Fragment>
      </Container>

    </div>

  );
}
