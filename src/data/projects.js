export const projects = [
  // ---------- Shipped & live (featured first) ----------
  {
    id: 'agrilearn-app',
    icon: 'fa-solid fa-seedling',
    title: 'AgriLearnApp',
    summary: 'Offline learning app for organic agriculture, built for a capstone client.',
    description:
      'Turns printed organic-agriculture modules into an offline-first mobile learning app, so students can study without a live connection.',
    tags: ['Offline-first', 'Mobile', 'Capstone'],
    status: 'shipped',
    offline: true,
    featured: true,
    images: 'agrilearn',
    tools: ['React Native', 'SQLite', 'Expo']
  },
  {
    id: 'ojt-attendance',
    icon: 'fa-solid fa-clipboard-user',
    title: 'OJT Attendance Management System',
    summary: 'Attendance tracking system extended with client-requested features.',
    description:
      'An attendance management system built for a client during OJT, expanded with the additional features and functions they asked for along the way.',
    tags: ['PWA', 'Client work', 'OJT'],
    status: 'shipped',
    featured: true,
    images: 'ojt-attendance',
    tools: ['Vue.js', 'PHP', 'Render', 'Firebase', 'Supabase']
  },
  {
    id: 'eggplant-leaf-care-ai',
    icon: 'fa-solid fa-leaf',
    title: 'EggPlantLeafCare AI',
    summary: 'AI-assisted detection and care guidance for eggplant leaf disease.',
    description:
      'An AI-assisted tool for identifying eggplant leaf disease and suggesting care steps — currently in active development.',
    tags: ['AI', 'PWA'],
    status: 'building',
    featured: true,
    images: 'egg_plant_ai',
    tools: ['Vue.js', 'Express.js', 'Python', 'Supabase', 'Render', 'Firebase']
  },

  // ---------- Shipped & live (grid) ----------
  {
    id: 'fluentflow',
    icon: 'fa-solid fa-language',
    title: 'FluentFlow',
    summary: 'Situational English learning app with leveled exercises and weekly progress tracking.',
    description:
      'A situational English learning app for a teacher client — spelling for beginners, fill-in-the-blank for intermediate, sentence building for advanced, with weekly progress tracking per student.',
    tags: ['Offline-first', 'Mobile', 'Client work'],
    status: 'shipped',
    offline: true,
    images: 'fluentflow',
    tools: ['React Native', 'SQLite', 'Expo']
  },
  {
    id: 'dns-config-app',
    icon: 'fa-solid fa-server',
    title: 'DNS Server Configuration App',
    summary: 'Automates subdomain registration and server folder provisioning.',
    description:
      'Registers a subdomain through a third-party API, then automatically creates the matching folder on the server and handles push/pull for the project — built during OJT.',
    tags: ['Automation', 'Client work', 'OJT'],
    status: 'shipped',
    images: 'dns',
    tools: ['Python', 'Flask']
  },
  {
    id: 'green-nest',
    icon: 'fa-solid fa-leaf',
    title: 'Green Nest',
    summary: 'A small business website for a local plant shop.',
    description:
      'A small business website for a local plant shop, built to showcase their products and services.',
    tags: ['Web', 'Small Business'],
    status: 'shipped',
    images: 'green-nest',
    tools: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 'barangay-explore',
    icon: 'fa-solid fa-city',
    title: 'Barangay Explore',
    summary: 'A personal web application for exploring Philippine barangays through an interactive map and filtering interface.',
    description:
      'A personal web application for exploring Philippine barangays through an interactive map and filtering interface, built to practice API integration and front-end development.',
    tags: ['Web'],
    status: 'shipped',
    images: 'barangay-explore',
    tools: ['HTML', 'CSS', 'JavaScript', 'Leaflet', 'JSON']
  },
  {
    id: 'myedutour',
    icon: 'fa-solid fa-map-location-dot',
    title: 'MyEduTour',
    summary: 'Educational tour planning app, currently in development.',
    description:
      'An educational trip/tour planning app, currently being built out feature by feature.',
    tags: ['PWA'],
    status: 'building',
    caseStudy: 'Planning itineraries, destinations, and checklists for school field trips.'
  },

  // ---------- Local — not yet published ----------
  {
    id: 'disaster-relief-tracking',
    icon: 'fa-solid fa-truck-medical',
    title: 'Disaster Relief Distribution Tracking System',
    summary: 'Tracks relief goods distribution to affected areas.',
    description:
      'A system for tracking the distribution of relief goods to affected areas — working locally, not yet deployed.',
    tags: ['Web', 'Client work'],
    status: 'local',
    images: 'drdts',
    tools: ['PHP', 'PostgreSQL', 'Laravel', 'Tailwind'],
    caseStudy: 'Goods in, goods out — per-barangay allocation, relief pack inventory, and audit of who received what.'
  },
  {
    id: 'svpmfs',
    icon: 'fa-solid fa-diagram-project',
    title: 'SVPMFS',
    summary: 'Internal records and process management system.',
    description:
      'A system built for internal record and process management — running locally, not yet deployed.',
    tags: ['Web', 'Client work'],
    status: 'local',
    images: 'svpmfs',
    tools: ['PHP', 'PostgreSQL', 'Laravel', 'Tailwind'],
    caseStudy: 'Replaces a paper records workflow with role-based access, approval steps, and searchable document history.'
  },
  {
    id: 'sari-sari-store',
    icon: 'fa-solid fa-store',
    title: 'Simple Sari-Sari Store Mini System',
    summary: 'Lightweight inventory and sales tracker for a small sari-sari store.',
    description:
      'A minimal inventory and sales system sized for a small sari-sari store — running locally, not yet deployed.',
    tags: ['Web'],
    status: 'local',
    caseStudy: 'Daily sales log with running stock counts, sized for a single-store owner on one screen.'
  },
  {
    id: 'agrilearn-school-web',
    icon: 'fa-solid fa-chalkboard-user',
    title: 'AgriLearnSchool (Web)',
    summary: 'Web companion to AgriLearnApp for classroom use.',
    description:
      'A web-based companion to AgriLearnApp, built for classroom-based organic agriculture lessons — running locally, not yet deployed.',
    tags: ['Web'],
    status: 'local',
    caseStudy: 'Teacher-side lesson delivery that syncs progress from the mobile app once a connection returns.'
  }
]

/** Cards promoted to the large featured treatment at the top of the page. */
export const featuredProjectIds = ['agrilearn-app', 'ojt-attendance', 'eggplant-leaf-care-ai']

export const projectStatusMeta = {
  shipped: { label: 'Live', class: 'is-shipped', chip: 'Shipped' },
  building: { label: 'Building', class: 'is-building', chip: 'In progress' },
  local: { label: 'Local', class: 'is-local', chip: 'Not deployed' }
}

/** Counts used by the summary line under the headline. */
export function projectCounts() {
  return projects.reduce(
    (acc, p) => {
      acc[p.status] += 1
      return acc
    },
    { shipped: 0, building: 0, local: 0, total: 0 }
  )
}
