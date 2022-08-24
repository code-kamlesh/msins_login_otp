import { useState } from 'react'
import TableRows from './AddTableRows'
import { Box, Grid, Stack } from '@mui/material'
import { Container } from '@mui/material/'
import TypographyText from '../../components/shared/TypographyText'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import Buttons from '../../components/shared/Buttons'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

export default function EducationDetails() {
  const [rowsData, setRowsData] = useState([])

  const handleSubmit = () => {}

  const addTableRows = () => {
    const rowsInput = {
      qualification: '',
      passingYear: '',
      instituteName: '',
      marks: '',
      percentage: '',
      specialization: '',
    }
    setRowsData([...rowsData, rowsInput])
  }
  const deleteTableRows = (index) => {
    const rows = [...rowsData]
    rows.splice(index, 1)
    setRowsData(rows)
  }

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target
    const rowsInput = [...rowsData]
    rowsInput[index][name] = value
    setRowsData(rowsInput)
  }
  return (
    <>
      <Paper elevation={3}>
        <Box mt={5} mx={2}>
          <TypographyText
            variant='h3'
            typoText='Education Details'
            gutterBottom='gutterBottom'
          />
          <Table className='table' border={1}>
            <TableHead>
              <TableRow>
                <TableCell>Qualification</TableCell>
                <TableCell>Passing Year</TableCell>
                <TableCell>Institute Name</TableCell>
                <TableCell>Marks</TableCell>
                <TableCell>Percentage </TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>
                  {/* <button
                  className="btn btn-outline-success"
                  onClick={addTableRows}
                >
                  +
                </button> */}
                  <AddBoxIcon onClick={addTableRows} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRows
                rowsData={rowsData}
                deleteTableRows={deleteTableRows}
                handleChange={handleChange}
              />
            </TableBody>
          </Table>
          {/* <Box className="col-sm-4"></Box> */}
          <Stack spacing={4} direction='row'>
            <Buttons text='Add' onClick={addTableRows} />
          </Stack>
        </Box>{' '}
        {/* <Buttons
        text="Submit"
        variant="contained"
        color="success"
        onSubmit={handleSubmit}
      /> */}
      </Paper>
    </>
  )
}
