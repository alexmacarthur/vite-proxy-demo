import "isomorphic-fetch";
import { defineConfig } from "vite";
import { resolve } from "path";
import preact from "@preact/preset-vite";

/**
 * Approach #2
 */

// const HtmlRewriter = () => ({
//   name: 'html-rewriter',

//   // https://vitejs.dev/guide/api-plugin.html#vite-specific-hooks
//   async transformIndexHtml(_html) {
//     const response = await fetch("https://vite-proxy-demo.netlify.app/some-page/");
//     const remoteHtml = await response.text();

//     return remoteHtml.replace(
//       /(https:\/\/(.*?)cloudfront\.net(.*?)production-bundle\.js)/,
//       `./local-dev.js`
//     )
//   },
// });

export default defineConfig({
  plugins: [preact() /* HtmlRewriter() */],
  build: {
    lib: {
      entry: resolve(__dirname, "app.jsx"),
      name: "MyApp",
      fileName: () => "production-bundle.js",
    },
  },
  server: {
    /**
     * Approach #1
     */
    // proxy: {
    //   '/static/production-bundle.js': {
    //     target: "http://localhost:5173",
    //     changeOrigin: true,
    //     rewrite: () => "./local-dev.js"
    //   },
    //   '/static': {
    //     target: "https://vite-proxy-demo.netlify.app",
    //     changeOrigin: true
    //   },
    //   '^/$': {
    //     target: "https://vite-proxy-demo.netlify.app",
    //     changeOrigin: true,
    //     rewrite: () => "/some-page/"
    //   },
    // },
  },
});
