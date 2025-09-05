<template>
  <div
      class="p-8 bg-white rounded-2xl shadow-lg w-full max-w-4xl mx-auto min-h-[70vh] flex flex-col justify-center mt-8">
    <h1 class="text-2xl font-semibold mb-6 text-gray-800">Settings</h1>

    <div class="flex space-x-6 border-b border-gray-200 mb-8">
      <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="selectTab(tab)"
          :disabled="!tab.component"
          class="pb-3 text-sm font-medium relative transition flex items-center space-x-2"
          :class="[
          activeTab.name === tab.name
            ? 'text-blue-600 border-b-2 border-blue-600 cursor-pointer'
            : !tab.component
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-500 hover:text-gray-700 cursor-pointer'
        ]"
      >
        <span>{{ tab.name }}</span>
        <span v-if="!tab.component" class="text-xs text-red-600 font-semibold">Coming Soon</span>
      </button>
    </div>

    <div>
      <component v-if="activeTab.component" :is="activeTab.component"/>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import ProfileSettings from '@/components/settings/ProfileSettings'

  const tabs = [
    {name: 'Profile Settings', component: ProfileSettings},
    {name: 'App preferences'},
    {name: 'Security'},
  ]

  const activeTab = ref(tabs[0])

  // Activate only if the component is active when the tab is clicked
  function selectTab(tab) {
    if (tab.component) {
      activeTab.value = tab
    }
  }
</script>