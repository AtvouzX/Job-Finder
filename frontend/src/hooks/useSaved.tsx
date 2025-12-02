import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { CheckCircle, X } from 'lucide-react'
import { api } from '@/lib/api'

export function useSaved() {
  const queryClient = useQueryClient()
  const [lastAction, setLastAction] = useState<{ type: 'save' | 'unsave', jobId: string, savedId?: string } | null>(null)

  const { data: savedJobs = [], isLoading } = useQuery({
    queryKey: ['savedJobs'],
    queryFn: () => api.getSavedJobs(),
  })

  const saved = savedJobs.map(sj => sj.job_id)

  const createMutation = useMutation({
    mutationFn: (jobId: string) => api.createSavedJob({ job_id: jobId }),
    onMutate: async (jobId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['savedJobs'] })
      // Snapshot the previous value
      const previousSavedJobs = queryClient.getQueryData(['savedJobs'])
      // Optimistically update to the new value
      queryClient.setQueryData(['savedJobs'], (old: any) => [
        ...(old || []),
        { id: `temp-${jobId}`, job_id: jobId }
      ])
      return { previousSavedJobs }
    },
    onError: (_err, _jobId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousSavedJobs) {
        queryClient.setQueryData(['savedJobs'], context.previousSavedJobs)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] })
    },
    onSuccess: (data) => {
      setLastAction(prev => prev ? { ...prev, savedId: data.id } : null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteSavedJob(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['savedJobs'] })
      // Snapshot the previous value
      const previousSavedJobs = queryClient.getQueryData(['savedJobs'])
      // Optimistically update to the new value
      queryClient.setQueryData(['savedJobs'], (old: any) =>
        (old || []).filter((sj: any) => sj.id !== id)
      )
      return { previousSavedJobs }
    },
    onError: (_err, _id, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousSavedJobs) {
        queryClient.setQueryData(['savedJobs'], context.previousSavedJobs)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] })
    },
  })

  function isSaved(id: string) {
    return saved.includes(id)
  }

  function toggleSaved(id: string) {
    if (isSaved(id)) {
      const savedJob = savedJobs.find(sj => sj.job_id === id)
      if (savedJob) {
        const action = { type: 'unsave' as const, jobId: id, savedId: savedJob.id }
        setLastAction(action)
        deleteMutation.mutate(savedJob.id)
        showToast('unsave', action)
      }
    } else {
      const tempAction = { type: 'save' as const, jobId: id } as const
      setLastAction(tempAction)
      createMutation.mutate(id)
      showToast('save', tempAction)
    }
  }

  function clearSaved() {
    // Delete all saved jobs
    savedJobs.forEach(sj => deleteMutation.mutate(sj.id))
  }

  const showToast = (type: 'save' | 'unsave', actionParam?: { type: 'save' | 'unsave', jobId: string, savedId?: string } | null) => {
    const action = actionParam ?? lastAction
    if (!action) return

    const undo = () => {
      if (type === 'save') {
        // undo save: attempt to remove saved entry — if server already created it the delete will work,
        // otherwise we rely on the next refetch to sync state.
        if (action.savedId) deleteMutation.mutate(action.savedId)
      } else {
        // undo unsave: save again
        createMutation.mutate(action.jobId)
      }
      toast.dismiss()
    }

    toast.custom(
      () => (
        <div className="flex items-center justify-center gap-2 w-full max-w-sm rounded-full px-3 py-2 text-sm shadow-md border bg-popover text-popover-foreground">
          {type === 'save' ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <X className="h-4 w-4 text-red-600" />
          )}

          <div className="ml-1 text-sm font-medium line-clamp-2">
            Job {type === 'save' ? 'saved successfully!' : 'removed from your saved list'}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={undo}
              className="h-7 px-2"
            >
              Undo
            </Button>
          </div>
        </div>
      ),
      { duration: 3000, position: 'top-center' }
    )
  }

  return { saved, isSaved, toggleSaved, clearSaved, isLoading }
}

export default useSaved
