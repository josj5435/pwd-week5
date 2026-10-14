import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // SWC handles JSX in source .js files during development.
      parserConfig(id) {
        if (!id.includes('/node_modules/') && /\.[jt]sx?$/.test(id)) {
          return id.endsWith('.ts') || id.endsWith('.tsx')
            ? { syntax: 'typescript', tsx: id.endsWith('.tsx') }
            : { syntax: 'ecmascript', jsx: true }
        }
      },
    }),
  ],
  // Production builds use esbuild instead of SWC by default.
  esbuild: {
    loader: 'jsx',
    include: /\/src\/.*\.jsx?$/,
    // Override Vite's default exclusion of .js files.
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
})
