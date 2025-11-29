import * as React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { CheckCircle, CloudDownload, RefreshCw, X } from 'lucide-react'

function PWABadge() {
  // periodic sync is disabled, change the value to enable it, the period is in milliseconds
  // You can remove onRegisteredSW callback and registerPeriodicSync function
  const period = 0

  const [offlineReady, setOfflineReady] = React.useState(false)
  const [needRefresh, setNeedRefresh] = React.useState(false)

  const {
    updateServiceWorker,
  } = useRegisterSW({
    onNeedRefresh() {
      console.log('PWA: Update available')
      const autoUpdateEnabled = localStorage.getItem('job_finder:auto_update') === 'true'
      if (autoUpdateEnabled) {
        console.log('PWA: Auto-updating...')
        updateServiceWorker(true)
        // Show a brief notification that update happened
        setTimeout(() => {
          toast.success('App updated automatically', { duration: 3000 })
        }, 1000)
      } else {
        setNeedRefresh(true)
      }
    },
    onOfflineReady() {
      console.log('PWA: Offline ready')
      setOfflineReady(true)
    },
    onRegisteredSW(swUrl, r) {
      console.log('PWA: Service worker registered', swUrl)
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
  }, [])

  // show a sonner toast when offlineReady or needRefresh is true
  React.useEffect(() => {
    const autoUpdateEnabled = localStorage.getItem('job_finder:auto_update') === 'true'
    console.log('PWA Badge effect:', { offlineReady, needRefresh, autoUpdateEnabled })
    let id: string | number | undefined

    if (offlineReady || needRefresh) {
      id = toast.custom(
        (t) => (
          <div className="flex items-center gap-2 w-full max-w-sm rounded-full px-3 py-2 text-sm shadow-md border bg-popover text-popover-foreground">
            {offlineReady ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <CloudDownload className="h-4 w-4 text-blue-600" />
            )}

            <div className="ml-1 text-sm font-medium line-clamp-2">
              {offlineReady
                ? 'App ready to work offline'
                : 'New content available.'}
            </div>

            <div className="ml-auto flex items-center gap-2">
              {needRefresh && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => updateServiceWorker(true)}
                  className="h-7 px-2 rounded-full"
                >
                  Refresh now
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}

              {offlineReady && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => closeToast(((t as unknown) as { id?: string | number }).id)}
                  className="h-7 px-2"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ),
        { id: 'pwa-badge', duration: needRefresh ? 10000 : 5000, position: 'top-center' }
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
