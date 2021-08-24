<template>
  <h1>NetSuite Vue-Vite SPA Test</h1>

  <button type="button" @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit or delete
    <code>components/HelloWorld.vue</code> to start creating your SPA for NetSuite.
  </p>
</template>

<script setup>
import { defineProps, reactive } from "vue";

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
