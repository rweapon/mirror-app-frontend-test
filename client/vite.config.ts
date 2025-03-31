import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mirror-app-frontend-test/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    modulePreload: true,
    cssMinify: true,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const HugeLibraries = ["react-virtualized"];
          if (HugeLibraries.some(libName => id.includes(`node_modules/${libName}`))) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
