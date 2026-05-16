/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Check if the module is inside node_modules
          if (id.includes("node_modules")) {
            return "vendor"; // groups everything into vendor.[hash].js
          }
        },
      },
    },
  },
});
