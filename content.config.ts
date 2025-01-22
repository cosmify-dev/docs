import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      source: "content/docs/**/*.md",
      type: "page",

      schema: z.object({
        title: z.string(),
      }),
    }),
  },
});
