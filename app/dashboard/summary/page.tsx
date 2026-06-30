import { DemographicsSection } from "@/components/demographic/demographic-section"
import H1 from "@/components/H1"
import { CustomerSummary } from "@/components/summary/customer-summary"
import { Separator } from "@/components/ui/separator"
import { Suspense } from "react"

export default async function SummaryPage() {
  return (
    <>
      <div className="ml-10">
        <H1>Customer Status</H1>
      </div>
      <Suspense
        fallback={
          <div className="ml-11 text-sm text-green-500">Loading status...</div>
        }
      >
        <CustomerSummary />
      </Suspense>

      <Separator />
      <div className="min-h-screen p-6 md:p-10 dark:bg-zinc-950">
        <div className="max-w-7xl space-y-8">
          <div>
            <H1>Demographic Analytics</H1>
            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
              Real-time breakdown of customer distributions and regional
              metrics.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="-mt-7 text-sm text-green-500">
                Loading demographics...
              </div>
            }
          >
            <DemographicsSection />
          </Suspense>
        </div>
      </div>
    </>
  )
}
