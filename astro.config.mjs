import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://masduchanoine.com",
  trailingSlash: "ignore",
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en", "it"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap(), tailwind()],
  build: {
    format: "directory",
  },
});
