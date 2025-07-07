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
  build: {
    rollupOptions: {
      output: {
        manualChunks
      }
    }
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

const HEAVY_PACKAGES = ["react-activity-calendar"]

function manualChunks(id: string) {
  if (id.includes("@firebase")) {
    return splitFirebase(id)
  }

  if (isReactRouterDependency(id)) {
    return "@react-router"
  }

  if (isReactDependency(id)) {
    return "@react"
  }

  for (const pkg of HEAVY_PACKAGES) {
    if (id.includes(`node_modules/${pkg}`)) return pkg
  }
}

function isReactRouterDependency(id: string) {
  return id.includes("react-router-dom") || id.includes("react-router")
}

function isReactDependency(id: string) {
  return (
    id.includes("react") ||
    id.includes("react-dom") ||
    id.includes("react-redux") ||
    id.includes("react-firebase-hooks")
  )
}

function splitFirebase(id: string) {
  if (id.includes("firestore")) return "firebase/firestore"
  if (id.includes("auth")) return "firebase/auth"
  if (id.includes("storage")) return "firebase/storage"
  if (id.includes("functions")) return "firebase/functions"
  if (id.includes("performance")) return "firebase/performance"
  if (id.includes("remote-config")) return "firebase/remote-config"
  if (id.includes("app-check")) return "firebase/app-check"
  if (id.includes("in-app-messaging")) return "firebase/in-app-messaging"

  return "firebase"
}
