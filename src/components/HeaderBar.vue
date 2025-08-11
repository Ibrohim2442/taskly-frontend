<script setup>
import { ref, defineEmits } from 'vue'
import { useAuthStore } from '@/stores/auth.store.js'

const showMenu = ref(false)
const auth = useAuthStore()

const emits = defineEmits(['toggle-sidebar'])

const logout = async () => {
  await auth.logout()
}

// Toggle tugma bosilganda event yuboriladi
const toggleSidebar = () => {
  emits('toggle-sidebar')
}
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
    <!-- Left side: toggle + logo -->
    <div class="flex items-center space-x-4">
      <button @click="toggleSidebar" aria-label="Toggle sidebar" class="text-gray-600 focus:outline-none">
        <i class="fas fa-bars text-xl"></i>
      </button>
      <img src="@/assets/logo-full.svg" alt="Logo" class="h-10 object-contain" />
    </div>

    <!-- Right side: search + profile -->
    <div class="flex items-center space-x-6">
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

      <div class="relative" @mouseenter="showMenu = true" @mouseleave="showMenu = false">
        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
          <i class="fas fa-user text-gray-500"></i>
        </div>
        <transition name="fade">
          <div
              v-if="showMenu"
              class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
    </div>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
