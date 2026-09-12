import React from 'react';
import { useJournal } from '../../context/JournalContext';
import {
  LayoutDashboard,
  FolderTree,
  BookMarked,
  FileText,
  Users,
  Compass,
  FileCode,
  Image as ImageIcon,
  Settings,
  LogOut,
  Globe,
  Lock
} from 'lucide-react';

export const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const { adminSession, logoutAdmin, settings } = useJournal();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'volumes', label: 'Volume Management', icon: FolderTree },
    { id: 'issues', label: 'Issue / Number Management', icon: BookMarked },
    { id: 'articles', label: 'Article Management', icon: FileText },
    { id: 'editorial', label: 'Editorial Board', icon: Users },
    { id: 'research-areas', label: 'Research Areas', icon: Compass },
    { id: 'pages', label: 'Website Pages (CMS)', icon: FileCode },
    { id: 'media', label: 'Media & File Storage', icon: ImageIcon },
    { id: 'settings', label: 'Journal Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen border-r border-slate-800 flex flex-col justify-between flex-shrink-0">
      {/* Top Section */}
      <div>
        {/* Brand Banner */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div>
            <span className="text-xs uppercase font-bold text-amber-500 tracking-wider">Admin Control Panel</span>
            <h2 className="text-base font-bold text-white font-serif">{settings.short_name || 'IJCAST'}</h2>
          </div>
          <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg">
            <Lock className="w-4 h-4" />
          </div>
        </div>

        {/* Auth Mode Status Indicator */}
        <div className="px-5 py-2.5 bg-slate-950/60 border-b border-slate-800/60 text-[11px] flex items-center justify-between">
          <span className="text-slate-400">Persistence Mode:</span>
          <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
            adminSession?.mode === 'supabase'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}>
            {adminSession?.mode === 'supabase' ? 'Supabase DB' : 'Dev Demo Store'}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span>View Public Journal Site</span>
        </a>
        <button
          onClick={logoutAdmin}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium rounded-xl transition-colors border border-rose-500/20"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout Admin</span>
        </button>
      </div>
    </aside>
  );
};
