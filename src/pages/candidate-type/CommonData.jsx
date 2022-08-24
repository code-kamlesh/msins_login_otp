import React from 'react'
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
import Buttons from '../../components/shared/Buttons'
import EligibilityTest from '../eligible/EligibilityTest'

const paperStyle = {
  padding: 20,
  minWidth: '450',
  maxWidth: 650,
  margin: '0 auto',
}
const headerStyle = { margin: 0 }
const avatarStyle = { backgroundColor: '#62c4e7' }
const marginTop = { marginTop: 5 }

export default function CommonData(props) {
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
                onChange=''
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
                  />
                  <FormControlLabel
                    value='pursuing'
                    control={<Radio />}
                    label='Pursuing'
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={props.collegeNameList}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label='College' variant='standard' />
                )}
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
                helperText=''
              />
            </Box>
            <Box marginTop='20px'>
              <Link
                to='/eligibilityTest'
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Buttons
                  text='submit'
                  variant='contained'
                  fullWidth='fullWidth'
                />
              </Link>
            </Box>
          </form>
        </Paper>
      </Grid>
    </>
  )
}
