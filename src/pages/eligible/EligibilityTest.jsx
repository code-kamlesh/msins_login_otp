import { Link } from 'react-router-dom'
import trophy from '../../assets/images/trophy.png'
import Paper from '@mui/material/Paper'
import Buttons from '../../components/shared/Buttons'
import '../../assets/css/user-is-not-eligible.css'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export function UserIsEligible() {
  return (
    <>
      <Box>
        <Box class='modal-dialog'>
          <Box class='modal-content'>
            <Box
              style={{
                //width: "350px",
                textAlign: 'center',
              }}
            >
              <Box>
                <Box>
                  {/* <Paper elevation={12}> */}
                  <img src={trophy} alt='...' />
                  <h2>CONGRATULATIONS!</h2>
                  <p>You are Eligible for our program!</p>

                  <Link
                    to='/form'
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <Buttons
                      sx={{ marginBottom: '20px' }}
                      text='continue'
                      variant='contained'
                      color='error'
                    />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export function UserIsNotEligible() {
  const history =  useNavigate();
  const handleButton = ()=>{
      history('/',{ replace:true });
  }
  return (
    <>
      <Box className='modal-dialog modal-confirm'>
        <Box className='modal-content'>
          <Paper elevation={12}>
            <Box className='modal-header'>
              <Box className='icon-box'>
                <i className='material-icons'>&#xE5CD;</i>
              </Box>
              <h4 className='modal-title w-100'>Sorry!</h4>
            </Box>
            <Box className='modal-body'>
              <h1 className='text-center'>
                You Are Not Eligible
              </h1>
            </Box>
            <Box className='modal-footer'>
              <Buttons
                //className="btn btn-success btn-block"
                //data-dismiss="modal"
                text='OK'
                variant='contained'
                color='error'
                fullWidth='fullWidth'
                onClick={handleButton}
                >
                OK
              </Buttons>
            </Box>
            <Box style={{ textAlign: 'center' }}>
              <h6>
                Please click here to read our{' '}
                <span style={{ textAlign: 'center', color: 'blue' }}>
                  <Link
                    to='/eligibilityTest/eligibilityCriteria'
                    style={{ textDecoration: 'none' }}
                  >
                    Eligibility Criteria.
                  </Link>
                </span>
              </h6>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  )
}

//call above function as per logic
export function EligibilityTest() {
  return (
    <>
      <p>You Are Not Eligible for the Program.</p>
    </>
  )
}

export default EligibilityTest
