export const projects = [
  // ---------- Shipped & live ----------
  {
    id: 'agrilearn-app',
    icon: 'fa-solid fa-seedling',
    title: 'AgriLearnApp',
    summary: 'Offline learning app for organic agriculture, built for a capstone client.',
    description:
      'Turns printed organic-agriculture modules into an offline-first mobile learning app, so students can study without a live connection.',
    tags: ['Offline-first', 'Mobile', 'Capstone'],
    status: 'shipped',
    images: 'agrilearn'
  },
  {
    id: 'fluentflow',
    icon: 'fa-solid fa-language',
    title: 'FluentFlow',
    summary: 'Situational English learning app with leveled exercises and weekly progress tracking.',
    description:
      'A situational English learning app for a teacher client — spelling for beginners, fill-in-the-blank for intermediate, sentence building for advanced, with weekly progress tracking per student.',
    tags: ['Mobile', 'Education'],
    status: 'shipped'
  },
  {
    id: 'ojt-attendance',
    icon: 'fa-solid fa-clipboard-user',
    title: 'OJT Attendance Management System',
    summary: 'Attendance tracking system extended with client-requested features.',
    description:
      'An attendance management system built for a client during OJT, expanded with the additional features and functions they asked for along the way.',
    tags: ['Web', 'OJT'],
    status: 'shipped'
  },
  {
    id: 'dns-config-app',
    icon: 'fa-solid fa-server',
    title: 'DNS Server Configuration App',
    summary: 'Automates subdomain registration and server folder provisioning.',
    description:
      'Registers a subdomain through a third-party API, then automatically creates the matching folder on the server and handles push/pull for the project — built during OJT.',
    tags: ['Automation', 'API', 'OJT'],
    status: 'shipped'
  },

  // ---------- Currently building ----------
  {
    id: 'eggplant-leaf-care-ai',
    icon: 'fa-solid fa-leaf',
    title: 'EggPlantLeafCare AI',
    summary: 'AI-assisted detection and care guidance for eggplant leaf disease.',
    description:
      'An AI-assisted tool for identifying eggplant leaf disease and suggesting care steps — currently in active development.',
    tags: ['AI', 'Mobile', 'In progress'],
    status: 'building'
  },
  {
    id: 'myedutour',
    icon: 'fa-solid fa-map-location-dot',
    title: 'MyEduTour',
    summary: 'Educational tour planning app, currently in development.',
    description:
      'An educational trip/tour planning app, currently being built out feature by feature.',
    tags: ['Mobile', 'In progress'],
    status: 'building'
  },

  // ---------- Local — not yet published ----------
  {
    id: 'disaster-relief-tracking',
    icon: 'fa-solid fa-truck-medical',
    title: 'Disaster Relief Distribution Tracking System',
    summary: 'Tracks relief goods distribution to affected areas.',
    description:
      'A system for tracking the distribution of relief goods to affected areas — working locally, not yet deployed.',
    tags: ['Web', 'Local'],
    status: 'local'
  },
  {
    id: 'sari-sari-store',
    icon: 'fa-solid fa-store',
    title: 'Simple Sari-Sari Store Mini System',
    summary: 'Lightweight inventory and sales tracker for a small sari-sari store.',
    description:
      'A minimal inventory and sales system sized for a small sari-sari store — running locally, not yet deployed.',
    tags: ['Web', 'Local'],
    status: 'local'
  },
  {
    id: 'agrilearn-school-web',
    icon: 'fa-solid fa-chalkboard-user',
    title: 'AgriLearnSchool (Web)',
    summary: 'Web companion to AgriLearnApp for classroom use.',
    description:
      'A web-based companion to AgriLearnApp, built for classroom-based organic agriculture lessons — running locally, not yet deployed.',
    tags: ['Web', 'Local'],
    status: 'local'
  },
  {
    id: 'svpmfs',
    icon: 'fa-solid fa-diagram-project',
    title: 'SVPMFS',
    summary: 'Internal records and process management system.',
    description:
      'A system built for internal record and process management — running locally, not yet deployed.',
    tags: ['Web', 'Local'],
    status: 'local'
  },
  {
    id: 'school-portal',
    icon: 'fa-solid fa-graduation-cap',
    title: 'School Portal',
    summary: 'Portal for school announcements, records, and student info.',
    description:
      'A portal for school announcements, records, and student information — running locally, not yet deployed.',
    tags: ['Web', 'Local'],
    status: 'local'
  },
  {
    id: 'simple-blog',
    icon: 'fa-solid fa-blog',
    title: 'Simple Blog Application',
    summary: 'A minimal blogging platform built to practice CRUD and auth.',
    description:
      'A small blogging platform built to practice core CRUD operations and authentication — running locally, not yet deployed.',
    tags: ['Web', 'Local'],
    status: 'local'
  }
]