import React from 'react';
import { useJournal } from '../context/JournalContext';
import { Link } from 'react-router-dom';
import { ArticleCard } from '../components/common/ArticleCard';
import {
  BookOpen,
  Send,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  Users,
  Compass,
  FileText,
  Clock,
  Sparkles,
  Download,
  FileDown
} from 'lucide-react';

export const Home = () => {
  const { settings, articles, researchAreas, editorialMembers, setIsSubmitOpen, isLoading } = useJournal();

  const publishedArticles = articles
    .filter(a => a.is_published)
    .sort((a, b) => new Date(b.published_date || b.created_at) - new Date(a.published_date || a.created_at));
  const latestArticles = publishedArticles.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative bg-slate-950 text-white pt-16 pb-20 px-4 sm:px-8 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Title & Credentials */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multidisciplinary Peer-Reviewed Research Journal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif leading-tight tracking-tight text-white">
              {settings.journal_name}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
              Dedicated to advancing global open-access scholarship across Commerce, Arts, Social Sciences, Pure Sciences, Computer Science, Engineering, and Educational Pedagogy.
            </p>

            {/* Badges Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs pt-2">
              <div className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 font-medium">
                <span className="text-amber-400 font-bold mr-1.5">{settings.issn}</span>
              </div>
              <div className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 font-medium">
                <span className="text-emerald-400 font-bold mr-1.5">{settings.eissn}</span>
              </div>
              {settings.doi_prefix && (
                <div className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-mono">
                  <span>DOI Prefix: {settings.doi_prefix}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setIsSubmitOpen(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl shadow-xl hover:shadow-amber-500/20 transition-all text-sm transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Submit Manuscript</span>
              </button>

              <Link
                to="/current-issue"
                className="flex items-center space-x-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl border border-slate-800 transition-colors text-sm"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Browse Current Issue</span>
              </Link>

              <Link
                to="/archives"
                className="flex items-center space-x-2 px-6 py-3 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 font-medium rounded-xl border border-slate-800/60 transition-colors text-sm"
              >
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Archives</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Key Journal Info Card */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-2xl backdrop-blur-md space-y-4">
            <h3 className="text-base font-bold font-serif text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Journal Specifications</span>
              <Award className="w-5 h-5 text-amber-500" />
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Short Name:</span>
                <span className="font-semibold text-white">{settings.short_name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Nature:</span>
                <span className="font-semibold text-white">Multidisciplinary Peer-Reviewed</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Frequency:</span>
                <span className="font-semibold text-amber-400">{settings.publication_frequency}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Language:</span>
                <span className="font-semibold text-white">{settings.language}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Access Policy:</span>
                <span className="font-semibold text-emerald-400">Open Access (CC BY 4.0)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Publisher:</span>
                <span className="font-semibold text-slate-200 text-right max-w-[180px]">{settings.publisher}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsSubmitOpen(true)}
                className="w-full py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold text-center transition-colors"
              >
                Manuscript Email: {settings.contact_email}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Section 1: About & Aims */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-700">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-serif text-slate-900">About the Journal</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              The <strong>International Journal of Commerce, Arts, Science and Technology (IJCAST)</strong> is a premier open-access academic repository dedicated to high-impact research. Following its successful revival, IJCAST maintains rigorous peer-review policies to ensure scholarly excellence across theoretical and empirical investigations.
            </p>
            <div className="pt-2">
              <Link to="/about" className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 hover:text-amber-800">
                <span>Read Full Journal Profile & History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl space-y-4 border border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-serif text-white">Aims & Scope</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              IJCAST aims to foster interdisciplinary research by serving as a bridge between scientific innovations, technological applications, business strategic leadership, and humanistic cultural reflections. We welcome submissions from international researchers, faculty, and industry scientists.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs pt-2 text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Rapid Peer Review</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Universal DOI Resolution</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Global Indexing Exposure</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Immediate Open Access</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Research Areas Overview */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-amber-700 tracking-wider">Multidisciplinary Domains</span>
              <h2 className="text-2xl font-bold font-serif text-slate-900">Covered Research Areas</h2>
            </div>
            <Link to="/research-areas" className="text-xs font-bold text-amber-700 hover:underline flex items-center space-x-1">
              <span>View All 8 Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchAreas.slice(0, 8).map((area) => (
              <div key={area.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-md transition-all space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 font-bold text-xs">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 font-serif line-clamp-1">{area.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(Array.isArray(area.subcategories) ? area.subcategories : []).slice(0, 4).map((sub, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded font-medium">
                      {sub}
                    </span>
                  ))}
                  {(Array.isArray(area.subcategories) ? area.subcategories : []).length > 4 && (
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] rounded font-semibold">
                      +{area.subcategories.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Latest Published Papers */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-amber-700 tracking-wider">Recently Published</span>
              <h2 className="text-2xl font-bold font-serif text-slate-900">Latest Research Articles</h2>
            </div>
            <Link to="/current-issue" className="text-xs font-bold text-amber-700 hover:underline flex items-center space-x-1">
              <span>View Current Issue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
                <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                Loading articles...
              </div>
            ) : latestArticles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
                No published research papers available at the moment.
              </div>
            ) : (
              latestArticles.map(art => (
                <ArticleCard key={art.id} article={art} />
              ))
            )}
          </div>
        </section>

        {/* Section 4: Editorial Leadership Preview */}
        <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Editorial Leadership</span>
              <h2 className="text-2xl font-bold font-serif text-white">Editorial Board Profile</h2>
            </div>
            <Link to="/editorial-board" className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow transition-colors inline-flex items-center space-x-1.5 self-start md:self-auto">
              <Users className="w-4 h-4" />
              <span>Full Editorial Board Page</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {editorialMembers.filter(m => m.is_active).slice(0, 3).map(mem => (
              <div key={mem.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={mem.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'}
                    alt={mem.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">{mem.role}</span>
                    <h4 className="text-sm font-bold text-white font-serif">{mem.name}</h4>
                  </div>
                </div>
                <p className="text-xs text-slate-300">{mem.designation}</p>
                <p className="text-xs text-slate-400">{mem.institution}, {mem.country}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Call for Papers & Email Notice */}
        <section className="bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="px-3 py-1 bg-slate-950 text-amber-400 font-bold rounded-full text-xs uppercase tracking-wider">Call for Manuscripts</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">Submissions Open for 2026 Volume 1</h2>
            <p className="text-xs sm:text-sm text-slate-900 max-w-xl font-medium">
              Submit your original research, review papers, or case studies directly via email. Rapid double-blind peer review and immediate open-access indexing.
            </p>
          </div>
          <button
            onClick={() => setIsSubmitOpen(true)}
            className="flex-shrink-0 px-8 py-4 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-sm rounded-2xl shadow-2xl transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <Send className="w-4 h-4 text-amber-400" />
            <span>Submit via Official Email</span>
          </button>
        </section>

        {/* Section 6: Author Downloads */}
        <section className="space-y-4">
          <div>
            <span className="text-xs uppercase font-bold text-amber-700 tracking-wider">Author Resources</span>
            <h2 className="text-2xl font-bold font-serif text-slate-900">Downloads for Authors</h2>
            <p className="text-sm text-slate-500 mt-1">Download the official templates and forms required for manuscript submission.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Paper Template */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex items-start space-x-4">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-700 flex-shrink-0 border border-amber-100">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-serif">IJCAST Paper Template</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official Microsoft Word template for formatting your research manuscript as per IJCAST standards.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">IJCAST-Paper-Template.docx</p>
                </div>
                <a
                  href="/IJCAST-Paper-Template.docx"
                  download="IJCAST Paper Template.docx"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Template</span>
                </a>
              </div>
            </div>

            {/* Copyright Transfer Agreement */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex items-start space-x-4">
              <div className="p-3 bg-slate-50 rounded-xl text-slate-700 flex-shrink-0 border border-slate-200">
                <FileDown className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-serif">Copyright Transfer Agreement</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Mandatory form to be filled, signed by the corresponding author and submitted along with the manuscript.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">IJCAST-Copyright-Transfer-Agreement.pdf</p>
                </div>
                <a
                  href="/IJCAST-Copyright-Transfer-Agreement.pdf"
                  download="Copyright Transfer Agreement IJCAST.pdf"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Form</span>
                </a>
              </div>
            </div>
          </div>

          {/* Note */}
          <p className="text-xs text-slate-400 text-center pt-1">
            Both documents are also available on the <a href="/for-authors" className="text-amber-700 font-semibold hover:underline">For Authors</a> page.
          </p>
        </section>
      </div>
    </div>
  );
};
