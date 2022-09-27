import {useEffect} from 'react'
import CommonData from './CommonData'
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
const selectEntrepreneurQualificationOptions = ['ITI']
const selectInnovatorQualificationOptions = [ 'ITI','Graduation','Post Graduation',]
const collegeNameList = [
  { label: 'College 1' },
  { label: 'College 2' },
  { label: 'College 3' },
  { label: 'College 4' },
  { label: 'College 5' },
]

function Innovator(props) {
  const history = useNavigate();
  useEffect(() => {
    if (window.jwtTokenResult == "") {
      history('/', { replace: true })
    }
  }, []);
  return (
    <CommonData
      type='Innovator'
      qualification={selectInnovatorQualificationOptions}
      collegeNameList={collegeNameList}
      value={props}
    />
  )
}

function Entreprenuer(props) {
  const history = useNavigate();
  useEffect(() => {
    if (window.jwtTokenResult == "") {
      history('/', { replace: true })
    }
  }, []);
  return (
    <CommonData
      type='Entreprenuer'
      qualification={selectEntrepreneurQualificationOptions}
      collegeNameList={collegeNameList}
      value={props}
    />
  )
}

export default function CandidateType() {
  const location = useLocation();
  const history = useNavigate();
  return (
    <>
    {window.studentType === 'Innovator' &&
        <Innovator value={location.state}/>
    }
     
     {window.studentType === 'Entrepreneur' &&
        <Entreprenuer value={location.state}/>
      }
      

      {/* now we will check user is eligible or not */}
      {/* <EligibilityTest /> */}
    </>
  )
}
