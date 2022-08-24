import * as React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Buttons from '../../components/shared/Buttons'
import { Paper, Stack } from '@mui/material'
import TextFields from '../../components/shared/TextFields'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

const qualificationNames = [
  {
    value: 'Bachelors',
    label: 'Bachelors',
  },
  {
    value: 'HSC',
    label: 'HSC',
  },
  {
    value: 'ITI',
    label: 'ITI',
  },
  {
    value: 'SSC',
    label: 'SSC',
  },
]

export default function TableRows({ rowsData, deleteTableRows, handleChange }) {
  const [qualifications, setQualifications] = React.useState('ITI')

  const handleQualificationChange = (event) => {
    setQualifications(event.target.value)
  }

  return rowsData.map((data, index) => {
    const { passingYear, instituteName, marks, percentage, specialization } =
      data

    return (
      <>
        <tr key={index}>
          <td>
            <TextField
              select
              name='qualification'
              value={qualifications}
              onChange={handleQualificationChange}
              label='Education'
              fullWidth
              //helperText='Please select your currency'
            >
              {qualificationNames.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </td>

          <td>
            <TextFields
              type='number'
              value={passingYear}
              onChange={(evnt) => handleChange(index, evnt)}
              name='passingYear'
              className='form-control'
              label='Passing Year'
              variant='outlined'
            />{' '}
          </td>
          <td>
            <TextFields
              type='text'
              value={instituteName}
              onChange={(evnt) => handleChange(index, evnt)}
              name='instituteName'
              className='form-control'
              label='Institute Name'
              variant='outlined'
            />
          </td>
          <td>
            <TextFields
              type='text'
              value={marks}
              onChange={(evnt) => handleChange(index, evnt)}
              name='marks'
              className='form-control'
              label='Marks'
              variant='outlined'
            />
          </td>
          <td>
            <TextFields
              type='number'
              value={percentage}
              onChange={(evnt) => handleChange(index, evnt)}
              name='percentage'
              className='form-control'
              label='Percentage'
              variant='outlined'
            />
          </td>
          <td>
            <TextFields
              type='text'
              value={specialization}
              onChange={(evnt) => handleChange(index, evnt)}
              name='specialization'
              className='form-control'
              label='Specialization'
              variant='outlined'
            />
          </td>
          <td>
            {/* <button
            className="btn btn-outline-danger"
            onClick={() => deleteTableRows(index)}
          >
            x
          </button> */}
            <DeleteIcon onClick={() => deleteTableRows(index)} />
          </td>
        </tr>
      </>
    )
  })
}
