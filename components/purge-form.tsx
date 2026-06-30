"use client"

import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X, Trash2 } from "lucide-react"
import { toast } from "sonner"

// Shadcn UI Components
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { purgeFilteredRecordsAction } from "@/actions/actions"
import { CustomerStatus } from "@/generated/prisma/enums"
import { Customer } from "@/generated/prisma/client"
import { CUSTOMER_STATUSES_VALUES } from "@/lib/constants"
import H1 from "./H1"
import { Spinner } from "./ui/spinner"

type PurgeFormProps = {
  initialRecords: Customer[]
  currentStatus?: string
  currentPurgeDate?: string
}

export default function PurgeForm({
  initialRecords,
  currentStatus,
  currentPurgeDate,
}: PurgeFormProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isPurging, setIsPurging] = React.useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const totalToDelete = initialRecords?.length

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handlePurgeExecution = async () => {
    setIsPurging(true)

    // Capture the count before database changes clear out the current array
    const deletedCount = totalToDelete

    try {
      await purgeFilteredRecordsAction({
        recordStatus: currentStatus as CustomerStatus,
        purgeDate: currentPurgeDate,
      })

      // 1. Fire the success toast notification
      toast.success("Records Purged Successfully", {
        description: `Permanently deleted ${deletedCount} record${deletedCount === 1 ? "" : "s"} from the database.`,
      })
      setIsDialogOpen(false)
      // 2. Clear out URL parameter filters
      router.push(pathname)
    } catch (error) {
      console.error("Failed to purge records:", error)
      if (error instanceof Error && error.message === "AUTH_REQUIRED") {
        toast.error("Purge Operation Failed", {
          description: "User is not authenticated.",
        })
      } else {
        toast.error("Purge Operation Failed", {
          description:
            "An unexpected database error occurred during execution.",
        })
      }
    } finally {
      setIsPurging(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-6 p-6">
      <H1>Purge Records</H1>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-background p-4 text-foreground shadow-sm">
        {/* Record Status Selector */}
        <div className="flex items-center gap-2">
          <Select
            value={currentStatus || "all"}
            onValueChange={(val) => {
              const safeVal = val ?? ""
              handleFilterChange(
                "recordStatus",
                safeVal === "all" ? "" : safeVal
              )
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Record Status">
                {
                  CUSTOMER_STATUSES_VALUES.find(
                    (item) => item.value === (currentStatus || "all")
                  )?.label
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {CUSTOMER_STATUSES_VALUES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {currentStatus && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleFilterChange("recordStatus", "")}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Purge Date Picker */}
        <div className="flex items-center gap-2">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !currentPurgeDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {currentPurgeDate ? (
                    format(new Date(currentPurgeDate), "PPP")
                  ) : (
                    <span>Pick a purge date</span>
                  )}
                </Button>
              }
            ></PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                startMonth={new Date(2000, 0)}
                endMonth={new Date(2035, 11)}
                selected={
                  currentPurgeDate ? new Date(currentPurgeDate) : undefined
                }
                onSelect={(date) => {
                  handleFilterChange(
                    "purgeDate",
                    date ? format(date, "yyyy-MM-dd") : ""
                  )
                  setIsCalendarOpen(false)
                }}
                autoFocus
              />
            </PopoverContent>
          </Popover>
          {currentPurgeDate && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleFilterChange("purgeDate", "")}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Purge Button & Dialog Trigger */}
        <div className="ml-auto">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger
              render={
                <Button
                  variant="default"
                  className="bg-red-600 hover:bg-red-700"
                  disabled={
                    totalToDelete === 0 ||
                    (!currentStatus && !currentPurgeDate) ||
                    isPurging
                  }
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isPurging ? "Processing..." : "Purge Records"}
                </Button>
              }
            ></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription
                  className="space-y-2"
                  render={
                    <div>
                      <p>
                        This action cannot be undone. This will permanently
                        delete your selected data from the system database.
                      </p>
                      <p className="rounded border border-red-200 bg-red-50 p-2 font-semibold text-red-600">
                        ⚠️ Warning: You are about to permanently delete{" "}
                        {totalToDelete} record{totalToDelete === 1 ? "" : "s"}.
                      </p>
                    </div>
                  }
                ></AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                {/* 
                  NOTE: By letting default Shadcn UI behaviour click out, 
                  the layout pop window drops away seamlessly while the async backend action processes.
                */}
                <AlertDialogAction
                  onClick={handlePurgeExecution}
                  className="hover:bg-red-600"
                >
                  {isPurging ? (
                    <>
                      <Spinner className="text-white" />
                      <span>Purging Records...</span>
                    </>
                  ) : (
                    "Yes, Delete permanently"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
