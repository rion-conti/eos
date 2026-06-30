"use client"
import * as XLSX from "xlsx"
import { toast } from "sonner"
import { ExportedCustomer } from "./customer-section"
import { Download } from "lucide-react"
import { useState } from "react"
import { utcOffsetToDB } from "@/lib/utils"

interface ExportButtonProps {
  data: ExportedCustomer[]
}

export default function ExportButton({ data }: ExportButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = () => {
    if (!data || data.length === 0) {
      toast.error("Download Failed", {
        description: "No data available to export",
      })
      return
    }
    setIsLoading(true)

    // 1. Define header rows as an Array of Arrays (aoa)
    const headers: string[][] = [
      [
        "Identifier",
        "Customer Status",
        "Last Name",
        "First Name",
        "Middle Name",
        "Suffix",
        "Email Address",
        "Birthdate",
        "Current Mobile",
        "Home Country Mobile",
        "Creation Date",
      ],
    ]

    // 2. Initialize worksheet with headers
    const worksheet = XLSX.utils.aoa_to_sheet(headers)

    // 3. Map type-safe fields into rows
    const rows: (string | null)[][] = data.map((customer) => [
      customer.id,
      customer.customerStatus,
      customer.lastname,
      customer.firstname,
      customer.middlename,
      customer.suffix,
      customer.email,
      customer.birthDate,
      customer.currentMobile,
      customer.homeCountryMobile,
      customer.createdAt,
    ])

    // 4. Append data below the header row
    XLSX.utils.sheet_add_aoa(worksheet, rows, { origin: "A2" })

    // 5. Build workbook and trigger download
    const d = new Date()
    const utcDateToday = utcOffsetToDB(d, d.getTimezoneOffset())
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers List")
    XLSX.writeFile(
      workbook,
      `Customers_Export-${new Date(utcDateToday).toISOString().split("T")[0]}.xlsx`
    )
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`mt-6 flex rounded px-4 py-2 transition-colors ${isLoading ? "cursor-not-allowed bg-gray-400 text-white" : "bg-green-600 text-white hover:bg-green-700"}`}
    >
      <Download className="mr-2" /> Export Customers to Excel
    </button>
  )
}
