import { Suspense } from "react"
import { checkAuth } from "@/lib/checkAuth"
import { redirect } from "next/navigation"
import H1 from "@/components/H1"
import {PurgeSection} from "@/components/purge/purge-section"

export default async function PurgePage({
  searchParams,
}: {
  searchParams: Promise<{ recordStatus?: string; purgeDate?: string }>
}) {
  const session = await checkAuth()
  if (session.user.role !== "admin") {
    redirect("/unauthorized")
  }

  const filters = await searchParams

  return (
    <div className="max-w-4xl space-y-6 p-6">
      <H1>Purge Records</H1>
      <Suspense
        fallback={
          <div className="mt-10 text-sm text-green-500">
            Loading Purge Dashboard...
          </div>
        }
      >
        <PurgeSection searchParams={filters} />
      </Suspense>
    </div>
  )
}
