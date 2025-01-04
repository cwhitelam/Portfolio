import React from 'react';
import { ProjectCard } from '../../types/ProjectTypes';
import { Download } from 'lucide-react';

export const fxtcherProject: ProjectCard = {
    name: "FXTCHER",
    description: "A modern microservices application for downloading Twitter/X videos. Built with React and Flask, featuring Docker containerization for seamless deployment.",
    tech_stack: ["React", "Flask", "Docker", "TypeScript", "Python"],
    tags: ["Download", "API", "Microservices", "Docker"],
    live_demo: "https://www.fxtcher.com",
    github_url: "https://www.github.com/cwhitelam/fxtcher",
    icon: <Download size={32} className="text-accent-yellow" />
}; 