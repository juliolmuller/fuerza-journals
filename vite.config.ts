import react from '@vitejs/plugin-react';
import rollupAnalyze from 'rollup-plugin-analyzer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        rollupAnalyze({
          summaryOnly: true,
          limit: 10,
        }),
      ],
    },
  },
  plugins: [react(), tsconfigPaths()],
});
