<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-gray-800">Security</h2>

    <!-- Change Password -->
    <div class="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-3">
      <h3 class="font-medium text-gray-700">Change Password</h3>
      <p class="text-sm text-gray-500">Update your account password regularly to keep it secure.</p>

      <input
        type="password"
        placeholder="Current Password"
        class="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="New Password"
        class="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        class="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400"
      />

      <div class="flex justify-end">
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Update Password
        </button>
      </div>
    </div>

    <!-- Two-Factor Authentication -->
    <div class="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-3">
      <h3 class="font-medium text-gray-700">Two-Factor Authentication</h3>
      <p class="text-sm text-gray-500">
        Add an extra layer of protection by enabling two-factor authentication.
      </p>
      <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
        Enable 2FA
      </button>
    </div>
  </div>
</template>

<script setup>
// demo only — no logic yet
</script>
