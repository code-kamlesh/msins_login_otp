import * as React from 'react'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'

export default function AddPrefixToMobile() {
  const [values, setValues] = React.useState({
    amount: '',
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='standard-adornment-amount'>Mobile no.</InputLabel>
        <Input
          id='standard-adornment-amount'
          value={values.amount}
          onChange={handleChange('amount')}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 10)
          }}
          startAdornment={<InputAdornment position='start'>+91-</InputAdornment>}
        />
      </FormControl>
    </>
  )
}
