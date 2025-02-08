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
      :d="`M ${stars
        .map((star) => {
          return [star.x, star.y];
        })
        .join('L')}`"
      class="invisible"
    />
    <StarNode
      v-for="(star, index) in uniqueStars"
      :key="index"
      :x="star.x"
      :y="star.y"
      :big="star.big"
    />
  </g>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { animate } from "motion/mini";
import StarNode from "./StarNode.vue";
import type { Constellation } from "~/components/changelog/types";

const props = defineProps<Constellation>();

const pathRef = ref();

const uniqueStars = computed(() =>
  props.stars.filter(
    (star, index) =>
      props.stars.findIndex((s) => star.x === s.x && star.y === s.y) === index,
  ),
);

onMounted(() => {
  if (!pathRef.value) return;

  const delay = Math.random() * 3 + 2;

  animate(
    pathRef.value,
    { strokeDashoffset: 0, visibility: "visible" },
    { duration: 5, delay },
  );

  if (props.filled) {
    animate(
      pathRef.value,
      { fill: props.filled ? "rgba(255, 255, 255, 0.05)" : undefined },
      { duration: 1, delay: delay + 5 },
    );
  }
});
</script>
