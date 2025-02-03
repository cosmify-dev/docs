<template>
  <svg
    :viewBox="`0 0 ${windowSize.width.value} ${windowSize.height.value}`"
    fill="white"
    aria-hidden="true"
    class="absolute inset-0 size-full -z-10 resize"
  >
    <ConstellationComponent
      v-for="(constellation, index) in constellations"
      :key="index"
      :stars="constellation.stars"
      :filled="constellation.filled"
    />
    <StarComponent
      v-for="(star, index) in stars"
      :key="index"
      :x="star.x"
      :y="star.y"
      :big="star.big"
    />
  </svg>
</template>

<script setup lang="ts">
import StarComponent from "./StarComponent.vue";
import { useWindowSize } from "@vueuse/core";
import ConstellationComponent from "~/components/changelog/ConstellationComponent.vue";
import type { Star, Constellation } from "~/components/changelog/types";

const windowSize = useWindowSize();

const minDistance = 50;
const maxDistance = 150;

const stars = useState<{ x: number; y: number; big: boolean }[]>(
  "stars",
  () => [],
);

const generateStars = () => {
  return Array.from({ length: 500 }, () => ({
    x: Math.random() * windowSize.width.value,
    y: Math.random() * windowSize.height.value,
    big: Math.random() > 0.5,
  }));
};

onMounted(() => {
  stars.value = generateStars();
});

const generateConstellations = (): Constellation[] => {
  const MAX_CONSTELLATIONS = 9;
  let availableStars = [...stars.value];
  const constellations: Constellation[] = [];

  for (let i = 0; i < MAX_CONSTELLATIONS; i++) {
    let selectedStars: Star[] = [];

    const startIndex = getRandomIndex(availableStars);
    selectedStars.push(availableStars.splice(startIndex, 1)[0]);

    const isClosedShape = Math.random() > 0.4;
    const targetPoints = isClosedShape ? 4 : getRandomInt(3, 6);

    while (selectedStars.length < targetPoints) {
      const lastStar = selectedStars[selectedStars.length - 1];
      const neighbors = getValidNeighbors(lastStar, availableStars);

      if (neighbors.length === 0) break;

      const nextStarIndex = getRandomIndex(neighbors);
      selectedStars.push(neighbors[nextStarIndex]);

      availableStars = availableStars.filter(
        (star) => star !== neighbors[nextStarIndex],
      );
    }

    selectedStars = optimizePath(selectedStars);

    if (isClosedShape) {
      selectedStars = makeConvex(selectedStars);
      selectedStars.push(selectedStars[0]);
    }

    if (selectedStars.length > 2) {
      constellations.push({ stars: selectedStars, filled: isClosedShape });
    }
  }
  return constellations;
};

const getRandomIndex = (array: any[]): number =>
  Math.floor(Math.random() * array.length);
const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

const getValidNeighbors = (
  currentStar: Star,
  availableStars: Star[],
): Star[] => {
  return availableStars.filter((star) => {
    const distance = Math.hypot(star.x - currentStar.x, star.y - currentStar.y);
    return distance >= minDistance && distance <= maxDistance;
  });
};

const optimizePath = (stars: Star[]): Star[] => {
  if (stars.length < 3) return stars;

  const orderedPath: Star[] = [stars.shift() as Star];
  while (stars.length) {
    let nearestIndex = 0;
    let nearestDistance = Infinity;

    orderedPath.forEach((orderedStar) => {
      stars.forEach((star, index) => {
        const distance = Math.hypot(
          orderedStar.x - star.x,
          orderedStar.y - star.y,
        );
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });
    });

    orderedPath.push(stars.splice(nearestIndex, 1)[0]);
  }
  return orderedPath;
};

const makeConvex = (stars: Star[]): Star[] => {
  if (stars.length < 3) return stars;

  stars.sort((a, b) => a.x - b.x);
  const upperHull: Star[] = [];
  const lowerHull: Star[] = [];

  for (const star of stars) {
    while (
      upperHull.length >= 2 &&
      crossProduct(
        upperHull[upperHull.length - 2],
        upperHull[upperHull.length - 1],
        star,
      ) <= 0
    ) {
      upperHull.pop();
    }
    upperHull.push(star);
  }

  for (let i = stars.length - 1; i >= 0; i--) {
    const star = stars[i];
    while (
      lowerHull.length >= 2 &&
      crossProduct(
        lowerHull[lowerHull.length - 2],
        lowerHull[lowerHull.length - 1],
        star,
      ) <= 0
    ) {
      lowerHull.pop();
    }
    lowerHull.push(star);
  }

  upperHull.pop();
  lowerHull.pop();

  return upperHull.concat(lowerHull);
};

const crossProduct = (o: Star, a: Star, b: Star): number => {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
};

const constellations = computed(() => generateConstellations());
</script>
