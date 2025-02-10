// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  site: {
    url: "https://cosmify.dev",
    name: "Cosmify Documentation",
  },
  modules: [
    "nuxt-seo-utils",
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
  seo: {
    meta: {
      description: "Own Your Platform. Self-Host Your PaaS with Cosmify.",
      themeColor: [
        { content: "#18181b", media: "(prefers-color-scheme: dark)" },
        { content: "white", media: "(prefers-color-scheme: light)" },
      ],
      author: "Alexander Padberg <undefinedhuman>",
      colorScheme: "dark light",
      applicationName: "Cosmify Documentation",
      ogSiteName: "Cosmify Documentation",
      ogLocale: "en_US",
      ogType: "website",
      ogUrl: "https://cosmify.dev",
      ogTitle: "Cosmify Documentation",
    },
  },
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
