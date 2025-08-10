<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Register</h2>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <input
              v-model="name"
              type="text"
              placeholder="Name"
              autocomplete="name"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ getFirstError(errors.name) }}</p>
        </div>

        <div>
          <input
              v-model="email"
              type="email"
              placeholder="Email"
              autocomplete="email"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ getFirstError(errors.email) }}</p>
        </div>

        <div>
          <input
              v-model="password"
              type="password"
              placeholder="Password"
              autocomplete="new-password"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p v-if="errors.password" class="text-red-600 text-sm mt-1">{{ getFirstError(errors.password) }}</p>
        </div>

        <div>
          <input
              v-model="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              autocomplete="new-password"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p v-if="errors.password_confirmation" class="text-red-600 text-sm mt-1">{{ getFirstError(errors.password_confirmation) }}</p>
        </div>

        <button
            :disabled="loading"
            type="submit"
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {{ loading ? "Loading..." : "Register" }}
        </button>
      </form>

      <p v-if="errors.general" class="mt-4 text-red-600 font-semibold text-center">{{ errors.general }}</p>

      <p class="mt-4 text-center text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-green-600 hover:underline">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth.store";

  const router = useRouter();
  const auth = useAuthStore();

  const name = ref("");
  const email = ref("");
  const password = ref("");
  const password_confirmation = ref("");
  const loading = ref(false);
  const errors = ref({});

  function getFirstError(errorField) {
    if (Array.isArray(errorField)) return errorField[0];
    return errorField;
  }

  async function submit() {
    loading.value = true;
    errors.value = {};

    if (password.value !== password_confirmation.value) {
      errors.value.password_confirmation = "Passwords do not match";
      loading.value = false;
      return;
    }

    try {
      await auth.register(name.value, email.value, password.value, password_confirmation.value);
      await auth.fetchUser();
      router.push({ name: "Dashboard" });
    } catch (err) {
      if (err.response && err.response.status === 422) {
        errors.value = err.response.data.errors || {};
      } else {
        errors.value.general = "Registration failed: check your input";
      }
    } finally {
      loading.value = false;
    }
  }
</script>
