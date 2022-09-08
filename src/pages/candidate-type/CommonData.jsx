import React ,{useState}from 'react'
import RadioOptionButton from '../../components/shared/RadioOptionButton'
import SelectOption from '../../components/shared/SelectOption'

import {
  Grid,
  Box,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from '@mui/material'
import { Link } from 'react-router-dom'

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Checkbox from '@mui/material/Checkbox'
import TextFields from '../../components/shared/TextFields'
import { useNavigate } from 'react-router-dom'
import Buttons from '../../components/shared/Buttons'
import EligibilityTest from '../eligible/EligibilityTest'
import { useRef } from 'react'
import { select } from 'underscore'
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
  const[qualification,setQualification] = useState("")
  const [qualificationStatus,setQualificationStatus] = useState("")
  const [collegeName,setCollegeName] = useState("")
  const [passingYear,setPassingYear] = useState("")
  const history = useNavigate();
  const[errors,setErrors] = useState({})
  // handle Qualification
  const handleQualification = (event)=>{
    if(event?.length !==0){
      setQualification(event)
    }
  }

  const handleRadioButton = (event) => {
    setQualificationStatus(event?.target?.value) // saving in local
  }

  const handleCollegeName = (event)=>{
    setCollegeName(event)
  }

  // handle Passing year
  const handlePassingYear = (event)=>{
    console.log(event.target.value)
    if(event?.target.value.length !==0){
      const error = validatePassingYear("passingYear",event.target.value,"lng" )
      setErrors(error)
      setPassingYear(event?.target?.value)
    }
  }

  // save data
  const handleSubmitData = (e)=>{
    console.log(passingYear)
    if(passingYear>2018){
    history('/basicdetails',{ replace: true });
  }
  else{
    history('/eligibilityTest',{ replace: true });
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
              {/* <Autocomplete
                // disablePortal
                id='combo-box-demo'
                name = "collegeName"
                options={props.collegeNameList}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label='College' variant='standard'  ref={selectCollegeRef} 
                  onChange={handleCollegeName}/>
                )}
              /> */}
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
              {/* <Link
                to='/form'
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              > */}
                <Buttons
                  type='text'
                  variant='contained'
                  fullWidth='fullWidth'
                  disabled={qualification.length ===0 ? true:qualificationStatus ===''? true:collegeName.length ===0 ? true:false}
                  onClick={handleSubmitData}
               />
              {/* </Link> */}
            </Box>
          </form>
        </Paper>
      </Grid>
    </>
  )
}
