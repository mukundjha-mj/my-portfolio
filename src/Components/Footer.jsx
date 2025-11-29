import React from 'react';
import { FaReact, FaNodeJs, FaGithub } from 'react-icons/fa6';
import { SiVite, SiTailwindcss, SiFramer } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-sm mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Mukund Jha</h3>
                        <p className="text-gray-400 max-w-sm">
                            Building digital experiences with a focus on performance, accessibility, and design.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Under the Hood</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Built with React 19 + Vite + Tailwind CSS 4
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                Animations via Framer Motion & GSAP
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                Deployed on GitHub Pages
                            </li>
                        </ul>

                        <div className="flex gap-4 mt-4 text-gray-500">
                            <FaReact size={20} title="React" className="hover:text-blue-400 transition-colors" />
                            <SiVite size={20} title="Vite" className="hover:text-yellow-400 transition-colors" />
                            <SiTailwindcss size={20} title="Tailwind CSS" className="hover:text-cyan-400 transition-colors" />
                            <SiFramer size={20} title="Framer Motion" className="hover:text-pink-500 transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Mukund Jha. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="https://github.com/mukundjha-mj/my-portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                            <FaGithub /> View Source
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
