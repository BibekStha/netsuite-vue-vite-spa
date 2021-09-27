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
import { onMounted, reactive, ref, inject } from "vue";

const netSuiteApiCall = inject("netsuiteApi");

const state = reactive({ count: 0 });
let restletMessage = ref("");

defineProps({
  msg: String,
});

onMounted(async () => {
  const apiResponse = await netSuiteApiCall({ task: "fetchItemRec", itemId: "12345" });
  restletMessage.value = await apiResponse.json();
});
</script>

<style scoped></style>
