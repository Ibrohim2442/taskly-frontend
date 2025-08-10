<script setup>
import { ref } from "vue"
import ProfileSettings from "@/components/settings/ProfileSettings.vue"

const tabs = [
  { name: "Profile Settings", component: ProfileSettings },
  // keyingi tablar
]

const activeTab = ref(tabs[0])
</script>

<template>
  <div class="p-8 bg-white rounded-2xl shadow-lg w-full max-w-4xl mx-auto min-h-[70vh] flex flex-col justify-center mt-8">
    <h1 class="text-2xl font-semibold mb-6 text-gray-800">Settings</h1>

    <div class="flex space-x-6 border-b border-gray-200 mb-8">
      <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="activeTab = tab"
          class="pb-3 text-sm font-medium relative transition"
          :class="activeTab.name === tab.name
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-gray-700'"
      >
        {{ tab.name }}
      </button>
    </div>

    <div>
      <component :is="activeTab.component" />
    </div>
  </div>
</template>
