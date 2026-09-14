// ========================================================
// IJCAST Academic Seed Data Layer
// Supports dual-mode persistence (Supabase + Local Demo Store)
// ========================================================

export const initialJournalSettings = {
  id: 'setting-1',
  journal_name: 'International Journal of Commerce, Arts, Science and Technology',
  short_name: 'IJCAST',
  issn: 'ISSN 2349-8812',
  eissn: 'e-ISSN 2349-9923',
  doi_prefix: '10.5281/ijcast',
  publisher: 'Gyan Akshar Sanskriti Foundation',
  publication_frequency: 'Quarterly (4 Issues Per Year)',
  language: 'English',
  contact_email: 'editor@ijcast.org',
  alternate_email: 'ijcast.journal@gmail.com',
  phone: '+91 (011) 2874-5690',
  postal_address: 'IJCAST Editorial Office, Center for Academic Research & Excellence, Sector 12, Dwarka, New Delhi 110075, India',
  copyright_statement: 'Copyright © IJCAST. Authors retain full publishing rights under Open Access licensing.',
  license_name: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
  license_url: 'https://creativecommons.org/licenses/by/4.0/',
  is_open_access: true,
  open_access_statement: 'IJCAST is a peer-reviewed open access journal. All published articles are instantly available online for global readership without subscription walls.',
  updated_at: new Date().toISOString()
};

export const initialResearchAreas = [
  {
    id: 'ra-1',
    category: 'Commerce & Management',
    subcategories: ['Commerce', 'Accounting', 'Finance', 'Banking', 'Marketing', 'Management', 'Human Resources', 'Entrepreneurship', 'Business Studies', 'Economics'],
    sort_order: 1
  },
  {
    id: 'ra-2',
    category: 'Arts & Humanities',
    subcategories: ['Literature', 'Languages', 'History', 'Philosophy', 'Fine Arts', 'Cultural Studies', 'Journalism', 'Mass Communication'],
    sort_order: 2
  },
  {
    id: 'ra-3',
    category: 'Social Sciences',
    subcategories: ['Sociology', 'Psychology', 'Political Science', 'Public Administration', 'Social Work', 'Geography', 'Development Studies'],
    sort_order: 3
  },
  {
    id: 'ra-4',
    category: 'Science',
    subcategories: ['Physics', 'Chemistry', 'Mathematics', 'Statistics', 'Biology', 'Biotechnology', 'Environmental Science', 'Life Sciences'],
    sort_order: 4
  },
  {
    id: 'ra-5',
    category: 'Computer Science & Technology',
    subcategories: ['Computer Science', 'Artificial Intelligence', 'Machine Learning', 'Data Science', 'Cybersecurity', 'IoT', 'Cloud Computing', 'Blockchain', 'Information Technology'],
    sort_order: 5
  },
  {
    id: 'ra-6',
    category: 'Engineering',
    subcategories: ['Electrical Engineering', 'Electronics', 'Mechanical Engineering', 'Civil Engineering', 'Computer Engineering', 'Renewable Energy', 'Robotics', 'Automation'],
    sort_order: 6
  },
  {
    id: 'ra-7',
    category: 'Education',
    subcategories: ['School Education', 'Higher Education', 'Educational Technology', 'Educational Administration', 'Curriculum', 'Assessment', 'Teacher Education'],
    sort_order: 7
  },
  {
    id: 'ra-8',
    category: 'Interdisciplinary Research',
    subcategories: ['Cross-disciplinary Studies', 'Socio-Technological Innovations', 'Environmental Economics', 'Bio-Informatics & Ethics'],
    sort_order: 8
  }
];

export const initialVolumes = [
  {
    id: 'vol-2026-1',
    volume_number: 1,
    year: 2026,
    description: 'Volume 1 (2026) - Relaunched Multidisciplinary Series',
    status: 'Active',
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'vol-2025-5',
    volume_number: 5,
    year: 2025,
    description: 'Volume 5 (2025) - Historical Archive',
    status: 'Archived',
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'vol-2024-4',
    volume_number: 4,
    year: 2024,
    description: 'Volume 4 (2024) - Historical Archive',
    status: 'Archived',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const initialIssues = [
  {
    id: 'iss-2026-1-1',
    volume_id: 'vol-2026-1',
    issue_number: 1,
    month_range: 'January - February',
    year: 2026,
    pub_date: '2026-02-28',
    cover_url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop',
    editorial_note: 'Inaugural revived issue focusing on AI in Commerce, Green Technology, and Modern Educational Frameworks.',
    sort_order: 1,
    created_at: '2026-01-10T00:00:00Z'
  },
  {
    id: 'iss-2026-1-2',
    volume_id: 'vol-2026-1',
    issue_number: 2,
    month_range: 'March - April',
    year: 2026,
    pub_date: '2026-04-30',
    cover_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    editorial_note: 'Special issue on Interdisciplinary Advances in Social Sciences, Humanities, and Data Science.',
    sort_order: 2,
    created_at: '2026-03-01T00:00:00Z'
  },
  {
    id: 'iss-2025-5-6',
    volume_id: 'vol-2025-5',
    issue_number: 6,
    month_range: 'November - December',
    year: 2025,
    pub_date: '2025-12-31',
    cover_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
    editorial_note: 'Year-end review of emerging research methodologies across engineering and physical sciences.',
    sort_order: 1,
    created_at: '2025-11-01T00:00:00Z'
  }
];

export const initialArticles = [
  {
    id: 'art-101',
    issue_id: 'iss-2026-1-1',
    title: 'Architectural Frameworks for Enterprise Artificial Intelligence in Supply Chain Financial Analytics',
    authors: [
      { name: 'Dr. Rajesh V. Sharma', affiliation: 'Department of Commerce & Business Studies, University of Delhi, New Delhi, India', email: 'r.sharma@du.ac.in', orcid: '0000-0002-1823-9941', is_corresponding: true },
      { name: 'Prof. Elena Rostova', affiliation: 'School of Finance, Management Institute of Zurich, Zurich, Switzerland', email: 'elena.rostova@miz.ch', orcid: '0000-0001-9238-4412', is_corresponding: false }
    ],
    corresponding_author: 'Dr. Rajesh V. Sharma',
    corresponding_author_email: 'r.sharma@du.ac.in',
    orcids: ['0000-0002-1823-9941', '0000-0001-9238-4412'],
    abstract: 'Modern supply chain ecosystems generate vast transactional streams requiring real-time predictive risk assessment. This paper presents a novel hybrid deep learning model combined with graph neural networks (GNNs) designed for financial auditability and predictive anomaly detection. Empirical testing across 12,000 global logistics transactions demonstrates a 94.6% precision rate in forecasting liquidity bottlenecks.',
    keywords: ['Financial Analytics', 'Artificial Intelligence', 'Supply Chain Management', 'Graph Neural Networks', 'Predictive Auditing'],
    research_area: 'Commerce & Management',
    article_type: 'Research Paper',
    received_date: '2026-01-05',
    revised_date: '2026-01-28',
    accepted_date: '2026-02-10',
    published_date: '2026-02-28',
    doi: '10.5281/ijcast.2026.101',
    page_numbers: '1–16',
    references: `1. Goodfellow, I., Bengio, Y., & Courville, A. (2016). Deep Learning. MIT Press.
2. Sharma, R. V. (2024). Digital Transformations in Indian Banking Logistics. Journal of Financial Tech, 12(3), 45-62.
3. Zhang, K., et al. (2025). Graph Neural Networks in Corporate Auditing. IEEE Access, 13, 10294-10308.`,
    pdf_url: '/sample-paper.pdf',
    html_content: 'Full text manuscript view is rendered natively in PDF format for optimal academic indexing.',
    sort_order: 1,
    is_published: true,
    created_at: '2026-02-28T00:00:00Z'
  },
  {
    id: 'art-102',
    issue_id: 'iss-2026-1-1',
    title: 'Evaluating Renewable Microgrid Dynamics in Suburban Ecosystems: A Socio-Technical Assessment',
    authors: [
      { name: 'Dr. Marcus Vance', affiliation: 'Department of Electrical Engineering, Melbourne Institute of Technology, Australia', email: 'mvance@mit.edu.au', orcid: '0000-0003-4412-8801', is_corresponding: true },
      { name: 'Priya Narang', affiliation: 'Department of Environmental Science, Jawaharlal Nehru University, New Delhi, India', email: 'pnarang@jnu.ac.in', orcid: '0000-0002-1019-3384', is_corresponding: false }
    ],
    corresponding_author: 'Dr. Marcus Vance',
    corresponding_author_email: 'mvance@mit.edu.au',
    orcids: ['0000-0003-4412-8801', '0000-0002-1019-3384'],
    abstract: 'Suburban energy infrastructure faces mounting stress due to rapid electrification. This study investigates photovoltaic microgrids augmented with decentralized battery storage systems across 50 suburban micro-districts over 24 months. Results indicate a 42% reduction in peak load stress on the primary municipal grid.',
    keywords: ['Renewable Energy', 'Microgrid', 'Photovoltaic', 'Smart Grids', 'Sustainable Infrastructure'],
    research_area: 'Engineering',
    article_type: 'Research Paper',
    received_date: '2026-01-12',
    revised_date: '2026-02-02',
    accepted_date: '2026-02-15',
    published_date: '2026-02-28',
    doi: '10.5281/ijcast.2026.102',
    page_numbers: '17–32',
    references: `1. Vance, M., & Narang, P. (2025). Microgrid Stabilization Metrics. IEEE Transactions on Smart Grid, 16(2), 204-219.
2. International Energy Agency (IEA). (2024). Suburban Energy Outlook Report.`,
    pdf_url: '/sample-paper.pdf',
    html_content: '',
    sort_order: 2,
    is_published: true,
    created_at: '2026-02-28T00:00:00Z'
  },
  {
    id: 'art-103',
    issue_id: 'iss-2026-1-2',
    title: 'Digital Humanities and Narrative Structure in 21st-Century Post-Colonial Literature',
    authors: [
      { name: 'Dr. Amara Thorne', affiliation: 'Faculty of Arts & Humanities, Oxford Brookes University, United Kingdom', email: 'athorne@brookes.ac.uk', orcid: '0000-0001-5092-7711', is_corresponding: true }
    ],
    corresponding_author: 'Dr. Amara Thorne',
    corresponding_author_email: 'athorne@brookes.ac.uk',
    orcids: ['0000-0001-5092-7711'],
    abstract: 'This paper applies computational text analysis and semantic mapping to a corpus of 140 post-colonial novels published between 2000 and 2025. The study reveals a significant shift in spatial metaphors and narrative non-linearity, highlighting the intersection of oral storytelling traditions with digital media formats.',
    keywords: ['Digital Humanities', 'Post-Colonial Literature', 'Text Mining', 'Narrative Theory', 'Cultural Studies'],
    research_area: 'Arts & Humanities',
    article_type: 'Review Article',
    received_date: '2026-02-10',
    revised_date: '2026-03-01',
    accepted_date: '2026-03-20',
    published_date: '2026-04-30',
    doi: '10.5281/ijcast.2026.103',
    page_numbers: '33–48',
    references: `1. Thorne, A. (2023). Computational Criticism in Modern Prose. Humanities Quarterly, 45(1), 12-29.
2. Moretti, F. (2013). Distant Reading. Verso Books.`,
    pdf_url: '/sample-paper.pdf',
    html_content: '',
    sort_order: 1,
    is_published: true,
    created_at: '2026-04-30T00:00:00Z'
  }
];

export const initialEditorialMembers = [
  {
    id: 'ed-1',
    name: 'Prof. (Dr.) A. K. Choudhury',
    role: 'Editor-in-Chief',
    designation: 'Senior Professor & Dean of Academic Research',
    institution: 'National Institute of Commerce & Technological Sciences',
    department: 'Department of Multidisciplinary Studies',
    country: 'India',
    email: 'editor.in.chief@ijcast.org',
    orcid: '0000-0001-8842-1200',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    bio: 'Prof. Choudhury has over 28 years of academic leadership, authoring 8 books and over 120 peer-reviewed journal publications in financial economics and interdisciplinary management.',
    research_area: 'Commerce & Management',
    is_active: true,
    sort_order: 1
  },
  {
    id: 'ed-2',
    name: 'Dr. Sarah Jenkins',
    role: 'Associate Editor',
    designation: 'Associate Professor of Computer Science',
    institution: 'University of Edinburgh',
    department: 'School of Informatics',
    country: 'United Kingdom',
    email: 's.jenkins@ed.ac.uk',
    orcid: '0000-0002-9901-4432',
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    bio: 'Specializing in machine learning ethics, automated natural language processing, and cybersecurity governance in distributed networks.',
    research_area: 'Computer Science & Technology',
    is_active: true,
    sort_order: 2
  },
  {
    id: 'ed-3',
    name: 'Prof. Hiroshi Tanaka',
    role: 'Associate Editor',
    designation: 'Chair Professor of Applied Physics & Energy Systems',
    institution: 'Tokyo Institute of Technology',
    department: 'Department of Energy Science',
    country: 'Japan',
    email: 'tanaka.h@titech.ac.jp',
    orcid: '0000-0003-1284-9021',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    bio: 'Pioneer in solid-state energy storage and renewable materials physics, leading international collaborative energy initiatives across Asia.',
    research_area: 'Engineering',
    is_active: true,
    sort_order: 3
  },
  {
    id: 'ed-4',
    name: 'Dr. Beverly N. Okoro',
    role: 'Editorial Board Member',
    designation: 'Senior Lecturer in Sociology & Public Policy',
    institution: 'University of Cape Town',
    department: 'Department of Sociology',
    country: 'South Africa',
    email: 'b.okoro@uct.ac.za',
    orcid: '0000-0002-5531-1029',
    photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    bio: 'Researcher focused on socio-economic development, gender inequality, and community health policy models in developing economies.',
    research_area: 'Social Sciences',
    is_active: true,
    sort_order: 4
  }
];

export const initialPageContent = [
  {
    id: 'pg-1',
    page_key: 'about',
    section_key: 'history',
    title: 'Journal History & Revival Relaunch',
    content: `The **International Journal of Commerce, Arts, Science and Technology (IJCAST)** was originally established to provide a dedicated academic forum bridging foundational humanities with rapid technological advancements. 

Following a strategic editorial revitalization in 2026, IJCAST was relaunched as a modernized, open-access, multidisciplinary peer-reviewed publication. The journal continues its legacy of rigorous academic oversight while introducing seamless digital archiving, universal DOI integration, and enhanced editorial standards.`
  },
  {
    id: 'pg-2',
    page_key: 'ethics',
    section_key: 'ai_policy',
    title: 'AI / Generative AI Policy',
    content: `IJCAST adheres strictly to international publication standards regarding modern technology tools:
1. **Authorship Eligibility**: Generative AI tools (e.g. ChatGPT, Claude, Copilot) cannot be credited as authors or co-authors. Authorship implies legal accountability and intellectual ownership.
2. **Author Responsibility**: Authors remain 100% accountable for the originality, factual accuracy, data integrity, and citation fidelity of their manuscript.
3. **Mandatory Disclosure**: Any substantive use of AI tools for data analysis, code generation, or draft synthesis must be explicitly disclosed in the Methods or Acknowledgments section.
4. **Reviewer Confidentiality**: Peer reviewers must never upload confidential manuscripts to external generative AI platforms.
5. **Reference Verification**: All citations generated or assisted by AI must be independently verified by the author.`
  },
  {
    id: 'pg-3',
    page_key: 'apc',
    section_key: 'charges',
    title: 'Article Processing Charges & Refund Policy',
    content: `### Article Processing Charge (APC)
IJCAST operates as an open-access journal. To cover typesetting, digital archiving, DOI registration, and server upkeep, a modest APC applies upon official manuscript acceptance:

- **National Authors (India)**: INR 3,500
- **International Authors**: USD 75

> **Important**: No fee is required upon initial submission or during the editorial screening & peer review phase. APC is payable strictly AFTER official acceptance.

### Waiver Policy
IJCAST provides partial or full fee waivers for researchers from low-income economies or authors with demonstrated financial hardship upon editorial review.

### Refund Policy
- If an author withdraws a manuscript **prior to formal acceptance**, no fee is charged.
- Once an APC is paid and the paper enters final typesetting/publication, refunds are not issued except in documented cases of technical duplicate payment.`
  },
  {
    id: 'pg-4',
    page_key: 'privacy',
    section_key: 'editorial_privacy',
    title: 'Privacy & Data Protection Policy',
    content: `The names, institutional affiliations, and email addresses entered into the IJCAST website will be used exclusively for the stated academic purposes of this journal. They will not be made available for any other purpose or shared with third parties.`
  }
];

export const initialMedia = [
  {
    id: 'med-1',
    filename: 'sample-paper.pdf',
    file_type: 'pdf',
    file_size: 420500,
    url: '/sample-paper.pdf',
    bucket_name: 'journal-pdfs',
    uploaded_at: '2026-01-01T00:00:00Z'
  }
];

// ========================================================
// THESIS DATA
// ========================================================
export const initialTheses = [
  {
    id: 'thesis-1',
    degree_type: 'PhD',
    title: 'Machine Learning Approaches for Predictive Analytics in Supply Chain Management',
    scholar_name: 'Mr. Arvind Sharma',
    guide_names: ['Prof. (Dr.) R. K. Mehra', 'Dr. Sunita Patel'],
    university: 'Jawaharlal Nehru University, New Delhi',
    stream: 'Computer Science & Technology',
    year: 2025,
    abstract: 'This thesis investigates the application of supervised and unsupervised machine learning algorithms to forecast supply chain disruptions and optimize logistics networks across Indian manufacturing sectors.',
    keywords: ['Machine Learning', 'Supply Chain', 'Predictive Analytics', 'Logistics'],
    pdf_url: '',
    is_published: true,
    created_at: '2025-06-01T00:00:00Z'
  },
  {
    id: 'thesis-2',
    degree_type: 'M.Tech',
    title: 'Design and Simulation of Energy-Efficient Microgrid Systems for Rural Electrification',
    scholar_name: 'Ms. Priya Nair',
    guide_names: ['Dr. Vikram Singh'],
    university: 'IIT Bombay, Mumbai',
    stream: 'Engineering',
    year: 2024,
    abstract: 'This thesis presents a simulation-based study of hybrid photovoltaic-battery microgrid systems designed for off-grid rural communities, achieving significant reduction in energy deficit and carbon footprint.',
    keywords: ['Microgrid', 'Renewable Energy', 'Rural Electrification', 'Simulation'],
    pdf_url: '',
    is_published: true,
    created_at: '2024-12-01T00:00:00Z'
  }
];
