import { createRouter, createWebHistory } from 'vue-router'

import PortfolioLayout from '@/layouts/PortfolioLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

import HomeView from '@/views/portfolio/HomeView.vue'
import ProjectsView from '@/views/portfolio/ProjectsView.vue'
import AboutView from '@/views/portfolio/AboutView.vue'
import ContactView from '@/views/portfolio/ContactView.vue'
import ComponentPreviewView from '@/views/ComponentPreviewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: PortfolioLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'projects',
          name: 'projects',
          component: ProjectsView,
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView,
        },
        {
          path: 'contact',
          name: 'contact',
          component: ContactView,
        },
      ],
    },
    {
      path: '/components',
      name: 'components',
      component: ComponentPreviewView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardLayout,
      children: [],
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

export default router
