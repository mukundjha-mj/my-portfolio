import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <ul>
                        <li className="navbar-item flex flex-row gap-15 items-center justify-center mb-5 text-md font-[400]">
                            <Link to="/" className="navbar-links">
                                Home
                            </Link>
                            <Link to="/experience" className="navbar-links">
                                Experience
                            </Link>
                            <Link to="/event" className="navbar-links">
                                Event
                            </Link>
                            <Link to="/blog" className="navbar-links">
                                Blog
                            </Link>
                            <Link to="/design" className="navbar-links">
                                Design
                            </Link>
                            <Link to="/contact" className="navbar-links">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
