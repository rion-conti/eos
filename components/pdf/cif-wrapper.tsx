"use client"

import { CIFDocument } from "@/components/pdf/cif-document"
import { Button } from "@/components/ui/button"
import { Customer } from "@/generated/prisma/client"
import { Download } from "lucide-react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),

  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <p>Loading Link...</p> }
)

export default function CIFWrapper({ data }: { data: Customer }) {
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      {/* Top Actions */}
      <div className="mb-3 flex w-full max-w-5xl justify-end gap-2">
        {/* Exit Button */}
        <Button
          onClick={() => router.push("/dashboard/customer")}
          className="px-4 py-2"
          variant="outline"
        >
          {/* ← Exit */}
          Back to Customer Listing
        </Button>

        {/* Download Button */}
        <PDFDownloadLink
          document={<CIFDocument data={data} />}
          fileName="CIF_Form.pdf"
          className="flex gap-2 rounded-lg bg-primary px-4 py-1 text-white hover:bg-primary/90"
        >
          {({ loading }) =>
            loading ? (
              "Generating PDF..."
            ) : (
              <>
                <Download /> Download PDF
              </>
            )
          }
        </PDFDownloadLink>
      </div>

      {/* PDF Preview */}
      <div className="h-[90vh] w-full max-w-5xl border bg-white shadow-xl">
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <CIFDocument data={data} />
        </PDFViewer>
      </div>
    </div>
  )
}
