import EligibilityTest from '../eligible/EligibilityTest'
import CommonData from './CommonData'

const selectEntrepreneurQualificationOptions = ['ITI']
const selectCollegeOptions = []
const selectInnovatorQualificationOptions = [
  'ITI',
  'Graduation',
  'Post Graduation',
]

const collegeNameList = [
  { label: 'College 1' },
  { label: 'College 2' },
  { label: 'College 3' },
  { label: 'sagar' },
  { label: 'kamlesh' },
]

function Innovator() {
  return (
    <CommonData
      type='Innovator'
      qualification={selectInnovatorQualificationOptions}
      collegeNameList={collegeNameList}
    />
  )
}

function Entreprenuer() {
  return (
    <CommonData
      type='Entreprenuer'
      qualification={selectEntrepreneurQualificationOptions}
      collegeNameList={collegeNameList}
    />
  )
}

//logic to find innovator or entrepreneur
//logic to find to find eliglible or not
export default function CandidateType() {
  return (
    <>
      <Innovator />
      {/* <Entreprenuer /> */}

      {/* now we will check user is eligible or not */}
      <EligibilityTest />
    </>
  )
}
