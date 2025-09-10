import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import type { SuperStructuredReview, Issue, Complexity, TodoItem } from '../types';
import { ReviewCard } from './ReviewCard';
import { SkeletonLoader } from './SkeletonLoader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';


interface ReviewOutputProps {
  review: SuperStructuredReview | null;
  isLoading: boolean;
  error: string | null;
}

type Tab = 'analysis' | 'refactored' | 'diff' | 'tests' | 'todo';

const CodeDisplay: React.FC<{ code: string; language: string; }> = ({ code, language }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };
    
    if (!code || code.trim().toLowerCase() === 'n/a') {
        return <p className="text-brand-text-light italic">No content available for this section.</p>;
    }

    return (
        <div className="relative my-4 rounded-md bg-[#1e1e1e]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-brand-border">
                <span className="text-xs text-gray-400 font-sans">{language}</span>
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
                language={language}
                PreTag="div"
                customStyle={{ margin: 0, background: 'transparent', padding: '1rem' }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

const TabButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-t-md focus:outline-none transition-colors duration-200 ${
      isActive
        ? 'bg-brand-surface text-brand-primary border-b-2 border-brand-primary'
        : 'text-brand-secondary hover:text-brand-text'
    }`}
  >
    {label}
  </button>
);


export const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState<Tab>('analysis');

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonLoader />;
    }
    if (error) {
      return (
        <div className="text-center text-red-400 bg-red-900/20 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
          <p>{error}</p>
        </div>
      );
    }
    if (!review) {
      return (
        <div className="text-center text-brand-text-light flex flex-col items-center justify-center h-full p-10">
          <SparklesIcon className="w-16 h-16 mb-4 text-brand-secondary" />
          <h3 className="text-xl font-semibold text-brand-text">Ready for Review</h3>
          <p className="mt-2 max-w-sm">
            Paste your code to get a comprehensive, AI-powered analysis, including refactoring, tests, and more.
          </p>
        </div>
      );
    }

    const lang = review.refactoredCode.match(/```(\w+)/)?.[1] || 'plaintext';

    return (
      <div className="flex flex-col h-full">
         <div className="border-b border-brand-border flex-shrink-0">
            <nav className="flex space-x-2" aria-label="Tabs">
                <TabButton label="Analysis" isActive={activeTab === 'analysis'} onClick={() => setActiveTab('analysis')} />
                <TabButton label="Refactored Code" isActive={activeTab === 'refactored'} onClick={() => setActiveTab('refactored')} />
                <TabButton label="Minimal Diff" isActive={activeTab === 'diff'} onClick={() => setActiveTab('diff')} />
                <TabButton label="Tests" isActive={activeTab === 'tests'} onClick={() => setActiveTab('tests')} />
                <TabButton label="TODO" isActive={activeTab === 'todo'} onClick={() => setActiveTab('todo')} />
            </nav>
        </div>
        <div className="p-6 flex-grow overflow-y-auto">
            {activeTab === 'analysis' && (
                <div className="space-y-6">
                    <ReviewCard title="Overall Summary" content={review.summary} isSummary={true} />
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-brand-text border-b border-brand-border pb-2">Identified Issues</h3>
                        {review.issues.length > 0 ? review.issues.map((issue, index) => <ReviewCard key={index} issue={issue} />) : <p className="text-brand-text-light italic">No specific issues found. Great job!</p>}
                    </div>
                     <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-brand-text border-b border-brand-border pb-2">Complexity Analysis</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-brand-text-light">
                                <thead className="text-xs text-brand-text uppercase bg-gray-900/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 rounded-l-lg">Operation</th>
                                        <th scope="col" className="px-6 py-3 rounded-r-lg">Complexity (Big-O)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {review.complexityAnalysis.map((item, index) => (
                                        <tr key={index} className="bg-brand-surface border-b border-brand-border last:border-b-0">
                                            <td className="px-6 py-4 font-mono">{item.operation}</td>
                                            <td className="px-6 py-4 font-mono">{item.complexity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'refactored' && <CodeDisplay code={review.refactoredCode.replace(/```(?:\w+)?\n/g, '').replace(/```\n?$/, '')} language={lang} />}
            {activeTab === 'diff' && <CodeDisplay code={review.minimalDiff.replace(/```diff\n/g, '').replace(/```\n?$/, '')} language="diff" />}
            {activeTab === 'tests' && <CodeDisplay code={review['suggested-tests'].replace(/```(?:\w+)?\n/g, '').replace(/```\n?$/, '')} language={lang} />}
            {activeTab === 'todo' && (
                 <div className="space-y-3">
                    {review.todoList.map((item, index) => {
                         const priorityColor = { High: 'bg-red-500', Medium: 'bg-yellow-500', Low: 'bg-green-500' }[item.priority];
                         return (
                            <div key={index} className="flex items-start gap-3 bg-brand-surface p-3 rounded-md border border-brand-border">
                                <span className={`w-2.5 h-2.5 mt-1.5 rounded-full ${priorityColor} flex-shrink-0`}></span>
                                <div>
                                    <p className="text-brand-text">{item.task}</p>
                                    <span className="text-xs text-brand-text-light">{item.priority} Priority</span>
                                </div>
                            </div>
                         )
                    })}
                 </div>
            )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-brand-surface rounded-lg border border-brand-border h-full flex flex-col">
      <div className="p-3 border-b border-brand-border bg-gray-900/50 rounded-t-lg">
        <h2 className="text-lg font-semibold text-brand-text">AI Review Panel</h2>
      </div>
       <div className="flex-grow overflow-y-auto min-h-[400px] lg:min-h-[calc(60vh+80px)]">
            {renderContent()}
       </div>
    </div>
  );
};