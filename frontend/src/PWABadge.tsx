import * as React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { CheckCircle, RefreshCw, X } from 'lucide-react'

function PWABadge() {
  // periodic sync is disabled, change the value to enable it, the period is in milliseconds
  // You can remove onRegisteredSW callback and registerPeriodicSync function
  const period = 0

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r)
      }
      else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker
          if (sw.state === 'activated')
            registerPeriodicSync(period, swUrl, r)
        })
      }
    },
  })

  const closeToast = React.useCallback((id?: string | number) => {
    setOfflineReady(false)
    setNeedRefresh(false)
    if (id) toast.dismiss(id)
    else toast.dismiss()
  }, [setOfflineReady, setNeedRefresh])

  // show a sonner toast when offlineReady or needRefresh is true
  React.useEffect(() => {
    let id: string | number | undefined

    if (offlineReady || needRefresh) {
      id = toast.custom(
        (t) => (
          <div className="flex items-center gap-2 w-full max-w-sm rounded-full px-3 py-2 text-sm shadow-md border bg-popover text-popover-foreground">
            {offlineReady ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <RefreshCw className="h-4 w-4 text-blue-600" />
            )}

            <div className="ml-1 text-sm font-medium line-clamp-2">
              {offlineReady
                ? 'App ready to work offline'
                : 'New content available — reload to update.'}
            </div>

            <div className="ml-auto flex items-center gap-2">
              {needRefresh && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => updateServiceWorker(true)}
                  className="h-7 px-2"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reload
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => closeToast(((t as unknown) as { id?: string | number }).id)}
                className="h-7 px-2"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ),
        { id: 'pwa-badge', duration: 5000, position: 'top-center' }
      )
    }

    if (!offlineReady && !needRefresh) {
      toast.dismiss('pwa-badge')
    }

    return () => {
      if (id) toast.dismiss(id)
    }
  }, [offlineReady, needRefresh, updateServiceWorker, closeToast])

  // Render the Toaster so sonner toasts can appear
  return <Toaster position="top-center" />
}

export default PWABadge

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(period: number, swUrl: string, r: ServiceWorkerRegistration) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine)
      return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    })

    if (resp?.status === 200)
      await r.update()
  }, period)
}
