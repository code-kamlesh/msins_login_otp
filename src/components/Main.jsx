import { Routes, Route } from 'react-router-dom'
import {Box,createTheme,ThemeProvider,StyledEngineProvider,
} from '@mui/material'
import { useState } from 'react'
import Footer from './Footer'
import Container from '@mui/material/Container'
import UploadDocuments from './upload-documents/UploadDocuments'
import Home from './../pages/Home'
import EducationDetails from '../pages/education-details/EducationDetails'
import Status from '../pages/StatusOfApplication'
import CandidateType from '../pages/candidate-type/CandidateType'
import BasicDetailsForm from './../pages/forms/BasicDetailsForm'
import Header from './Header'
import ExperienceDetails from '../pages/forms/ExperienceDetailsForm'
import ExistingBusinessDetails from '../pages/forms/ExistingBusinessDetails'
import SocioEconimoicDetails from "../pages/forms/SocioEconomicDetails"
import BusinessCaseBrief from "../pages/forms/BusinessCase"
import Dashboard from '../pages/Dashboard'
import FamilyDetails from '../pages/forms/FamilyDetails'
// import ExistingBusinessEnterpreneurForm from '../pages/forms/ExistingBusinessEnterpreneurForm'
import  {UserIsEligible,UserIsNotEligible,EligibilityTest} from '../pages/eligible/EligibilityTest'


const Main = () => {
  const [mode, setMode] = useState('light')
  //  const mylocation = location.pathname;

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  })
  return (
    <>
        
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={darkTheme}>
            <Box
            >
              <Header />
              
              <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path='/dashboard' element={<Dashboard />}/> */}
                <Route path='/eligibilityTest' element={<CandidateType />} />
                <Route path='/eligibilityTest/userIsEligible' element={<UserIsEligible />}  />
                <Route path='/eligibilityTest/userIsNotEligible'  element={<UserIsNotEligible />}  />
                <Route path='/eligibilityTest/eligibilityCriteria'  element={<EligibilityTest />}  />
                <Route path='/basicdetails' element={<BasicDetailsForm />} />
                <Route path='/socioeconomicdetails' element={<SocioEconimoicDetails />} />
                <Route path='/familydetails' element={<FamilyDetails/>} />
                <Route path='/experiencedetails' element={< ExperienceDetails/>} />
                <Route path='/Businessdetails' element={<ExistingBusinessDetails/>} />
                <Route path='/businesscasebrief' element={<BusinessCaseBrief/>} />
                <Route path='/uploadDocuments' element={<UploadDocuments />}/>
                <Route path='/status' element={<Status />} />
                <Route path='*' exact={true} element={<Home />} />
               </Routes>{' '}
              {/* <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                <Routes>
                  <Route
                    path='/educationDetails'
                    element={<EducationDetails />}
                  />
                </Routes>
              </Container> */}
            </Box>
            <Footer />
          </ThemeProvider>
        </StyledEngineProvider>
        
    </>
  )
}

export default Main
