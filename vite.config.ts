import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import viteTsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgr({
      svgrOptions: { icon: true },
      include: "**/*.svg?react"
    }),
    visualizer({
      filename: "./dist/deps.html",
      open: false
    })
  ],
  resolve: {
    alias: {
      shared: "/src/shared",
      features: "/src/features",
      app: "/src/app"
    }
  },
  server: {
    port: 3000
  }
})
