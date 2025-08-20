import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Linear-actuator/',
  plugins: [react()],
  define: {
    // Expose build-time environment variables to the client-side code.
    // These are set in the GitHub Actions workflow for production builds.
    // Default values are provided for local development.
    'process.env.APP_BUILD_NUMBER': JSON.stringify(process.env.APP_BUILD_NUMBER || 'dev'),
    'process.env.APP_COMMIT_SHA': JSON.stringify(process.env.APP_COMMIT_SHA || 'local'),
  },
});
