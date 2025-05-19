import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/NavBar'
import Home from './Pages/Home'
import Particles from './Components/Particles'
import WorkInProgress from './Components/WorkInProgress';

const App = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="relative z-10">
        <Navbar />
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />
          
          {/* Sabhi doosre routes ke liye WorkInProgress dikhayega */}
          <Route path="*" element={<WorkInProgress />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
