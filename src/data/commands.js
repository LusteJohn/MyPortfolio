export const commands = [
  { icon: 'fa-solid fa-house', label: 'Go to Home', sub: 'Page', type: 'page', target: 'home' },
  { icon: 'fa-solid fa-folder-open', label: 'Go to Projects', sub: 'Page', type: 'page', target: 'work' },
  { icon: 'fa-solid fa-envelope', label: 'Go to Contact', sub: 'Page', type: 'page', target: 'contact' },
  { icon: 'fa-solid fa-envelope', label: 'Copy email address', sub: 'Action', type: 'copyEmail' },
  { icon: 'fa-solid fa-file-arrow-down', label: 'Download résumé', sub: 'Action', type: 'resume' },
  { icon: 'fa-brands fa-github', label: 'Open GitHub', sub: 'Link', type: 'link', target: '#' },
  { icon: 'fa-brands fa-linkedin-in', label: 'Open LinkedIn', sub: 'Link', type: 'link', target: '#' }
]

export const CONTACT_EMAIL = 'hello@mayadelacroix.dev'
