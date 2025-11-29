import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaGithub } from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProjectDetail = () => {
    const { id } = useParams();

    // This would typically come from a data file or API
    // Using the same data structure as Projects.jsx for now
    const projectData = {
        "CuraNet": {
            title: "CuraNet – Unified Health Record System",
            tagline: "Centralized platform for lifetime patient medical records",
            description: "CuraNet solves the problem of fragmented medical history by providing a unified, patient-centric platform. It allows hospitals to upload records and patients to grant temporary, secure access to doctors via QR codes.",
            problem: "Patients often visit multiple hospitals, leading to scattered medical records. This results in doctors missing critical history, repetitive tests, and delayed diagnosis. Existing systems are often hospital-centric, not patient-centric.",
            solution: "I designed a centralized database architecture where the patient is the primary owner of their data. Using Role-Based Access Control (RBAC), hospitals can write data, but only read what they created unless granted access. Patients use a mobile-friendly dashboard to generate time-limited QR codes for doctors to view their full history.",
            features: [
                "Unified Patient Dashboard: View all records from any hospital in one timeline.",
                "QR Code Access: Grant temporary read access to doctors instantly.",
                "RBAC System: Strict separation of Hospital, Doctor, and Patient roles.",
                "Secure Storage: Encrypted medical records using industry standards."
            ],
            tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
            challenges: "Designing the permission system was complex. I had to ensure that a hospital could only edit their own records but a patient could see everything. I implemented a custom middleware in Express to handle these granular permissions.",
            github: "https://github.com/mukundjha-mj/CuraNet",
            live: "https://curanet-demo.vercel.app"
        },
        "secondBrain": {
            title: "Second Brain",
            tagline: "A personal knowledge management system",
            description: "A digital archive of my learnings, notes, and resources.",
            problem: "Information overload makes it hard to retain and retrieve key learnings.",
            solution: "Built a structured knowledge base with tagging and search capabilities.",
            features: [
                "Markdown Support: Write notes in markdown.",
                "Tagging System: Organize content by topics.",
                "Search: Fast full-text search."
            ],
            tech: ["React", "Node.js", "MongoDB"],
            challenges: "Implementing efficient search across a growing database of notes.",
            github: "https://github.com/mukundjha-mj/secondBrain",
            live: null
        },
        "Microservices-Uber-Backend": {
            title: "Uber Backend (Microservices)",
            tagline: "Scalable backend architecture for a ride-sharing app",
            description: "A simulation of Uber's backend using microservices architecture.",
            problem: "Monolithic architectures struggle to scale with high concurrent user demand in ride-sharing apps.",
            solution: "Decomposed the system into microservices (Auth, Ride, Driver, Notification) communicating via a message broker.",
            features: [
                "Microservices Architecture: Independent services for scalability.",
                "Real-time Updates: Socket.io for driver tracking.",
                "Load Balancing: Nginx for traffic distribution."
            ],
            tech: ["Node.js", "Express", "RabbitMQ", "Docker", "Redis"],
            challenges: "Managing distributed state and ensuring data consistency across services.",
            github: "https://github.com/mukundjha-mj/Microservices-Uber-Backend",
            live: null
        }
    };

    const project = projectData[id];

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
                    <Link to="/" className="text-blue-400 hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <FaArrowLeft /> Back to Portfolio
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>
                        <p className="text-xl text-gray-400">{project.tagline}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-12">
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2">
                                <FaExternalLinkAlt /> View Live
                            </a>
                        )}
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors flex items-center gap-2 border border-white/10">
                            <FaGithub /> View Code
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="md:col-span-2 space-y-10">
                            <section>
                                <h2 className="text-2xl font-bold mb-4 text-blue-400">The Problem</h2>
                                <p className="text-gray-300 leading-relaxed text-lg">{project.problem}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4 text-green-400">The Solution</h2>
                                <p className="text-gray-300 leading-relaxed text-lg">{project.solution}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4 text-purple-400">Key Features</h2>
                                <ul className="space-y-3">
                                    {project.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-300">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"></span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4 text-yellow-400">Challenges & Learnings</h2>
                                <p className="text-gray-300 leading-relaxed">{project.challenges}</p>
                            </section>
                        </div>

                        <div className="md:col-span-1">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-24">
                                <h3 className="text-lg font-bold mb-4">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-sm text-gray-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetail;
