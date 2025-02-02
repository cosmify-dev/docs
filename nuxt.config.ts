// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "nuxt-svgo",
  ],
  svgo: {
    svgo: false,
    defaultImport: "component",
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
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
