import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup/index.html"),
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});

// // Below is to run in the browser
// export default defineConfig({
//   root: "popup",
//   plugins: [react()],
//   build: {
//     outDir: "../dist/popup",
//     emptyOutDir: true,
//     rollupOptions: {
//       input: resolve(__dirname, "popup/index.html"),
//     },
//   },
// });
