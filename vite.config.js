import { defineConfig } from "vite";

export default defineConfig({
  root: ".", // Set the root directory of your project
  server: {
    port: 3000, // Optional: Customize the development server port
  },
  build: {
    outDir: "dist", // Optional: Customize the output directory
  },
});
