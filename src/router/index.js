import { createRouter, createWebHistory } from 'vue-router'

// Lazy-load pages so the initial bundle only carries the route you land on
const HomePage = () => import('../pages/HomePage.vue')
const ProjectsPage = () => import('../pages/ProjectsPage.vue')
const ContactPage = () => import('../pages/ContactPage.vue')
const NotFoundPage = () => import('../pages/NotFoundPage.vue')

const routes = [
  { path: '/', name: 'home', component: HomePage, meta: { title: 'Home' } },
  { path: '/projects', name: 'work', component: ProjectsPage, meta: { title: 'Projects' } },
  { path: '/contact', name: 'contact', component: ContactPage, meta: { title: 'Contact' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage, meta: { title: 'Not found' } }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    // Respect reduced-motion instead of forcing a smooth scroll
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return { top: 0, behavior: reduce ? 'auto' : 'smooth' }
  }
})