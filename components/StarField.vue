<template>
  <svg
    :viewBox="`0 0 ${windowSize.width.value} ${windowSize.height.value}`"
    fill="white"
    aria-hidden="true"
    class="absolute inset-0 size-full -z-10 resize"
  >
    <defs>
      <filter :id="blurId">
        <feGaussianBlur in="SourceGraphic" stdDeviation=".5" />
      </filter>
    </defs>
    <Constellation
      v-for="(constellation, index) in constellations"
      :key="index"
      :points="constellation.points"
      :blur-id="blurId"
      :fill="constellation.isClosed ? 'rgba(255, 255, 255, 0.05)' : 'none'"
    />
    <Star
      v-for="(point, index) in stars"
      :key="index"
      :point="point"
      :blur-id="blurId"
    />
  </svg>
</template>

<script setup>
import Star from "./Star.vue";
import Constellation from "./Constellation.vue";
import { useWindowSize } from "@vueuse/core";

const windowSize = useWindowSize();

const minDistance = 50;
const maxDistance = 150;

const stars = Array.from({ length: 500 }, () => [
  Math.random() * windowSize.width.value,
  Math.random() * windowSize.height.value,
  Math.random() > 0.5,
  Math.random() > 0.5,
]);

const generateConstellations = () => {
  const constellations = [];
  const maxConstellations = 9;

  let availableStars = [...stars];

  for (let i = 0; i < maxConstellations; i++) {
    let selectedStars = [];
    const startIndex = Math.floor(Math.random() * availableStars.length);
    selectedStars.push(availableStars.splice(startIndex, 1)[0]);

    const isClosed = Math.random() > 0.4;

    const targetPoints = isClosed ? 4 : Math.random() * 2 + 3;
    while (selectedStars.length < targetPoints) {
      const lastStar = selectedStars[selectedStars.length - 1];
      const neighbors = availableStars.filter((star) => {
        const distance = Math.hypot(
          star[0] - lastStar[0],
          star[1] - lastStar[1],
        );
        return distance >= minDistance && distance <= maxDistance;
      });

      if (neighbors.length === 0) break;
      const nextStarIndex = Math.floor(Math.random() * neighbors.length);
      selectedStars.push(neighbors[nextStarIndex]);
      availableStars = availableStars.filter(
        (s) => s !== neighbors[nextStarIndex],
      );
    }

    selectedStars = optimizePath(selectedStars);

    if (isClosed) {
      selectedStars = makeConvex(selectedStars);
      selectedStars.push(selectedStars[0]);
    }

    if (selectedStars.length <= 2) continue;

    constellations.push({
      points: selectedStars.map((star) => [star[0], star[1]]),
      isClosed,
    });
  }
  return constellations;
};

const optimizePath = (points) => {
  if (points.length < 3) return points;
  const ordered = [points.shift()];
  while (points.length) {
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    ordered.forEach((orderedPoint) => {
      points.forEach((point, index) => {
        const distance = Math.hypot(
          orderedPoint[0] - point[0],
          orderedPoint[1] - point[1],
        );
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });
    });
    ordered.push(points.splice(nearestIndex, 1)[0]);
  }
  return ordered;
};

const makeConvex = (points) => {
  if (points.length < 3) return points;
  points.sort((a, b) => a[0] - b[0]);
  const upper = [];
  const lower = [];

  for (const p of points) {
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    ) {
      upper.pop();
    }
    upper.push(p);
  }

  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    ) {
      lower.pop();
    }
    lower.push(p);
  }

  lower.pop();
  upper.pop();
  return upper.concat(lower);
};

const cross = (o, a, b) => {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
};

const constellations = generateConstellations();
console.log(constellations);

const blurId = `blur-${Math.random().toString(36).substr(2, 9)}`;
</script>
