<template>
  <div>
    <h1>Welcome to Taskly</h1>

    <h1>Count is {{ store.count }}</h1>
    <h2>Double is {{ store.doubleCount}}</h2>
    <button @click="store.increment(1)">Increment</button>
    <button @click="store.waitAndAdd">Wait + Increment</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter.js';

const store = useCounterStore();
</script>
