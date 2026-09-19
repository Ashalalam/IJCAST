import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-supabase-url.supabase.co');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const STORAGE_KEYS = {
  SETTINGS: 'ijcast_settings_v3',
  VOLUMES: 'ijcast_volumes_v2',
  ISSUES: 'ijcast_issues_v2',
  ARTICLES: 'ijcast_articles_v2',
  EDITORIAL: 'ijcast_editorial_v2',
  RESEARCH_AREAS: 'ijcast_research_areas_v2',
  PAGE_CONTENT: 'ijcast_page_content_v2',
  MEDIA: 'ijcast_media_v2',
  ADMIN_SESSION: 'ijcast_admin_session',
  THESES: 'ijcast_theses_v2'
};

// Helper for LocalStorage Persistence
export const getLocalStore = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    if (Array.isArray(parsed) && parsed.length === 0 && Array.isArray(fallback) && fallback.length > 0) {
      return fallback;
    }
    return parsed;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
};

export const setLocalStore = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
};

export { STORAGE_KEYS };
