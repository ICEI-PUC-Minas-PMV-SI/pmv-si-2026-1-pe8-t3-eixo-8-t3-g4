import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 4200,
      clientPort: 4200,
      timeout: 60000,
      overlay: true
    },
    proxy: {
      '/api/**': 'http://localhost:8080'
    },
    cors: {
      origin: /http:\/\/(localhost|127\.0\.0\.1):\d+$/,
      credentials: true
    },
    allowedHosts: ['localhost', '127.0.0.1'],
    watch: {
      usePolling: false,
      interval: 1000
    }
  }
});