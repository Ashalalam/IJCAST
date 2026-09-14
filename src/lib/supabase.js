import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-supabase-url.supabase.co');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local Storage Keys for offline / fallback mode
// v2 suffix busts stale cache from previous deployments
const STORAGE_KEYS = {
  SETTINGS: 'ijcast_settings_v2',
  VOLUMES: 'ijcast_volumes',
  ISSUES: 'ijcast_issues',
  ARTICLES: 'ijcast_articles',
  EDITORIAL: 'ijcast_editorial',
  RESEARCH_AREAS: 'ijcast_research_areas',
  PAGE_CONTENT: 'ijcast_page_content',
  MEDIA: 'ijcast_media',
  ADMIN_SESSION: 'ijcast_admin_session',
  THESES: 'ijcast_theses'
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
