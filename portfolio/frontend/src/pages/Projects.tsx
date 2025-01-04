import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '../types/ProjectTypes';
import { liveScoreProject } from '../Components/projects/LiveScoreProject';
import { fxtcherProject } from '../Components/projects/FxtcherProject';
import { Eye, ExternalLink, Github, Hash, X } from 'lucide-react';

interface ProjectsProps {
    darkMode: boolean;
}

// Array of all projects
const projects: ProjectCard[] = [
    liveScoreProject,
    fxtcherProject,
    // Add more projects here
];

const ProjectCardComponent: React.FC<{ project: ProjectCard; darkMode: boolean; variants: any }> = ({ project, darkMode, variants }) => {
    const [showPreview, setShowPreview] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseLeave = () => {
        setShowPreview(false);
    };

    return (
        <motion.div
            ref={cardRef}
            variants={variants}
            whileHover="hover"
            className={`${darkMode ? 'bg-dark-card' : 'bg-light-card'} rounded-3xl p-8 shadow-lg min-h-[400px] flex flex-col relative overflow-hidden`}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                animate={{
                    y: showPreview ? '-100%' : '0%',
                    opacity: showPreview ? 0 : 1
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="h-full flex flex-col"
            >
                {/* Header Section */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                        <span className="text-accent-yellow mr-4">
                            {project.icon}
                        </span>
                        <h2 className="text-2xl font-bold">{project.name}</h2>
                    </div>
                    <div className="flex gap-4">
                        {project.live_demo && (
                            <button
                                className="text-accent-yellow hover:text-accent-yellow/80 transition-colors"
                                onClick={() => setShowPreview(true)}
                                title="Preview Project"
                            >
                                <Eye size={24} />
                            </button>
                        )}
                        {project.live_demo && (
                            <a
                                href={project.live_demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent-yellow hover:text-accent-yellow/80 transition-colors"
                                title="View Live Demo"
                            >
                                <ExternalLink size={24} />
                            </a>
                        )}
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent-yellow hover:text-accent-yellow/80 transition-colors"
                                title="View Source Code"
                            >
                                <Github size={24} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Tags Section */}
                <div className="flex flex-wrap gap-4 mb-6">
                    {project.tags.map((tag, index) => (
                        <div
                            key={index}
                            className="flex items-center text-accent-yellow/90"
                        >
                            <Hash size={14} />
                            <span className="ml-1 text-sm">{tag}</span>
                            {index < project.tags.length - 1 && (
                                <span className="ml-4 text-accent-yellow/20">|</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Description Section */}
                <div className="flex-grow">
                    <p className="text-lg leading-relaxed">{project.description}</p>
                </div>

                {/* Footer Section */}
                <div className="mt-6 pt-6 border-t border-accent-yellow/10">
                    <h3 className="text-sm font-semibold mb-3 text-accent-yellow">BUILT WITH</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.tech_stack.map((tech, index) => (
                            <span
                                key={index}
                                className={`px-3 py-1.5 text-sm ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'
                                    }`}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Preview Section */}
            <motion.div
                className="absolute inset-0 bg-white rounded-3xl overflow-hidden"
                initial={{ y: '100%' }}
                animate={{
                    y: showPreview ? '0%' : '100%'
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {showPreview && (
                    <>
                        <iframe
                            src={project.live_demo}
                            className="w-full h-full border-0"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                width: '100%',
                                height: '100%',
                            }}
                        />
                        <button
                            onClick={() => setShowPreview(false)}
                            className="absolute top-4 right-4 text-accent-yellow hover:text-accent-yellow/80 transition-colors z-10 bg-white rounded-full p-1 shadow-lg"
                            title="Close Preview"
                        >
                            <X size={24} />
                        </button>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

const Projects: React.FC<ProjectsProps> = ({ darkMode }) => {
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20 }
    };

    const cardVariants = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        hover: { scale: 1.02, transition: { duration: 0.2 } }
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <ProjectCardComponent
                        key={index}
                        project={project}
                        darkMode={darkMode}
                        variants={cardVariants}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default Projects; 