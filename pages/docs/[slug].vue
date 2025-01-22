<script setup>
const slug = useRoute().params.slug;
const { data: document } = await useAsyncData(`docs-${slug}`, () => {
  return queryCollection("docs").path(slug).first();
});
</script>

<template>
  <ContentRenderer :value="document" />
</template>
