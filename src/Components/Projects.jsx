import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaArrowRight } from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Projects = () => {
  // Manual "Case Studies" data
  const projects = [
    {
      id: "curanet",
      title: "CuraNet – Unified Health Record System",
      description: "Centralized platform for lifetime patient medical records with role-based access for hospitals & patients.",
      problem: "Patients struggle with fragmented medical records across multiple hospitals, leading to duplicate tests and lost history.",
      solution: "Built a centralized, secure platform where patients own their data and grant temporary access to doctors via QR codes.",
      impact: "Simplifies record sharing and reduces duplicate tests by ~40%.",
      tech: ["React", "Node.js", "MongoDB", "JWT", "RBAC"],
      github: "https://github.com/mukundjha-mj/CuraNet", // Placeholder
      live: "https://curanet-demo.vercel.app", // Placeholder
      featured: true
    },
    {
      id: "jarvis-lite",
      title: "Jarvis Lite – Voice Assistant",
      description: "An AI-powered voice assistant that executes system commands and answers queries using LLMs.",
      problem: "Desktop automation tools are often complex or lack natural language understanding.",
      solution: "Integrated speech-to-text with a local LLM to interpret natural language commands and execute Python scripts.",
      impact: "Automates daily tasks like opening apps, searching web, and summarizing emails.",
      tech: ["Python", "OpenAI API", "SpeechRecognition", "PyAutoGUI"],
      github: "https://github.com/mukundjha-mj/Jarvis-Lite", // Placeholder
      live: null,
      featured: true
    },
    {
      id: "question-gen",
      title: "AI Question Paper Generator",
      description: "Automated tool for teachers to generate balanced question papers from syllabus text.",
      problem: "Creating balanced question papers manually is time-consuming and prone to bias.",
      solution: "Developed an NLP pipeline to extract key concepts and generate questions of varying difficulty levels.",
      impact: "Reduces paper setting time by 90% for teachers.",
      tech: ["React", "Flask", "NLTK", "PDFKit"],
      github: "https://github.com/mukundjha-mj/QuestionGen", // Placeholder
      live: null,
      featured: true
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
    <div className="w-full py-20" id="projects">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Featured Case Studies</h2>
        <p className="text-gray-400 max-w-2xl text-center">
          Selected projects that demonstrate my ability to solve real-world problems.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={item}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full group"
          >
            {/* Card Header */}
            <div className="p-6 pb-0">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 3).map((t, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 pt-2 flex-grow flex flex-col gap-4">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Problem</span>
                <p className="text-gray-300 text-sm mt-1 line-clamp-2">{project.problem}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Solution</span>
                <p className="text-gray-300 text-sm mt-1 line-clamp-2">{project.solution}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Impact</span>
                <p className="text-green-400 text-sm mt-1">{project.impact}</p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 pt-0 mt-auto flex gap-3">
              <Link
                to={`/projects/${project.id}`}
                className="flex-1 py-2 bg-white text-black font-semibold rounded text-center text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                View Case Study <FaArrowRight size={12} />
              </Link>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 text-white rounded hover:bg-white/10 transition-colors border border-white/10"
                  title="View Live"
                >
                  <FaExternalLinkAlt size={16} />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 text-white rounded hover:bg-white/10 transition-colors border border-white/10"
                title="View Code"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
