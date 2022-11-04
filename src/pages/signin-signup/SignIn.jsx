import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Typography, } from '@mui/material'
import DateOfBirthBox from '../../components/shared/DateOfBirthBox'
import { Link, useNavigate } from 'react-router-dom'
import { authorization } from '../../services/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Buttons from '../../components/shared/Buttons'
import { useTranslation } from 'react-i18next'
import { login, fetchStduentDataBaisedOnContactNumberandDob, fetchStduentEngagementDataBaisedOnDBUserId } from '../../utility/Api'
import { validatePincode } from "./../../utility/Validation"

// language/Language'

const LoginUser = ({ handleChange }) => {
  const { t } = useTranslation()
  const history = useNavigate();
  const [mobileNo, setMobileNo] = useState('');
  const [otp, setOtp] = useState('');
  const [dob, setDob] = useState("");
  const [errors, setErrors] = useState({})
  const [disableMobileNumber, setDisableMobileNumber] = useState(false)
  const [disableGetOtp, setDisableGetOtp] = useState(false);
  const [disableVerifyOtp, setDisableVerifyOtp] = useState(true);

  const paperStyle = {
    padding: 20,
    minHeight: '60vh',
    maxWidth: 350,
    margin: '0 auto',
  }

  const avatarStyle = { backgroundColor: '#62c4e7' }

  const handleMobileNoInput = (event) => {
    setMobileNo(event?.target?.value);
    // setDisableGetOtp(false)
    // setOtp("")
  };

  const handleDob = (event) => {
    if (event?.target?.value || event?.length === 0) {
      setDob(event?.target?.value)
      window.dob = event?.target?.value  // setting value as globally
    }
  }
  const generateOTP = () => {
    if (mobileNo?.length < 10) {
      alert('incorrect mobile number, please try again');
    }
    else {
      setDisableMobileNumber(true);
      generateRecaptcha();
      let appVerifire = window.recaptchaVerifier;
      signInWithPhoneNumber(authorization, '+91' + mobileNo, appVerifire).then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        setDisableVerifyOtp(false);
        setDisableGetOtp(true);
      }).catch(error => {
        console.log('<====Error while verifying the OTP====>', error)
      })
    }
  };

  const verifyOTP = async () => {
    if (mobileNo?.length < 10 || otp?.length < 6) {
      alert('please click get OTP to reciev the otp')
    }
    else {
      setDisableVerifyOtp(true)

      let confirmationOTP = window.confirmationResult;
      confirmationOTP.confirm(otp).then(async (result) => {
        const user = result.user;
        window.userOTPresult = user;
        await login().then(async (jsondata) => {
          let dataFromSucessLogin = JSON.parse(jsondata?.data)
          window.jwtTokenResult = dataFromSucessLogin[0]?.token;
          window.refreshJwtToken = dataFromSucessLogin[0]?.token;
          window.userid = dataFromSucessLogin[1]?.id;
          window.secretKey = "strive";
          var jwtTimeOut = new Date();
          jwtTimeOut.setMinutes(jwtTimeOut.getMinutes() + 15);
          window.jwtTimeOut = jwtTimeOut;
          window.sessionTime = "";
          var sessionTimeOut = new Date();
          sessionTimeOut.setMinutes(sessionTimeOut.getMinutes() + 15);
          window.sessionTime = sessionTimeOut;
          window.loginType = "SignIn"

          await fetchStduentDataBaisedOnContactNumberandDob(mobileNo, dob, dataFromSucessLogin[0]?.token).then(async (jsondata) => {
            let result = (jsondata.data)
            if (result.length > 2) {
              result = JSON.parse(jsondata.data)
              window.dbUserId = result[0].dbUserId // setting global variable
              window.dob = result[0].dob
              window.primaryContactNumber = result[0].primaryContactNumber
              // Getting the enagagment ID baised on dbuserId
              await fetchStduentEngagementDataBaisedOnDBUserId(result[0].dbUserId, dataFromSucessLogin[0]?.token).then((jsondata) => {
                let res = JSON.parse(jsondata.data)
                window.engagementId = res[0]?.engagementId
                window.studentType = res[0]?.ideaType
              })
              history('/status', { replace: true });
            }
            else {
              alert("User Not Found! Please Sign Up.")
            }
          })

        }).catch((error) => {
          console.log("error========>", error)
        })
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        setDisableVerifyOtp(false)
        alert("Invalid OTP!")
      });
    }
  }

  const handleOtpInput = (event) => {
    // setOtp(event?.target?.value);
    const error = validatePincode("otp", event?.target?.value, "lng");
    setErrors(error)
    setOtp(event?.target?.value);
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
const resetPage = ()=>{
  window.location.reload();
}
  return (
    <>
      <Grid>
        <Paper style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>

          <TextField
            label={t('mobile_no')}
            placeholder={t('mobile_no_placeholder')}
            required
            type='number'
            id='mobile'
            name='mobile'
            fullWidth='fullWidth'
            variant='standard'
            helperText=''
            onChange={handleMobileNoInput}
            disabled={disableMobileNumber}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 10)
            }}
          />

          <DateOfBirthBox
            name="dob"
            variant='standard'
            label='Date Of Birth'
            fullWidth='fullWidth'
            onChange={(e) => handleDob(e)}
            inputProps={{ min: "1970-01-01", max: "2004-01-01" }}
          />
          <br/><br/>
           <Grid container>
            <Grid item xs>
              <Buttons text={t('get_otp')} disabled={disableGetOtp} onClick={generateOTP} />
            </Grid>
            <Grid item >
              <Buttons text={t('resend_otp')} disabled={true} onClick={generateOTP} />
            </Grid>
          </Grid>
          <TextField
            label={t('otp')}
            placeholder={t('otp_placeholder')}
            id='otp'
            name='otp'
            fullWidth='fullWidth'
            variant='standard'
            helperText=''
            value={otp}
            inputProps={{ inputMode: 'numeric' , maxLength:6}}
            onChange={handleOtpInput}
            />
           {errors?.otp ? (<div style={{ color: "red" }}>{errors?.otp}</div>) : null}
          &nbsp;
          <Grid container  style={{justifyContent: "end",}}>
          <Buttons style={{ color:"red" }} text={t('Reset')} onClick={resetPage} />
          </Grid>
          <Buttons
            sx={{ mt: '20px', mb: '30px' }}
            text={t('verify_otp')}
            variant='contained'
            disabled={dob.length == "" ? true : (otp.length < 6) ? true : false}
            onClick={verifyOTP}
            fullWidth='fullWidth'
          />
          <Typography>
            Do you have an account?
            <Link to='#' onClick={() => handleChange('event', 1)}>
              Sign Up
            </Link>
          </Typography>

        </Paper>
        { mobileNo.length === 10 && 
        <div id="recaptcha"></div>}
       
      </Grid>
    </>
  )
}

export default LoginUser
