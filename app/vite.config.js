import "isomorphic-fetch";
import { defineConfig } from "vite";
import { resolve } from "path";
import preact from "@preact/preset-vite";

/**
 * Approach #2
 */
const HtmlRewriter = () => ({
  name: 'html-rewriter',

  async transformIndexHtml(_html) {
    const response = await fetch("https://vite-proxy-demo.netlify.app/some-page/");
    const remoteHtml = await response.text();

    console.log(remoteHtml);

    return remoteHtml.replace(
      /(https:\/\/(.*?)cloudfront\.net(.*?)production-bundle\.js)/,
      `./local-dev.jsx`
    )
  },
});

export default defineConfig({
  plugins: [preact(), HtmlRewriter()],
  build: {
    lib: {
      entry: resolve(__dirname, "app.jsx"),
      name: "MyApp",
      fileName: () => "production-bundle.js",
    },
  }
});
