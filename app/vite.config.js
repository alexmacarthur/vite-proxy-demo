import { defineConfig } from 'vite';
import { resolve } from 'path';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
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
      // Route the root path of our dev server to the deployed page deployed page.
      '^/$': {
        target: "https://vite-proxy-demo.netlify.app",
        changeOrigin: true,
        rewrite: () => "/"
      }, 

      
    }
  }
});
