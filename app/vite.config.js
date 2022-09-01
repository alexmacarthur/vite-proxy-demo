import { defineConfig } from 'vite';
import { resolve } from 'path';
// import preact from '@preact/preset-vite';
const modifyResponse = require('node-http-proxy-json');

const HtmlRewriter = () => ({
  name: 'html-rewriter',
  apply: 'serve',

  // https://vitejs.dev/guide/api-plugin.html#vite-specific-hooks
  transformIndexHtml(html) {
    console.log('HERE');
    console.log(html);

    return html.replace(
      /(https:\/\/.*?\.cloudfront\.net.*?\.[a-z]+)/,
      `http://localhost:5173/proxy-path/$1`
    )
  }
})

export default defineConfig({
  // plugins: [preact(), HtmlRewriter()],
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
        selfHandleResponse: true,
        changeOrigin: true,
        rewrite: () => "/some-page/", 
        configure: (proxy, options) => {

          proxy.on('proxyRes', function (proxyRes, req, res) {
            modifyResponse(res, proxyRes, (body) => {
              return body.replace(
                /(https:\/\/.*?\.cloudfront\.net.*?\.[a-z]+)/,
                `http://localhost:5173/proxy-path/$1`
              )
            })
          });
        }
      },
    }
  }
});
