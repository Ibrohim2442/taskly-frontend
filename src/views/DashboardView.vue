<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="w-full bg-white shadow-lg border-b-4 border-green-600">
      <div class="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 class="text-3xl font-extrabold text-green-700 tracking-wide">Dashboard</h1>

        <div class="flex items-center space-x-4">
          <button
              @click="showProfile = !showProfile"
              class="text-green-700 hover:text-green-900 font-semibold focus:outline-none"
          >
            Profile
          </button>

          <button
              @click="logout"
              class="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md shadow-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <main class="flex-grow flex flex-col items-center justify-center">
      <h2 class="text-5xl font-bold text-gray-800">Hello, {{ user.name }}!</h2>
    </main>

    <!-- Profile info modal -->
    <div
        v-if="showProfile"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="showProfile = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h3 class="text-2xl font-semibold mb-4">Your Profile</h3>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>User ID:</strong> {{ user.id }}</p>

        <button
            @click="showProfile = false"
            class="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

const auth = useAuthStore();
const router = useRouter();
const showProfile = ref(false);

const user = computed(() => auth.user);

function logout() {
  auth.logout().then(() => {
    router.push({ name: "Login" });
  });
}
</script>
