
import {useState} from 'react'
import { BrowserRouter, Routes, Route ,useNavigate,Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import {Box,createTheme,ThemeProvider,StyledEngineProvider,} from '@mui/material'
import Header from './Header'
import Footer from './Footer'
import StepperForm from './StepperForm'
import EducationDetails from '../pages/education-details/EducationDetails'
import Status from '../pages/StatusOfApplication'
import CandidateType from '../pages/candidate-type/CandidateType'
import UploadDocuments from './upload-documents/UploadDocuments'
import EligibilityTest, { UserIsEligible, UserIsNotEligible,} from '../pages/eligible/EligibilityTest'
import Container from '@mui/material/Container'
export default function Dashboard(){
const location = useLocation();
const history = useNavigate();
const [mode, setMode] = useState('light')
//   if( location?.state !== null){
//     var data = location?.state[0]
//   }

console.log(window.location.href)
console.log(window?.loginType)
    // if(location?.state?.token == null || location?.state?.token == undefined){
    //     history('/', {replace:true});
    // }
    // else{
        const darkTheme = createTheme({
            palette: {
              mode: mode,
            },
          })

    return(
        // <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={darkTheme}>
          
            <Box>
            <Routes>
                <Route path='/' element={ window.loginType === "SignIn" ?<StepperForm /> : <UserIsEligible />} />

              </Routes>

            {/* <Routes>
                <Route path='/eligibilityTest' element={<EligibilityTest />} />
              </Routes>
              <Routes>
                <Route
                  path='/eligibilityTest/userIsEligible'
                  element={<UserIsEligible />}
                />
              </Routes>
              <Routes>
                <Route
                  path='/eligibilityTest/userIsNotEligible'
                  element={<UserIsNotEligible />}
                />
              </Routes>
              {/* <Routes>
                <Route path='/basicDetails' element={<BasicDetailsForm />} />
              </Routes> */}
              {/* <Routes>
                <Route exact path='/dashborad/candidateType' element={<CandidateType />} />
              </Routes>
              <Routes>
                <Route path='/status' element={<Status />} />
              </Routes>{' '} 
              <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}> */}
                {/* <Routes>
                  <Route
                    path='/educationDetails'
                    element={<EducationDetails />}
                  />
                </Routes> */}

                {/* <Routes> */}
                  {/* <Route path="/form2" element={<Steppers />} /> */}
                  {/* <Route exact path='/dashborad/form' element={<StepperForm />} /> */}
                  {/* (window.jwtTokenResult == '' || window.jwtTokenResult == null || window.jwtTokenResult == undefined) ? <Home/> : */}
                  {/* <Route
                    path='/form/uploadDocuments'
                    element={<UploadDocuments />}
                  /> */}
                  {/* <Route path="/form3" element={<TextMobileStepper />} /> */}
                {/* </Routes> */}
              {/* </Container> */}
            </Box>
           
          </ThemeProvider>
        </StyledEngineProvider>
        // </BrowserRouter> 
    )
    }
    

// }

 