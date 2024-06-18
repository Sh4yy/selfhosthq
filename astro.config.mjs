import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerRenderWhitespace,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerCompactLineOptions,
} from "@shikijs/transformers";

export default defineConfig({
  output: "server",
  devToolbar: {
    enabled: false,
  },
  markdown: {
    shikiConfig: {
      theme: "vitesse-dark",
      transformers: [
        transformerNotationDiff(),
        transformerNotationFocus(),
        transformerMetaHighlight(),
        transformerMetaWordHighlight(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationErrorLevel(),
        transformerRenderWhitespace(),
        transformerCompactLineOptions(),
      ],
    },
  },
  integrations: [tailwind()],
  adapter: cloudflare(),
});
