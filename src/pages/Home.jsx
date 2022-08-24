import ImageSlider from '../components/slider/ImageSlider'
import SignInSignUpContainer from '../pages/signin-signup/SignInSignUpContainer'

export default function Home() {
  return (
    <>
      <ImageSlider />
      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>
        Are you Existing user or New User?
      </h3>
      <SignInSignUpContainer />
    </>
  )
}
