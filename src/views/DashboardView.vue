<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r flex flex-col">
      <div class="flex items-center justify-center h-16 border-b">
        <h1 class="text-xl font-bold">Logo</h1>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-2">
        <a href="#" class="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded">
          <i class="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
        <a href="#" class="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded">
          <i class="fas fa-folder"></i>
          <span>Projects</span>
        </a>
        <a href="#" class="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded">
          <i class="fas fa-bell"></i>
          <span>Notifications</span>
        </a>
        <a href="#" class="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </a>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="flex items-center justify-between bg-white border-b px-6 h-16">
        <div class="flex items-center space-x-3">
          <input
              type="text"
              placeholder="Search"
              class="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <i class="fas fa-user text-gray-500"></i>
        </div>
      </header>

      <!-- Kanban Board -->
      <main class="flex-1 overflow-auto p-6">
        <div class="grid grid-cols-3 gap-6">
          <!-- To Do -->
          <div>
            <h2 class="text-lg font-semibold mb-4">To Do</h2>
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg shadow">
                <p class="font-medium">Task 1</p>
                <div class="h-2 bg-gray-200 rounded mt-2">
                  <div class="h-2 bg-blue-400 rounded" style="width: 40%"></div>
                </div>
              </div>
              <div class="bg-white p-4 rounded-lg shadow">
                <p class="font-medium">Task 2</p>
                <div class="h-2 bg-gray-200 rounded mt-2">
                  <div class="h-2 bg-gray-400 rounded" style="width: 20%"></div>
                </div>
              </div>
              <div class="bg-white p-4 rounded-lg shadow">
                <p class="font-medium">Task</p>
                <div class="h-2 bg-gray-200 rounded mt-2">
                  <div class="h-2 bg-gray-400 rounded" style="width: 20%"></div>
                </div>
              </div>
              <button class="w-full py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">
                + Add Card
              </button>
            </div>
          </div>

          <!-- In Progress -->
          <div>
            <h2 class="text-lg font-semibold mb-4">In Progress</h2>
            <div class="space-y-4">
              <div class="bg-white p-4 rounded-lg shadow">
                <p class="font-medium">Task A</p>
                <div class="h-2 bg-gray-200 rounded mt-2">
                  <div class="h-2 bg-blue-400 rounded" style="width: 60%"></div>
                </div>
              </div>
              <div class="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p class="font-medium">Task B</p>
                  <div class="h-2 bg-gray-200 rounded mt-2">
                    <div class="h-2 bg-blue-400 rounded" style="width: 50%"></div>
                  </div>
                </div>
                <i class="fas fa-user-circle text-gray-400"></i>
              </div>
            </div>
          </div>

          <!-- Done -->
          <div>
            <h2 class="text-lg font-semibold mb-4">Done</h2>
            <div class="bg-white p-4 rounded-lg shadow">
              <p class="font-medium">Task X</p>
              <div class="h-2 bg-gray-200 rounded mt-2">
                <div class="h-2 bg-teal-400 rounded" style="width: 100%"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// No imports needed for icons now — handled globally
</script>
