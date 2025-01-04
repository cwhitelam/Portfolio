import React from 'react';
import './Resume.css';
import { motion } from 'framer-motion';

const Resume: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
    const handlePrint = () => {
        window.print();
    };

    const pageVariants = {
        initial: { opacity: 0.5, scale: 0.8 },
        animate: { 
            opacity: 1, 
            scale: 1, 
            transition: { 
                type: 'spring',  
                damping: 45,
                stiffness: 260
            } 
        }
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            className={`pt-20 min-h-screen ${darkMode ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`max-w-5xl mx-auto ${darkMode ? 'bg-dark-card' : 'bg-light-card'} rounded-[24px] shadow-lg overflow-hidden relative`}>
                    {/* Print Button */}
                    <div className="print:hidden absolute top-4 right-4">
                        <button
                            onClick={handlePrint}
                            className="text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                        </button>
                    </div>

                    {/* Header */}
                    <div className="pt-8 px-8 flex flex-col items-center text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Christopher Whitelam</h1>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg sm:text-xl`}>Software Engineer</p>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Contact Info */}
                        <div className="mb-8 flex flex-col sm:flex-row justify-between">
                            <div className="mb-4 sm:mb-0">
                                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg sm:text-xl flex items-center`}>
                                    <span>Vineland, NJ</span>
                                    <span className={`mx-2 inline-block w-1 h-1 ${darkMode ? 'bg-gray-400' : 'bg-gray-600'} rounded-full`}></span>
                                    <span>cwhitelam70@gmail.com</span>
                                </p>
                            </div>
                            <div className="flex space-x-4 print:hidden">
                                <a href="https://www.linkedin.com/in/christopher-whitelam-0583371a0/" className="text-accent-yellow hover:text-opacity-80">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </a>
                                <a href="https://github.com/cwhitelam" className="text-accent-yellow hover:text-opacity-80">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                </a>
                                <a href="https://x.com/chrisdoubleu042" className="text-accent-yellow hover:text-opacity-80">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Summary */}
                        <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-accent-yellow">Summary</h2>
                            <p className="text-base sm:text-lg">Software Engineer practicing full-stack development with a focus on the .NET Framework and currently learning React ecosystems. Creating solutions to complex problems. Continuously seeking opportunities to expand skill set and contribute to all projects.</p>
                        </section>

                        {/* Experience */}
                        <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-accent-yellow">Experience</h2>
                            <div className="mb-6">
                                <h3 className="text-lg sm:text-xl font-semibold">Software Engineer @ Northeast Precast</h3>
                                <p className="text-base sm:text-lg mb-2">2022 - Present</p>
                                <ul className="list-disc list-inside text-base sm:text-lg">
                                    <li>Developing and maintaining software solutions for enterprise-level applications.</li>
                                    <li>Implementing new features and optimizing existing codebase for improved performance.</li>
                                    <li>Collaborating with teams to deliver high-quality software products to users through-out the company.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Skills */}
                        <section className="mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-accent-yellow">Skills</h2>
                            <div className="flex flex-wrap gap-4">
                                <span className="bg-accent-yellow font-bold text-dark-bg px-3 py-1 rounded-full text-sm sm:text-lg">ASP.NET Core</span>
                                <span className="bg-accent-yellow font-bold text-dark-bg px-3 py-1 rounded-full text-sm sm:text-lg">Blazor</span>
                                <span className="bg-accent-yellow font-bold text-dark-bg px-3 py-1 rounded-full text-sm sm:text-lg">React</span>
                                <span className="bg-accent-yellow font-bold text-dark-bg px-3 py-1 rounded-full text-sm sm:text-lg">C#</span>
                                <span className="bg-accent-yellow font-bold text-dark-bg px-3 py-1 rounded-full text-sm sm:text-lg">SQL</span>
                                <span className="bg-accent-yellow font-bold text-dark-bg px-3 py-1 rounded-full text-sm sm:text-lg">Git</span>
                                <span className="bg-accent-yellow font-bold text-dark-bg px-3 py-1 rounded-full text-sm sm:text-lg">Python</span>
                                <span className="bg-accent-yellow font-bold text-dark-bg px-3 py-1 rounded-full text-sm sm:text-lg">RESTful APIs</span>
                            </div>
                        </section>

                        {/* Interests */}
                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-accent-yellow">Interests</h2>
                            <ul className="list-disc list-inside text-base sm:text-lg">
                                <li>Microservices architecture</li>
                                <li>AI integration in web apps</li>
                                <li>Open-source contributions</li>
                                <li>Cloud computing</li>
                                <li>Machine learning</li>
                                <li>Robotics</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Resume;
