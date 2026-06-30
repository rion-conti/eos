import { getDownloadCustomersService } from "@/services/customer-service"
import ExportButton from "./export-button"

// Define the shape of the clean data we send to the client
export type ExportedCustomer = {
  id: string
  customerStatus: string
  lastname: string
  firstname: string
  middlename: string
  suffix: string | null
  email: string
  birthDate: string
  currentMobile: string
  homeCountryMobile: string
  createdAt: string
}

export default async function CustomerSection() {
  const customers = await getDownloadCustomersService()

  // Serialize dates to strings for Next.js client component boundary
  const serializedCustomers: ExportedCustomer[] = customers.map((customer) => ({
    ...customer,
    birthDate: customer.birthDate.toISOString().split("T")[0],
    createdAt: customer.createdAt.toISOString().split("T")[0],
  }))

  return <ExportButton data={serializedCustomers} />
}
