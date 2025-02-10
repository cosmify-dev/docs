// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  site: {
    url: "https://cosmify.dev",
    name: "Cosmify Documentation",
  },
  modules: [
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-svgo",
    "@nuxtjs/plausible",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxt/content",
  ],
  plausible: {
    ignoredHostnames: ["localhost"],
  },
  svgo: {
    svgo: false,
    defaultImport: "component",
  },
  ssr: true,
  nitro: {
    static: true,
    prerender: {
      routes: [
        "/sitemap.xml",
        "/",
        "/docs/getting-started/installation",
        "/docs/community/contribute-docs",
      ],
    },
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 2,
        },
        highlight: {
          theme: {
            default: "github-light",
            dark: "github-dark",
            sepia: "monokai",
          },
        },
      },
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  pages: true,
});
