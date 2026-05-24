import Description from "../components/Description"
import Generatebtn from "../components/Generatebtn"
import Header from "../components/Header"
import Steps from "../components/Steps"
import Testimonials from "../components/Testimonials"


const Home = () => {
  return (
    <div>
        <Header/>
        <Steps/>
        <Description/>
        <Testimonials/>
        <Generatebtn/>
    </div>
  )
}

export default Home