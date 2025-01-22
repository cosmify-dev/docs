<script setup lang="ts">
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Package2, Menu } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
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
        <a href="#" class="flex items-center gap-2 text-lg font-semibold">
          <Package2 class="h-6 w-6" />
          <div>Cosmify</div>
          <span class="sr-only">Cosmify</span>
        </a>
        <slot />
      </nav>
    </SheetContent>
  </Sheet>
</template>
