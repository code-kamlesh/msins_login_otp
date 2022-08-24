import React from 'react'
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
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
import DateOfBirthBox from '../../components/shared/DateOfBirthBox'
import Buttons from '../../components/shared/Buttons'
import OTP from '../../components/shared/utils/OTP'
import BasicModal from '../../components/shared/utils/BasicModal'
import RadioOptionButton from '../../components/shared/RadioOptionButton'
import AddPrefixToMobile from '../../components/shared/utils/AddPrefixToMobile'

const Register = () => {
  const paperStyle = { padding: 20, maxWidth: 350, margin: '0 auto' }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#62c4e7' }
  const marginTop = { marginTop: 5 }
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
        <form>
          {/* Add mobile number component */}
          <AddPrefixToMobile />

          <DateOfBirthBox
            variant='standard'
            label='Date Of Birth'
            fullWidth='fullWidth'
            helperText=''
          />

          <TextFields
            label='Pincode'
            placeholder='Enter your pincode'
            required
            id='pincode'
            name='pincode'
            // type="number"
            fullWidth='fullWidth'
            variant='standard'
            //inputProps={{ minLength: 6, maxLength: 6 }}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 6)
            }}
            helperText=''
          />
          <OTP />
          <Grid container>
            <Grid item xs>
              <Buttons text='GET OTP' />
            </Grid>
            <Grid item>
              <Buttons text='RESEND OTP' />
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
                value='innovator'
                control={<Radio />}
                label='Innovator'
              />
              <FormControlLabel
                value='entrepreneur'
                control={<Radio />}
                label='Entrepreneur'
              />
            </RadioGroup>
          </FormControl>

          <Box style={{ display: 'flex' }}>
            <Box style={{ display: 'inline' }}>
              <FormControlLabel
                control={<Checkbox name='tnc' />}
                label='I accept the'
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
                control={<Checkbox name='tnc' />}
                label='I accept the'
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
          {/* <span style={{ color: "blue" }}>
            <a
              href="https://tatastrive.com"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              Eligibility Criteria
            </a>
          </span> */}
          <Link
            to='/candidateType'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Buttons text='submit' variant='contained' fullWidth='fullWidth' />
          </Link>
        </form>
      </Paper>
    </Grid>
  )
}

export default Register
