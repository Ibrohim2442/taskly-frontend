<template>
  <div class="p-6">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-semibold text-gray-800">Notifications</h1>
        <button
          @click="clearAll"
          class="px-4 py-2 bg-red-600 text-white rounded-xl shadow-sm hover:bg-red-700 transition"
        >
          Clear All
        </button>
      </div>

      <!-- Empty state -->
      <div
        v-if="!notifications.length"
        class="flex flex-col items-center justify-center py-20 text-gray-500"
      >
        <i class="fas fa-bell text-4xl mb-3"></i>
        <p>No notifications yet 🎉</p>
      </div>

      <!-- Notifications list -->
      <div v-else class="space-y-4">
        <div
          v-for="n in notifications"
          :key="n.id"
          class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex items-start justify-between"
        >
          <div class="flex gap-3">
            <div
              class="w-10 h-10 flex items-center justify-center rounded-full"
              :class="iconBg(n.type)"
            >
              <i :class="icon(n.type)"></i>
            </div>
            <div>
              <p class="text-gray-800 font-medium">{{ n.title }}</p>
              <p class="text-gray-500 text-sm">{{ n.message }}</p>
              <span class="text-xs text-gray-400">{{ n.time }}</span>
            </div>
          </div>
          <button @click="remove(n.id)" class="text-gray-400 hover:text-red-500 transition">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Demo data
const notifications = ref([
  {
    id: 1,
    type: 'success',
    title: 'Project created',
    message: 'Your new project "Taskly App" was successfully created.',
    time: '2 min ago',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Storage almost full',
    message: 'You are using 95% of your available space.',
    time: '10 min ago',
  },
  {
    id: 3,
    type: 'info',
    title: 'New board assigned',
    message: 'A new board "UI Fixes" has been assigned to you.',
    time: '1 hour ago',
  },
])

function remove(id) {
  notifications.value = notifications.value.filter((n) => n.id !== id)
}

function clearAll() {
  notifications.value = []
}

function icon(type) {
  switch (type) {
    case 'success':
      return 'fas fa-check text-green-600'
    case 'warning':
      return 'fas fa-exclamation-triangle text-yellow-600'
    case 'info':
      return 'fas fa-info-circle text-blue-600'
    default:
      return 'fas fa-bell text-gray-500'
  }
}

function iconBg(type) {
  switch (type) {
    case 'success':
      return 'bg-green-100'
    case 'warning':
      return 'bg-yellow-100'
    case 'info':
      return 'bg-blue-100'
    default:
      return 'bg-gray-100'
  }
}
</script>
