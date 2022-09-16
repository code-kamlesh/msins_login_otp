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
import BusinessCaseEntrepreneurForm from "../pages/forms/BusinessCaseEntrepreneurForm"
import ProtectedRoutes from "./RoutesProtector"
// import SocioEconomicInnovatorForm from '../pages/forms/ExistingBusinessInnovatorForm'
// import ExistingBusinessEnterpreneurForm from '../pages/forms/ExistingBusinessEnterpreneurForm'
import EligibilityTest, {
  UserIsEligible,
  UserIsNotEligible,
} from '../pages/eligible/EligibilityTest'


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
                {/* element={<CandidateType />} */}
                <Route path='/eligibilityTest' element={<CandidateType />} />
                <Route path='/eligibilityTest/userIsEligible' element={<UserIsEligible />}  />
                <Route path='/eligibilityTest/userIsNotEligible'  element={<UserIsNotEligible />}  />
                <Route path='/basicdetails' element={<BasicDetailsForm />} />
                <Route path='/socioeconomicdetails' element={<SocioEconimoicDetails />} />
                <Route path='/experiencedetails' element={< ExperienceDetails/>} />
                <Route path='/Businessdetails' element={<ExistingBusinessDetails/>} />
                <Route path='/entrepreneurbusinessform' element={<BusinessCaseEntrepreneurForm/>} />
                <Route path='/uploadDocuments' element={<UploadDocuments />}/>
                {/* <Route path='/eligibilityTest'  element ={}  /> */}
                <Route path='/status' element={<Status />} />
              {/* <Routes>
                <Route path='/socioenterpreneur' element={< SocioEconomicEntepreneurForm/>} />
              </Routes> */}
              {/* <Routes>
                <Route path='/eligibilityTest' element={<EligibilityTest />} />
              </Routes> */} 
               </Routes>{' '}
              <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                <Routes>
                  <Route
                    path='/educationDetails'
                    element={<EducationDetails />}
                  />
                </Routes>
              </Container>
            </Box>
            <Footer />
          </ThemeProvider>
        </StyledEngineProvider>
        
    </>
  )
}

export default Main
