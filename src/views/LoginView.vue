<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
    <div
        class="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100 p-8 w-full max-w-sm space-y-6">

      <!-- Heading -->
      <h2 class="text-3xl font-bold text-center text-gray-900">Log In</h2>
      <p class="text-center text-sm text-gray-500">Welcome back! Please sign in 🔑</p>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              class="w-full h-11 px-4 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              placeholder="••••••••"
              autocomplete="current-password"
              class="w-full h-11 px-4 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ getFirstError(errors.password) }}
          </p>
        </div>

        <!-- Forgot password (coming soon) -->
        <div class="text-sm flex items-center space-x-2 text-gray-400 cursor-not-allowed select-none">
          <a href="#" @click.prevent class="hover:underline pointer-events-none">
            Forgot password?
          </a>
          <span class="text-xs font-bold text-red-600">Coming Soon</span>
        </div>

        <!-- Submit -->
        <button
            type="submit"
            class="w-full h-11 bg-blue-600 text-white text-sm font-semibold tracking-wide rounded-lg hover:bg-blue-700 active:scale-[.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="auth.loading"
        >
          {{ auth.loading ? "Logging in..." : "Log In" }}
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center text-sm text-gray-500">
        Don't have an account?
        <router-link to="/register" class="text-blue-600 font-medium hover:underline">
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
  import {ref, computed} from 'vue';
  import {useRouter} from 'vue-router';
  import {useAuthStore} from '@/stores/auth.store';

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
      router.push({name: 'Dashboard'});
    }
  }
</script>
