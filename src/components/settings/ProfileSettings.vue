<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-gray-800">Profile Settings</h2>
    <p class="text-gray-600">Update your personal information and profile details.</p>

    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <label class="block text-gray-700 font-medium mb-2">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-2">Email Address</label>
        <input
          type="email"
          placeholder="john@example.com"
          class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>

    <div>
      <label class="block text-gray-700 font-medium mb-2">Bio</label>
      <textarea
        rows="3"
        placeholder="Tell us about yourself..."
        class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
      ></textarea>
    </div>

    <div class="flex justify-end">
      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Save Changes
      </button>
    </div>
  </div>
</template>
