import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      rollupTypes: false,
      tsconfigPath: 'tsconfig.app.json',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: 'src/clippingkk-web-widget.ts',
      fileName: 'clippingkk-web-widget',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})