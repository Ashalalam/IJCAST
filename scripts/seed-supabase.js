import { createClient } from '@supabase/supabase-js';
import {
  initialJournalSettings,
  initialResearchAreas,
  initialVolumes,
  initialIssues,
  initialArticles,
  initialEditorialMembers,
  initialPageContent,
  initialMedia
} from '../src/lib/mockData.js';

const supabaseUrl = 'https://ccethswedisoehyxujqt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjZXRoc3dlZGlzb2VoeXh1anF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxOTg1NTYsImV4cCI6MjEwNDc3NDU1Nn0.-Yb_4WPavixwz-3YgtH_-RD4jREQH-okCjGzv-ux830';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnectionAndSeed() {
  console.log('Testing connection to Supabase project...');
  
  try {
    const { data: set, error: setError } = await supabase.from('journal_settings').select('*');
    if (setError) {
      console.log('Note: Tables might not be created in Supabase SQL editor yet:', setError.message);
      console.log('Please copy and run the SQL script in supabase/schema.sql in your Supabase SQL Editor.');
      return;
    }
    
    console.log('Connected to Supabase successfully! Found existing settings rows:', set?.length || 0);

    if (set && set.length === 0) {
      console.log('Seeding initial journal settings...');
      await supabase.from('journal_settings').insert(initialJournalSettings);
    }
    
    const { data: ras } = await supabase.from('research_areas').select('*');
    if (ras && ras.length === 0) {
      console.log('Seeding research areas...');
      await supabase.from('research_areas').insert(initialResearchAreas);
    }

    console.log('Supabase check complete!');
  } catch (err) {
    console.error('Connection test error:', err.message);
  }
}

testConnectionAndSeed();
