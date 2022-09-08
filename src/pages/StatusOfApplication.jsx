import Box from '@mui/material/Box'
import '../assets/css/status.css'

export default function Status() {
  
  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#8665f7' }}>
        Status of your Application
      </h2>
      <Box className='table-box' style={{ marginTop: '100px'}}>
        <Box className='table-row table-head'>
          <Box className='table-cell first-cell'>
            <p>Name</p>
          </Box>
          <Box className='table-cell'>
            <p>Engagement ID</p>
          </Box>
          <Box className='table-cell'>
            <p>Student ID</p>
          </Box>
          <Box className='table-cell last-cell'>
            <p>Status</p>
          </Box>
        </Box>

        <Box className='table-row'>
          <Box className='table-cell first-cell'>
            <p>Sagar Kudu</p>
          </Box>
          <Box className='table-cell'>
            <p>ENG_1245252352</p>
          </Box>
          <Box className='table-cell'>
            <p>STU_485815102</p>
          </Box>
          <Box className='table-cell last-cell'>
            <span class='btn info'>Mobilized</span>
          </Box>

          {/* <button className="button button2 table-cell last-cell" style={{textAlign: "center"}}>Draft</button> */}
        </Box>
      </Box>
    </>
  )
}

// <span class="btn success">Success</span>
// <span class="btn info">Info</span>
// <span class="btn warning">Warning</span>
// <span class="btn danger">Danger</span>
// <span class="btn default">Default</span>
