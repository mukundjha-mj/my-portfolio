import React from 'react';
import { motion } from 'framer-motion';
import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDocker, FaPython
} from 'react-icons/fa6';
import { SiTailwindcss, SiMongodb, SiTypescript, SiNextdotjs, SiPostgresql, SiExpress } from 'react-icons/si';

const Skills = () => {
    const categories = [
        {
            title: "Frontend",
            skills: [
                { name: 'React', icon: <FaReact />, color: '#61DAFB' },
                { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff' },
                { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
                { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
            ]
        },
        {
            title: "Backend",
            skills: [
                { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
                { name: 'Express', icon: <SiExpress />, color: '#ffffff' },
                { name: 'Python', icon: <FaPython />, color: '#3776AB' },
                { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
                { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
            ]
        },
        {
            title: "Tools & DevOps",
            skills: [
                { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
                { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
            ]
        }
    ];

    const experiences = [
        {
            role: "Full Stack Developer (Personal & Academic)",
            items: [
                "Built & maintained 5+ MERN/React apps for personal + academic projects",
                "Implemented authentication, role-based access and secure APIs",
                "Collaborated with peers in college projects using Git & GitHub",
                "Deployed apps to production (Vercel / Netlify / Render)"
            ]
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full py-20" id="skills">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Skills Column */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Technical Skills</h2>
                    <div className="space-y-8">
                        {categories.map((category, idx) => (
                            <div key={idx}>
                                <h3 className="text-xl font-semibold mb-4 text-gray-300 border-b border-gray-700 pb-2 inline-block">
                                    {category.title}
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {category.skills.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                                        >
                                            <span className="text-xl" style={{ color: skill.color }}>{skill.icon}</span>
                                            <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience Column */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Experience Highlights</h2>
                    <div className="space-y-8">
                        {experiences.map((exp, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/10 rounded-xl p-6"
                            >
                                <h3 className="text-xl font-bold text-white mb-4">{exp.role}</h3>
                                <ul className="space-y-3">
                                    {exp.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}

                        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-blue-300 mb-2">Currently Learning</h3>
                            <p className="text-gray-300">
                                Deepening knowledge in <span className="text-white font-medium">System Design</span> and exploring <span className="text-white font-medium">AI Agent workflows</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
