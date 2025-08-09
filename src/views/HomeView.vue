<template>
  <div class="flex items-center justify-center p-6">
    <div class="bg-white border border-gray-200 rounded-lg p-6 max-w-md w-full text-center">
      <h1 class="text-xl font-semibold text-gray-800 mb-3">
        Welcome to Taskly
      </h1>

      <h2 class="text-base text-gray-500 mb-6">
        Hello world!
      </h2>

      <div class="border border-gray-200 p-4 rounded-md mb-6">
        <p class="text-gray-600">
          Count: <span class="text-gray-900 font-medium">{{ store.count }}</span>
        </p>
        <p class="text-gray-600">
          Double: <span class="text-gray-900 font-medium">{{ store.doubleCount }}</span>
        </p>
      </div>

      <div class="flex gap-3 justify-center">
        <button
            @click="store.increment(1)"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition"
        >
          Increment
        </button>

        <button
            @click="store.waitAndAdd"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition"
        >
          Wait + Increment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter.js';

const store = useCounterStore();
</script>
