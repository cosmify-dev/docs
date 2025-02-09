<template>
  <ol class="my-6 ml-6 list-decimal list-outside [&li]>mt-2" v-bind="$attrs">
    <slot />
  </ol>
</template>

<style scoped>
::v-deep li + li {
  @apply mt-4;
}
</style>
