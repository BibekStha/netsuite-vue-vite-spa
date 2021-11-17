import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteSingleFile } from "vite-plugin-singlefile";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSingleFile(), WindiCSS()],
  build: {
    target: "es2015",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    brotliSize: false,
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: () => "everything.js",
      },
    },
  },
});
