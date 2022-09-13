import React, { useState } from 'react'
import {Grid, Paper, Avatar,Typography,TextField,Button, Box} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Checkbox from '@mui/material/Checkbox'
import TextFields from '../../components/shared/TextFields'
import DateOfBirthBox from '../../components/shared/DateOfBirthBox'
import Buttons from '../../components/shared/Buttons'
import OTP from '../../components/shared/utils/OTP'
import { Link, useNavigate } from 'react-router-dom'
import BasicModal from '../../components/shared/utils/BasicModal'
import { authorization } from '../../services/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useTranslation } from 'react-i18next'
import { validateTextInput1, validateEmail, validateContact, isNotEmpty, validateAadharNumber, validatePincode, validateTextInput, validateSelectInput } from "./../../utility/Validation"
import { login, saveBasicData, fetchStduentDataBaisedOnContactNumber, captureStudentEngagementDetails } from '../../utility/Api'

const Register = () => {
  const paperStyle = { padding: 20, maxWidth: 350, margin: '0 auto' }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#62c4e7' }
  const marginTop = { marginTop: 5 }
  const { t } = useTranslation()
  const history = useNavigate();
  const [otp, setOtp] = useState('');
  const [disableGetOtp, setDisableGetOtp] = useState(false);
  const [disableVerifyOtp, setDisableVerifyOtp] = useState(true);
  const [checkBox1, setCheckBox1] = useState(false)
  const [checkBox2, setCheckBox2] = useState(false)

  const [errors, setErrors] = useState({})

  const [basicData, setBasicData] = useState({ "primaryContactNumber": "", "dob": "", "studentType": "", "pincode":"" });

  const submitData = (e) => {
        setDisableVerifyOtp(true)
        let confirmationOTP = window.confirmationResult;
        confirmationOTP.confirm(otp).then((result) => {
          const user = result.user;
          window.userOTPresult = user;
          alert('User Sucessfully logged in!')
          // setDisableVerifyOTPButton(true)
          login().then(async (jsondata) => {
            console.log('jsondata ========> ', jsondata?.data)
            window.loginType = "SignUp"
            let dataFromSucessLogin = JSON.parse(jsondata?.data)
            window.jwtTokenResult = dataFromSucessLogin[0]?.token;
            window.refreshJwtToken = dataFromSucessLogin[0]?.token;
            window.userId = dataFromSucessLogin[1]?.id
           
            // checking for user is already exist or not
            await fetchStduentDataBaisedOnContactNumber(basicData.primaryContactNumber, window.refreshJwtToken).then(async (jsondata) => {
              let result = (jsondata.data)
              if (result.length <= 2) {
                history('/eligibilityTest',{ state:basicData });
              }
              else {
                alert("User Already Exist! Please Sign in.")
              }
            })
          }).catch((error) => {
            console.log("error========>", error)
          })
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
          setDisableVerifyOtp(false)
          console.log(error)
        });
  }



  const handleMobileNoInput = (event) => {
      const errors = validateContact("mobile", event?.target?.value)
      setErrors(errors);
      setBasicData(preValue => ({ ...preValue, ["primaryContactNumber"]: event?.target?.value }))
      window.primaryContactNumber= event?.target?.value
  };

  const generateOTP = () => {
    if (basicData.primaryContactNumber?.length < 10) {
      alert('incorrect mobile number, please try again');
    }
    else {
      generateRecaptcha();
      let appVerifire = window.recaptchaVerifier;
      signInWithPhoneNumber(authorization, '+91' + basicData.primaryContactNumber, appVerifire).then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        setDisableVerifyOtp(false);
        setDisableGetOtp(true);
      }).catch(error => {
        console.log('<====Error while verifying the OTP====>', error)
      })
    }
  };
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
      }
    }, authorization);
  };
  // handle DOB
  const handleDob = (event) => {
    if (event?.target?.value || event?.length === 0) {
      const errors = validateSelectInput("dob", event?.target?.value)
      setErrors(errors);
      setBasicData(preValue => ({ ...preValue, ["dob"]: event?.target?.value }))
    }
  }
  // Handle pincode
  const hanldePinCode = (event) => {
    if (event || event?.target?.length === 0) {
      const error = validatePincode("pincode", event?.target?.value, "lng");
      setErrors(error)
      setBasicData(preValue => ({ ...preValue, ["pincode"]: event?.target?.value }))
    }
  }
  // handle otp
  const handleOtpInput = (event) => {
    const error = validatePincode("otp", event?.target?.value, "lng");
    setErrors(error)
    setOtp(event?.target?.value);
  };
  const handleCheckBox = (e) => {
    if (e.target.name === "tnc1") {
      var x = document.getElementById("myCheck1").checked;
      setCheckBox1(x)
    }
    if (e.target.name === "tnc2") {
      var y = document.getElementById("myCheck2").checked;
      setCheckBox2(y)
    }
  }
  const handleRadioButton = (e) => {
    window.studentType = (e.target.value) // set globally 
    setBasicData(preValue => ({ ...preValue, ["studentType"]: e?.target?.value }))
  }
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant='caption' gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form  >
          {/* onSubmit={(e)=>submitData(e)} */}

          <TextField
            label={t('mobile_no')}
            placeholder={t('mobile_no_placeholder')}
            type='number'
            id='mobile'
            name='mobile'
            fullWidth='fullWidth'
            variant='standard'
            helperText=''
            autoFocus={false}
            onChange={handleMobileNoInput}
            // inputProps={{ maxLength: 5 }}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 10)
            }}
          />
          {errors?.mobile ? (<div style={{ color: "red" }}>{errors.mobile}</div>) : null}
          <Box>
            <DateOfBirthBox
              name="dob"
              variant='standard'
              label='Date Of Birth'
              fullWidth='fullWidth'
              onChange={(e) => handleDob(e)}
            />
            {errors?.dob ? (<div style={{ color: "red" }}>{errors.dob}</div>) : null}
          </Box>

          <Box>
            <TextFields
              label='Pincode'
              placeholder='Enter your pincode'
              required
              id='pincode'
              name='pincode'
              type="number"
              fullWidth='fullWidth'
              variant='standard'
              onChange={hanldePinCode}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6)
              }}

            />
            {errors?.pincode ? (<div style={{ color: "red" }}>{errors.pincode}</div>) : null}
          </Box>
          <Box>
            <TextField
              label={t('otp')}
              placeholder={t('otp_placeholder')}
              // required
              type='number'
              id='otp'
              name='otp'
              fullWidth='fullWidth'
              variant='standard'
              helperText=''
              autoFocus={false}
              onChange={handleOtpInput}
              // inputProps={{ maxLength: 5 }}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6)
              }}
            />
            {errors?.otp ? (<div style={{ color: "red" }}>{errors?.otp}</div>) : null}
          </Box>
          <Grid container>
            <Grid item xs>
              <Buttons text='GET OTP' disabled={disableGetOtp} onClick={generateOTP} />
            </Grid>
            <Grid item>
              <Buttons text='RESEND OTP' disabled={true} onClick={generateOTP} />
            </Grid>
          </Grid>
          <FormControl style={{ marginTop: '20px', marginBottom: '10px' }}>
            <FormLabel id='demo-row-radio-buttons-group-label'>
              I am applying for
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
            >
              <FormControlLabel
                value='Innovator'
                control={<Radio />}
                label='Innovator'
                onChange={handleRadioButton}
              />
              <FormControlLabel
                value='Entrepreneur'
                control={<Radio />}
                label='Entrepreneur'
                onChange={handleRadioButton}
              />
            </RadioGroup>
          </FormControl>

          <Box style={{ display: 'flex' }}>
            <Box style={{ display: 'inline' }}>
             
              <FormControlLabel
                control={<Checkbox name='tnc1' id="myCheck1"
                // checked={(checkBox1 == "Y" || dataValue.isActive == 'Y') ? true : false}
                />}
                label='I accept the'
                onClick={handleCheckBox}
              />
            </Box>
            <Box style={{ display: 'inline' }}>
              <BasicModal
                name='Terms & Conditions'
                modalTitle='Terms & Conditions'
                modalDescription1='1.'
                modalDescription2='2.'
                modalDescription3='3.'
              />
            </Box>
          </Box>

          <Box style={{ display: 'flex' }}>
            <Box style={{ display: 'inline' }}>
              <FormControlLabel
                control={<Checkbox name='tnc2' id="myCheck2" />}
                label='I accept the'
                onClick={handleCheckBox}
              />
            </Box>
            <Box style={{ display: 'inline' }}>
              <BasicModal
                name='Eligibility Criteria'
                modalTitle='Eligibility Criteria'
                modalDescription1='1.'
                modalDescription2='2.'
                modalDescription3='3.'
              />
            </Box>
          </Box>
            <Buttons
              sx={{ mt: '30px', mb: '30px' }}
              text={t('verify_otp')}
              variant='contained'
              disabled={basicData.dob === ""? true: basicData?.primaryContactNumber.length!==10? true:otp.length !== 6 ? true :basicData?.pincode.length !== 6 ? true : basicData.studentType === '' ? true : (checkBox1 == true) && (checkBox2 == true) ? false : true}
              onClick={(e) => submitData(e)}
              fullWidth='fullWidth'
            />
        </form>
      </Paper>
      <div id="recaptcha"></div>
    </Grid>
  )
}

export default Register
