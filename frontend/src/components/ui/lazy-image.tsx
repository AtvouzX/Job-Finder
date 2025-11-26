import { forwardRef } from 'react'
import { useLazyImage } from '@/hooks/useLazyImage'
import { cn } from '@/lib/utils'

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  placeholderClassName?: string
  threshold?: number
  rootMargin?: string
}

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  ({
    src,
    alt,
    className,
    placeholderClassName,
    threshold = 0.1,
    rootMargin = '50px',
    ...props
  }, ref) => {
    const { imgRef, src: lazySrc, isLoaded, hasError } = useLazyImage(src, {
      threshold,
      rootMargin,
    })

    return (
      <div className="relative">
        {!isLoaded && !hasError && (
          <div
            className={cn(
              'absolute inset-0 bg-muted animate-pulse rounded',
              placeholderClassName
            )}
          />
        )}
        <img
          ref={(el) => {
            imgRef.current = el
            if (ref) {
              if (typeof ref === 'function') {
                ref(el)
              } else {
                ref.current = el
              }
            }
          }}
          src={lazySrc}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={() => {
            // The hook handles this
          }}
          onError={() => {
            // The hook handles this
          }}
          {...props}
        />
      </div>
    )
  }
)

LazyImage.displayName = 'LazyImage'

export { LazyImage }