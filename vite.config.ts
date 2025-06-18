import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import viteTsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"
import { visualizer } from "rollup-plugin-visualizer"
import { VitePWA } from "vite-plugin-pwa"
import pkg from "./package.json"

export default defineConfig({
  base: "/",
  define: {
    VITE_NAME: `"${pkg.name}"`,
    VITE_VERSION: `"${pkg.version}"`
  },
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
    }),
    VitePWA({
      includeAssets: ["./src/shared/assets/svgs/*.svg"],
      manifest: {
        name: "Skuka App",
        short_name: "Skuka",
        description: "Boring timer",
        theme_color: "#000",
        icons: [
          {
            src: "skuka.svg",
            type: "image/svg+xml"
          },
          {
            src: "skuka-logo-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      strategies: "generateSW",
      registerType: "prompt"
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
