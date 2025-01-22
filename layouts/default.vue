<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Package2, Search } from "lucide-vue-next";
import DarkModeToggle from "~/components/DarkModeToggle.vue";
import MobileNavigation from "~/components/MobileNavigation.vue";

const routes = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Docs",
    href: "/docs/introduction",
  },
  {
    title: "API",
    href: "/api/introduction",
  },
  {
    title: "Changelog",
    href: "/changelog",
  },
];
</script>

<template>
  <template>
    <div class="flex min-h-screen w-full flex-col">
      <header
        class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"
      >
        <nav
          class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
        >
          <a
            href="#"
            class="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 class="h-6 w-6" />
            <span class="sr-only">Acme Inc</span>
          </a>
          <RouterLink
            v-for="route in routes"
            :to="route.href"
            class="transition-colors hover:text-foreground"
          >
            {{ route.title }}
          </RouterLink>
        </nav>
        <MobileNavigation>
          <RouterLink
            v-for="route in routes"
            :to="route.href"
            class="hover:text-foreground"
          >
            {{ route.title }}
          </RouterLink>
        </MobileNavigation>
        <div
          class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4"
        >
          <form class="ml-auto flex-1 sm:flex-initial">
            <div class="relative">
              <Search
                class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search products..."
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
      <main
        class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
      >
        <div class="mx-auto grid w-full max-w-6xl gap-2">
          <h1 class="text-3xl font-semibold">Settings</h1>
        </div>
        <div
          class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
        >
          <nav class="grid gap-4 text-sm text-muted-foreground">
            <a href="#" class="font-semibold text-primary"> General </a>
            <a href="#"> Security </a>
            <a href="#"> Integrations </a>
            <a href="#"> Support </a>
            <a href="#"> Organizations </a>
            <a href="#"> Advanced </a>
          </nav>
          <div>
            <slot />
          </div>
        </div>
      </main>
    </div>
  </template>
</template>
