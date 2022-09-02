import ImageSlider from '../components/slider/ImageSlider'
import SignInSignUpContainer from '../pages/signin-signup/SignInSignUpContainer'
import Dashboard from '../components/Dashboard' 

export default function Home() {
  return (
    <>
    {(window?.jwtTokenResult == '') ? 
      <>
      <ImageSlider />
      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>
        Are you Existing user or New User?
      </h3>
      <SignInSignUpContainer />
      </>
      : <Dashboard />}
    </>

    // {/* 
    // <>
    //    <ImageSlider />
    //   <h3 style={{ textAlign: 'center', marginTop: '20px' }}>
    //     Are you Existing user or New User?
    //   </h3>
    //   <SignInSignUpContainer />
    // </> */}
  )
}
