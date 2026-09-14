-- ========================================================
-- IJCAST - International Journal of Commerce, Arts, Science and Technology
-- Complete Supabase Database Schema & Storage Setup
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. JOURNAL SETTINGS TABLE
CREATE TABLE IF NOT EXISTS journal_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  journal_name TEXT NOT NULL DEFAULT 'International Journal of Commerce, Arts, Science and Technology',
  short_name TEXT NOT NULL DEFAULT 'IJCAST',
  issn TEXT DEFAULT 'ISSN 2349-XXXX',
  eissn TEXT DEFAULT 'e-ISSN 2349-YYYY',
  doi_prefix TEXT DEFAULT '10.5281/ijcast',
  publisher TEXT DEFAULT 'IJCAST Publishing House',
  publication_frequency TEXT DEFAULT 'Bi-Monthly (6 Issues / Year)',
  language TEXT DEFAULT 'English',
  contact_email TEXT DEFAULT 'editor@ijcast.org',
  alternate_email TEXT DEFAULT 'ijcast.journal@gmail.com',
  phone TEXT DEFAULT '+91 98765 43210',
  postal_address TEXT DEFAULT 'IJCAST Editorial Office, Academic Research Complex, Suite 402, New Delhi, India',
  copyright_statement TEXT DEFAULT 'Copyright © IJCAST. All rights reserved. Authors retain full publication rights.',
  license_name TEXT DEFAULT 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
  license_url TEXT DEFAULT 'https://creativecommons.org/licenses/by/4.0/',
  is_open_access BOOLEAN DEFAULT false,
  open_access_statement TEXT DEFAULT 'All published articles are freely available online immediately upon publication without subscription charges.',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. VOLUMES TABLE
CREATE TABLE IF NOT EXISTS volumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  volume_number INT NOT NULL,
  year INT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ISSUES TABLE
CREATE TABLE IF NOT EXISTS issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  volume_id UUID REFERENCES volumes(id) ON DELETE CASCADE,
  issue_number INT NOT NULL,
  month_range TEXT NOT NULL, -- e.g. 'January - February'
  year INT NOT NULL,
  pub_date DATE DEFAULT CURRENT_DATE,
  cover_url TEXT,
  editorial_note TEXT,
  sort_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ARTICLES TABLE
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issue_id UUID REFERENCES issues(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  authors JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { name, affiliation, email, orcid, is_corresponding }
  corresponding_author TEXT,
  corresponding_author_email TEXT,
  orcids JSONB DEFAULT '[]'::jsonb,
  abstract TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  research_area TEXT NOT NULL,
  article_type TEXT DEFAULT 'Research Paper', -- 'Research Paper', 'Review Article', 'Case Study', 'Short Communication'
  received_date DATE,
  revised_date DATE,
  accepted_date DATE,
  published_date DATE DEFAULT CURRENT_DATE,
  doi TEXT, -- e.g. '10.5281/ijcast.2026.101'
  page_numbers TEXT, -- e.g. '1-14'
  references TEXT,
  pdf_url TEXT,
  html_content TEXT,
  sort_order INT DEFAULT 1,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EDITORIAL MEMBERS TABLE
CREATE TABLE IF NOT EXISTS editorial_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Editor-in-Chief', 'Associate Editor', 'Editorial Board Member')),
  designation TEXT,
  institution TEXT NOT NULL,
  department TEXT,
  country TEXT NOT NULL,
  email TEXT,
  orcid TEXT,
  photo_url TEXT,
  bio TEXT,
  research_area TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. RESEARCH AREAS TABLE
CREATE TABLE IF NOT EXISTS research_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL UNIQUE,
  subcategories TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 1
);

-- 7. PAGE CONTENT TABLE (CMS FOR STATIC SECTIONS)
CREATE TABLE IF NOT EXISTS page_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_key TEXT NOT NULL, -- 'about', 'ethics', 'apc', 'contact', 'privacy', 'copyright', 'home', 'other'
  section_key TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_key, section_key)
);

-- 8. MEDIA TABLE
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  file_type TEXT CHECK (file_type IN ('pdf', 'image')),
  file_size BIGINT,
  url TEXT NOT NULL,
  bucket_name TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE journal_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE volumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE editorial_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Allow ALL operations for everyone (anon + authenticated)
-- This app uses a single admin with app-level auth, not Supabase Auth
CREATE POLICY "Allow All Journal Settings" ON journal_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Volumes" ON volumes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Issues" ON issues FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Editorial Members" ON editorial_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Research Areas" ON research_areas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Page Content" ON page_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All Media" ON media FOR ALL USING (true) WITH CHECK (true);

-- 9. THESES TABLE
CREATE TABLE IF NOT EXISTS theses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  degree_type TEXT NOT NULL CHECK (degree_type IN ('PhD', 'M.Tech', 'M.Phil', 'M.Sc', 'MBA')),
  title TEXT NOT NULL,
  scholar_name TEXT NOT NULL,
  guide_names JSONB DEFAULT '[]'::jsonb,   -- Array of guide/supervisor name strings
  university TEXT NOT NULL,
  stream TEXT NOT NULL,
  year INT NOT NULL,
  abstract TEXT,
  keywords JSONB DEFAULT '[]'::jsonb,      -- Array of keyword strings
  pdf_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE theses ENABLE ROW LEVEL SECURITY;

-- Public can read published theses
CREATE POLICY "Public Read Theses" ON theses FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

-- Authenticated users (admins) can do all operations
CREATE POLICY "Admin All Theses" ON theses FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
