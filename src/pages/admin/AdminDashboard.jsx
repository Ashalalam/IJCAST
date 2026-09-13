import React, { useState } from 'react';
import { useJournal } from '../../context/JournalContext';
import { Navigate } from 'react-router-dom';

import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { VolumeManager } from '../../components/admin/VolumeManager';
import { IssueManager } from '../../components/admin/IssueManager';
import { ArticleManager } from '../../components/admin/ArticleManager';
import { EditorialManager } from '../../components/admin/EditorialManager';
import { ResearchAreaManager } from '../../components/admin/ResearchAreaManager';
import { PageContentEditor } from '../../components/admin/PageContentEditor';
import { MediaManager } from '../../components/admin/MediaManager';
import { SettingsManager } from '../../components/admin/SettingsManager';

import { FolderTree, BookMarked, FileText, Users, Plus, ArrowRight, Eye, ShieldCheck, Menu } from 'lucide-react';

export const AdminDashboard = () => {
  const { adminSession, volumes, issues, articles, editorialMembers } = useJournal();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protect Admin route
  if (!adminSession) {
    return <Navigate to="/admin/login" replace />;
  }

  const publishedArticles = articles.filter(a => a.is_published);
  const latestArticlesList = articles.slice(0, 5);

  // Close sidebar when a tab is selected on mobile
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex relative">
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Admin Workspace Area */}
      <main className="flex-1 overflow-y-auto max-h-screen custom-scrollbar">
        {/* Mobile Top Bar with hamburger */}
        <div className="lg:hidden sticky top-0 z-10 flex items-center justify-between bg-slate-950 border-b border-slate-800 px-4 py-3">
          <div>
            <span className="text-xs uppercase font-bold text-amber-500 tracking-wider">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 lg:p-10">
        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-amber-500 tracking-wider">Control Panel</span>
                <h1 className="text-2xl font-bold font-serif text-white">Administrator Dashboard</h1>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleTabChange('articles')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Article</span>
                </button>
              </div>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase">Total Volumes</span>
                  <FolderTree className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-3xl font-bold text-white font-serif">{volumes.length}</p>
                <p className="text-[11px] text-slate-500">{volumes.filter(v => v.status === 'Active').length} Active Volumes</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase">Total Issues</span>
                  <BookMarked className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-3xl font-bold text-white font-serif">{issues.length}</p>
                <p className="text-[11px] text-slate-500">Across all years</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase">Total Articles</span>
                  <FileText className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-3xl font-bold text-white font-serif">{articles.length}</p>
                <p className="text-[11px] text-emerald-400 font-medium">{publishedArticles.length} Published</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase">Board Members</span>
                  <Users className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-3xl font-bold text-white font-serif">{editorialMembers.length}</p>
                <p className="text-[11px] text-slate-500">{editorialMembers.filter(m => m.is_active).length} Active Members</p>
              </div>
            </div>

            {/* Latest Articles Widget */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold font-serif text-white">Latest Articles Widget</h3>
                <button
                  onClick={() => handleTabChange('articles')}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center space-x-1"
                >
                  <span>Manage Articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {latestArticlesList.map(art => (
                  <div key={art.id} className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1 truncate">
                      <div className="flex items-center space-x-2 text-[10px]">
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 font-bold rounded">
                          {art.research_area}
                        </span>
                        <span className="text-slate-500">{art.published_date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white font-serif truncate">{art.title}</h4>
                      <p className="text-[11px] text-slate-400 truncate">By {art.authors?.map(a => a.name).join(', ')}</p>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        art.is_published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {art.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <button
                onClick={() => handleTabChange('volumes')}
                className="p-5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl text-left space-y-2 transition-all group"
              >
                <FolderTree className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-white font-serif">Manage Volumes</h4>
                <p className="text-xs text-slate-400">Add or archive annual volumes.</p>
              </button>

              <button
                onClick={() => handleTabChange('editorial')}
                className="p-5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl text-left space-y-2 transition-all group"
              >
                <Users className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-white font-serif">Editorial Board</h4>
                <p className="text-xs text-slate-400">Add or edit board profile cards.</p>
              </button>

              <button
                onClick={() => handleTabChange('settings')}
                className="p-5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl text-left space-y-2 transition-all group"
              >
                <ShieldCheck className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold text-white font-serif">Journal Credentials</h4>
                <p className="text-xs text-slate-400">Update ISSN, e-ISSN, and emails.</p>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Volumes */}
        {activeTab === 'volumes' && <VolumeManager />}

        {/* Tab 3: Issues */}
        {activeTab === 'issues' && <IssueManager />}

        {/* Tab 4: Articles */}
        {activeTab === 'articles' && <ArticleManager />}

        {/* Tab 5: Editorial Board */}
        {activeTab === 'editorial' && <EditorialManager />}

        {/* Tab 6: Research Areas */}
        {activeTab === 'research-areas' && <ResearchAreaManager />}

        {/* Tab 7: Website Pages CMS */}
        {activeTab === 'pages' && <PageContentEditor />}

        {/* Tab 8: Media Storage */}
        {activeTab === 'media' && <MediaManager />}

        {/* Tab 9: Settings */}
        {activeTab === 'settings' && <SettingsManager />}
        </div>
      </main>
    </div>
  );
};
