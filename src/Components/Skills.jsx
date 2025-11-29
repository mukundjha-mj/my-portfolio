import React from 'react';
import { motion } from 'framer-motion';
import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDocker, FaPython
} from 'react-icons/fa6';
import { SiTailwindcss, SiMongodb, SiTypescript, SiNextdotjs, SiPostgresql, SiExpress } from 'react-icons/si';

const Skills = () => {
    const skills = [
        { name: 'React', icon: <FaReact />, color: '#61DAFB' },
        { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff' },
        { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
        { name: 'Express', icon: <SiExpress />, color: '#ffffff' },
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
        { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
        { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
        { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
        { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
        { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
        { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
        { name: 'Python', icon: <FaPython />, color: '#3776AB' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <div className="w-full py-12" id="skills">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Technical Skills</h2>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto"
            >
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl w-24 h-24 sm:w-28 sm:h-28 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <div className="text-3xl sm:text-4xl mb-2" style={{ color: skill.color }}>
                            {skill.icon}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-300">{skill.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Skills;
