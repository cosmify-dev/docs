<template>
  <g ref="groupRef" class="opacity-0">
    <circle
      ref="circleRef"
      :cx="x"
      :cy="y"
      r="1"
      :style="{
        transformOrigin: `${x}px ${y}px`,
        opacity: big ? 0.2 : 1,
        transform: `scale(${big ? 1.2 : 1})`,
      }"
    />
  </g>
</template>

<script setup lang="ts">
import { ref, onMounted, Transition } from "vue";
import { animate } from "motion/mini";
import type { Star } from "~/components/changelog/types";

const props = defineProps<Star>();

const groupRef = ref<SVGGElement | null>(null);
const circleRef = ref<SVGCircleElement | null>(null);

onMounted(() => {
  if (!groupRef.value || !circleRef.value) return;

  const delay = Math.random() * 2;

  animate(groupRef.value, { opacity: 1 }, { duration: 4, delay });

  animate(
    circleRef.value,
    {
      opacity: props.big ? [0.2, 0.5] : [1, 0.6],
      scale: props.big ? [1, 1.2] : [1.2, 1],
    },
    {
      delay,
      duration: Math.random() * 4 + 4,
      ease: "linear",
      repeat: Infinity,
    },
  );
});
</script>
