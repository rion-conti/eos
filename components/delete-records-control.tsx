"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { deleteCustomersAction } from "@/actions/actions"

type DeleteRecordsProps = {
  selectedIds: string[]
  onComplete: () => void
}

export function DeleteRecordsControl({
  selectedIds,
  onComplete,
}: DeleteRecordsProps) {
  const [progress, setProgress] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    setProgress(0)

    // 1. Start the Fake Animation (increments every 100ms)
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 90) return 90 // Pause at 90 until server responds
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 90)
      })
    }, 100)

    // 2. Call your type-safe Service
    const { data, success, error } = await deleteCustomersAction(selectedIds)

    // 3. Handle Result
    clearInterval(timer)

    if (!success) {
      toast.error(error)
      setIsDeleting(false)
      setProgress(0)
    } else {
      // Success: Snap to 100%, then close
      setProgress(100)
      toast.success(`Successfully deleted ${data?.deletedCount} record/s`)

      setTimeout(() => {
        setIsDeleting(false)
        onComplete() // Callback to refresh table/clear selection
      }, 500)
    }
  }

  return (
    <div className="flex h-12 items-center gap-4">
      {isDeleting ? (
        <div className="flex w-[200px] flex-col gap-2">
          <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
            <span>Deleting...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 w-full transition-all" />
        </div>
      ) : (
        selectedIds.length > 0 && (
          <>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="animate-in fade-in slide-in-from-top-1"
            >
              {/* Delete {selectedIds.length} Selected */}
              Delete
            </Button>
            <span className="text-xs text-red-500">{selectedIds.length} selected</span>
          </>
        )
      )}
    </div>
  )
}
