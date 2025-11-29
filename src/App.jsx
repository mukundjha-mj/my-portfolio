import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/NavBar'
import Home from './Pages/Home'
import Particles from './Components/Particles'
import WorkInProgress from './Components/WorkInProgress';

const App = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
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
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
        <main className="w-full mt-6 sm:mt-12 md:mt-10 ">
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Home />} />
            
            {/* Sabhi doosre routes ke liye WorkInProgress dikhayega */}
            <Route path="*" element={<WorkInProgress />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
