<script setup>

</script>

<template>
  <div class="flex h-screen bg-gray-50 p-4">
    <div class="flex w-full bg-white rounded-2xl shadow-sm overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div class="flex items-center justify-center h-20">
          <img
              src="@/assets/logo.png"
              alt="Logo"
              class="h-28 object-contain"
          />
        </div>
        <nav class="flex-1 px-4 space-y-2 text-gray-600">
          <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100">
            <i class="fas fa-columns text-gray-400"></i>
            <span>Dashboard</span>
          </a>
          <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100">
            <i class="fas fa-folder text-gray-400"></i>
            <span>Projects</span>
          </a>
          <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100">
            <i class="fas fa-bell text-gray-400"></i>
            <span>Notifications</span>
          </a>
          <a href="#" class="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100">
            <i class="fas fa-cog text-gray-400"></i>
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <header class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <i class="fas fa-search text-gray-400 mr-2"></i>
            <input
                type="text"
                placeholder="Search"
                class="bg-transparent focus:outline-none text-sm text-gray-600"
            />
          </div>
          <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <i class="fas fa-user text-gray-500"></i>
          </div>
        </header>

        <!-- Main Content -->
        <router-view />

      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
