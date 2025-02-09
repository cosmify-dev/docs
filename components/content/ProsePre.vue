<template>
  <div class="relative group">
    <div
      v-if="filename"
      class="px-3 py-2 text-xs font-mono bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-t-lg border border-b-0 border-zinc-300 dark:border-zinc-700"
    >
      {{ filename }}
    </div>

    <div class="relative">
      <pre
        ref="codeBlock"
        class="shiki p-4 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 overflow-auto"
        :class="filename ? 'rounded-b-lg' : 'rounded-lg'"
      ><code><slot /></code></pre>
    </div>

    <button
      @click="copyCode"
      aria-label="Copy code"
      class="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-zinc-100 dark:bg-zinc-900 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 opacity-0 group-hover:opacity-100"
    >
      <CopyCheck v-if="copied" class="w-5 h-5" />
      <Copy v-else class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Copy, CopyCheck } from "lucide-vue-next";

defineProps<{
  filename?: string;
}>();

const codeBlock = ref<HTMLElement | null>(null);
const copied = ref(false);

const copyCode = async (): Promise<void> => {
  if (!codeBlock.value) return;

  const codeText = codeBlock.value.innerText;
  try {
    await navigator.clipboard.writeText(codeText);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (error) {
    console.error("Error copying code:", error);
  }
};
</script>
