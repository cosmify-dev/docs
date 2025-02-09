<template>
  <div class="relative group">
    <pre class="rounded-lg bg-gray-900 text-gray-100 p-4 overflow-auto">
      <code ref="codeBlock">
        <slot />
      </code>
    </pre>
    <button
      @click="copyCode"
      aria-label="Copy code"
      class="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      <template v-if="copied">
        <!-- Check Icon (displayed when code is copied) -->
        <CopyCheck />
      </template>
      <template v-else>
        <Copy />
      </template>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { Copy, CopyCheck } from "lucide-vue-next";

const codeBlock = ref(null);
const copied = ref(false);

const copyCode = async () => {
  if (!codeBlock.value) return;

  const codeText = codeBlock.value.innerText;
  try {
    await navigator.clipboard.writeText(codeText);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (err) {
    console.error("Failed to copy code:", err);
  }
};
</script>
