<template>
  <header
    class="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-40"
  >
    <div class="flex items-center space-x-3">
      <button
        @click="$emit('toggle-sidebar')"
        aria-label="Toggle sidebar"
        class="text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <i class="fas fa-bars text-xl"></i>
      </button>

      <router-link to="/" class="flex items-center">
        <img src="@/assets/logo-full.svg" alt="Logo" class="h-8 sm:h-10 object-contain" />
      </router-link>
    </div>

    <div class="flex items-center space-x-6">
      <div
        class="hidden sm:flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 text-gray-400"
      >
        <i class="fas fa-search mr-2"></i>
        <input
          type="text"
          placeholder="Search"
          disabled
          class="bg-transparent focus:outline-none text-sm text-gray-400 cursor-not-allowed"
        />
      </div>

      <div class="relative" ref="dropdownRef">
        <button
          class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center focus:outline-none"
          @click="toggleMenu"
          aria-haspopup="true"
          :aria-expanded="showMenu.toString()"
        >
          <i class="fas fa-user text-gray-500"></i>
        </button>

        <transition name="fade">
          <div
            v-if="showMenu"
            class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <router-link
              to="/settings"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              @click="closeMenu"
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
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/auth.store.js'

const showMenu = ref(false)
const dropdownRef = ref(null)
const auth = useAuthStore()

const toggleMenu = () => (showMenu.value = !showMenu.value)
const closeMenu = () => (showMenu.value = false)

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    showMenu.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

const logout = async () => {
  await auth.logout()
  showMenu.value = false
}
</script>

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
