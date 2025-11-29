import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('nav')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="w-full py-4 fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
            <div className="w-full mx-auto">
                {/* Mobile menu button */}
                <div className="flex justify-end md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop and Mobile Menu */}
                <div
                    className={`${isMenuOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-4 pointer-events-none'
                        } md:opacity-100 md:translate-y-0 md:pointer-events-auto transition-all duration-300 ease-in-out absolute md:relative top-full md:top-auto left-0 right-0 bg-black/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none`}
                >
                    <ul className="flex flex-col md:flex-row items-center justify-center gap-8 py-4 md:py-0 space-y-4 md:space-y-0 md:space-x-8">
                        <li>
                            <button
                                onClick={() => {
                                    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                                    setIsMenuOpen(false);
                                }}
                                className="text-white hover:text-gray-300 transition-colors duration-200 text-lg md:text-base cursor-pointer"
                            >
                                Home
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                    setIsMenuOpen(false);
                                }}
                                className="text-white hover:text-gray-300 transition-colors duration-200 text-lg md:text-base cursor-pointer"
                            >
                                Projects
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                                    setIsMenuOpen(false);
                                }}
                                className="text-white hover:text-gray-300 transition-colors duration-200 text-lg md:text-base cursor-pointer"
                            >
                                Skills
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                    setIsMenuOpen(false);
                                }}
                                className="text-white hover:text-gray-300 transition-colors duration-200 text-lg md:text-base cursor-pointer"
                            >
                                Contact
                            </button>
                        </li>
                        <li>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors text-lg md:text-base"
                            >
                                Resume
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
