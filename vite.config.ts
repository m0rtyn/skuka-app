/// <reference types="vitest" />

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import viteTsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"
import { visualizer } from "rollup-plugin-visualizer"
import { VitePWA } from "vite-plugin-pwa"
import pkg from "./package.json"

// console.log(`Vite config for ${pkg.name} v${pkg.version}`)
export default defineConfig({
  base: "/",
  define: {
    __VITE_NAME__: `"${pkg.name}"`,
    __VITE_VERSION__: `"${pkg.version}"`
  },
  test: {},
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
      registerType: "prompt",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "Skuka App",
        short_name: "Skuka",
        description: "Boring timer",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        start_url: ".",
        icons: [
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        globIgnores: ["**/deps.html", "**/sw.js"]
      }
      // strategies: "generateSW"
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
