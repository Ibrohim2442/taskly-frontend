<template>
  <main class="flex-1 overflow-auto p-6">
    <div class="grid grid-cols-3 gap-6">
      <!-- To Do -->
      <div>
        <h2 class="font-semibold mb-4">To Do</h2>
        <div class="space-y-4">
          <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p class="text-sm font-medium">Task 1</p>
            <div class="h-1 bg-gray-200 rounded mt-2">
              <div class="h-1 bg-blue-400 rounded" style="width: 40%"></div>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p class="text-sm font-medium">Task 2</p>
            <div class="h-1 bg-gray-200 rounded mt-2">
              <div class="h-1 bg-gray-300 rounded" style="width: 20%"></div>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p class="text-sm font-medium">Task</p>
            <div class="h-1 bg-gray-200 rounded mt-2">
              <div class="h-1 bg-gray-300 rounded" style="width: 20%"></div>
            </div>
          </div>
          <button class="w-full py-2 border border-gray-300 rounded-lg text-gray-600 text-sm bg-white hover:bg-gray-50">
            + Add Card
          </button>
        </div>
      </div>

      <!-- In Progress -->
      <div>
        <h2 class="font-semibold mb-4">In Progress</h2>
        <div class="space-y-4">
          <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p class="text-sm font-medium">Task A</p>
            <div class="h-1 bg-gray-200 rounded mt-2">
              <div class="h-1 bg-blue-400 rounded" style="width: 60%"></div>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
            <div>
              <p class="text-sm font-medium">Task B</p>
              <div class="h-1 bg-gray-200 rounded mt-2">
                <div class="h-1 bg-blue-400 rounded" style="width: 50%"></div>
              </div>
            </div>
            <i class="fas fa-user-circle text-gray-400"></i>
          </div>
        </div>
      </div>

      <!-- Done -->
      <div>
        <h2 class="font-semibold mb-4">Done</h2>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <p class="text-sm font-medium">Task X</p>
          <div class="h-1 bg-gray-200 rounded mt-2">
            <div class="h-1 bg-teal-400 rounded" style="width: 100%"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>

</script>
