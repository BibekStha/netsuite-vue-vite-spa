<template>
  <div class="flex flex-col justify-center items-center min-h-screen font-sans text-gray-700">
    <h1 class="font-thin text-3xl my-10">NetSuite Vue-Vite SPA Test</h1>

    <button type="button" @click="state.count++" class="shadow px-5 py-2 rounded-xl my-5">count is: {{ state.count }}</button>
    <p class="my-5">
      Edit or delete
      <code class="font-mono text-black">components/HelloWorld.vue</code> to start creating your SPA for NetSuite.
    </p>
  </div>
</template>

<script setup>
import { defineProps, onMounted, reactive } from "vue";

defineProps({
  msg: String,
});

onMounted(() => {
  fetch(`http://localhost:${import.meta.env.VITE_API_SERVER_PORT}`, {
    method: `POST`,
    headers: {
      mode: "no-cors",
    },
  })
    .then((data) => data.json())
    .then((res) => console.log(res));
});

const state = reactive({ count: 0 });
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
