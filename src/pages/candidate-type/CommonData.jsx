import React ,{useState}from 'react'
import SelectOption from '../../components/shared/SelectOption'

import {Grid, Box, Paper, Avatar,Typography,} from '@mui/material'
import { Link } from 'react-router-dom'

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextFields from '../../components/shared/TextFields'
import { useNavigate } from 'react-router-dom'
import Buttons from '../../components/shared/Buttons'
import { saveBasicData, captureStudentEngagementDetails } from '../../utility/Api'

import { validatePassingYear} from "./../../utility/Validation"
const paperStyle = {
  padding: 20,
  minWidth: '450',
  maxWidth: 650,
  margin: '0 auto',
}
const headerStyle = { margin: 0 }
const avatarStyle = { backgroundColor: '#62c4e7' }
const marginTop = { marginTop: 5 }

const collegeNameList = [{value:'College 1' , label:'College 1'},
                          {value:'College 2' , label:'College 2'},
                          {value:'College 3' , label:'College 3'},
                          {value:'College 4' , label:'College 4'},]
export default function CommonData(props) {
  var data = props.value.value;
  const [qualificationStatus,setQualificationStatus] = useState("")
  const [basicData, setBasicData] = useState({ "primaryContactNumber": data?.primaryContactNumber, "dob": data?.dob, "passingYear":"","highestQualification":"" ,"collegeName":"","createdBy": window?.userId, "updatedBy": window?.userId});
  const history = useNavigate();
  const[errors,setErrors] = useState({})
  // handle Qualification
  const handleQualification = (event)=>{
    if(event?.length !==0){
      setBasicData(preValue => ({ ...preValue, ["highestQualification"]: event }))
      console.log(basicData.highestQualification)
      console.log(basicData.highestQualification.length)
    }
  }

  const handleRadioButton = (event) => {
    setQualificationStatus(event?.target?.value) // saving in local
  }

  const handleCollegeName = (event)=>{
    setBasicData(preValue => ({ ...preValue, ["collegeName"]: event}))
  }

  // handle Passing year
  const handlePassingYear = (event)=>{
    console.log(event?.target.value)
      const error = validatePassingYear("passingYear",event.target.value,"lng" )
      setErrors(error)
      setBasicData(preValue => ({ ...preValue, ["passingYear"]: event?.target?.value }))
      console.log(event?.target.value.length)
  }

  // save data
  const handleSubmitData =async (e)=>{
    e.preventDefault();
    console.log(basicData)
    try{
      if(basicData?.passingYear>2018){
        window.pincode = data?.pincode   // set pincode as global variable
      // history('/basicdetails',{ replace: true });
        const action = "captureBeneficiaryDetails"
      await saveBasicData(action, basicData,  window.refreshJwtToken).then(async(jsondata) => {
        let result = JSON.parse(jsondata.data);
        let dbUserId = result[0].dbUserId
        window.dbUserId = dbUserId  // setting global variable
        // capturing engagement details
         await captureStudentEngagementDetails(dbUserId, 20, window.userId, window.studentType, window.refreshJwtToken).then(async(jsondata) => {
          let json = JSON.parse(jsondata.data);
          window.engagementId = json[0].engagementId //setting engagementid 
        })
        history('/basicdetails',{ replace: true });
      })
    }
    else{
      console.log(basicData)
      history('/eligibilityTest/userIsNotEligible',{ replace: true });
    }
    }
    catch (err) {
      alert(err.message)
    }
   
}
  return (
    <>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        marginTop='50px'
      >
        <Paper style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>{props.type}</h2>
            <Typography variant='caption' gutterBottom>
              Please enter your education details !
            </Typography>
          </Grid>
          <form>
            <Box>
              <SelectOption
                label='Qualification'
                name='qualification'
                fullWidth='fullWidth'
                options={props.qualification}
                required='required'
                variant='standard'
                onChange={handleQualification}
              />
            </Box>

            <Box>
              <FormControl style={{ marginTop: '20px' }}>
                <FormLabel id='demo-row-radio-buttons-group-label'>
                  I am Currently
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                >
                  <FormControlLabel
                    value='passed'
                    control={<Radio />}
                    label='Passed'
                    onChange={handleRadioButton}
                  />
                  <FormControlLabel
                    value='pursuing'
                    control={<Radio />}
                    label='Pursuing'
                    onChange={handleRadioButton}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
                <br/>
            <Box>
               <SelectOption
              // style={{borderColor:"red"}}
              label="College Name"
              id="collegename"
              name="collegename"
              options={collegeNameList}
              variant="standard"
              onChange={(e) => handleCollegeName(e)}
            />
            </Box>
            <Box>
              <TextFields
                label='Year of Passing'
                placeholder='Enter your passing year'
                required
                name='passingYear'
                type='number'
                fullWidth='fullWidth'
                variant='standard'
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 4)
                }}
                onChange={(e)=>handlePassingYear(e)}
              />
            </Box>
            {errors?.passingYear ? (<div style={{ color: "red" }}>{errors?.passingYear}</div>) : null}
            <Box marginTop='20px'>
             <Buttons
              sx={{ mt: '30px', mb: '30px' }}
              text="Submit"
              variant='contained'
              disabled={basicData?.highestQualification.length ===0 ? true:qualificationStatus ===''? true:basicData?.collegeName.length ===0 ? true:basicData?.passingYear.length <4?true:false}
              onClick={handleSubmitData}
              fullWidth='fullWidth'
            />
            </Box>
          </form>
        </Paper>
      </Grid>
    </>
  )
}
