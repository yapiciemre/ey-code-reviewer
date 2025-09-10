import React from 'react';

const SkeletonCard: React.FC = () => (
  <div className="bg-brand-surface border border-brand-border rounded-lg overflow-hidden">
    <div className="flex items-center gap-3 p-4 border-b border-brand-border bg-gray-900/50">
      <div className="w-6 h-6 rounded-full bg-brand-border"></div>
      <div className="w-2/5 h-5 rounded bg-brand-border"></div>
    </div>
    <div className="p-4 space-y-3">
      <div className="w-full h-4 rounded bg-brand-border"></div>
      <div className="w-5/6 h-4 rounded bg-brand-border"></div>
      <div className="w-3/4 h-4 rounded bg-brand-border"></div>
    </div>
  </div>
);

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="bg-blue-900/10 border border-blue-500/30 rounded-lg overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-brand-border bg-blue-900/10">
          <div className="w-6 h-6 rounded-full bg-blue-500/30"></div>
          <div className="w-2/5 h-5 rounded bg-blue-500/30"></div>
        </div>
        <div className="p-4 space-y-3">
          <div className="w-full h-4 rounded bg-blue-500/30"></div>
          <div className="w-5/6 h-4 rounded bg-blue-500/30"></div>
        </div>
      </div>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};