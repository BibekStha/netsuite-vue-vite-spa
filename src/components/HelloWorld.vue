<template>
  <div class="flex flex-col justify-center items-center min-h-screen font-sans text-gray-700">
    <h1 class="font-thin text-3xl mb-10">NetSuite Vue-Vite SPA Test</h1>

    <button type="button" @click="state.count++" class="shadow px-5 py-2 rounded-xl my-5">count is: {{ state.count }}</button>
    <p class="my-5">
      Edit or delete
      <code class="font-mono text-black">components/HelloWorld.vue</code> to start creating your SPA for NetSuite.
    </p>
    <p class="my-5">
      Response from NetSuite RestLet: <span class="text-indigo-500">{{ restletMessage }}</span>
    </p>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";

const state = reactive({ count: 0 });
let restletMessage = ref("");

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
    .then((res) => (restletMessage.value = res));
});
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
