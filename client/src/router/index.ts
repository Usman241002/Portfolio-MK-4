import { createRouter, createWebHistory } from 'vue-router'

import PortfolioLayout from '@/layouts/PortfolioLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

import HomeView from '@/views/portfolio/HomeView.vue'
import ProjectsView from '@/views/portfolio/ProjectsView.vue'
import ProjectView from '@/views/portfolio/ProjectView.vue'
import AboutView from '@/views/portfolio/AboutView.vue'
import ContactView from '@/views/portfolio/ContactView.vue'

import ComponentPreviewView from '@/views/ComponentPreviewView.vue'
import LoginView from '@/views/LoginView.vue'

import OverviewDash from '@/views/dashboard/OverviewDash.vue'
import ProjectsDash from '@/views/dashboard/ProjectsDash.vue'
import PersonalDash from '@/views/dashboard/PersonalDash.vue'
import HomeDash from '@/views/dashboard/HomeDash.vue'
import AboutDash from '@/views/dashboard/AboutDash.vue'
import ContactDash from '@/views/dashboard/ContactDash.vue'
import SettingsDash from '@/views/dashboard/SettingsDash.vue'

import useAuthStore from '@/stores/authStore.js'
import { pinia } from '@/main'

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
          path: 'projects/:id',
          name: 'project',
          component: ProjectView,
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
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dash-overview',
          component: OverviewDash,
        },
        {
          path: 'projects',
          name: 'dash-projects',
          component: ProjectsDash,
        },
        {
          path: 'personal',
          name: 'dash-personal',
          component: PersonalDash,
        },
        {
          path: 'home',
          name: 'dash-home',
          component: HomeDash,
        },
        {
          path: 'about',
          name: 'dash-about',
          component: AboutDash,
        },
        {
          path: 'contact',
          name: 'dash-contact',
          component: ContactDash,
        },
        {
          path: 'settings',
          name: 'dash-settings',
          component: SettingsDash,
        },
      ],
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore(pinia)

  if (!to.meta.requiresAuth) {
    return next()
  }

  try {
    await auth.verifyToken()
    next()
  } catch (err) {
    auth.logout()
    next('/login')
  }
})

export default router
