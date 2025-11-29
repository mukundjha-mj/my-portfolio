import React from 'react'
import { FaLinkedin, FaGithub, FaX } from "react-icons/fa6"
import SplitText from "../Components/SplitText"
import GithubSection from "../Components/GitHubSection"
import Projects from "../Components/Projects"
import Skills from "../Components/Skills"
import Contact from "../Components/Contact"
import profile from "../assets/my.png"

function Home() {
    const linkedin = "https://www.linkedin.com/in/mukundjha-mj/"
    const github = "https://github.com/mukundjha-mj"
    const x = "https://x.com/mukundjha_mj"

    const handleAnimationComplete = () => {
        console.log('All letters have animated!')
    }

    return (
        <div id="home" className='max-w-7xl mx-auto pt-20 pb-8 min-h-screen flex flex-col gap-6 md:gap-8 border border-gray-500 rounded-2xl leading-relaxed'>

            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 mt-10 sm:mt-16 md:mt-20 px-4 sm:px-8">

                {/* Text Content */}
                <div className="flex-1 flex flex-col items-start text-left">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-green-400 uppercase bg-green-900/20 rounded-full border border-green-800">
                        🟢 Open to: SDE / Full-Stack / Backend roles
                    </div>

                    <SplitText
                        text="Mukund Jha"
                        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
                        delay={50}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        easing="easeOutCubic"
                        threshold={0.2}
                        rootMargin="-50px"
                        onLetterAnimationComplete={handleAnimationComplete}
                    />

                    <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-400 mt-2 font-medium">
                        Full Stack Developer • AI/ML Enthusiast
                    </h2>

                    <p className="text-lg sm:text-xl text-gray-300 mt-6 max-w-2xl leading-relaxed">
                        I build data-driven web apps that go from <span className="text-white font-semibold">idea → production</span> fast.
                    </p>

                    <ul className="mt-6 space-y-3 text-gray-400 text-sm sm:text-base">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-400 mt-1">▹</span>
                            <span>Built & deployed 5+ full-stack projects (React, Node, Postgres/Mongo)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-400 mt-1">▹</span>
                            <span>Worked on AI-assisted tooling (question paper generator, Jarvis Lite)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-400 mt-1">▹</span>
                            <span>Open source contributor with 200+ GitHub contributions this year</span>
                        </li>
                    </ul>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                            Download Resume
                        </a>
                        <div className="flex gap-4 items-center">
                            <a href={linkedin} target="_blank" rel="noopener noreferrer" className='p-3 bg-white/5 rounded-lg hover:bg-white/10 hover:text-white text-gray-400 transition-all border border-white/10'>
                                <FaLinkedin className='w-5 h-5' />
                            </a>
                            <a href={github} target="_blank" rel="noopener noreferrer" className='p-3 bg-white/5 rounded-lg hover:bg-white/10 hover:text-white text-gray-400 transition-all border border-white/10'>
                                <FaGithub className='w-5 h-5' />
                            </a>
                            <a href={x} target="_blank" rel="noopener noreferrer" className='p-3 bg-white/5 rounded-lg hover:bg-white/10 hover:text-white text-gray-400 transition-all border border-white/10'>
                                <FaX className='w-5 h-5' />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                    <img
                        src={profile}
                        alt="Mukund Jha"
                        className='w-full h-full object-cover rounded-full border-4 border-white/10 shadow-2xl relative z-10'
                    />
                </div>
            </div>

            {/* Projects Section */}
            <Projects />

            {/* Skills Section */}
            <Skills />

            {/* GitHub Section */}
            <div className="github bg-black text-white rounded-xl p-4 sm:p-6 w-full border border-gray-500">
                <GithubSection />
            </div>

            {/* Contact Section */}
            <Contact />
        </div>
    )
}

export default Home
