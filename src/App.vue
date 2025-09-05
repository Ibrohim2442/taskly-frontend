<template>
  <div v-if="!hideLayoutOn.includes(route.path)" class="flex h-screen">
    <Sidebar
      :is-desktop="isDesktop"
      :desktop-collapsed="desktopCollapsed"
      :mobile-open="mobileOpen"
      @navigate="mobileOpen = false"
    />
    <div
      v-if="mobileOpen && !isDesktop"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm sm:hidden z-40"
      @click="mobileOpen = false"
    />
    <div class="flex-1 flex flex-col min-w-0">
      <HeaderBar @toggle-sidebar="toggleSidebar" />
      <main class="flex-1 overflow-auto p-2 sm:p-4">
        <router-view />
      </main>
    </div>
  </div>
  <router-view v-else />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

import Sidebar from '@/components/layout/Sidebar.vue'
import HeaderBar from '@/components/layout/HeaderBar.vue'

const route = useRoute()
const hideLayoutOn = ['/login', '/register']

// Responsive breakpoint (>= 640px = desktop)
const mq = window.matchMedia('(min-width: 640px)')
const isDesktop = ref(mq.matches)

// Sidebar state
const desktopCollapsed = ref(false)
const mobileOpen = ref(false)

// Update layout when viewport changes
const updateViewport = () => {
  isDesktop.value = mq.matches
  mobileOpen.value = false
}

onMounted(() => {
  mq.addEventListener('change', updateViewport)
  updateViewport()
})

onBeforeUnmount(() => {
  mq.removeEventListener('change', updateViewport)
})

// Toggle sidebar
const toggleSidebar = () => {
  if (isDesktop.value) {
    desktopCollapsed.value = !desktopCollapsed.value
  } else {
    mobileOpen.value = !mobileOpen.value
  }
}
</script>
