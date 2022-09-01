import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  Box,
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material'

import { useState } from 'react'

import Footer from './Footer'
//import AgentInfo from "./../pages/AgentInfo";

import Container from '@mui/material/Container'

import StepperForm from './StepperForm'
import UploadDocuments from './upload-documents/UploadDocuments'
import Home from './../pages/Home'
import EducationDetails from '../pages/education-details/EducationDetails'
import Status from '../pages/StatusOfApplication'
import CandidateType from '../pages/candidate-type/CandidateType'
import BasicDetailsForm from './../pages/forms/BasicDetailsForm'
import Header from './Header'
import { useLocation } from "react-router-dom";
import EligibilityTest, {
  UserIsEligible,
  UserIsNotEligible,
} from '../pages/eligible/EligibilityTest'

const Main = () => {
  // console.log(location.state)
  const [mode, setMode] = useState('light')
  const jwtToken = window?.jwtTokenResult;
  // const isOTPVerified

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  })
  return (
    <>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={darkTheme}>
            <Box
            // component="main"
            // sx={{
            //   backgroundColor: "#F5F5F5",
            //   flexGrow: 1,
            //   minHeight: "82.5vh",
            //   overflow: "auto",
            //   display: "flex",
            // }}
            // mt="4rem"
            >
              <Header />
              <Routes>
                <Route path='/' element={<Home />} />
              </Routes>
              <Routes>
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
              <Routes>
                <Route path='/basicDetails' element={<BasicDetailsForm />} />
              </Routes>
              <Routes>
                <Route path='/candidateType' element={<CandidateType />} />
              </Routes>
              <Routes>
                <Route path='/status' element={<Status />} />
              </Routes>{' '}
              <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                <Routes>
                  <Route
                    path='/educationDetails'
                    element={<EducationDetails />}
                  />
                </Routes>

                <Routes>
                  {/* <Route path="/form2" element={<Steppers />} /> */}
                  <Route path='/form' element={<StepperForm />} />
                  {/* (window.jwtTokenResult == '' || window.jwtTokenResult == null || window.jwtTokenResult == undefined) ? <Home/> : */}
                  <Route
                    path='/form/uploadDocuments'
                    element={<UploadDocuments />}
                  />
                  {/* <Route path="/form3" element={<TextMobileStepper />} /> */}
                </Routes>
              </Container>
            </Box>
            <Footer />
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </>
  )
}

export default Main
