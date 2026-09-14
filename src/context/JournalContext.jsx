import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, getLocalStore, setLocalStore, STORAGE_KEYS } from '../lib/supabase';
import {
  initialJournalSettings,
  initialResearchAreas,
  initialVolumes,
  initialIssues,
  initialArticles,
  initialEditorialMembers,
  initialPageContent,
  initialMedia,
  initialTheses
} from '../lib/mockData';

const JournalContext = createContext(null);

// Supabase may return JSON fields as strings — ensure arrays are always arrays
const normalizeResearchAreas = (areas) =>
  (areas || []).map((area) => ({
    ...area,
    subcategories: Array.isArray(area.subcategories)
      ? area.subcategories
      : typeof area.subcategories === 'string'
      ? (() => { try { return JSON.parse(area.subcategories); } catch { return []; } })()
      : [],
  }));

const parseJsonField = (field) => {
  if (Array.isArray(field)) return field;
  if (typeof field === 'string') {
    try { return JSON.parse(field); } catch { return []; }
  }
  return [];
};

const normalizeArticles = (arts) =>
  (arts || []).map((art) => ({
    ...art,
    authors: parseJsonField(art.authors),
    keywords: parseJsonField(art.keywords),
    orcids: parseJsonField(art.orcids),
  }));

export const JournalProvider = ({ children }) => {
  // State initialization with localStorage fallbacks
  const [settings, setSettings] = useState(() => getLocalStore(STORAGE_KEYS.SETTINGS, initialJournalSettings));
  const [volumes, setVolumes] = useState(() => getLocalStore(STORAGE_KEYS.VOLUMES, initialVolumes));
  const [issues, setIssues] = useState(() => getLocalStore(STORAGE_KEYS.ISSUES, initialIssues));
  const [articles, setArticles] = useState(() => getLocalStore(STORAGE_KEYS.ARTICLES, initialArticles));
  const [editorialMembers, setEditorialMembers] = useState(() => getLocalStore(STORAGE_KEYS.EDITORIAL, initialEditorialMembers));
  const [researchAreas, setResearchAreas] = useState(() => getLocalStore(STORAGE_KEYS.RESEARCH_AREAS, initialResearchAreas));
  const [pageContents, setPageContents] = useState(() => getLocalStore(STORAGE_KEYS.PAGE_CONTENT, initialPageContent));
  const [mediaItems, setMediaItems] = useState(() => getLocalStore(STORAGE_KEYS.MEDIA, initialMedia));
  const [adminSession, setAdminSession] = useState(() => getLocalStore(STORAGE_KEYS.ADMIN_SESSION, null));
  const [theses, setTheses] = useState(() => getLocalStore(STORAGE_KEYS.THESES, initialTheses));

  // Global Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [pdfModalData, setPdfModalData] = useState(null); // { url, title }

  // Sync to LocalStorage whenever state changes
  useEffect(() => { setLocalStore(STORAGE_KEYS.SETTINGS, settings); }, [settings]);
  useEffect(() => { setLocalStore(STORAGE_KEYS.VOLUMES, volumes); }, [volumes]);
  useEffect(() => { setLocalStore(STORAGE_KEYS.ISSUES, issues); }, [issues]);
  useEffect(() => { setLocalStore(STORAGE_KEYS.ARTICLES, articles); }, [articles]);
  useEffect(() => { setLocalStore(STORAGE_KEYS.EDITORIAL, editorialMembers); }, [editorialMembers]);
  useEffect(() => { setLocalStore(STORAGE_KEYS.RESEARCH_AREAS, researchAreas); }, [researchAreas]);
  useEffect(() => { setLocalStore(STORAGE_KEYS.PAGE_CONTENT, pageContents); }, [pageContents]);
  useEffect(() => { setLocalStore(STORAGE_KEYS.MEDIA, mediaItems); }, [mediaItems]);
  useEffect(() => { setLocalStore(STORAGE_KEYS.ADMIN_SESSION, adminSession); }, [adminSession]);
  useEffect(() => { setLocalStore(STORAGE_KEYS.THESES, theses); }, [theses]);

  // Load from Supabase if configured
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const fetchSupabaseData = async () => {
      try {
        const { data: set } = await supabase.from('journal_settings').select('*').single();
        if (set) {
          // Merge in correct canonical values in case they were saved incorrectly before
          const corrected = {
            ...set,
            short_name: set.short_name || 'IJCAST',
            publisher: (set.publisher === 'IJCAST Academic Research Publications Group' || !set.publisher)
              ? 'Gyan Akshar Sanskriti Foundation'
              : set.publisher,
            publication_frequency: (set.publication_frequency === 'Bi-Monthly (6 Issues per Year)' || set.publication_frequency === 'Quarterly (4 Issues Per Year)' || !set.publication_frequency)
              ? 'Quarterly (4 Issues Per Year) — Issue 1: Jan–Mar | Issue 2: Apr–Jun | Issue 3: Jul–Sep | Issue 4: Oct–Dec'
              : set.publication_frequency,
          };
          setSettings(corrected);
          // Silently patch the DB row if it had stale values
          if (corrected.publisher !== set.publisher || corrected.publication_frequency !== set.publication_frequency) {
            await supabase.from('journal_settings').update({
              publisher: corrected.publisher,
              publication_frequency: corrected.publication_frequency,
            }).eq('id', set.id).catch(() => {});
          }
        }

        const { data: vols } = await supabase.from('volumes').select('*').order('year', { ascending: false });
        if (vols && vols.length > 0) {
          setVolumes(vols);
        } else {
          setVolumes(initialVolumes);
          await supabase.from('volumes').insert(initialVolumes).catch(() => {});
        }

        const { data: iss } = await supabase.from('issues').select('*').order('sort_order', { ascending: true });
        if (iss && iss.length > 0) {
          setIssues(iss);
        } else {
          setIssues(initialIssues);
          await supabase.from('issues').insert(initialIssues).catch(() => {});
        }

        const { data: arts } = await supabase.from('articles').select('*').order('sort_order', { ascending: true });
        if (arts && arts.length > 0) {
          setArticles(normalizeArticles(arts));
        } else {
          setArticles(initialArticles);
          await supabase.from('articles').insert(initialArticles).catch(() => {});
        }

        const { data: eds } = await supabase.from('editorial_members').select('*').order('sort_order', { ascending: true });
        if (eds && eds.length > 0) {
          setEditorialMembers(eds);
        } else {
          setEditorialMembers(initialEditorialMembers);
          await supabase.from('editorial_members').insert(initialEditorialMembers).catch(() => {});
        }

        const { data: ras } = await supabase.from('research_areas').select('*').order('sort_order', { ascending: true });
        if (ras && ras.length > 0) {
          setResearchAreas(normalizeResearchAreas(ras));
        } else {
          setResearchAreas(initialResearchAreas);
          await supabase.from('research_areas').insert(initialResearchAreas).catch(() => {});
        }

        const { data: pgs } = await supabase.from('page_content').select('*');
        if (pgs && pgs.length > 0) {
          setPageContents(pgs);
        } else {
          setPageContents(initialPageContent);
          await supabase.from('page_content').insert(initialPageContent).catch(() => {});
        }

        const { data: med } = await supabase.from('media').select('*').order('uploaded_at', { ascending: false });
        if (med && med.length > 0) {
          setMediaItems(med);
        } else {
          setMediaItems(initialMedia);
          await supabase.from('media').insert(initialMedia).catch(() => {});
        }

        const { data: ths } = await supabase.from('theses').select('*').order('created_at', { ascending: false });
        if (ths && ths.length > 0) {
          setTheses(ths.map(t => ({ ...t, guide_names: parseJsonField(t.guide_names), keywords: parseJsonField(t.keywords) })));
        } else {
          setTheses(initialTheses);
          await supabase.from('theses').insert(initialTheses).catch(() => {});
        }
      } catch (err) {
        console.warn('Supabase fetch error, maintaining local state:', err);
      }
    };

    fetchSupabaseData();
  }, []);

  // --- CRUD ACTIONS ---

  // Admin Login / Logout
  const loginAdmin = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && data?.user) {
          setAdminSession({ user: data.user, token: data.session.access_token, mode: 'supabase' });
          return data;
        }
      } catch (err) {
        console.warn('Supabase auth sign-in notice:', err);
      }
    }
    // Fallback Admin Credentials for instant testing
    if (email === 'admin@ijcast.org' && password === 'admin123') {
      const demoUser = { id: 'demo-admin-id', email: 'admin@ijcast.org', role: 'Administrator' };
      setAdminSession({ user: demoUser, token: 'demo-token', mode: isSupabaseConfigured ? 'supabase' : 'demo' });
      return { user: demoUser };
    }
    throw new Error('Invalid Administrator Credentials');
  };

  const logoutAdmin = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setAdminSession(null);
  };

  // Settings
  const updateSettings = async (newSettings) => {
    const updated = { ...settings, ...newSettings, updated_at: new Date().toISOString() };
    setSettings(updated);
    if (isSupabaseConfigured && supabase) {
      // Use the real UUID from the fetched row if available, otherwise upsert
      if (updated.id && updated.id !== 'setting-1') {
        await supabase.from('journal_settings').update(updated).eq('id', updated.id);
      } else {
        // No real UUID yet — fetch it first, then update
        const { data: existing } = await supabase.from('journal_settings').select('id').single();
        if (existing?.id) {
          const withRealId = { ...updated, id: existing.id };
          setSettings(withRealId);
          await supabase.from('journal_settings').update(withRealId).eq('id', existing.id);
        } else {
          // Table is empty — insert for the first time
          const { data: inserted } = await supabase.from('journal_settings').insert(updated).select().single();
          if (inserted) setSettings(inserted);
        }
      }
    }
  };

  // Volumes
  const saveVolume = async (volumeData) => {
    let updated;
    if (volumeData.id) {
      updated = volumes.map(v => v.id === volumeData.id ? { ...v, ...volumeData } : v);
    } else {
      const newVol = { ...volumeData, id: `vol-${Date.now()}`, created_at: new Date().toISOString() };
      updated = [newVol, ...volumes];
    }
    setVolumes(updated);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('volumes').upsert(volumeData);
    }
  };

  const deleteVolume = async (id) => {
    setVolumes(volumes.filter(v => v.id !== id));
    if (isSupabaseConfigured && supabase) {
      await supabase.from('volumes').delete().eq('id', id);
    }
  };

  // Issues
  const saveIssue = async (issueData) => {
    let updated;
    if (issueData.id) {
      updated = issues.map(i => i.id === issueData.id ? { ...i, ...issueData } : i);
    } else {
      const newIssue = { ...issueData, id: `iss-${Date.now()}`, sort_order: issues.length + 1, created_at: new Date().toISOString() };
      updated = [...issues, newIssue];
    }
    setIssues(updated);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('issues').upsert(issueData);
    }
  };

  const deleteIssue = async (id) => {
    setIssues(issues.filter(i => i.id !== id));
    if (isSupabaseConfigured && supabase) {
      await supabase.from('issues').delete().eq('id', id);
    }
  };

  const reorderIssues = (reorderedList) => {
    const updated = reorderedList.map((item, index) => ({ ...item, sort_order: index + 1 }));
    setIssues(updated);
    if (isSupabaseConfigured && supabase) {
      updated.forEach(item => supabase.from('issues').update({ sort_order: item.sort_order }).eq('id', item.id));
    }
  };

  // Articles
  const saveArticle = async (articleData) => {
    let updated;
    if (articleData.id) {
      updated = articles.map(a => a.id === articleData.id ? { ...a, ...articleData } : a);
    } else {
      const newArt = { ...articleData, id: `art-${Date.now()}`, sort_order: articles.length + 1, created_at: new Date().toISOString() };
      updated = [newArt, ...articles];
    }
    setArticles(updated);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('articles').upsert(articleData);
    }
  };

  const deleteArticle = async (id) => {
    setArticles(articles.filter(a => a.id !== id));
    if (isSupabaseConfigured && supabase) {
      await supabase.from('articles').delete().eq('id', id);
    }
  };

  const toggleArticlePublish = async (id) => {
    const updated = articles.map(a => a.id === id ? { ...a, is_published: !a.is_published } : a);
    setArticles(updated);
    const target = updated.find(a => a.id === id);
    if (isSupabaseConfigured && supabase && target) {
      await supabase.from('articles').update({ is_published: target.is_published }).eq('id', id);
    }
  };

  const moveArticle = async (articleId, newIssueId) => {
    const updated = articles.map(a => a.id === articleId ? { ...a, issue_id: newIssueId } : a);
    setArticles(updated);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('articles').update({ issue_id: newIssueId }).eq('id', articleId);
    }
  };

  const reorderArticles = (reorderedList) => {
    const updated = articles.map(a => {
      const found = reorderedList.find(r => r.id === a.id);
      return found ? { ...a, sort_order: found.sort_order } : a;
    });
    setArticles(updated);
    if (isSupabaseConfigured && supabase) {
      reorderedList.forEach(item => supabase.from('articles').update({ sort_order: item.sort_order }).eq('id', item.id));
    }
  };

  // Editorial Members
  const saveEditorialMember = async (memberData) => {
    let updated;
    if (memberData.id) {
      updated = editorialMembers.map(m => m.id === memberData.id ? { ...m, ...memberData } : m);
    } else {
      const newMem = { ...memberData, id: `ed-${Date.now()}`, sort_order: editorialMembers.length + 1 };
      updated = [...editorialMembers, newMem];
    }
    setEditorialMembers(updated);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('editorial_members').upsert(memberData);
    }
  };

  const deleteEditorialMember = async (id) => {
    setEditorialMembers(editorialMembers.filter(m => m.id !== id));
    if (isSupabaseConfigured && supabase) {
      await supabase.from('editorial_members').delete().eq('id', id);
    }
  };

  const toggleEditorialActive = async (id) => {
    const updated = editorialMembers.map(m => m.id === id ? { ...m, is_active: !m.is_active } : m);
    setEditorialMembers(updated);
    const target = updated.find(m => m.id === id);
    if (isSupabaseConfigured && supabase && target) {
      await supabase.from('editorial_members').update({ is_active: target.is_active }).eq('id', id);
    }
  };

  const reorderEditorialMembers = (reorderedList) => {
    const updated = reorderedList.map((item, index) => ({ ...item, sort_order: index + 1 }));
    setEditorialMembers(updated);
    if (isSupabaseConfigured && supabase) {
      updated.forEach(item => supabase.from('editorial_members').update({ sort_order: item.sort_order }).eq('id', item.id));
    }
  };

  // Research Areas
  const saveResearchArea = async (raData) => {
    const normalized = {
      ...raData,
      subcategories: Array.isArray(raData.subcategories)
        ? raData.subcategories
        : typeof raData.subcategories === 'string'
        ? (() => { try { return JSON.parse(raData.subcategories); } catch { return []; } })()
        : [],
    };
    let updated;
    if (normalized.id) {
      updated = researchAreas.map(r => r.id === normalized.id ? { ...r, ...normalized } : r);
    } else {
      const newRa = { ...normalized, id: `ra-${Date.now()}`, sort_order: researchAreas.length + 1 };
      updated = [...researchAreas, newRa];
    }
    setResearchAreas(updated);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('research_areas').upsert(raData);
    }
  };

  const deleteResearchArea = async (id) => {
    setResearchAreas(researchAreas.filter(r => r.id !== id));
    if (isSupabaseConfigured && supabase) {
      await supabase.from('research_areas').delete().eq('id', id);
    }
  };

  // CMS Page Content
  const savePageContent = async (pageKey, sectionKey, title, content) => {
    const existing = pageContents.find(p => p.page_key === pageKey && p.section_key === sectionKey);
    let updated;
    if (existing) {
      updated = pageContents.map(p => p.id === existing.id ? { ...p, title, content, updated_at: new Date().toISOString() } : p);
    } else {
      const newPg = { id: `pg-${Date.now()}`, page_key: pageKey, section_key: sectionKey, title, content, updated_at: new Date().toISOString() };
      updated = [...pageContents, newPg];
    }
    setPageContents(updated);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('page_content').upsert({ page_key: pageKey, section_key: sectionKey, title, content });
    }
  };

  // Media Management
  const addMediaItem = async (mediaData) => {
    const newMed = { ...mediaData, id: `med-${Date.now()}`, uploaded_at: new Date().toISOString() };
    setMediaItems([newMed, ...mediaItems]);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('media').insert(mediaData);
    }
    return newMed;
  };

  const deleteMediaItem = async (id) => {
    setMediaItems(mediaItems.filter(m => m.id !== id));
    if (isSupabaseConfigured && supabase) {
      await supabase.from('media').delete().eq('id', id);
    }
  };

  // Theses
  const saveThesis = async (thesisData) => {
    const normalized = {
      ...thesisData,
      guide_names: Array.isArray(thesisData.guide_names)
        ? thesisData.guide_names
        : thesisData.guide_names.split(',').map(g => g.trim()).filter(Boolean),
      keywords: Array.isArray(thesisData.keywords)
        ? thesisData.keywords
        : thesisData.keywords.split(',').map(k => k.trim()).filter(Boolean),
    };
    let updated;
    if (normalized.id) {
      updated = theses.map(t => t.id === normalized.id ? { ...t, ...normalized } : t);
    } else {
      const newThesis = { ...normalized, id: `thesis-${Date.now()}`, created_at: new Date().toISOString() };
      updated = [newThesis, ...theses];
    }
    setTheses(updated);
    if (isSupabaseConfigured && supabase) {
      await supabase.from('theses').upsert(normalized);
    }
  };

  const deleteThesis = async (id) => {
    setTheses(theses.filter(t => t.id !== id));
    if (isSupabaseConfigured && supabase) {
      await supabase.from('theses').delete().eq('id', id);
    }
  };

  const toggleThesisPublish = async (id) => {
    const updated = theses.map(t => t.id === id ? { ...t, is_published: !t.is_published } : t);
    setTheses(updated);
    const target = updated.find(t => t.id === id);
    if (isSupabaseConfigured && supabase && target) {
      await supabase.from('theses').update({ is_published: target.is_published }).eq('id', id);
    }
  };

  const value = {
    settings,
    updateSettings,
    volumes,
    saveVolume,
    deleteVolume,
    issues,
    saveIssue,
    deleteIssue,
    reorderIssues,
    articles,
    saveArticle,
    deleteArticle,
    toggleArticlePublish,
    moveArticle,
    reorderArticles,
    editorialMembers,
    saveEditorialMember,
    deleteEditorialMember,
    toggleEditorialActive,
    reorderEditorialMembers,
    researchAreas,
    saveResearchArea,
    deleteResearchArea,
    pageContents,
    savePageContent,
    mediaItems,
    addMediaItem,
    deleteMediaItem,
    theses,
    saveThesis,
    deleteThesis,
    toggleThesisPublish,
    adminSession,
    loginAdmin,
    logoutAdmin,
    isSearchOpen,
    setIsSearchOpen,
    isSubmitOpen,
    setIsSubmitOpen,
    pdfModalData,
    setPdfModalData
  };

  return (
    <JournalContext.Provider value={value}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
