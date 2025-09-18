<template>
  <aside
    :class="[
      'bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 z-50',
      'fixed sm:static top-0 left-0',
      widthClass,
      translateClass,
    ]"
  >
    <div class="h-16 flex items-center justify-center border-b border-gray-100">
      <img src="@/assets/logo-tab.svg" alt="Logo" class="h-8 sm:h-10 object-contain" />
    </div>

    <nav v-if="shouldRenderNav" class="flex-1 px-3 pt-6 space-y-2 text-gray-600 overflow-y-auto">
      <router-link
        to="/dashboard"
        class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100"
        active-class="bg-gray-100 font-medium text-gray-900"
        exact
        @click="$emit('navigate')"
      >
        <i class="fas fa-columns text-gray-400 w-6 text-center"></i>
        <span v-if="showLabels">Dashboard</span>
      </router-link>

      <router-link
        to="/projects"
        class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100"
        active-class="bg-gray-100 font-medium text-gray-900"
        @click="$emit('navigate')"
      >
        <i class="fas fa-folder text-gray-400 w-6 text-center"></i>
        <span v-if="showLabels">Projects</span>
      </router-link>

      <router-link
        to="/notifications"
        class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100"
        active-class="bg-gray-100 font-medium text-gray-900"
        @click="$emit('navigate')"
      >
        <i class="fas fa-bell text-gray-400 w-6 text-center"></i>
        <span v-if="showLabels">Notifications</span>
      </router-link>

      <router-link
        to="/settings"
        class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100"
        active-class="bg-gray-100 font-medium text-gray-900"
        @click="$emit('navigate')"
      >
        <i class="fas fa-cog text-gray-400 w-6 text-center"></i>
        <span v-if="showLabels">Settings</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isDesktop: { type: Boolean, required: true },
  desktopCollapsed: { type: Boolean, required: true },
  mobileOpen: { type: Boolean, required: true },
})

defineEmits(['navigate'])

const showLabels = computed(() => {
  if (props.isDesktop) return !props.desktopCollapsed
  return props.mobileOpen
})

const shouldRenderNav = computed(() => props.isDesktop || props.mobileOpen)

const widthClass = computed(() => {
  if (props.isDesktop) return props.desktopCollapsed ? 'w-16' : 'w-64'
  return props.mobileOpen ? 'w-64' : 'w-0'
})

const translateClass = computed(() => {
  if (props.isDesktop) return ''
  return props.mobileOpen ? 'translate-x-0' : '-translate-x-full'
})
</script>
