import React from 'react';
import { ProjectCard } from '../../types/ProjectTypes';
import { Timer, Trophy } from 'lucide-react';

export const liveScoreProject: ProjectCard = {
    name: "Live Score",
    description: "A React-powered vertical scoreboard that streams real-time sports data. Built with TypeScript for reliability, featuring live NFL stats, dynamic updates, and a responsive design optimized for large displays in social venues.",
    tech_stack: ["React", "TypeScript", "TailwindCSS"],
    tags: ["Sports", "API", "Signage", "Streaming"],
    live_demo: "https://www.serene-melomakarona-8847ea.netlify.app/",
    github_url: "https://www.github.com/cwhitelam/live-scores",
    icon: <Trophy size={32} className="text-accent-yellow" />
}; 