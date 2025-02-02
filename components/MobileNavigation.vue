<script setup lang="ts">
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { useColorMode } from "@vueuse/core";

const mode = useColorMode();
</script>

<template>
  <Sheet client:load>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="shrink-0 md:hidden">
        <Menu class="h-5 w-5" />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <nav class="grid gap-6 text-lg font-medium">
        <RouterLink
          to="/"
          class="flex items-center gap-2 text-lg font-semibold"
        >
          <svgo-logo class="w-8 h-8" />
          <div>Cosmify</div>
          <span class="sr-only">Cosmify</span>
        </RouterLink>
        <slot />
      </nav>
    </SheetContent>
  </Sheet>
</template>
