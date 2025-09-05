import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

import RegisterView from '@/views/RegisterView'
import LoginView from '@/views/LoginView'
import DashboardView from '@/views/DashboardView'
import ProjectsView from '@/views/ProjectsView'
import SettingsView from '@/views/SettingsView'

const routes = [
  { path: '/', redirect: { name: 'Dashboard' } },
  { path: '/register', name: 'Register', component: RegisterView, meta: { guest: true } },
  { path: '/login', name: 'Login', component: LoginView, meta: { guest: true } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/projects', name: 'Projects', component: ProjectsView, meta: { requiresAuth: true } },
  { path: '/settings', name: 'Settings', component: SettingsView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  // Auth-required routes
  if (to.meta.requiresAuth) {
    if (!auth.isAuthenticated) {
      return next({ name: 'Login' })
    }

    if (!auth.user) {
      try {
        await auth.fetchUser()
        if (!auth.user) {
          await auth.logout()
          return next({ name: 'Login' })
        }
      } catch {
        await auth.logout()
        return next({ name: 'Login' })
      }
    }
  }

  // Guest-only routes
  if (to.meta.guest && auth.isAuthenticated) {
    return next({ name: 'Dashboard' })
  }

  next()
})

export default router
