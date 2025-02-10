<template>
  <div class="flex overflow-hidden mx-auto px-6 lg:px-8">
    <ParticlesBg
      class="fixed inset-0 size-full -z-10"
      :staticity="10"
      :quantity="400"
      :color="mode === 'dark' ? '#FFF' : '#000'"
      refresh
    />

    <svg
      class="fixed inset-0 -z-10 size-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
          width="200"
          height="200"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
        <path
          d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          stroke-width="0"
        />
      </svg>
      <rect
        width="100%"
        height="100%"
        stroke-width="0"
        fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
      />
    </svg>
    <div
      class="fixed left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
      aria-hidden="true"
    >
      <div
        class="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
        style="
          clip-path: polygon(
            73.6% 51.7%,
            91.7% 11.8%,
            100% 46.4%,
            97.4% 82.2%,
            92.5% 84.9%,
            75.7% 64%,
            55.3% 47.5%,
            46.5% 49.4%,
            45% 62.9%,
            50.3% 87.2%,
            21.3% 64.1%,
            0.1% 100%,
            5.4% 51.1%,
            21.4% 63.9%,
            58.9% 0.2%,
            73.6% 51.7%
          );
        "
      />
    </div>
    <div class="mx-auto flex px-6 pt-10 lg:px-8 lg:py-24">
      <div class="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
        <svgo-logo class="w-16 h-16 max-lg:hidden" />
        <div class="mt-24 lg:mt-16">
          <RouterLink to="/changelog" class="inline-flex space-x-6">
            <Badge class="text-sm border-2"> What's new </Badge>
            <span
              class="inline-flex items-center space-x-2 text-sm/6 font-medium text-muted-foreground"
            >
              <span>Currently in Alpha</span>
            </span>
          </RouterLink>
        </div>
        <h1
          class="mt-10 text-wrap text-5xl font-semibold tracking-tight text-foreground sm:text-7xl"
        >
          Own Your Platform. Self-Host Your PaaS with Cosmify.
        </h1>
        <p
          class="mt-8 text-wrap text-lg font-medium text-muted-foreground sm:text-xl/8"
        >
          No Vendor Lock-in. No Limits. Just Pure, Open-Source Platform as a
          Service.
        </p>
        <div class="mt-10 flex items-center gap-x-2">
          <RouterLink
            to="/docs/getting-started/introduction"
            class="rounded-md bg-primary text-primary-foreground px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-primary-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Documentation
          </RouterLink>
          <Button
            variant="link"
            class="text-sm/6 font-semibold text-primary"
            @click="openGitHubProject"
          >
            View on GitHub
          </Button>
        </div>
      </div>
      <div
        class="mx-auto mt-8 max-lg:hidden lg:ml-16 lg:mr-0 lg:flex-none xl:ml-32"
      >
        <img
          src="~/public/landing-page.png"
          alt="App screenshot"
          width="1536"
          height="771"
          class="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from "~/components/ui/badge";
import { useColorMode } from "@vueuse/core";

const openGitHubProject = () => {
  window.open("https://github.com/cosmify-dev/cosmify", "_blank");
};

const mode = useColorMode();
</script>
