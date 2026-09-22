import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useJournal } from '../../context/JournalContext';
import { BookOpen, Menu, X, Send, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { settings, setIsSubmitOpen } = useJournal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [authorsDropdownOpen, setAuthorsDropdownOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'About',
      path: '/about',
      hasDropdown: true,
      subItems: [
        { name: 'About IJCAST', path: '/about#about' },
        { name: 'Aims & Objectives', path: '/about#aims' },
        { name: 'Scope of the Journal', path: '/about#scope' },
        { name: 'Journal History', path: '/about#history' },
        { name: 'Publication Frequency', path: '/about#frequency' },
        { name: 'Open Access Policy', path: '/about#open-access' },
        { name: 'Publisher Information', path: '/about#publisher' },
      ]
    },
    { name: 'Editorial Board', path: '/editorial-board' },
    {
      name: 'For Authors',
      path: '/for-authors',
      hasDropdown: true,
      subItems: [
        { name: 'Author Guidelines', path: '/for-authors#guidelines' },
        { name: 'Manuscript Submission', path: '/for-authors#submission' },
        { name: 'Submission Process Workflow', path: '/for-authors#workflow' },
        { name: 'Publication Charges (APC)', path: '/apc' },
        { name: 'Publication Ethics', path: '/publication-ethics' },
      ]
    },
    { name: 'Current Issue', path: '/current-issue' },
    { name: 'Archives', path: '/archives' },
    { name: 'Theses', path: '/theses' },
    { name: 'Conferences', path: '/conferences' },
    { name: 'Research Areas', path: '/research-areas' },
    { name: 'Indexing', path: '/indexing' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      {/* Brand Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src="/ijcast-logo.png"
            alt="IJCAST Logo"
            className="w-12 h-12 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform border-2 border-amber-500/30"
          />
          <div>
            <h1 className="text-lg font-bold font-serif tracking-tight text-white group-hover:text-amber-400 transition-colors leading-snug">
              {settings.short_name || 'IJCAST'}
            </h1>
            <p className="text-[11px] text-slate-400 font-sans tracking-wide">
              {settings.journal_name}
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden xl:flex items-center space-x-1 text-xs font-medium">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <span>{item.name}</span>
                {item.hasDropdown && <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white" />}
              </NavLink>

              {/* Submenu Dropdown */}
              {item.hasDropdown && (
                <div className="absolute left-0 mt-1 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-2 hidden group-hover:block transition-all z-50">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className="block px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSubmitOpen(true)}
            className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Manuscript</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-2 text-sm">
          {navItems.map((item) => (
            <div key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
              >
                {item.name}
              </NavLink>
            </div>
          ))}
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSubmitOpen(true);
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-amber-600 text-white font-bold rounded-xl text-xs"
            >
              <Send className="w-4 h-4" />
              <span>Submit Manuscript</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
