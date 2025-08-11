<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

import Sidebar from '@/components/Sidebar.vue'
import HeaderBar from '@/components/HeaderBar.vue'

const route = useRoute()
const hideLayoutOn = ['/login', '/register']

// Sidebar ko'rinishi holati (default: false — yopiq)
const sidebarOpen = ref(false)

// HeaderBar dan toggle event qabul qilamiz
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div v-if="!hideLayoutOn.includes(route.path)" class="flex h-screen bg-gray-50 p-4">
    <div class="flex w-full bg-white rounded-2xl shadow-sm overflow-hidden">
      <Sidebar :isOpen="sidebarOpen" />
      <div class="flex-1 flex flex-col">
        <HeaderBar @toggle-sidebar="toggleSidebar" />
        <router-view />
      </div>
    </div>
  </div>

  <router-view v-else />
</template>
