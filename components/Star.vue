<template>
  <g ref="groupRef">
    <circle
      ref="circleRef"
      :cx="point[0]"
      :cy="point[1]"
      r="1"
      :style="{
        transformOrigin: `${point[0] / 16}rem ${point[1] / 16}rem`,
        opacity: point[2] ? 0.2 : 1,
        transform: `scale(${point[2] ? 1 : 1.2})`,
      }"
    />
  </g>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { animate } from "motion/mini";

const props = defineProps({
  point: {
    type: Array,
    required: true,
  },
  blurId: {
    type: String,
    required: true,
  },
});

const groupRef = ref();
const circleRef = ref();

onMounted(() => {
  if (!groupRef.value || !circleRef.value) return;

  const delay = Math.random() * 2;

  // Animate group opacity
  animate(groupRef.value, { opacity: 1 }, { duration: 4, delay });

  // Animate circle opacity and scale
  animate(
    circleRef.value,
    {
      opacity: props.point[2] ? [0.2, 0.5] : [1, 0.6],
      scale: props.point[2] ? [1, 1.2] : [1.2, 1],
    },
    {
      delay,
      duration: Math.random() * 2 + 2,
      direction: "alternate",
      repeat: Infinity,
    },
  );
});
</script>
