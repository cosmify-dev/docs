// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  seo: {
    meta: {
      description: "Own Your Platform. Self-Host Your PaaS with Cosmify.",
      themeColor: [
        { content: "#18181b", media: "(prefers-color-scheme: dark)" },
        { content: "white", media: "(prefers-color-scheme: light)" },
      ],
      author: "Alexander Padberg <undefinedhuman>",
      colorScheme: "dark light",
      applicationName: "Cosmify",
      ogSiteName: "Cosmify",
      ogLocale: "en_US",
      ogType: "website",
      ogUrl: "https://cosmify.dev",
      ogTitle: "Cosmify",
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
