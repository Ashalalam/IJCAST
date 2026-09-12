import React from 'react';
import { GraduationCap } from 'lucide-react';

export function Theses() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-semibold uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Research Repository</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif">PhD & M.Tech Theses</h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Repository of doctoral and post-graduate research theses submitted and indexed by IJCAST.
        </p>
      </div>
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
        <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="font-medium text-slate-700">No theses available yet.</p>
        <p className="text-slate-400 mt-1">Check back soon or contact the editorial office.</p>
      </div>
    </div>
  );
}
