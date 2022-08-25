import React,{useState} from 'react'
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import {authorization} from '../../services/firebase' 
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Buttons from '../../components/shared/Buttons'
import OTP from '../../components/shared/utils/OTP'
import AddPrefixToMobile from '../../components/shared/utils/AddPrefixToMobile'
import { useTranslation } from 'react-i18next'
import Language from '../../components/language/Language'
import { login } from '../../utility/Api'
 
// language/Language'

const LoginUser = ({ handleChange }) => {
  const { t } = useTranslation()
  const history = useNavigate();
  const [mobileNo, setMobileNo] = useState('');
  const [otp, setOtp] = useState('');
  const [disableGetOtp, setDisableGetOtp] = useState(false);
  const [disableVerifyOtp, setDisableVerifyOtp] = useState(true);
  const [mobileNoError, setMobileNoError] = useState('');
  const [otpError, setOtpError] = useState('');
  

  const paperStyle = {
    padding: 20,
    minHeight: '60vh',
    maxWidth: 350,
    margin: '0 auto',
  }

  const avatarStyle = { backgroundColor: '#62c4e7' }

  const handleMobileNoInput  = (event) => {
      // console.log("<=====EVENT VALUE=====>",event?.target?.value);
      setMobileNo(event?.target?.value);
      if(event?.target?.value?.length > 9){
          // generateRecaptcha();
          // let appVerifire = window.recaptchaVerifier;
          // signInWithPhoneNumber(authorization, '+91'+mobileNo, appVerifire).then( confirmationResult =>{
          //   window.confirmationResult = confirmationResult;
          //   //  setDisableVerifyOTPButton(false);
          //   //  setDisableGetOTPButton(true);  
          // }). catch( error => {
          //   console.log('<====Error while verifying the OTP====>',error)
          // })
      }
  };

  const generateOTP = () => {
      if(mobileNo?.length < 10){
         alert('incorrect mobile number, please try again');
      }
      else{
        generateRecaptcha();
        let appVerifire = window.recaptchaVerifier;
        signInWithPhoneNumber(authorization, '+91'+mobileNo, appVerifire).then( confirmationResult =>{
          window.confirmationResult = confirmationResult;
          setDisableVerifyOtp(false);
          setDisableGetOtp(true);
        }). catch( error => {
          console.log('<====Error while verifying the OTP====>',error)
        })
      } 
  };

  const verifyOTP = () => {
    if(mobileNo?.length<10 || otp?.length<6){
      alert('please click get OTP to reciev the otp')
    }
    else{
      setDisableVerifyOtp(true)
      let confirmationOTP = window.confirmationResult;
      confirmationOTP.confirm(otp).then((result) => {
        const user = result.user;
        window.userOTPresult = user;
        alert('User Sucessfully logged in!')
        // setDisableVerifyOTPButton(true)
        login().then((jsondata)=>{  
          console.log('jsondata ========> ', jsondata?.data)
          let dataFromSucessLogin = JSON.parse(jsondata?.data)
          console.log("data at 0",dataFromSucessLogin)
          console.log("data at 1", typeof dataFromSucessLogin)
          console.log("<=======Data from login=======>",dataFromSucessLogin.token)
          window.jwtTokenResult = dataFromSucessLogin[0]?.token;
          window.refreshJwtToken = dataFromSucessLogin[0]?.token;

          console.log("token",window.jwtTokenResult)
          history('../form',{ replace: true },window.jwtTokenResult,window.refreshJwtToken );
        }).catch((error)=>{
          console.log("error========>",error)
        })
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        setDisableVerifyOtp(false)
        console.log(error)
      });
    }
  }

  const handleOtpInput = (event) => {
      // console.log("<=====EVENT VALUE=====>",event?.target?.value);
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

  return (
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
          autoFocus={false}
          onChange={handleMobileNoInput}
          // inputProps={{ maxLength: 5 }}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 10)
          }}
        />

        <TextField
          label={t('otp')}
          placeholder={t('otp_placeholder')}
          // required
          type='number'
          id='mobile'
          name='mobile'
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

        {/* <AddPrefixToMobile /> */}

        {/* <OTP /> */}

        {/* <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        /> */}
        &nbsp;&nbsp;
        <Grid container>
          <Grid item xs>
            <Buttons text={t('get_otp')} disabled={disableGetOtp} onClick={generateOTP} />
          </Grid>
          <Grid item >
            <Buttons text={t('resend_otp')} disabled={true} onClick={generateOTP} />
          </Grid>
          {/* <Grid item>
            <Buttons text={t('verify_otp')} disabled={disableVerifyOtp} onClick={verifyOTP}/>
          </Grid> */}
        </Grid>

        {/* <Link
          to='/status'
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        > */}
        
          <Buttons
            sx={{ mt: '30px', mb: '30px' }}
            text={t('verify_otp')}
            variant='contained'
            disabled={disableVerifyOtp}
            // color={(!disableGetOtp) ? 'gray' : 'gray'}
            onClick={verifyOTP}
            fullWidth='fullWidth'
          />
        {/* </Link> */}

        {/* <Typography>
          <Link href="#">Forgot password ?</Link>
      </Typography>*/}
        
        <Typography>
          Do you have an account?
          <Link to='#' onClick={() => handleChange('event', 1)}>
            Sign Up
          </Link>
        </Typography>
        
      </Paper>
      <div id="recaptcha"></div>
    </Grid>
  )
}

export default LoginUser
