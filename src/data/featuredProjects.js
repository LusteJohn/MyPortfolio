import agri1 from '../assets/projects/agrilearn/pic1.webp'
import barangay1 from '../assets/projects/barangay-explore/Screenshot 2026-09-18 233126.webp'
import fluent1 from '../assets/projects/fluentflow/dashboard.webp'

/**
 * Real screenshots for the home-page Projects card. Each one maps back to a
 * project id so the thumbnail can open the same modal the Projects page uses.
 */
export const featuredProjects = [
  {
    id: 'agrilearn-app',
    name: 'AgriLearnApp',
    caption: 'Offline-first learning',
    image: agri1,
    offline: true,
    badge: 'Live'
  },
  {
    id: 'fluentflow',
    name: 'FluentFlow',
    caption: 'Leveled English drills',
    image: fluent1,
    offline: true,
    badge: 'Live'
  },
  {
    id: 'barangay-explore',
    name: 'Barangay Explore',
    caption: 'Interactive map',
    image: barangay1,
    offline: false,
    badge: 'Live'
  }
]