import { defineConfig } from 'vite';
import { resolve } from 'path';
// import preact from '@preact/preset-vite';
import modifyResponse from "./vendor/node-http-proxy-text";

export default defineConfig({
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
      // '^./some-file*': {
      //   target: "http://localhost:5173",
      //   changeOrigin: true,
      //   rewrite: () => "/local-dev.jsx"
      // },

      '^/$': {
        target: "https://vite-proxy-demo.netlify.app",
        changeOrigin: true,
        rewrite: () => "/some-page/",
        configure: (proxy, options) => {
          proxy.on('proxyRes', function (proxyRes, req, res) {

            modifyResponse(res, proxyRes, (body) => {
              return body.replace(
                /(https:\/\/.*?\.cloudfront\.net.*?\.[a-z]+)/g,
                `http://localhost:5173/proxy-path/$1`
              )
            })
          });

        }
      },
    }
  }
});
