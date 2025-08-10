<script setup>
import { ref, watch, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store.js'

const auth = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')

const setUserData = () => {
  if (auth.user) {
    name.value = auth.user.name || ''
    email.value = auth.user.email || ''
  }
}

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchUser()
  }
  setUserData()
})

watch(() => auth.user, () => {
  setUserData()
}, { deep: true })
</script>

<template>
  <div class="space-y-6 max-w-md mx-auto">
    <div>
      <label class="block text-sm font-medium text-gray-600 mb-1">Name</label>
      <input
          v-model="name"
          type="text"
          placeholder="Your name"
          class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl
                 focus:outline-none focus:ring-2 focus:ring-blue-100
                 focus:border-blue-400 transition-shadow shadow-sm"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
      <input
          v-model="email"
          type="email"
          placeholder="you@example.com"
          class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl
                 focus:outline-none focus:ring-2 focus:ring-blue-100
                 focus:border-blue-400 transition-shadow shadow-sm"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-600 mb-1">Password</label>
      <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl
                 focus:outline-none focus:ring-2 focus:ring-blue-100
                 focus:border-blue-400 transition-shadow shadow-sm"
      />
    </div>

    <div class="pt-4 text-center">
      <button
          disabled
          class="relative overflow-hidden px-6 py-2 bg-blue-500 text-white font-medium rounded-xl
             hover:bg-blue-600 focus:outline-none focus:ring-2
             focus:ring-blue-200 transition opacity-80 cursor-not-allowed"
      >
        Save Changes

        <span
            class="absolute bg-black bg-opacity-30 text-white text-xs font-bold
             px-4 py-1 rounded pointer-events-none select-none"
            style="
        left: 0;
        bottom: 0;
        transform: rotate(-45deg) translate(-20%, 50%);
        transform-origin: left bottom;
        white-space: nowrap;
        user-select: none;
      "
        >
      Coming Soon
    </span>
      </button>
    </div>

  </div>
</template>
