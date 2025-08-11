<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  isOpen: Boolean,
})
</script>

<template>
  <aside
    :class="[
      'border-r border-gray-200 flex flex-col transition-all duration-300',
      isOpen ? 'w-64' : 'w-0 overflow-hidden'
    ]"
  >

    <div class="flex items-center justify-center h-20">
      <!-- LOGO ENDI BU YERDA EMAS -->
    </div>
    <nav v-if="isOpen" class="flex-1 px-4 space-y-2 text-gray-600">
      <!-- sidebar links -->
      <router-link to="/" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100">
        <i class="fas fa-columns text-gray-400"></i>
        <span>Dashboard</span>
      </router-link>
      <router-link to="/projects" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100">
        <i class="fas fa-folder text-gray-400"></i>
        <span>Projects</span>
      </router-link>
      <div class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 cursor-not-allowed select-none">
        <i class="fas fa-bell"></i>
        <span>Notifications</span>
        <span class="ml-auto text-xs font-bold text-red-600">Coming Soon</span>
      </div>
      <router-link to="/settings" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100">
        <i class="fas fa-cog text-gray-400"></i>
        <span>Settings</span>
      </router-link>
    </nav>
  </aside>
</template>
