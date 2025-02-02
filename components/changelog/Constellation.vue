<template>
  <g>
    <path
      ref="pathRef"
      stroke="white"
      stroke-opacity="0.2"
      stroke-dasharray="1"
      stroke-dashoffset="1"
      pathLength="1"
      fill="transparent"
      :d="`M ${points.join('L')}`"
      class="invisible"
    />
    <Star
      v-for="(point, index) in uniquePoints"
      :key="index"
      :point="point"
      :blur-id="blurId"
    />
  </g>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { animate } from "motion/mini";
import Star from "./Star.vue";

const props = defineProps({
  points: {
    type: Array,
    required: true,
  },
  blurId: {
    type: String,
    required: true,
  },
  fill: {
    type: Object,
    required: true,
  },
});

const pathRef = ref();

// Remove duplicate points
const uniquePoints = computed(() =>
  props.points.filter(
    (point, index) =>
      props.points.findIndex((p) => String(p) === String(point)) === index,
  ),
);

// Check if the constellation should be filled
const isFilled = computed(
  () => uniquePoints.value.length !== props.points.length,
);

onMounted(() => {
  if (!pathRef.value) return;

  const delay = Math.random() * 3 + 2;

  // Animate path stroke
  animate(
    pathRef.value,
    { strokeDashoffset: 0, visibility: "visible" },
    { duration: 5, delay },
  );

  // Animate path fill (if needed)
  if (isFilled.value) {
    animate(
      pathRef.value,
      { fill: props.fill },
      { duration: 1, delay: delay + 5 },
    );
  }
});
</script>
