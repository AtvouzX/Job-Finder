import React, { createContext, useContext } from 'react'
import { useSaved as useSavedInternal } from '@/hooks/useSaved'

type SavedCtx = ReturnType<typeof useSavedInternal>

const SavedContext = createContext<SavedCtx | null>(null)

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const saved = useSavedInternal()
  return <SavedContext.Provider value={saved}>{children}</SavedContext.Provider>
}

export function useSavedContext() {
  const ctx = useContext(SavedContext)
  if (!ctx) throw new Error('useSavedContext must be used inside SavedProvider')
  return ctx
}

export default SavedProvider
