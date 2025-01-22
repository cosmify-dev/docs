<script setup lang="ts">
import { Button } from "@/components/ui/button";

const openGitHubProject = () => {
  window.open("https://github.com/cosmify-dev/cosmify", "_blank");
};
</script>

<template>
  <Button variant="ghost" size="icon" @click="openGitHubProject()">
    <img
      src="https://cdn.simpleicons.org/github"
      alt="GitHub Logo"
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <img
      src="https://cdn.simpleicons.org/github/white"
      alt="GitHub Logo"
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Cosmify GitHub Repository</span>
  </Button>
</template>
