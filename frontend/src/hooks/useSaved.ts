import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function useSaved() {
  const queryClient = useQueryClient()

  const { data: savedJobs = [], isLoading } = useQuery({
    queryKey: ['savedJobs'],
    queryFn: () => api.getSavedJobs(),
  })

  const saved = savedJobs.map(sj => sj.job_id)

  const createMutation = useMutation({
    mutationFn: (jobId: string) => api.createSavedJob({ job_id: jobId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteSavedJob(id),
    onSuccess: () => {
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
        deleteMutation.mutate(savedJob.id)
      }
    } else {
      createMutation.mutate(id)
    }
  }

  function clearSaved() {
    // Delete all saved jobs
    savedJobs.forEach(sj => deleteMutation.mutate(sj.id))
  }

  return { saved, isSaved, toggleSaved, clearSaved, isLoading }
}

export default useSaved
