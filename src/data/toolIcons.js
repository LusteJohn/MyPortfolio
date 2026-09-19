const iconMap = {
  react: 'fa-brands fa-react',
  vue: 'fa-brands fa-vuejs',
  angular: 'fa-brands fa-angular',
  flutter: 'fa-solid fa-mobile-screen',
  android: 'fa-brands fa-android',
  ios: 'fa-brands fa-apple',
  swift: 'fa-brands fa-swift',
  kotlin: 'fa-solid fa-mobile-screen',
  java: 'fa-brands fa-java',
  javascript: 'fa-brands fa-js',
  typescript: 'fa-solid fa-code',
  node: 'fa-brands fa-node-js',
  'node.js': 'fa-brands fa-node-js',
  php: 'fa-brands fa-php',
  laravel: 'fa-brands fa-laravel',
  python: 'fa-brands fa-python',
  html: 'fa-brands fa-html5',
  css: 'fa-brands fa-css3-alt',
  bootstrap: 'fa-brands fa-bootstrap',
  tailwind: 'fa-solid fa-wind',
  mysql: 'fa-solid fa-database',
  sqlite: 'fa-solid fa-database',
  postgresql: 'fa-solid fa-database',
  mongodb: 'fa-solid fa-leaf',
  firebase: 'fa-solid fa-fire',
  supabase: 'fa-solid fa-bolt',
  git: 'fa-brands fa-git-alt',
  github: 'fa-brands fa-github',
  docker: 'fa-brands fa-docker',
  aws: 'fa-brands fa-aws',
  figma: 'fa-brands fa-figma',
  api: 'fa-solid fa-plug',
  'rest api': 'fa-solid fa-plug',
  ai: 'fa-solid fa-brain',
  tensorflow: 'fa-solid fa-brain',
  'react native': 'fa-solid fa-mobile-screen',
}

/** @param {string} toolName */
export function getToolIcon(toolName) {
  const key = (toolName || '').trim().toLowerCase()
  return iconMap[key] || 'fa-solid fa-wrench'
}