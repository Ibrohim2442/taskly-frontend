<template>
  <!-- Only show layout if route is not hidden -->
  <div v-if="!hideLayoutOn.includes(route.path)" class="flex h-screen bg-gray-100 p-2 sm:p-4">
    <div class="flex w-full bg-white rounded-2xl shadow-sm overflow-hidden">
      <!-- Sidebar -->
      <Sidebar :isOpen="sidebarOpen" />

      <!-- Main content -->
      <div class="flex-1 flex flex-col min-w-0">
        <HeaderBar @toggle-sidebar="toggleSidebar" />
        <main class="flex-1 overflow-auto">
          <router-view />
        </main>
      </div>
    </div>
  </div>

  <!-- For login/register pages -->
  <router-view v-else />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

import Sidebar from '@/components/Sidebar.vue'
import HeaderBar from '@/components/HeaderBar.vue'

const route = useRoute()
const hideLayoutOn = ['/login', '/register']

// Sidebar state
const sidebarOpen = ref(false)

// Toggle from HeaderBar
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>
