import React from 'react'
import { FaLinkedin, FaGithub, FaX } from "react-icons/fa6"
import SplitText from "../Components/SplitText"
import GithubSection from "../Components/GitHubSection"
import Projects from "../Components/Projects"
import Skills from "../Components/Skills"
import Contact from "../Components/Contact"
import banner from "../assets/banner.png"
import profile from "../assets/my.png"

function Home() {
    const linkedin = "https://www.linkedin.com/in/mukundjha-mj/"
    const github = "https://github.com/mukundjha-mj"
    const x = "https://x.com/mukundjha_mj"

    const handleAnimationComplete = () => {
        console.log('All letters have animated!')
    }

    return (
        <div id="home" className='container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 min-h-screen flex flex-col gap-6 md:gap-8 border border-gray-500 rounded-2xl'>

            {/* Banner and Profile Section */}
            <div className='relative w-full'>
                <img
                    src={banner}
                    alt="Banner"
                    className='w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-xl border border-gray-900'
                />
                <div className='absolute left-4 sm:left-6 md:left-8 bottom-[-40px] sm:bottom-[-50px] w-20 sm:w-24 md:w-32 rounded-full border-4 border-white overflow-hidden shadow-lg'>
                    <img
                        src={profile}
                        alt="Profile"
                        className='w-full h-full object-cover'
                    />
                </div>
            </div>

            {/* Text & Socials Section */}
            <div className="mt-16 sm:mt-20 md:mt-24 px-2 sm:px-4 flex flex-col items-start">
                <SplitText
                    text="Mukund Jha"
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                    delay={50}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    easing="easeOutCubic"
                    threshold={0.2}
                    rootMargin="-50px"
                    onLetterAnimationComplete={handleAnimationComplete}
                />
                <SplitText
                    text="Full Stack Developer & AI ML Enthusiast"
                    className="text-sm sm:text-base md:text-lg text-gray-700 mt-2"
                    delay={50}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    easing="easeOutCubic"
                    threshold={0.2}
                    rootMargin="-50px"
                    onLetterAnimationComplete={handleAnimationComplete}
                />
                <div className="flex gap-4 mt-4">
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className='hover:text-gray-500 transition-colors duration-200'>
                        <FaLinkedin className='w-6 h-6 sm:w-7 sm:h-7' />
                    </a>
                    <a href={github} target="_blank" rel="noopener noreferrer" className='hover:text-gray-500 transition-colors duration-200'>
                        <FaGithub className='w-6 h-6 sm:w-7 sm:h-7' />
                    </a>
                    <a href={x} target="_blank" rel="noopener noreferrer" className='hover:text-gray-500 transition-colors duration-200'>
                        <FaX className='w-6 h-6 sm:w-7 sm:h-7' />
                    </a>
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
