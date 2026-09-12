import React, { useState } from 'react';
import { useJournal } from '../context/JournalContext';
import { Users, Mail, Globe, Award, ExternalLink } from 'lucide-react';

export const EditorialBoard = () => {
  const { editorialMembers } = useJournal();
  const [selectedRole, setSelectedRole] = useState('All');

  const activeMembers = editorialMembers.filter(m => m.is_active);

  const filteredMembers = selectedRole === 'All'
    ? activeMembers
    : activeMembers.filter(m => m.role === selectedRole);

  const editorInChief = activeMembers.filter(m => m.role === 'Editor-in-Chief');
  const associateEditors = activeMembers.filter(m => m.role === 'Associate Editor');
  const boardMembers = activeMembers.filter(m => m.role === 'Editorial Board Member');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>Academic Governance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif">Editorial Board</h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Distinguished international academic scholars and peer reviewers overseeing the scientific rigor, peer-review standards, and publication ethics of IJCAST.
        </p>
      </div>

      {/* Editor-in-Chief Section */}
      {editorInChief.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs uppercase font-bold text-amber-700 tracking-wider">Journal Leadership</span>
            <h2 className="text-2xl font-bold font-serif text-slate-900">Editor-in-Chief</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {editorInChief.map(mem => (
              <div key={mem.id} className="bg-white p-8 rounded-3xl border border-amber-200 shadow-md flex flex-col md:flex-row gap-8 items-start">
                <img
                  src={mem.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'}
                  alt={mem.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-amber-500 shadow-lg flex-shrink-0"
                />
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-xs">Editor-in-Chief</span>
                      <h3 className="text-2xl font-bold text-slate-900 font-serif mt-1">{mem.name}</h3>
                      <p className="text-sm font-semibold text-slate-700">{mem.designation}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600">
                    <strong>Institution:</strong> {mem.department ? `${mem.department}, ` : ''}{mem.institution}, {mem.country}
                  </p>

                  {mem.bio && <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">{mem.bio}</p>}

                  <div className="flex flex-wrap gap-4 text-xs pt-2">
                    {mem.email && (
                      <a href={`mailto:${mem.email}`} className="flex items-center space-x-1.5 text-amber-700 hover:underline font-medium">
                        <Mail className="w-4 h-4" />
                        <span>{mem.email}</span>
                      </a>
                    )}
                    {mem.orcid && (
                      <a href={`https://orcid.org/${mem.orcid}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 text-emerald-700 hover:underline font-medium font-mono">
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span>ORCID: {mem.orcid}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Associate Editors */}
      {associateEditors.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs uppercase font-bold text-amber-700 tracking-wider">Associate Leadership</span>
            <h2 className="text-2xl font-bold font-serif text-slate-900">Associate Editors</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {associateEditors.map(mem => (
              <div key={mem.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={mem.photo_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'}
                    alt={mem.name}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-amber-500 flex-shrink-0"
                  />
                  <div>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 font-semibold rounded text-[10px]">Associate Editor</span>
                    <h3 className="text-lg font-bold text-slate-900 font-serif">{mem.name}</h3>
                    <p className="text-xs font-medium text-slate-700">{mem.designation}</p>
                    <p className="text-xs text-slate-500">{mem.institution}, {mem.country}</p>
                  </div>
                </div>
                {mem.bio && <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{mem.bio}</p>}
                <div className="flex flex-wrap items-center justify-between text-xs pt-2 border-t border-slate-100">
                  {mem.email && <span className="text-slate-600 text-[11px] font-mono">{mem.email}</span>}
                  {mem.orcid && (
                    <a href={`https://orcid.org/${mem.orcid}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline text-[11px] font-mono">
                      ORCID: {mem.orcid}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Board Members */}
      {boardMembers.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs uppercase font-bold text-amber-700 tracking-wider">Editorial Advisory Board</span>
            <h2 className="text-2xl font-bold font-serif text-slate-900">Editorial Board Members</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {boardMembers.map(mem => (
              <div key={mem.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={mem.photo_url || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop'}
                    alt={mem.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-slate-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-serif">{mem.name}</h3>
                    <p className="text-xs text-slate-600">{mem.designation}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500">{mem.institution}, {mem.country}</p>
                {mem.bio && <p className="text-xs text-slate-600 line-clamp-2">{mem.bio}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
