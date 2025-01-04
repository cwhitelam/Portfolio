import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Contact from './pages/Contact';
import Resume from './pages/Resume';

interface Project {
    id: number;
    title: string;
    description: string;
    projectUrl: string;
}

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

const BuyMeCoffeeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
    </svg>
);

const App: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:5080/api/projects');
            const data = await response.json();
            setProjects(data.length > 0 ? data : placeholderProjects);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setProjects(placeholderProjects);
        }
    };

    const placeholderProjects: Project[] = [
        { id: 1, title: "Portfolio Website", description: "My first major React project - this website! Built with React, TypeScript, and Tailwind CSS", projectUrl: "#" },
        { id: 2, title: "Learning Journey", description: "Currently learning full-stack development through hands-on projects and courses", projectUrl: "#" },
        { id: 3, title: "Open to Collaborate", description: "Interested in contributing to open source projects and learning from other developers", projectUrl: "#" },
    ];

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const cardVariants = {
        initial: { opacity: 0.5, scale: 0.8 },
        animate: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 45, stiffness: 260 } },
        hover: { scale: 1.05, transition: { duration: 0.3 } }
    };

    return (
        <Router>
            <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'} font-sans`}>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home projects={projects} darkMode={darkMode} cardVariants={cardVariants} toggleDarkMode={toggleDarkMode} />} />
                        <Route path="/resume" element={<Resume darkMode={darkMode} />} />
                        <Route path="/contact" element={<Contact darkMode={darkMode} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

const Header: React.FC<{ darkMode: boolean; toggleDarkMode: () => void }> = ({ darkMode, toggleDarkMode }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <header className={`fixed w-full ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'} bg-opacity-90 z-10`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="flex justify-center items-center relative">
                    <div className="flex space-x-4 justify-center">
                        <Link to="/" className="hover:text-accent-yellow transition-colors px-2 sm:px-6 text-sm sm:text-base font-bold">Home</Link>
                        <Link to="/resume" className="hover:text-accent-yellow transition-colors px-2 sm:px-6 text-sm sm:text-base font-bold">Resume</Link>
                        <Link to="/contact" className="hover:text-accent-yellow transition-colors px-2 sm:px-6 text-sm sm:text-base font-bold">Contact</Link>
                    </div>
                    {!isHomePage && (
                        <button
                            onClick={toggleDarkMode}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-accent-yellow hover:text-opacity-80 transition-colors"
                        >
                            {darkMode ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
};

const Home: React.FC<{ projects: Project[], darkMode: boolean, cardVariants: any, toggleDarkMode: () => void }> = ({ projects, darkMode, cardVariants, toggleDarkMode }) => {
    useEffect(() => {
        // Load Buy Me a Coffee widget script
        const script = document.createElement('script');
        script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
        script.setAttribute('data-name', 'BMC-Widget');
        script.setAttribute('data-cfasync', 'false');
        script.setAttribute('data-id', 'chrisdoubleu');
        script.setAttribute('data-description', 'Support me on Buy me a coffee!');
        script.setAttribute('data-message', '');
        script.setAttribute('data-color', '#FF813F');
        script.setAttribute('data-position', 'Right');
        script.setAttribute('data-x_margin', '18');
        script.setAttribute('data-y_margin', '18');
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <main className="pt-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Introduction Card */}
                <motion.div
                    className={`${darkMode ? 'bg-dark-card' : 'bg-light-card'} rounded-3xl p-6 col-span-1 sm:col-span-2 lg:row-span-2 flex flex-col justify-between`}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                >
                    <div>
                        <div className="flex items-center mb-6">
                            <img
                                src="/logo.jpeg"
                                alt="CW Logo"
                                className="w-24 h-24 rounded-full mr-6 border-4 border-accent-yellow object-cover"
                            />
                            <div>
                                <h1 className="text-2xl sm:text-4xl font-bold mb-2">Christopher Whitelam</h1>
                                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-base sm:text-xl`}>Software Engineer</p>
                            </div>
                        </div>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 text-sm sm:text-base`}>
                            Practicing full-stack development with a focus on .NET and React ecosystems.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Current Focus</h2>
                        <ul className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-2 text-sm sm:text-base`}>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Mastering microservices architecture
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Exploring AI integration in web apps
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Contributing to open-source projects
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Tech Stack Card */}
                <motion.div
                    className={`${darkMode ? 'bg-dark-card' : 'bg-light-card'} rounded-3xl p-6 col-span-1 sm:col-span-2`}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                >
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-accent-yellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                        Technologies
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className={`${darkMode ? 'bg-dark-bg' : 'bg-light-bg'} rounded-xl p-3`}>
                            <h3 className="text-md font-semibold mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-accent-yellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                                Backend
                            </h3>
                            <ul className="space-y-1 text-sm sm:text-base">
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-1.5"></span>
                                    ASP.NET Core
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-1.5"></span>
                                    Entity Framework Core
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-1.5"></span>
                                    C#
                                </li>
                            </ul>
                        </div>
                        <div className={`${darkMode ? 'bg-dark-bg' : 'bg-light-bg'} rounded-xl p-3`}>
                            <h3 className="text-md font-semibold mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-accent-yellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                                Frontend
                            </h3>
                            <ul className="space-y-1 text-sm sm:text-base">
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-1.5"></span>
                                    React
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-1.5"></span>
                                    TypeScript
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-accent-yellow rounded-full mr-1.5"></span>
                                    Tailwind CSS
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Resume Card */}
                <Link to="/resume">
                    <motion.div
                        className={`${darkMode ? 'bg-dark-card' : 'bg-light-card'} rounded-3xl p-6 col-span-1 h-48 lg:h-54 flex flex-col justify-center items-center cursor-pointer`}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <svg className="w-12 h-12 mb-4 text-accent-yellow" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                        <span className="text-lg font-semibold">See my resume</span>
                    </motion.div>
                </Link>

                {/* Dark Mode Toggle Card */}
                <motion.div
                    className={`${darkMode ? 'bg-dark-card' : 'bg-light-card'} rounded-3xl p-6 col-span-1 h-48 lg:h-auto lg:row-span-2 flex flex-col justify-center items-center cursor-pointer`}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    onClick={toggleDarkMode}
                >
                    {darkMode ? (
                        <svg className="w-20 h-20 mb-4 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        <svg className="w-20 h-20 mb-4 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </motion.div>

                {/* GitHub Card */}
                <motion.a
                    href="https://github.com/cwhitelam"
                    className={`${darkMode ? 'bg-dark-card' : 'bg-light-card'} rounded-3xl p-6 col-span-1 h-64 flex justify-center items-center cursor-pointer`}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                >
                    <svg className="w-24 h-24 text-accent-yellow" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                </motion.a>

                {projects[0] && <ProjectCard project={projects[0]} darkMode={darkMode} cardVariants={cardVariants} />}

                <motion.a
                    href="https://www.linkedin.com/in/christopher-whitelam-0583371a0/"
                    className={`${darkMode ? 'bg-dark-card' : 'bg-light-card'} rounded-3xl p-6 col-span-1 h-64 flex justify-center items-center cursor-pointer`}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                >
                    <svg className="w-24 h-24 text-accent-yellow" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </motion.a>

                {projects[1] && <ProjectCard project={projects[1]} darkMode={darkMode} cardVariants={cardVariants} />}

                {/* Buy Me a Coffee Card */}
                <motion.div
                    className={`${darkMode ? 'bg-dark-card' : 'bg-light-card'} rounded-3xl p-6 col-span-1 h-64 flex flex-col justify-center items-center cursor-pointer overflow-hidden`}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    onClick={() => window.open('https://www.buymeacoffee.com/chrisdoubleu', '_blank')}
                >
                    <div className="w-3/4 h-3/4 relative">
                        <iframe
                            src="https://giphy.com/embed/TDQOtnWgsBx99cNoyH"
                            width="100%"
                            height="100%"
                            style={{ position: 'absolute', pointerEvents: 'none' }}
                            frameBorder="0"
                            className="giphy-embed"
                            allowFullScreen
                        ></iframe>
                    </div>
                </motion.div>

                {/* Contact Me Card */}
                <Link to="/contact">
                    <motion.div
                        className={`${darkMode ? 'bg-dark-card' : 'bg-light-card'} rounded-3xl p-6 col-span-1 h-64 flex flex-col justify-center items-start cursor-pointer`}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <span className="text-4xl lg:text-6xl font-bold leading-none">Contact</span>
                        <span className="text-2xl lg:text-4xl font-bold">Me</span>
                    </motion.div>
                </Link>

                {projects.slice(2).map((project) => (
                    <ProjectCard key={project.id} project={project} darkMode={darkMode} cardVariants={cardVariants} />
                ))}
            </div>
        </main>
    );
};

const ProjectCard: React.FC<{ project: Project; darkMode: boolean; cardVariants: any }> = ({ project, darkMode, cardVariants }) => (
    <motion.div
        className={`${darkMode ? 'bg-dark-card' : 'bg-light-card'} rounded-3xl p-6 col-span-1 h-64 flex flex-col justify-between`}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
    >
        <div>
            <h3 className="text-lg font-semibold mb-3">{project.title}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-3 line-clamp-3`}>{project.description}</p>
        </div>
        <a
            href={project.projectUrl}
            className="text-accent-yellow hover:underline flex items-center justify-end mt-3 text-sm"
        >
            View Project
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:rotate-45" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </a>
    </motion.div>
);

export default App;
