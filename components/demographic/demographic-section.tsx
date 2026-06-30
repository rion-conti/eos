import DemographicCharts from "@/components/demographic/demographic-charts"
import H1 from "../H1"
import { getDemographicsDataService } from "@/services/customer-service"

export default async function DemographicsSection() {
  const data = await getDemographicsDataService()

  return (
    <div className="min-h-screen p-6 md:p-10 dark:bg-zinc-950">
      <div className="max-w-7xl space-y-8">
        <div>
          <H1>Demographic Analytics</H1>
          <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
            Real-time breakdown of customer distributions and regional metrics.
          </p>
        </div>

        {/* Render the Client Side Charts with the parsed server data */}
        <DemographicCharts data={data} />
      </div>
    </div>
  )
}
