import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCode } from 'react-icons/fa6';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/mukundjha-mj/repos?sort=updated&per_page=6');
        // Filter out forks if desired, or keep them. For now keeping all.
        // Sorting by stars or updated date could be good.
        const sortedProjects = response.data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setProjects(sortedProjects);
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

  return (
    <div className="w-full py-12" id="projects">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Featured Projects</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={item}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 flex flex-col h-full group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors">
                  <FaCode size={20} />
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar />
                  <span className="text-sm font-medium">{project.stargazers_count}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>
              
              <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                {project.description || "No description available for this project."}
              </p>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/5">
                  {project.language || "Code"}
                </span>
                
                <a 
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white hover:text-blue-400 transition-colors"
                >
                  <FaGithub />
                  <span>View Code</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
