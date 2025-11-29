import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaArrowRight } from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Manual data for rich descriptions and fallback
  const manualProjects = {
    "CuraNet": {
      title: "CuraNet – Unified Health Record System",
      description: "Centralized platform for lifetime patient medical records with role-based access for hospitals & patients.",
      tech: ["React", "Node.js", "MongoDB", "JWT", "RBAC"]
    },
    "secondBrain": {
      title: "Second Brain",
      description: "A personal knowledge management system to organize learnings, notes, and resources with markdown support.",
      tech: ["React", "Node.js", "MongoDB", "Markdown"]
    },
    "Microservices-Uber-Backend": {
      title: "Uber Backend (Microservices)",
      description: "Scalable backend architecture for a ride-sharing app using microservices, message queues, and real-time updates.",
      tech: ["Node.js", "Express", "RabbitMQ", "Docker", "Redis"]
    }
  };

  const repoNames = Object.keys(manualProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await Promise.all(
          repoNames.map(async (name) => {
            try {
              const res = await axios.get(`https://api.github.com/repos/mukundjha-mj/${name}`);
              return {
                ...res.data,
                // Merge manual data
                name: name, // Ensure name matches key
                title: manualProjects[name].title,
                description: manualProjects[name].description, // Prefer manual description
                manualTech: manualProjects[name].tech
              };
            } catch (err) {
              console.error(`Error fetching ${name}:`, err);
              // Fallback if API fails
              return {
                id: name,
                name: name,
                title: manualProjects[name].title,
                description: manualProjects[name].description,
                manualTech: manualProjects[name].tech,
                stargazers_count: 0,
                forks_count: 0,
                html_url: `https://github.com/mukundjha-mj/${name}`,
                homepage: null
              };
            }
          })
        );
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center">
        <div className="animate-pulse text-blue-400">Loading Projects...</div>
      </div>
    );
  }

  return (
    <div className="w-full py-20" id="projects">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Featured Projects</h2>
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
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors break-words">
                {project.title || project.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {/* Use manual tech stack if available, otherwise fallback to GitHub topics */}
                {(project.manualTech || (project.topics && project.topics.slice(0, 3)))?.map((t, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 pt-2 flex-grow flex flex-col gap-4">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</span>
                <p className="text-gray-300 text-sm mt-1 line-clamp-3">{project.description || "No description available."}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400 mt-auto">
                <span className="flex items-center gap-1"><span className="text-yellow-400">★</span> {project.stargazers_count}</span>
                <span className="flex items-center gap-1"><span className="text-blue-400">⑂</span> {project.forks_count}</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 pt-0 mt-auto flex gap-3">
              <Link
                to={`/projects/${project.name}`}
                className="flex-1 py-2 bg-white text-black font-semibold rounded text-center text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                View Details <FaArrowRight size={12} />
              </Link>
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 text-white rounded hover:bg-white/10 transition-colors border border-white/10"
                  title="View Live"
                >
                  <FaExternalLinkAlt size={16} />
                </a>
              )}
              <a
                href={project.html_url}
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
