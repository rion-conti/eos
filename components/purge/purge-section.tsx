import { PurgeForm } from "@/components/purge/purge-form"
import { getFilteredRecordsService } from "@/services/customer-service"
import { CustomerStatus } from "@/generated/prisma/enums"
import { CUSTOMER_STATUSES } from "@/lib/constants"
import Link from "next/link"
import { isValidDateString } from "@/lib/utils"

export async function PurgeSection({
  searchParams,
}: {
  searchParams: { recordStatus?: string; purgeDate?: string }
}) {
  const filters = searchParams
  const rawStatus = (filters.recordStatus as CustomerStatus) || ""
  const rawPurgeDate = filters.purgeDate || ""

  const isStatusInvalid = rawStatus && !CUSTOMER_STATUSES.includes(rawStatus)
  const isDateInvalid = rawPurgeDate && !isValidDateString(rawPurgeDate)

  if (isStatusInvalid || isDateInvalid) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
        <h3 className="text-lg font-bold">Invalid Filter Option</h3>
        <p className="text-sm opacity-90">
          {isDateInvalid &&
            "The date value provided in the URL is not a valid calendar date."}
        </p>
        <p className="text-sm opacity-90">
          {isStatusInvalid &&
            "The status value provided in the URL is not recognized."}
        </p>
        <Link
          href="/dashboard/purge"
          className="mt-3 inline-block w-fit rounded bg-red-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Reset Filters & Retry
        </Link>
      </div>
    )
  }

  const recordStatus = rawStatus as CustomerStatus | undefined
  const purgeDate = rawPurgeDate
  const records = await getFilteredRecordsService({ recordStatus, purgeDate })
  return (
    <PurgeForm
      initialRecords={records}
      currentStatus={recordStatus}
      currentPurgeDate={purgeDate}
    />
  )
}
