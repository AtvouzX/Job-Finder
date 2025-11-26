import { useState, useRef, useEffect } from 'react'

interface UseLazyImageOptions {
  threshold?: number
  rootMargin?: string
}

export const useLazyImage = (src: string, options: UseLazyImageOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const { threshold = 0.1, rootMargin = '50px' } = options

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  return {
    imgRef,
    src: isInView ? src : undefined,
    isLoaded,
    isInView,
    hasError,
    onLoad: handleLoad,
    onError: handleError,
  }
}