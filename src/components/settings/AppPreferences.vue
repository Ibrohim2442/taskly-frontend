<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-gray-800">App Preferences</h2>

    <!-- Theme -->
    <div class="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-3">
      <h3 class="font-medium text-gray-700">Theme</h3>
      <p class="text-sm text-gray-500">Choose how the app appears on your device.</p>
      <select class="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400">
        <option>Light</option>
        <option>Dark</option>
        <option>System Default</option>
      </select>
    </div>

    <!-- Language -->
    <div class="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-3">
      <h3 class="font-medium text-gray-700">Language</h3>
      <p class="text-sm text-gray-500">Select your preferred language for the app.</p>
      <select class="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400">
        <option>English</option>
        <option>Spanish</option>
        <option>French</option>
        <option>Uzbek</option>
      </select>
    </div>

    <!-- Notifications -->
    <div class="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-3">
      <h3 class="font-medium text-gray-700">Notifications</h3>
      <p class="text-sm text-gray-500">Enable or disable app notifications.</p>
      <button
        class="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
      >
        Enable Notifications
      </button>
    </div>
  </div>
</template>

<script setup>
// demo only — no logic yet
</script>
