/**
 * Grouped by how recruiters read a CV: frontend first, then mobile,
 * backend, database, and tooling last. Editors and project-management
 * apps are deliberately excluded — they aren't skills.
 */
export const toolGroups = [
  {
    name: 'Frontend',
    items: [
      { icon: 'fa-brands fa-html5', label: 'HTML' },
      { icon: 'fa-brands fa-css3-alt', label: 'CSS' },
      { icon: 'fa-brands fa-js', label: 'JavaScript' },
      { icon: 'fa-solid fa-wind', label: 'Tailwind CSS' },
      { icon: 'fa-brands fa-react', label: 'React' },
      { icon: 'fa-brands fa-vuejs', label: 'Vue.js' },
      { icon: 'fa-brands fa-bootstrap', label: 'Bootstrap' }
    ]
  },
  {
    name: 'Mobile',
    items: [
      { icon: 'fa-solid fa-mobile-screen-button', label: 'React Native' },
      { icon: 'fa-solid fa-rocket', label: 'Expo' }
    ]
  },
  {
    name: 'Backend',
    items: [
      { icon: 'fa-brands fa-node-js', label: 'Node.js' },
      { icon: 'fa-brands fa-php', label: 'PHP' },
      { icon: 'fa-brands fa-laravel', label: 'Laravel' },
      { icon: 'fa-brands fa-python', label: 'Python' }
    ]
  },
  {
    name: 'Database',
    items: [
      { icon: 'fa-solid fa-database', label: 'PostgreSQL' },
      { icon: 'fa-solid fa-database', label: 'MySQL' },
      { icon: 'fa-solid fa-database', label: 'SQLite' },
      { icon: 'fa-solid fa-fire', label: 'Firebase' },
      { icon: 'fa-solid fa-bolt', label: 'Supabase' }
    ]
  },
  {
    name: 'Tools',
    items: [
      { icon: 'fa-brands fa-github', label: 'GitHub' },
      { icon: 'fa-solid fa-caret-up', label: 'Vercel' },
      { icon: 'fa-solid fa-cloud', label: 'Render' },
      { icon: 'fa-brands fa-figma', label: 'Figma' },
      { icon: 'fa-solid fa-book-open', label: 'Storybook' }
    ]
  }
]

// Kept for anything importing the flat list
export const tools = toolGroups.flatMap((group) => group.items)
