import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import type { Issue } from '../types';

const CodeBlock: React.FC<{
  node: any;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ node, inline, className, children, ...props }) => {
  const [isCopied, setIsCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return !inline && match ? (
    <div className="relative my-4 rounded-md bg-[#1e1e1e]">
       <div className="flex items-center justify-between px-4 py-2 border-b border-brand-border">
          <span className="text-xs text-gray-400 font-sans">{match[1]}</span>
          <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
              aria-label="Copy code to clipboard"
          >
              {isCopied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
              {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
        customStyle={{ margin: 0, background: 'transparent', padding: '1rem' }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className="bg-brand-border text-sm rounded-md px-1.5 py-0.5 font-mono text-amber-300" {...props}>
      {children}
    </code>
  );
};


interface ReviewCardProps {
  title?: string;
  content?: string;
  isSummary?: boolean;
  issue?: Issue;
}

const severityStyles = {
    Critical: 'bg-red-900/50 text-red-300 border-red-500/30',
    Medium: 'bg-yellow-900/50 text-yellow-300 border-yellow-500/30',
    Low: 'bg-sky-900/50 text-sky-300 border-sky-500/30',
    Info: 'bg-gray-800/50 text-gray-300 border-gray-500/30',
};

export const ReviewCard: React.FC<ReviewCardProps> = ({ title, content, isSummary = false, issue }) => {
  if (isSummary) {
    return (
        <div className="bg-gradient-to-br from-blue-900/20 to-gray-900/10 border border-blue-500/30 rounded-lg overflow-hidden">
          <div className="p-4 prose prose-invert max-w-none text-brand-text-light">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: CodeBlock }}>
              {content || ''}
            </ReactMarkdown>
          </div>
        </div>
    );
  }

  if (issue) {
    const { severity, category, description } = issue;
    return (
        <div className={`${severityStyles[severity]} border rounded-lg overflow-hidden`}>
          <div className="flex items-center justify-between gap-3 p-3 border-b border-brand-border bg-black/10">
            <h4 className="font-semibold text-brand-text">{category}</h4>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${severityStyles[severity]}`}>{severity}</span>
          </div>
          <div className="p-3 prose prose-invert max-w-none text-brand-text-light text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: CodeBlock }}>
              {description}
            </ReactMarkdown>
          </div>
        </div>
    );
  }

  return null;
};
