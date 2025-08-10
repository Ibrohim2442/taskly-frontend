<script setup>
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth.store.js'

  const route = useRoute()
  const auth = useAuthStore()

  const hideLayoutOn = ['/login', '/register']
  const showMenu = ref(false)

  const logout = async () => {
    await auth.logout()
  }
</script>

<template>
  <div v-if="!hideLayoutOn.includes(route.path)" class="flex h-screen bg-gray-50 p-4">
    <div class="flex w-full bg-white rounded-2xl shadow-sm overflow-hidden">

      <!-- Sidebar -->
      <aside class="w-64 border-r border-gray-200 flex flex-col">
        <div class="flex items-center justify-center h-20">
          <img src="@/assets/logo.png" alt="Logo" class="h-28 object-contain" />
        </div>
        <nav class="flex-1 px-4 space-y-2 text-gray-600">
          <router-link
              to="/"
              class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <i class="fas fa-columns text-gray-400"></i>
            <span>Dashboard</span>
          </router-link>
          <router-link
              to="/projects"
              class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <i class="fas fa-folder text-gray-400"></i>
            <span>Projects</span>
          </router-link>
          <div class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 cursor-not-allowed select-none">
            <i class="fas fa-bell"></i>
            <span>Notifications</span>
            <span class="ml-auto text-xs font-bold text-red-600">Coming Soon</span>
          </div>
          <router-link
              to="/settings"
              class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <i class="fas fa-cog text-gray-400"></i>
            <span>Settings</span>
          </router-link>
        </nav>
      </aside>

      <!-- Main -->
      <div class="flex-1 flex flex-col">

        <!-- Header -->
        <header class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div
              class="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-gray-400 cursor-not-allowed select-none"
              title="Coming Soon"
          >
            <i class="fas fa-search mr-2"></i>
            <input
                type="text"
                placeholder="Search"
                disabled
                class="bg-transparent focus:outline-none text-sm text-gray-400 cursor-not-allowed"
            />
            <span class="ml-2 text-xs font-bold text-red-600">Coming Soon</span>
          </div>

          <!-- Profile -->
          <div class="relative" @mouseenter="showMenu = true" @mouseleave="showMenu = false">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
              <i class="fas fa-user text-gray-500"></i>
            </div>
            <transition name="fade">
              <div v-if="showMenu" class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <router-link
                    to="/settings"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i class="fas fa-cog mr-2 text-gray-400"></i> Settings
                </router-link>
                <button
                    @click="logout"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <i class="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </div>
            </transition>
          </div>
        </header>

        <!-- Content -->
        <router-view />
      </div>
    </div>
  </div>

  <router-view v-else />
</template>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.15s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>
