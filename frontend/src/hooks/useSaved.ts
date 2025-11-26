import { useEffect, useState } from 'react'

const STORAGE_KEY = 'job_finder:saved_jobs'

export function useSaved(initial: string[] = []) {
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw) as string[]
    } catch {
      // ignore
    }
    return initial
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    } catch {
      // ignore
    }
  }, [saved])

  function isSaved(id: string) {
    return saved.includes(id)
  }

  function toggleSaved(id: string) {
    setSaved((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  function clearSaved() {
    setSaved([])
  }

  return { saved, isSaved, toggleSaved, clearSaved }
}

export default useSaved
