import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Kuis from './pages/Kuis'
import Cerita from './pages/Cerita'
import Pledge from './pages/Pledge'
import Tentang from './pages/Tentang'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-warm text-ink">
      <Navbar />
      <main key={location.pathname} className="flex-1 animate-fadeIn">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kuis" element={<Kuis />} />
          <Route path="/cerita" element={<Cerita />} />
          <Route path="/pledge" element={<Pledge />} />
          <Route path="/tentang" element={<Tentang />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
