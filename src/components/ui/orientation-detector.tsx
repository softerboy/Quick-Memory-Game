import React, { useEffect, useState } from 'react'

interface OrientationDetectorProps {
  children: React.ReactNode
}

const OrientationDetector: React.FC<OrientationDetectorProps> = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState(false)

  useEffect(() => {
    // Function to check if the device is in portrait mode
    const checkOrientation = () => {
      // Only apply orientation detection on mobile devices
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

      if (isMobile) {
        setIsPortrait(window.innerHeight > window.innerWidth)
      } else {
        setIsPortrait(false) // Always allow landscape on desktop
      }
    }

    // Check orientation on the mount
    checkOrientation()

    // Add event listener for orientation changes
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)

    // Cleanup event listeners
    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  return (
    <>
      {children}

      {/* Overlay that appears only in portrait mode on mobile */}
      {isPortrait && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="animate-bounce mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M17 3v18h4V3z"></path>
              <path d="M7 3v18H3V3z"></path>
              <path d="M17 21H7V3h10z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-primary">Please Rotate Your Device</h2>
          <p className="text-lg mb-4 text-foreground">
            This game is best experienced in landscape mode.
          </p>
          <p className="text-sm text-muted-foreground">
            Rotate your device horizontally to continue playing.
          </p>
        </div>
      )}
    </>
  )
}

export default OrientationDetector
