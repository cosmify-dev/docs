<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Search } from "lucide-vue-next";
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import MobileNavigation from "@/components/MobileNavigation.vue";

const routes: { title: string; href: string }[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Docs",
    href: "/docs/getting-started/introduction",
  },
  {
    title: "API",
    href: "/api",
  },
  {
    title: "Changelog",
    href: "/changelog",
  },
];
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <header
      class="sticky top-0 flex h-16 items-center z-50 gap-4 border-b bg-background px-4 md:px-6"
    >
      <div
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
      >
        <RouterLink
          to="/"
          class="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <svgo-logo class="w-8 h-8" />
          <span class="font-extrabold">Cosmify</span>
        </RouterLink>
        <NuxtLink
          v-for="route in routes"
          :key="route.href"
          :to="route.href"
          class="transition-colors hover:text-foreground"
        >
          {{ route.title }}
        </NuxtLink>
      </div>
      <MobileNavigation>
        <NuxtLink
          v-for="route in routes"
          :key="route.href"
          :to="route.href"
          class="hover:text-foreground"
        >
          {{ route.title }}
        </NuxtLink>
      </MobileNavigation>
      <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form class="ml-auto flex-1 sm:flex-initial">
          <div class="relative">
            <Search
              class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search documentation..."
              class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
      </div>
      <div class="flex">
        <GithubButton />
        <DarkModeToggle />
      </div>
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>
