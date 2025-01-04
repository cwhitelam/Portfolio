import { ReactNode } from 'react';

export interface ProjectCard {
    name: string;
    description: string;
    tech_stack: string[];
    tags: string[];
    live_demo?: string;
    github_url?: string;
    icon: ReactNode;
} 