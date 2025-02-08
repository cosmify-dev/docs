<template>
  <svg :viewBox="`0 0 ${width} ${height}`" fill="white" aria-hidden="true">
    <ConstellationNode
      v-for="constellation in constellations"
      :key="constellation.key"
      :stars="constellation.stars"
      :filled="constellation.filled"
    />
    <StarNode
      v-for="(star, index) in stars"
      :key="index"
      :x="star.x"
      :y="star.y"
      :big="star.big"
    />
  </svg>
</template>

<script setup lang="ts">
import StarNode from "./StarNode.vue";
import { useDebounceFn, useWindowSize } from "@vueuse/core";
import ConstellationNode from "~/components/changelog/ConstellationNode.vue";
import type { Star, Constellation } from "~/components/changelog/types";

const { width, height } = useWindowSize();

const MIN_DISTANCE = 40;
const MAX_DISTANCE = 140;

const stars = useState<Star[]>("stars", () => []);
const constellations = ref<Constellation[]>();

const updateSize = useDebounceFn(async () => {
  stars.value = generateStars();

  await nextTick();

  constellations.value = [];
  constellations.value = generateConstellations();
}, 300);

watch([width, height], updateSize, { immediate: true });

const generateStars = () => {
  return Array.from({ length: height.value / 2 }, () => ({
    x: Math.random() * width.value,
    y: Math.random() * height.value,
    big: Math.random() > 0.5,
  }));
};

const generateConstellations = (): Constellation[] => {
  let availableStars = [...stars.value].filter((star) => {
    return (
      star.x > 20 &&
      star.y > 80 &&
      star.x < width.value - 20 &&
      star.y < height.value - 20
    );
  });
  const constellations: Constellation[] = [];

  const gridCols = Math.round(width.value / 640);
  const gridRows = Math.round(height.value / 360);

  const maxConstellations = gridRows * gridCols;
  const cellWidth = width.value / gridCols;
  const cellHeight = height.value / gridRows;

  const gridRegions: Star[][] = Array.from(
    { length: gridCols * gridRows },
    () => [],
  );

  availableStars.forEach((star) => {
    const col = Math.floor(star.x / cellWidth);
    const row = Math.floor(star.y / cellHeight);
    gridRegions[row * gridCols + col].push(star);
  });

  for (let i = 0; i < maxConstellations; i++) {
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
    else {
      selectedStars = optimizeConnectionsWithBranches(
        selectedStars,
        availableStars,
      );
      selectedStars = optimizeShortestPath(selectedStars);
    }

    if (isClosedShape) {
      selectedStars = makeConvex(selectedStars);
      selectedStars.push(selectedStars[0]);
    }

    if (selectedStars.length > 2) {
      constellations.push({
        key: Math.random() * 1000,
        stars: selectedStars,
        filled: isClosedShape,
      });
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

const optimizeShortestPath = (stars: Star[]): Star[] => {
  if (stars.length < 3) return stars;

  const orderedPath: Star[] = [stars.shift() as Star];
  let connections: Map<Star, Star[]> = new Map();

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
    if (!connections.has(lastStar)) connections.set(lastStar, []);
    connections.get(lastStar)!.push(nextStar);
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
