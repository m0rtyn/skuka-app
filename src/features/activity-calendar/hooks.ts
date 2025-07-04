import { useEffect, useState } from "react"
import { NAMESPACE } from "./constants"

export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light")

  const onChange = (event: MediaQueryListEvent) => {
    setColorScheme(event.matches ? "dark" : "light")
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setColorScheme(mediaQuery.matches ? "dark" : "light")

    mediaQuery.addEventListener("change", onChange)

    return () => {
      mediaQuery.removeEventListener("change", onChange)
    }
  }, [])

  return colorScheme
}

export const loadingAnimationName = `${NAMESPACE}--loading-animation`

export function useLoadingAnimation(
  zeroColor: string,
  colorScheme: "light" | "dark"
) {
  useEffect(() => {
    const colorLoading = `oklab(from ${zeroColor} l a b)`
    const colorActive =
      colorScheme === "light" ?
        `oklab(from ${zeroColor} calc(l * 0.96) a b)`
      : `oklab(from ${zeroColor} calc(l * 1.08) a b)`

    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes ${loadingAnimationName} {
        0% {
          fill: ${colorLoading};
        }
        50% {
          fill: ${colorActive};
        }
        100% {
          fill: ${colorLoading};
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [zeroColor, colorScheme])
}

const query = "(prefers-reduced-motion: reduce)"

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setPrefersReducedMotion(mediaQuery.matches)

    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener("change", onChange)

    return () => {
      mediaQuery.removeEventListener("change", onChange)
    }
  }, [])

  return prefersReducedMotion
}
