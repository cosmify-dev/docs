<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { Moon, Sun } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

const mode = useColorMode();
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    @click="mode = mode === 'light' ? 'dark' : 'light'"
  >
    <Moon
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Sun
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
