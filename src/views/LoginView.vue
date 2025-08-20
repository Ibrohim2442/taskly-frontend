<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white shadow rounded-lg p-8 w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center mb-6">Log In</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
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

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
              v-model="password"
              type="password"
              autocomplete="current-password"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ getFirstError(errors.password) }}
          </p>
        </div>

        <div class="text-sm flex items-center space-x-2 text-gray-400 cursor-not-allowed select-none">
          <a href="#" @click.prevent class="hover:underline pointer-events-none">
            Forgot password?
          </a>
          <span class="text-xs font-bold text-red-600">Coming Soon</span>
        </div>

        <button
            type="submit"
            class="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
            :disabled="auth.loading"
        >
          {{ auth.loading ? "Logging in..." : "Log In" }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/register" class="text-blue-600 hover:underline">
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth.store';

  const email = ref('');
  const password = ref('');
  const auth = useAuthStore();
  const router = useRouter();

  const errors = computed(() => auth.errors);

  function getFirstError(errorField) {
    if (Array.isArray(errorField)) return errorField[0];
    return errorField;
  }

  async function handleLogin() {
    const success = await auth.login({
      email: email.value,
      password: password.value
    });

    if (success) {
      await auth.fetchUser();
      router.push({ name: 'Dashboard' });
    }
  }
</script>
