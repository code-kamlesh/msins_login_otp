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
import  Dashboard from "./Dashboard"

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
             
              <Routes>
                <Route path='/' element={<Home />} />
              </Routes>
              <Routes>
                <Route path='/home' element={<Home />} />
              </Routes>
              {/* <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
              </Routes> */}
           
            </Box>
            <Footer />
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </>
  )
}

export default Main
