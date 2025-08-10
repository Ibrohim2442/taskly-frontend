<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form @submit.prevent="login" class="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
      <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>

      <div>
        <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            autocomplete="email"
        />
        <p v-if="errors.email" class="text-red-600 mt-1 text-sm">{{ getFirstError(errors.email) }}</p>
      </div>

      <div>
        <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            autocomplete="current-password"
        />
        <p v-if="errors.password" class="text-red-600 mt-1 text-sm">{{ getFirstError(errors.password) }}</p>
      </div>

      <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          :disabled="loading"
      >
        {{ loading ? "Logging in..." : "Login" }}
      </button>

      <p v-if="errors.general" class="text-red-600 text-center mt-2">{{ errors.general }}</p>

      <p class="text-center mt-4 text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-green-600 hover:underline">Register here</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth.store";

  const email = ref("");
  const password = ref("");
  const errors = ref({});
  const loading = ref(false);

  const auth = useAuthStore();
  const router = useRouter();

  function getFirstError(errorField) {
    if (Array.isArray(errorField)) return errorField[0];
    return errorField;
  }

  async function login() {
    loading.value = true;
    errors.value = {};

    try {
      const data = await auth.login(email.value, password.value);
      console.log("Frontend login data:", data);

      if (data.errors) {
        // Agar validation errors bo'lsa, ularni errors.value ga o‘rnating
        errors.value = data.errors;
        loading.value = false;
        return;
      }

      if (!data.token) {
        errors.value.general = "Login failed. Check credentials.";
        loading.value = false;
        return;
      }

      await auth.fetchUser();
      router.push({ name: "Dashboard" });
    } catch (err) {
      errors.value.general = "An unexpected error occurred.";
    } finally {
      loading.value = false;
    }
  }
</script>
