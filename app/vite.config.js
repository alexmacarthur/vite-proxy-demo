import "isomorphic-fetch";
import { defineConfig } from 'vite';
import { resolve } from 'path';
// import preact from '@preact/preset-vite';
// import modifyResponse from "./vendor/node-http-proxy-text";

const HtmlRewriter = () => ({
  name: 'html-rewriter',

  // https://vitejs.dev/guide/api-plugin.html#vite-specific-hooks
  async transformIndexHtml(html) {
    const response = await fetch("https://vite-proxy-demo.netlify.app/some-page/");
    const remoteHtml = await response.text();

    return remoteHtml.replace(
      /(https:\/\/(.*?)cloudfront\.net(.*?)production-bundle(\.)js)/,
      `./local-dev.jsx`
    )
  },

  handleHotUpdate(args) {
    // console.log(args);
    args.server.ws.send({
    type: 'custom',
    event: 'special-update',
    data: {}
  });
  }
})

export default defineConfig({
  plugins: [HtmlRewriter()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'FakeApp',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
  },
  server: {
    proxy: {




      // '*proxy-path*': {
      //   target: "https://macarthur.me",
      //   changeOrigin: true,
      //   rewrite: (path) => {
      //     console.log(path)
      //     return "/some-page/";
      //   },
      // },

      // '^/$': {
      //   target: "https://vite-proxy-demo.netlify.app",
      //   changeOrigin: true,
      //   rewrite: () => {
      //     return "/some-page/";
      //   },
      //   configure: (proxy, options) => {
      //     proxy.on('proxyRes', function (proxyRes, req, res) {

      //       modifyResponse(res, proxyRes, (body) => {
      //         return body.replace(
      //           /(https:\/\/.*?\.cloudfront\.net.*?\.[a-z]+)/g,
      //           `http://localhost:5173/proxy-path/$1`
      //         )
      //       });

      //     });
      //   }
      // },
    }
  }
});
