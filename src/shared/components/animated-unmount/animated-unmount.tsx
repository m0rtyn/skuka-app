import { useState, useEffect, useRef } from "react"
import styles from "./animated-unmount.module.css"

interface AnimatedUnmountProps {
  isVisible: boolean
  children: React.ReactNode
  animationDuration?: number // Duration of the exit animation in milliseconds
  onExited?: () => void // Callback when the component has fully exited
}
const AnimatedUnmount: React.FC<AnimatedUnmountProps> = ({
  isVisible,
  children,
  animationDuration = 500,
  onExited
}) => {
  const [shouldRender, setShouldRender] = useState(isVisible)
  const [isExiting, setIsExiting] = useState(false)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null) // To store and clear the timeout

  useEffect(() => {
    if (isVisible) {
      // Component became visible - ensure it's rendered and not exiting
      setShouldRender(true)
      setIsExiting(false)
      // Clear any lingering timeout if it became visible prematurely
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
        animationTimeoutRef.current = null
      }
    } else if (shouldRender) {
      // Component became invisible, but is currently rendered.
      // Start the exit animation.
      setIsExiting(true)
      if (!animationTimeoutRef?.current) return
      animationTimeoutRef.current = setTimeout(() => {
        setShouldRender(false) // Fully unmount after animation
        setIsExiting(false) // Reset exiting state
        if (!onExited) return
        onExited() // Inform parent that animation finished
      }, animationDuration)
    }
    // If !isVisible and !shouldRender, it means it's already unmounted, do nothing.

    // Cleanup function for the effect: Clear timeout if component unmounts
    // or if isVisible changes back to true before the timeout fires.
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [isVisible, animationDuration, onExited, shouldRender])

  // Apply classes for animation
  const classNames = `${styles.animatedContent} ${isExiting ? styles.exiting : ""}`

  if (!shouldRender) return null

  return <div className={classNames}>{children}</div>
}

export default AnimatedUnmount
