<!-- src/views/RegisterView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white shadow rounded-lg p-8 w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
              v-model="name"
              type="text"
              autocomplete="name"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">
            {{ getFirstError(errors.name) }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
              v-model="email"
              type="email"
              autocomplete="email"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ getFirstError(errors.email) }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
              v-model="password"
              type="password"
              autocomplete="new-password"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ getFirstError(errors.password) }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
              v-model="password_confirmation"
              type="password"
              autocomplete="new-password"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="errors.password_confirmation" class="text-red-500 text-sm mt-1">
            {{ getFirstError(errors.password_confirmation) }}
          </p>
        </div>

        <!-- Submit -->
        <button
            type="submit"
            class="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
            :disabled="auth.loading"
        >
          {{ auth.loading ? "Signing up..." : "Sign Up" }}
        </button>
      </form>

      <!-- Login link -->
      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">
          Log in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth.store";

  const name = ref("");
  const email = ref("");
  const password = ref("");
  const password_confirmation = ref("");
  const auth = useAuthStore();
  const router = useRouter();

  const errors = computed(() => auth.errors);

  function getFirstError(errorField) {
    if (Array.isArray(errorField)) return errorField[0];
    return errorField;
  }

  async function handleRegister() {
    const success = await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    });

    if (success) {
      router.push({ name: "Login" });
    }
  }
</script>
