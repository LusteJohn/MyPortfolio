import agri1 from '../assets/projects/agrilearn/pic1.jpg'
import barangay1 from '../assets/projects/barangay-explore/Screenshot 2026-09-18 233126.png'
import ojt1 from '../assets/projects/ojt-attendance/Screenshot 2026-09-14 173431.png'
import fluent1 from '../assets/projects/fluentflow/dashboard.jpg'

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
    live: true
  },
  {
    id: 'fluentflow',
    name: 'FluentFlow',
    caption: 'Leveled English drills',
    image: fluent1,
    live: true
  },
  {
    id: 'barangay-explore',
    name: 'Barangay Explore',
    caption: 'Interactive map',
    image: barangay1,
    live: true
  }
]

export { ojt1 }
