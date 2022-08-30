import { defineConfig } from 'vite';
import { resolve } from 'path';
import preact from '@preact/preset-vite';

const HtmlRewriter = () => ({
  name: 'html-rewriter',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if(req.url === "/") {

        console.log("REWRITING");
        return new Response(res.body, res);
      }

      return res;
    })
  }
})

export default defineConfig({
  plugins: [preact(), HtmlRewriter()],
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
      '^./some-file*': {
        target: "http://localhost:5173",
        changeOrigin: true,
        rewrite: () => "/local-dev.jsx"
      },

      // '^/$': {
      //   target: "https://vite-proxy-demo.netlify.app",
      //   changeOrigin: true,
      //   rewrite: () => "/some-page/"
      // }, 
    }
  }
});
