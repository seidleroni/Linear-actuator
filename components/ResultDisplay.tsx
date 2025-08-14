
import React from 'react';

interface ResultDisplayProps {
  time: number;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ time }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-2xl shadow-cyan-500/10 text-center">
      <h3 className="text-slate-400 text-lg font-semibold uppercase tracking-wider">
        Total Travel Time
      </h3>
      <p className="text-5xl lg:text-6xl font-bold font-mono text-cyan-400 mt-2">
        {time.toFixed(3)}
        <span className="text-3xl text-slate-300 ml-2">s</span>
      </p>
    </div>
  );
};
