<script setup>

</script>

<template>
  <div>
    <!-- Minimal Navbar -->
    <nav class="border-b border-gray-200 bg-white">
      <div class="max-w-6xl mx-auto px-4 py-3 flex gap-6 text-gray-700">
        <router-link
            to="/"
            class="hover:text-black transition"
        >
          Home
        </router-link>
        <router-link
            to="/about"
            class="hover:text-black transition"
        >
          About
        </router-link>
      </div>
    </nav>

    <!-- Page content -->
    <main class="max-w-6xl mx-auto p-6">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
  .router-link-active {
    font-weight: 500;
    color: black;
  }
</style>
