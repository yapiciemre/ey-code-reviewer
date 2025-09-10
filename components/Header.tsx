import React from 'react';
import { EYLogoIcon } from './icons/EYLogoIcon';
import { GitHubIcon } from './icons/GitHubIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-surface border-b border-brand-border sticky top-0 z-10 backdrop-blur-sm bg-opacity-70">
      <div className="container mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <EYLogoIcon className="w-8 h-8 text-brand-primary" />
          <h1 className="text-xl md:text-2xl font-bold text-brand-text tracking-tight">
            EY Code Reviewer
          </h1>
        </div>
        <a 
            href="https://github.com/yapiciemre/ey-code-reviewer" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-brand-text-light hover:text-brand-text transition-colors duration-200"
            aria-label="Star on GitHub"
        >
            <GitHubIcon className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Star on GitHub</span>
        </a>
      </div>
    </header>
  );
};