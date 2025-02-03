<template>
  <svg
    ref="constellationRef"
    :viewBox="`0 0 ${windowSize.width.value} ${windowSize.height.value}`"
    fill="white"
    aria-hidden="true"
    class="absolute inset-0 size-full -z-10"
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

const MIN_DISTANCE = 50;
const MAX_DISTANCE = 150;

const stars = useState<Star[]>("stars", () => []);
const constellations = ref<Constellation[]>();
const constellationRef = ref<SVGElement | undefined>();

const generateStars = () => {
  return Array.from({ length: 500 }, () => ({
    x: Math.random() * windowSize.width.value,
    y: Math.random() * windowSize.height.value,
    big: Math.random() > 0.5,
  }));
};

onMounted(() => {
  stars.value = generateStars();
  constellations.value = generateConstellations();
});

watch(
  () => [windowSize.height.value, windowSize.width.value],
  () => {
    stars.value = generateStars();
    constellations.value = generateConstellations();
  },
);

const generateConstellations = (): Constellation[] => {
  const MAX_CONSTELLATIONS = 9;
  let availableStars = [...stars.value];
  const constellations: Constellation[] = [];

  const gridCols = 3;
  const gridRows = 3;
  const cellWidth = windowSize.width.value / gridCols;
  const cellHeight = windowSize.height.value / gridRows;

  const gridRegions: Star[][] = Array.from(
    { length: gridCols * gridRows },
    () => [],
  );

  availableStars.forEach((star) => {
    const col = Math.floor(star.x / cellWidth);
    const row = Math.floor(star.y / cellHeight);
    gridRegions[row * gridCols + col].push(star);
  });

  for (let i = 0; i < MAX_CONSTELLATIONS; i++) {
    let selectedStars: Star[] = [];

    const startRegion = i % gridRegions.length;
    const possibleStarts =
      gridRegions[startRegion].length > 0
        ? gridRegions[startRegion]
        : availableStars;

    if (possibleStarts.length === 0) continue;

    const startIndex = getRandomIndex(possibleStarts);
    selectedStars.push(possibleStarts.splice(startIndex, 1)[0]);
    availableStars = availableStars.filter((star) => star !== selectedStars[0]);

    const isClosedShape = Math.random() > 0.5;
    const targetPoints = isClosedShape
      ? getRandomInt(3, 6)
      : getRandomInt(3, 7);

    while (selectedStars.length < targetPoints) {
      const lastStar = selectedStars[selectedStars.length - 1];
      const neighbors = getValidNeighbors(
        lastStar,
        availableStars,
        MIN_DISTANCE,
        MAX_DISTANCE,
      );

      if (neighbors.length === 0) break;

      const randomNeighborIndex = getRandomIndex(neighbors);
      const nextStar = neighbors[randomNeighborIndex];

      selectedStars.push(nextStar);
      availableStars = availableStars.filter((star) => star !== nextStar);
    }

    if (isClosedShape) selectedStars = optimizeConnections(selectedStars);
    else
      selectedStars = optimizeConnectionsWithBranches(
        selectedStars,
        availableStars,
      );

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

const getValidNeighbors = (
  currentStar: Star,
  availableStars: Star[],
  minDistance: number,
  maxDistance: number,
): Star[] => {
  return availableStars
    .map((star) => ({
      star,
      distance: Math.hypot(star.x - currentStar.x, star.y - currentStar.y),
    }))
    .filter(
      ({ distance }) => distance >= minDistance && distance <= maxDistance,
    )
    .sort((a, b) => a.distance - b.distance)
    .map(({ star }) => star);
};

const optimizeConnections = (stars: Star[]): Star[] => {
  if (stars.length < 3) return stars;

  const orderedPath: Star[] = [stars.shift() as Star];

  while (stars.length) {
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    const lastStar = orderedPath[orderedPath.length - 1];

    stars.forEach((star, index) => {
      const distance = Math.hypot(star.x - lastStar.x, star.y - lastStar.y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    orderedPath.push(stars.splice(nearestIndex, 1)[0]);
  }
  return orderedPath;
};

const optimizeConnectionsWithBranches = (
  stars: Star[],
  availableStars: Star[],
): Star[] => {
  if (stars.length < 3) return stars;

  const orderedPath: Star[] = [stars.shift() as Star];

  while (stars.length) {
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    const lastStar = orderedPath[orderedPath.length - 1];

    stars.forEach((star, index) => {
      const distance = Math.hypot(star.x - lastStar.x, star.y - lastStar.y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    const nextStar = stars.splice(nearestIndex, 1)[0];
    orderedPath.push(nextStar);

    if (Math.random() > 0.8) {
      const branchNeighbors = getValidNeighbors(
        nextStar,
        availableStars,
        20,
        50,
      );
      if (branchNeighbors.length > 0) {
        const branchStar = branchNeighbors[getRandomIndex(branchNeighbors)];
        orderedPath.push(branchStar);
        availableStars = availableStars.filter((star) => star !== branchStar);
      }
    }
  }
  return orderedPath;
};

const getRandomIndex = (array: unknown[]): number =>
  Math.floor(Math.random() * array.length);
const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

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
</script>
