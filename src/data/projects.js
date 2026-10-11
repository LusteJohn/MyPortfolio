import agri1 from '../assets/projects/agrilearn/pic1.jpg'

/**
 * Context tags deliberately describe *situation*, not technology — the stack
 * lives in `tools`, the situation in `context`. `role` and `year` feed the
 * card footer; `live`/`code` drive the "Live ↗" / "Code ↗" buttons and are
 * rendered only when present.
 */
export const projects = [
  // ---------- Featured ----------
  {
    id: 'agrilearn-app',
    icon: 'fa-solid fa-seedling',
    title: 'AgriLearnApp',
    summary: 'Offline learning app for organic agriculture, built for a capstone client.',
    problem: 'Students had printed organic-agriculture modules but no connection to study them with.',
    outcome: 'Printed modules became an offline learning app that works on the phone with no live connection.',
    challenge: 'Making lesson content, progress, and quizzes all read and write reliably with zero connectivity.',
    context: ['Capstone'],
    tools: ['React Native', 'SQLite', 'Expo'],
    status: 'shipped',
    platform: 'mobile',
    traits: ['offline-first'],
    offline: true,
    featured: true,
    role: 'Client',
    images: 'agrilearn'
  },
  {
    id: 'ojt-attendance',
    icon: 'fa-solid fa-clipboard-user',
    title: 'OJT Attendance Management System',
    summary: 'Attendance tracking system extended with client-requested features.',
    problem: 'A client needed attendance tracking, then kept asking for it to cover more of their actual workflow.',
    outcome: 'Shipped an attendance system the client actively uses, extended with every feature they requested along the way.',
    challenge: 'Scoping and adding client features on an existing system instead of building from scratch.',
    context: ['OJT'],
    tools: ['Vue.js', 'PHP', 'Firebase', 'Supabase'],
    status: 'shipped',
    platform: 'web',
    traits: ['pwa'],
    featured: true,
    role: 'Client',
    year: 2026,
    images: 'ojt-attendance'
  },
  {
    id: 'eggplant-leaf-care-ai',
    icon: 'fa-solid fa-leaf',
    title: 'EggPlantLeafCare AI',
    summary: 'AI-assisted detection and care guidance for eggplant leaf disease.',
    problem: 'Farmers spot eggplant leaf disease late, and diagnosis without an expert is guesswork.',
    outcome: 'An in-progress tool that identifies disease from a photo and returns concrete care steps.',
    challenge: 'Getting reliable detection from limited sample images and returning advice that is actually actionable.',
    context: ['Personal project'],
    tools: ['Vue.js', 'Express.js', 'Python', 'Supabase'],
    status: 'building',
    platform: 'web',
    traits: ['ai', 'pwa'],
    featured: true,
    role: 'Solo',
    year: 2026,
    images: 'egg_plant_ai'
  },

  // ---------- Shipped & live (grid) ----------
  {
    id: 'fluentflow',
    icon: 'fa-solid fa-language',
    title: 'FluentFlow',
    summary: 'Situational English learning app with leveled exercises and weekly progress tracking.',
    problem: 'A teacher needed one app that could serve beginners and advanced learners at the same time.',
    outcome: 'Leveled exercises from spelling to sentence building, with per-student progress the teacher can read weekly.',
    challenge: 'Keeping three difficulty tiers distinct without duplicating the content or the screens.',
    context: ['Client work'],
    tools: ['React Native', 'SQLite', 'Expo'],
    status: 'shipped',
    platform: 'mobile',
    traits: ['offline-first'],
    offline: true,
    role: 'Client',
    images: 'fluentflow'
  },
  {
    id: 'dns-config-app',
    icon: 'fa-solid fa-server',
    title: 'DNS Server Configuration App',
    summary: 'Automates subdomain registration and server folder provisioning.',
    problem: 'Every new project meant manually registering a subdomain and hand-creating the matching server folder.',
    outcome: 'One registration creates the subdomain and the folder, then handles push and pull for the project.',
    challenge: 'Chaining a third-party API call, a filesystem action, and a git workflow into one step.',
    context: ['OJT'],
    tools: ['Python', 'Flask'],
    status: 'shipped',
    platform: 'system',
    role: 'Client',
    year: 2026,
    images: 'dns'
  },
  {
    id: 'green-nest',
    icon: 'fa-solid fa-leaf',
    title: 'Green Nest',
    summary: 'A small business website for a local plant shop.',
    problem: 'A local plant shop had no web presence to show what they sell.',
    outcome: 'A business site that showcases their products and services.',
    challenge: 'Presenting a small catalogue clearly on a tight scope.',
    context: ['Small business'],
    tools: ['HTML', 'CSS', 'JavaScript'],
    status: 'shipped',
    platform: 'web',
    role: 'Client',
    year: 2026,
    images: 'green-nest'
  },
  {
    id: 'barangay-explore',
    icon: 'fa-solid fa-city',
    title: 'Barangay Explore',
    summary: 'Interactive map for exploring Philippine barangays, with filtering.',
    problem: 'Barangay data exists as flat lists that are painful to browse.',
    outcome: 'A map-based explorer where barangays are searchable and filterable visually.',
    challenge: 'Rendering map data and keeping filtering responsive.',
    context: ['Personal project'],
    tools: ['JavaScript', 'Leaflet', 'JSON'],
    status: 'shipped',
    platform: 'web',
    role: 'Solo',
    year: 2026,
    images: 'barangay-explore'
  },
  {
    id: 'myedutour',
    icon: 'fa-solid fa-map-location-dot',
    title: 'MyEduTour',
    summary: 'Educational tour planning app, currently in development.',
    problem: 'Planning a school field trip means juggling itineraries, destinations, and checklists by hand.',
    outcome: 'A planning app for itineraries, destinations, and trip checklists, built out feature by feature.',
    challenge: 'Shaping data models for trips that vary widely between schools.',
    context: ['Personal project'],
    tools: ['Vue.js', 'Laravel', 'PostgreSQL'],
    status: 'building',
    platform: 'web',
    traits: ['pwa'],
    role: 'Solo'
  },

  // ---------- Local — not yet published ----------
  {
    id: 'disaster-relief-tracking',
    icon: 'fa-solid fa-truck-medical',
    title: 'Disaster Relief Distribution Tracking System',
    summary: 'Tracks relief goods distribution to affected areas.',
    problem: 'Relief distribution was tracked on paper, so nobody could answer who received what.',
    outcome: 'Goods in, goods out — per-barangay allocation, relief pack inventory, and an audit of every distribution.',
    challenge: 'Keeping inventory and allocation consistent when relief arrives in uneven, overlapping batches.',
    context: ['Local build'],
    tools: ['PHP', 'Laravel', 'PostgreSQL', 'Tailwind'],
    status: 'local',
    platform: 'system',
    role: 'Client',
    images: 'drdts'
  },
  {
    id: 'svpmfs',
    icon: 'fa-solid fa-diagram-project',
    title: 'SVPMFS',
    summary: 'Internal records and process management system.',
    problem: 'An internal records workflow ran entirely on paper with no way to search history.',
    outcome: 'Role-based access, approval steps, and searchable document history replacing the paper workflow.',
    challenge: 'Modeling an existing offline process faithfully before automating it.',
    context: ['Local build'],
    tools: ['PHP', 'Laravel', 'PostgreSQL', 'Tailwind'],
    status: 'local',
    platform: 'system',
    role: 'Client',
    images: 'svpmfs'
  },
  {
    id: 'sari-sari-store',
    icon: 'fa-solid fa-store',
    title: 'Simple Sari-Sari Store Mini System',
    summary: 'Lightweight inventory and sales tracker for a small sari-sari store.',
    problem: 'A single-store owner was tracking sales and stock by memory and notebook.',
    outcome: 'A daily sales log with running stock counts, sized to fit one screen for one person.',
    challenge: 'Keeping the interface small enough to actually be used during a busy day.',
    context: ['Personal project'],
    tools: ['PHP', 'Laravel', 'MySQL'],
    status: 'local',
    platform: 'system',
    role: 'Solo'
  },
  {
    id: 'agrilearn-school-web',
    icon: 'fa-solid fa-chalkboard-user',
    title: 'AgriLearnSchool (Web)',
    summary: 'Web companion to AgriLearnApp for classroom use.',
    problem: 'Teachers needed the same organic-agriculture content on a classroom screen, not a phone.',
    outcome: 'A teacher-side lesson site that syncs progress from the mobile app once a connection returns.',
    challenge: 'Merging offline progress from student phones without losing or duplicating records.',
    context: ['Personal project'],
    tools: ['Vue.js', 'Laravel', 'Supabase'],
    status: 'local',
    platform: 'web',
    role: 'Solo'
  }
]

/** Cards promoted to the large featured treatment at the top of the page. */
export const featuredProjectIds = ['agrilearn-app', 'ojt-attendance', 'eggplant-leaf-care-ai']

export const projectStatusMeta = {
  shipped: { label: 'Live', class: 'is-shipped' },
  building: { label: 'Building', class: 'is-building' },
  local: { label: 'Local', class: 'is-local' }
}

/** Counts used by the summary line under the headline. */
export function projectCounts() {
  return projects.reduce(
    (acc, p) => {
      acc[p.status] += 1
      return acc
    },
    { shipped: 0, building: 0, local: 0, total: projects.length }
  )
}

/** How many chips to show before collapsing — keeps card heights equal. */
export const MAX_TECH_CHIPS = 4
