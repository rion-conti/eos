import DemographicCharts from "@/components/demographic/demographic-charts"
import { getDemographicsDataService } from "@/services/customer-service"

export async function DemographicsSection() {
  const data = await getDemographicsDataService()

  return <DemographicCharts data={data} />
}
