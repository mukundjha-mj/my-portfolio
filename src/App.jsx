import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/NavBar'
import Home from './Pages/Home'
import ProjectDetail from './Pages/ProjectDetail'
import Particles from './Components/Particles'
import WorkInProgress from './Components/WorkInProgress';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col">
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
      <div className="relative z-10 w-full mx-auto flex-grow">
        <Navbar />
        <main className="w-full mt-6 sm:mt-12 md:mt-10 ">
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Home />} />

            {/* Project Detail Route */}
            <Route path="/projects/:id" element={<ProjectDetail />} />

            {/* Sabhi doosre routes ke liye WorkInProgress dikhayega */}
            <Route path="*" element={<WorkInProgress />} />
          </Routes>
        </main>
      </div>
      <div className="relative z-10 w-full">
        <Footer />
      </div>
    </div>
  )
}

export default App
