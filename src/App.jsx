import Hero from './components/Hero.jsx'
import Greeting from './components/Greeting.jsx'
import PartyInfo from './components/PartyInfo.jsx'
import Countdown from './components/Countdown.jsx'
import MapSection from './components/MapSection.jsx'
import Footer from './components/Footer.jsx'
import DividerImage from './components/DividerImage.jsx'

export default function App() {
  return (
    <main>
      <Hero />
      <Greeting />
      <DividerImage src="divider-1.jpg" alt="준규 사진" />
      <PartyInfo />
      <DividerImage src="divider-2.jpg" alt="준규 사진" />
      <Countdown />
      <DividerImage src="divider-3.jpg" alt="준규 사진" />
      <MapSection />
      <Footer />
    </main>
  )
}
