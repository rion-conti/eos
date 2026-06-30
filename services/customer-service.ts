import {
  createCustomer,
  deleteCustomerById,
  deleteCustomers,
  getAllCustomersTable,
  getAllCustomersTableByUser,
  getCustomerById,
  getCustomersSummaryCounts,
  getFilteredRecords,
  purgeFilteredRecords,
  getDownloadCustomers,
  getDemographicsData,
  updateCustomerById,
} from "@/dal/customer-dal"
import { CustomerEssentials } from "@/lib/types"
import { Customer, CustomerStatus, Prisma } from "../generated/prisma/client"
import { CustomerTable } from "@/components/table-customer/columns"
import { checkAuth } from "@/lib/checkAuth"
import { redirect } from "next/navigation"
import { UnauthenticatedError } from "@/lib/exceptions"

export type Result<T> = [data: T, null] | [null, { message: string }]

// todo: include throws error
export async function createCustomerService(
  newCustomer: CustomerEssentials
): Promise<Result<CustomerTable>> {
  await checkAuth()

  let customer
  try {
    customer = await createCustomer(newCustomer)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error("Validation Error: Email already exists")
        return [null, { message: "Email already exists" }]
      }
    }
    console.error("Validation Error: Could not create customer.")
    return [null, { message: "Could not create customer" }]
  }

  return [customer, null]
}

export async function getAllCustomersTableService() {
  await checkAuth()
  return await getAllCustomersTable()
}

export async function getAllCustomersTableByUserService(userId: string) {
  await checkAuth()
  return await getAllCustomersTableByUser(userId)
}

export async function getCustomersSummaryCountsService() {
  const session = await checkAuth()
  if (session.user.role !== "admin") {
    redirect("/unauthorized")
  }

  return await getCustomersSummaryCounts()
}

export async function getCustomerByIdService(
  id: string
): Promise<Result<Customer>> {
  await checkAuth()

  let customer
  try {
    customer = await getCustomerById(id)

    if (!customer) {
      console.log("Validation Error: No customer record found")
      return [null, { message: "No customer record found" }]
    }
    return [customer, null]
  } catch (error) {
    console.error("Validation Error: Could not get customer details:", error)
    return [null, { message: "Could not get customer details" }]
  }
}

type Name = {
  lastname: string
  firstname: string
}

export async function deleteCustomerByIdService(
  id: string
): Promise<Result<Name>> {
  await checkAuth()

  const [_customer, error] = await getCustomerByIdService(id)
  if (error) {
    console.error(error.message)
    return [null, { message: error.message }]
  }

  let deletedCustomer
  try {
    deletedCustomer = await deleteCustomerById(id)
  } catch (error) {
    console.error("Validation Error: Could not delete customer: ", error)
    return [null, { message: "Could not delete customer" }]
  }

  return [deletedCustomer, null]
}

type deletedRecords = {
  deletedCount: number
}

export async function deleteCustomersService(
  ids: string[]
): Promise<Result<deletedRecords>> {
  try {
    const deletedCount = await deleteCustomers(ids)
    return [deletedCount, null]
  } catch (error) {
    console.error("Validation Error: Could not complete deletion: ", error)
    return [null, { message: "Could not complete deletion" }]
  }
}

export async function updateCustomerByIdService(
  identifier: Customer["id"],
  editCustomer: CustomerEssentials
): Promise<Result<CustomerTable>> {
  await checkAuth()

  const [customer, error] = await getCustomerByIdService(identifier)

  if (error) {
    console.log("Validation Error: No customer record found")
    return [null, { message: error.message }]
  }

  const { id, createdAt, updatedAt, ...restofCustomer } = customer
  const updatedCustomer = { ...restofCustomer, ...editCustomer }
  let newCustomer
  try {
    newCustomer = await updateCustomerById(id, updatedCustomer)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("Validation Error: Email already exists")
        return [null, { message: "Email already exists" }]
      }
    }
    console.error("Validation Error: Could not update customer.", error)
    return [null, { message: "Could not update customer" }]
  }
  return [newCustomer, null]
}

// Purge Records
export type FiltersProps = {
  recordStatus?: CustomerStatus
  purgeDate?: string
}
export async function getFilteredRecordsService(filters: FiltersProps) {
  const session = await checkAuth()
  if (session.user.role !== "admin") {
    redirect("/unauthorized")
  }

  const { recordStatus, purgeDate } = filters

  let endDate: Date | undefined
  if (purgeDate) {
    const [year, month, day] = purgeDate.split("-").map(Number)
    endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999))
  }

  const whereClause = {
    ...(recordStatus && { customerStatus: recordStatus }),
    ...(purgeDate && { createdAt: { lte: endDate! } }),
  }
  return await getFilteredRecords(whereClause)
}

export async function purgeFilteredRecordsService(filters: FiltersProps) {
  const session = await checkAuth()
  if (session.user.role !== "admin") {
    throw new UnauthenticatedError()
  }

  const { recordStatus, purgeDate } = filters

  let endDate: Date | undefined
  if (purgeDate) {
    const [year, month, day] = purgeDate.split("-").map(Number)
    endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999))
  }

  const whereClause = {
    ...(recordStatus && { customerStatus: recordStatus }),
    ...(purgeDate && { createdAt: { lte: endDate! } }),
  }
  return await purgeFilteredRecords(whereClause)
}

// Download Customer
export async function getDownloadCustomersService() {
  const session = await checkAuth()
  if (session.user.role !== "admin") {
    redirect("/unauthorized")
  }
  return await getDownloadCustomers()
}

// Demographics Analysis
const CIVIL_STATUS_LABELS: Record<string, string> = {
  unmarried: "Unmarried",
  married: "Married",
  separated: "Separated",
  widowed: "Widowed",
  divorced: "Divorced",
  annulled: "Annulled",
}

export async function getDemographicsDataService() {
  try {
    // 1. Core data sets pulled concurrently using cross-database safe commands
    const { genderGroup, civilStatusGroup, rawCustomerData } =
      await getDemographicsData()

    // 2. Format outputs for Recharts parsing engine safely
    const genderData = genderGroup.map((g) => ({
      name: g.gender || "Unknown",
      value: g._count.gender,
    }))

    const civilStatusData = civilStatusGroup.map((c) => ({
      name: CIVIL_STATUS_LABELS[c.civilStatus] || "Unknown",
      value: c._count.civilStatus,
    }))

    // 3. Compute age brackets and regions instantly in memory (SQLite & PostgreSQL Safe)
    const ageBrackets = { "18-25": 0, "26-40": 0, "41-60": 0, "61+": 0 }
    const regionBrackets: Record<string, number> = {}

    const today = new Date()

    rawCustomerData.forEach((customer) => {
      // --- Safe Age Calculation ---
      if (customer.birthDate) {
        const birthDate = new Date(customer.birthDate)
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--
        }

        if (age <= 25) ageBrackets["18-25"]++
        else if (age <= 40) ageBrackets["26-40"]++
        else if (age <= 60) ageBrackets["41-60"]++
        else ageBrackets["61+"]++
      }

      // --- Safe ZIP-to-Region Bucket Parsing ---
      const zipStr = customer.pzipcode ? String(customer.pzipcode).trim() : ""
      const zipPrefix = zipStr.substring(0, 2)
      let region = "Unknown / Other"

      if (
        (zipPrefix >= "10" && zipPrefix <= "13") ||
        zipPrefix === "28" ||
        zipPrefix === "29"
      ) {
        region = "Region I (Ilocos)"
      } else if (zipPrefix >= "20" && zipPrefix <= "27") {
        region = "Region II (Cagayan Valley)"
      } else if (zipPrefix >= "30" && zipPrefix <= "39") {
        region = "Region III (Central Luzon)"
      } else if (zipPrefix >= "40" && zipPrefix <= "43") {
        region = "Region IV-A (CALABARZON)"
      } else if (
        (zipPrefix >= "44" && zipPrefix <= "49") ||
        zipPrefix === "52"
      ) {
        region = "MIMAROPA (Region IV-B)"
      } else if (
        (zipPrefix >= "14" && zipPrefix <= "19") ||
        zipPrefix === "04" ||
        zipPrefix === "09"
      ) {
        // 04xx/09xx handle specific Metro Manila sub-zones and central routing boxes
        region = "NCR (Metro Manila)"
      } else if (zipPrefix >= "05" && zipPrefix <= "08") {
        region = "CAR (Cordillera Administrative Region)"
      } else if (zipPrefix >= "50" && zipPrefix <= "55") {
        region = "Region V (Bicol)"
      } else if (zipPrefix >= "56" && zipPrefix <= "61") {
        region = "Region VI (Western Visayas)"
      } else if (zipPrefix >= "62" && zipPrefix <= "64") {
        region = "Region VII (Central Visayas)"
      } else if (zipPrefix >= "65" && zipPrefix <= "69") {
        region = "Region VIII (Eastern Visayas)"
      } else if (zipPrefix >= "70" && zipPrefix <= "73") {
        region = "Region IX (Zamboanga Peninsula)"
      } else if (zipPrefix >= "80" && zipPrefix <= "84") {
        region = "Region XI (Davao Region)"
      } else if (zipPrefix >= "85" && zipPrefix <= "87") {
        region = "Region XII (SOCCSKSARGEN)"
      } else if (
        zipPrefix === "88" ||
        zipPrefix === "89" ||
        (zipPrefix >= "94" && zipPrefix <= "95")
      ) {
        region = "Region X (Northern Mindanao)"
      } else if (zipPrefix >= "90" && zipPrefix <= "93") {
        region = "Region XIII (Caraga)"
      } else if (zipPrefix >= "96" && zipPrefix <= "98") {
        region = "BARMM (Bangsamoro Region)"
      }

      if (zipStr) {
        regionBrackets[region] = (regionBrackets[region] || 0) + 1
      } else {
        regionBrackets["Unknown / Other"] =
          (regionBrackets["Unknown / Other"] || 0) + 1
      }
    })

    // 4. Map structured memory objects cleanly into Recharts format Arrays
    const ageData = Object.entries(ageBrackets).map(([name, value]) => ({
      name,
      value,
    }))
    const regionData = Object.entries(regionBrackets)
      .map(([name, value]) => ({ name, value }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value)

    return { genderData, civilStatusData, ageData, regionData }
  } catch (error) {
    console.error("Dashboard demographic process failure:", error)
    return { genderData: [], civilStatusData: [], ageData: [], regionData: [] }
  }
}
