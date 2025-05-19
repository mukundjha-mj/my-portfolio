import React from 'react'
import { FaLinkedin, FaGithub, FaX } from "react-icons/fa6"
import SplitText from "../Components/SplitText"
import GithubSection from "../Components/GitHubSection"

function Home() {
    const linkedin = "https://www.linkedin.com/in/mukundjha-mj/"
    const github = "https://github.com/mukundjha-mj"
    const x = "https://x.com/mukundjha_mj"

    const handleAnimationComplete = () => {
        console.log('All letters have animated!')
    }

    return (
        <div className='container mx-auto p-4 min-h-screen flex flex-col gap-6 rounded-xl border border-gray-500'>
            
            {/* Banner and Profile Section */}
            <div className='relative w-full'>
                <img
                    src="\src\assets\banner.png"
                    alt="Banner"
                    className='w-full max-h-[300px] object-cover rounded-xl border border-gray-900'
                />
                <div className='absolute left-4 bottom-[-40px] sm:bottom-[-50px] w-24 sm:w-32 rounded-full border-4 border-white overflow-hidden shadow-lg'>
                    <img
                        src="src\assets\my.png"
                        alt="Profile"
                        className='w-full h-full object-cover'
                    />
                </div>
            </div>

            {/* Text & Socials Section */}
            <div className="mt-16 sm:mt-20 px-2 flex flex-col items-start">
                <SplitText
                    text="Mukund Jha"
                    className="text-xl sm:text-3xl font-bold"
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
                    className="text-sm sm:text-lg text-gray-700"
                    delay={50}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    easing="easeOutCubic"
                    threshold={0.2}
                    rootMargin="-50px"
                    onLetterAnimationComplete={handleAnimationComplete}
                />
                <div className="flex gap-3 mt-4">
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className='hover:text-gray-500'>
                        <FaLinkedin className='w-6 h-6' />
                    </a>
                    <a href={github} target="_blank" rel="noopener noreferrer" className='hover:text-gray-500'>
                        <FaGithub className='w-6 h-6' />
                    </a>
                    <a href={x} target="_blank" rel="noopener noreferrer" className='hover:text-gray-500'>
                        <FaX className='w-6 h-6' />
                    </a>
                </div>
            </div>

            {/* GitHub Section */}
            <div className="github bg-black text-white rounded-xl p-4 w-full border border-gray-500 ">
                <GithubSection />
            </div>
        </div>
    )
}

export default Home
